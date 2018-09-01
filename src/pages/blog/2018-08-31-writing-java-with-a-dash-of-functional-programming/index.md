---
title: Writing Java With a Dash of Functional Programming
date: 2018-08-31
path: /blog/writing-java-with-a-dash-of-functional-programming/
excerpt: Using <code>Either</code> in Java for more declarative code
---

After learning a little bit of Haskell, writing idiomatic Java leaves me wanting a little more from the normal object orientated constructs and traditional imperative programming paradigms. I realized during one of my projects that I could apply some functional concepts to it to make the code more elegant and readable, which I’ll share in this post using a slimmed down example!

## Problem

A typical data migration to replace one data source with another with zero downtime might look like the following:

1. Modify the application to write to both old and new data sources
2. Backfill the new data source with the old data
3. Validate both data sources
4. Flip application reads to be only from the new source, remove the double writes

We will be looking at step *3* of a data migration, where we modify our application to load records from both data sources to compare for discrepancies during reads, ensuring no data loss was made during this migration.

In this example, we will be building an indirection to load *books* from two data sources, comparing them, and returning them to our application upstream, all while handling possible exceptions during the load.

![The indirection we will add](indirection.svg)


The following code snippet specifies a `Book` object with just one `title` field. It implements [`Comparable<Book>`](https://docs.oracle.com/javase/8/docs/api/java/lang/Comparable.html) for us to make assertions that two `Book` instances are the same.

```java
public class Book implements Comparable<Book>{
    private final String title;

    public Book(final String title) {
        this.title = title;
    }

    public String getTitle() {
        return title;
    }

    @Override
    public int compareTo(final Book o) {
        return title.compareTo(o.getTitle());
    }
}
```

Here, we have the interface for a `BookLoader`.

```java
public interface BookLoader {
    Book load() throws Exception;
}
```

Note that loading a book can throw an exception, so we will have to handle it appropriately. In the happy path where loads from both tables are successful, we simply want to compare these results. Should there be any discrepancies, or errors with loading the data, we can call `incrementCompareFailedMetric()` on our `Metrics` interface.

```java
public interface Metrics {
    void incrementCompareFailedMetric();
}
```

### Requirements

Typically, we do not want integration with the new database to add another failure point on our system, so our function should ignore failures from the new database in the unhappy path. The following table specifies the requirements that we will code out:

| `oldLoader.load()` | `newLoader.load()` | Action                                             |
|--------------------|--------------------|----------------------------------------------------|
| Success            | Success            | `compareBooks(oldBook, newBook)`, return `oldBook` |
| Success            | Failure            | `metrics.incrementCompareFailedMetric()`, return `oldBook` |
| Failure            | Success            | Throw exception from `oldLoader.load()`            |
| Failure            | Failure            | Throw exception from `oldLoader.load()`            |

## First Iteration

Now that we have the requirements set, let’s write some code.

We first declare a constructor to inject in our `Metrics` interface, and one `BookLoader` interface for the old and new database. Also, we create a simple helper function to compare books and update metrics.

```java
public class ValidatingBookLoader implements BookLoader {
    private final Metrics metrics;
    private final BookLoader oldLoader;
    private final BookLoader newLoader;

    public ImperativeBookLoader(final Metrics metrics, final BookLoader oldLoader, final BookLoader newLoader) {
        this.metrics = metrics;
        this.oldLoader = oldLoader;
        this.newLoader = newLoader;
    }

    private void compareBooks(final Book oldBook, final Book newBook) {
        if (oldBook.compareTo(newBook) != 0) {
            metrics.incrementCompareFailedMetric();
        }
    }
}
```

We create a `tryLoadFromLoader` helper to return a [tuple](#tuple) holding two types, `Book` and `Exception`. It’s a little weird because exceptions are typically thrown. Since we have to handle possible exceptions from both loaders, it helps to catch them and pass them as values.

```java
private Tuple<Book, Exception> tryLoadFromLoader(final BookLoader loader) {
    try {
        return new Tuple<>(loader.load(), null);
    } catch (Exception e) {
        return new Tuple<>(null, e);
    }
}
```

Now, we can implement the `load` function.

```java
public Book load() throws Exception {
    final Tuple<Book, Exception> oldLoaderResult = tryLoadFromLoader(oldLoader);
    final Tuple<Book, Exception> newLoaderResult = tryLoadFromLoader(newLoader);

    final Exception oldLoadError = oldLoaderResult.right;
    final Exception newLoadError = newLoaderResult.right;

    final boolean oldLoaderSuccessful = (oldLoadError == null);
    final boolean newLoaderSuccessful = (newLoadError == null);

    if (oldLoaderSuccessful && newLoaderSuccessful) {
        compareBooks(oldLoaderResult.left, newLoaderResult.left);
        return oldLoaderResult.left;
    }

    // old loader success, new loader fail
    if (oldLoaderSuccessful) {
        metrics.incrementCompareFailedMetric();
        return oldLoaderResult.left;
    }

    // old loader fail. new loader fail
    throw oldLoadError;
}
```

It a little more verbose than it needs to be, but the gist of it is that we use the absence of an exception (on the right side of the tuple) to indicate success of the operation. Using conditionals, we simply perform checks and operations based on the specifications in the table above.

## Either

The above implementation of `load`, is rather imperative. Without the comments, it can add a bit of cognitive load when one tries to understand the implementation. Also, what happens if there was a bug in the implementation of `tryLoadFromLoader`, where the returned tuple contains *both* a result *and* an exception? It sure would be helpful if such mistakes can be caught at compile tome.

Functional programming to the rescue! In languages like Haskell, `Either` is a kind of “container” holding just *one* value that can be of two types, on the `left`, and the `right`. *Either* *left* or *right*, get it? It can be used to specify and chain results of execution where the successful value is typically on the left, and error value on the right.

Sounds familiar? This sounds like the `Tuple<Book, Exception>` that we have declared earlier, except with additional helper functions that we can use to transition these results along. Also, it is impossible to initialize an `Either` type with both the left and right values – doing so should cause a compilation error.

### Fold

Java 8 has introduced some functional concepts such as Optionals, lambdas and more, but it still does not give us this `Either` type as a built-in. We can still do so with the [vavr](https://www.vavr.io/) library though!

Of interest to us is [the API](https://static.javadoc.io/io.vavr/vavr/0.9.2/io/vavr/control/Either.html#fold-java.util.function.Function-java.util.function.Function-) of `Either.fold` which I will illustrate with a simple example. `fold` takes two parameters, a `leftMapper` function to transform the *left* value, *if* the value is a *left* type, and a `rightMapper` function to transform the *right* value, should it be a *right* type. In the example below, we transform an `Either<String, Integer>` type to another `Either<Integer, String>` by using the `fold` method and lambda functions as parameters.

```java
Either<String, Integer> doSomething() {
    // dummy method stub
}

Either<Integer, String> foldResult = doSomething().fold((someString) -> {
    // what to return when the result of doSomething() is a string (on the left)
    return Either.left(someString.length());
}, (someInteger) -> {
    // what to return when the result of doSomething() is a integer (on the right)
    return Either.right(Integer.toString(someInteger));
});
```

## More Declarative Implementation

Let us now iterate on our earlier solution. First, we rewrite `tryLoadFromLoader` to return an `Either` object instead of a tuple.

```java
private Either<Book, Exception> tryLoadFromLoader(final BookLoader loader) {
    try {
        return Either.left(loader.load());
    } catch (Exception e) {
        return Either.right(e);
    }
}
```

Now, we can rewrite our `load` function by using a nested `fold` over the results:

```java
public Book load() throws Exception {
    final Either<Book, Exception> oldLoaderResult = tryLoadFromLoader(oldLoader);
    final Either<Book, Exception> newLoaderResult = tryLoadFromLoader(newLoader);

    final Either<Book, Exception> result = oldLoaderResult.fold(
        (oldBook) -> newLoaderResult.fold(
            (newBook) -> {
                compareBooks(oldBook, newBook);
                return Either.left(oldBook);
            },
            (newLoaderError) -> {
                metrics.incrementCompareFailedMetric();
                return Either.left(oldBook);
            }),
            (oldLoaderError) -> newLoaderResult.fold(
                (newBook) -> Either.right(oldLoaderError),
                (newLoaderError) -> Either.right(oldLoaderError)
            )
    );
    return result.left().getOrElseThrow((exception) -> exception);
}
```

This breakdown explains what actually happens here if you’re confused:

```java
final Either<Book, Exception> result = oldLoaderResult.fold(
    (oldBook) -> newLoaderResult.fold(
        (newBook) -> {
            // old load success, new load success
            // return something
        },
        (newLoaderError) -> {
            // old load success, new load failure
            // return something
        }),
    (oldLoaderError) -> newLoaderResult.fold(
        (newBook) -> {
            // old load failure, new load success
            // return something
        },
        (newLoaderError) -> {
            // old load failure, new load failure
            // return something
        })
    );
```

Let me paste the [requirements table](#requirements) from above.

| `oldLoader.load()` | `newLoader.load()` | Action                                             |
|--------------------|--------------------|----------------------------------------------------|
| Success            | Success            | `compareBooks(oldBook, newBook)`, return `oldBook` |
| Success            | Failure            | `metrics.incrementCompareFailedMetric()`, return `oldBook` |
| Failure            | Success            | Throw exception from `oldLoader.load()`            |
| Failure            | Failure            | Throw exception from `oldLoader.load()`            |

Doesn’t it look so much easier to read in a table format? Even though we have two layers of nested lambdas, it is still very clear to see how we enumerate and reduce the 2 × 2 possible exceptions and results into what we want. There we have it!

## In Haskell?

Without going into the syntax of Haskell, here’s how the book loading function can be written. Using pattern matching, we can elegantly define the table above with one line for each row:

```haskell
-- compareBooks :: Book -> Book -> Bool

handleBookLoad :: Either Book BookLoadError -> Either Book BookLoadError -> (Either Book BookLoadError, Bool)
handleBookLoad (Left oldBook) (Left newBook) = (Left oldBook, compareBooks oldBook newBook)
handleBookLoad (Left oldBook) (Right _) = (Left oldBook, False)
handleBookLoad (Right oldLoaderError) (Left _) = (Right oldLoaderError, True)
handleBookLoad (Right oldLoaderError) (Right _) = (Right oldLoaderError, True)
```

Neat eh?

## Summing Up

Using functional programming doesn’t mean that we have to restructure our entire application to use outlandish and academic concepts. As seen in the examples, it’s possible to simply rewrite a method or two in a small surface area, giving it a functional touch for more declarative code.

These concepts are not strictly tied to functional programming languages – I’d strongly recommend picking up one of these languages to broaden your paradigm of programming, and it'll be really fun too. I’m still pretty much a beginner in Haskell, so feel free to share any tips on how to improve this!

## Appendix

[Full Source Code](https://github.com/jiahaog/java-either-applications)

### Tuple

Simple tuple implementation:

```java
public class Tuple<L, R> {
    public final L left;
    public final R right;

    public Tuple(L l, R r) {
        this.left = l;
        this.right = r;
    }
}
```

### BookLoader in Full

```java
import io.vavr.control.Either;

public class DeclarativeBookLoader implements BookLoader {
    private final Metrics metrics;
    private final BookLoader oldLoader;
    private final BookLoader newLoader;

    public DeclarativeBookLoader(final Metrics metrics, final BookLoader oldLoader, final BookLoader newLoader) {
        this.metrics = metrics;
        this.oldLoader = oldLoader;
        this.newLoader = newLoader;
    }

    public Book load() throws Exception {
        final Either<Book, Exception> oldLoaderResult = tryLoadFromLoader(oldLoader);
        final Either<Book, Exception> newLoaderResult = tryLoadFromLoader(newLoader);

        final Either<Book, Exception> result = oldLoaderResult.fold(
                (oldBook) -> newLoaderResult.fold(
                        (newBook) -> {
                            compareBooks(oldBook, newBook);
                            return Either.left(oldBook);
                        },
                        (newLoaderError) -> {
                            metrics.incrementCompareFailedMetric();
                            return Either.left(oldBook);
                        }),
                (oldLoaderError) -> newLoaderResult.fold(
                        (newBook) -> Either.right(oldLoaderError),
                        (newLoaderError) -> Either.right(oldLoaderError)
                )
        );

        return result.left().getOrElseThrow((exception) -> exception);
    }

    private Either<Book, Exception> tryLoadFromLoader(final BookLoader loader) {
        try {
            return Either.left(loader.load());
        } catch (Exception e) {
            return Either.right(e);
        }
    }

    private void compareBooks(final Book oldBook, final Book newBook) {
        if (oldBook.compareTo(newBook) != 0) {
            metrics.incrementCompareFailedMetric();
        }
    }
}
```

### Haskell Parallels

Without using pattern matching, we can also use [`either`](http://hackage.haskell.org/package/base-4.11.1.0/docs/Prelude.html#v:either) to handle the loader results, synonymous with how we used `fold` earlier in Java.  Note that this is a function, and is different from `Either` as a type constructor.

```haskell
either :: (a -> c) -> (b -> c) -> Either a b -> c
```

```haskell
handleBookLoad :: Either Book BookLoadError -> Either Book BookLoadError -> (Either Book BookLoadError, Bool)
handleBookLoad oldLoadResult newLoadResult = either
    (\oldBook ->
        either
            (\newBook -> (Left oldBook, compareBooks oldBook newBook))
            (\_ -> (Left oldBook, False))
            newLoadResult
    )
    (\oldLoaderError ->
        either
            (\_ -> (Right oldLoaderError, True))
            (\_ -> (Right oldLoaderError, True))
            newLoadResult
    )
    oldLoadResult
```
