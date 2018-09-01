---
title: Optimistic Locking with the DynamoDB Mapper
date: 2018-08-04
path: /blog/optimistic-locking-with-the-dynamodb-mapper/
excerpt: Exploring how optimistic locking is implemented in the DynamoDB Mapper library
---

[Amazon DynamoDB](https://aws.amazon.com/dynamodb/) is a non-relational managed database on Amazon Web Services that provides the [DynamoDB Mapper](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBMapper.html) Java library, to map [Plain Old Java Objects (POJOs)](https://en.wikipedia.org/wiki/Plain_old_Java_object) to the non-relational representation of the document data in storage. With this object-orientated interface, it is easy to ensure that records are updated correctly on DynamoDB, through [*optimistic locking*](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBMapper.OptimisticLocking.html). This is a strategy to ensure that the value committed to DynamoDB during an update request is the *intended* update desired by the client, even when this request can be nondeterministically interweaved with updates by other clients on the same record.

In this post, we will first go over a short summary on simple usage of this library, and subsequently explore how such locks are implemented using DynamoDB primitives.

## Using the Mapper

The following class describes a `Book` with two fields used by the application, `ISBN` and `title`, with an additional `version` field that we will use for locks..

```java
@DynamoDBTable(tableName="Books")
public class Book {
    // Primary key
    private String ISBN;

    private String title;
    private Long version;

    @DynamoDBAttribute)
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    @DynamoDBAttribute
    public String getISBN() { return ISBN; }
    public void setISBN(String ISBN) { this.ISBN = ISBN;}

    @DynamoDBVersionAttribute
    public Long getVersion() { return version; }
    public void setVersion(Long version) { this.version = version;}
}
```

Using the `@DynamoDBVersionAttribute` annotation has the following impact on the operations (taken verbatim from the [docs](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBMapper.OptimisticLocking.html)):

> **save** — For a new item, the DynamoDBMapper assigns an initial version number 1. If you retrieve an item, update one or more of its properties and attempt to save the changes, the save operation succeeds only if the version number on the client-side and the server-side match. The DynamoDBMapper increments the version number automatically.

> **delete** — The delete method takes an object as parameter and the DynamoDBMapper performs a version check before deleting the item. The version check can be disabled if DynamoDBMapperConfig.SaveBehavior.CLOBBER is specified in the request.

> The internal implementation of optimistic locking within DynamoDBMapper uses conditional update and conditional delete support provided by DynamoDB.

The next code snippet shows how we can load a record from DynamoDB, change the title, and save it again.

```java
DynamoDBMapper mapper = new DynamoDBMapper(client);

// Load a book from DynamoDB by ISBN
Book item = mapper.load(Book.class, "978-3-16-148410-0");
item.setTitle("New Title");

// Save the item.
mapper.save(item);
```


What happens when someone updates the record after we load it into memory, but before the save is committed into DynamoDB?

1. Record loaded in our application as the following (JSON format for simplicity)

```json
{
  "ISBN": "978-3-16-148410-0",
  "title": "Old Title",
  "version": 2
}
```

2. Another client performs and commits a update to change the title of the record. If the DynamoDB mapper is used by this client as well, the `version` field will be incremented to `3`.

```yaml
# New value in DynamoDB
{
  "ISBN": "978-3-16-148410-0",
  "title": "Changed By Someone Else",
  "version": 3
}
```

3. Now, our application tries to perform the a `save` of the following record:

```json
{
  "ISBN": "978-3-16-148410-0",
  "title": "New Title",
  "version": 2
}
```

[Conditional expressions](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.ConditionExpressions.html) are special conditions that can be specified and need to be fulfilled before data is committed to the DynamoDB store to prevent data races between clients.

When the `save` method is executed, it automatically creates a conditional expression to ensure that the record is persisted only if the field annotated with `@DynamoDBVersionAttribute` (`version` in our example) in the request matches the same field in storage. Since the version has been changed earlier to `3` by another client, DynamoDB will raise a conditional check failed exception, preventing the update.

## How It works

From the [Java docs](https://docs.aws.amazon.com/AWSJavaSDK/latest/javadoc/com/amazonaws/services/dynamodbv2/datamodeling/DynamoDBVersionAttribute.html) , the `@DynamoDBVersionAttribute` annotation does the following:

> On a `save()` operation, the DynamoDBMapper will attempt to increment the version property and assert that the service's value matches the client's. New objects will be assigned a version of 1 when saved.

Let’s try to better understand this on a lower level by looking at the internals of the library. The [`SaveObjectHandler`](https://github.com/aws/aws-sdk-java/blob/9d9bc2fb303181b60f404af9a84b2300e8c20550/aws-java-sdk-dynamodb/src/main/java/com/amazonaws/services/dynamodbv2/datamodeling/DynamoDBMapper.java#L631) is responsible for carrying out the save operation of an annotated POJO with the following steps:

1. Construct a request from the primary keys and other fields
2. Execute the [`UpdateItem`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_UpdateItem.html) [low-level request](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Programming.LowLevelAPI.html)
3. If the request is successful, apply any auto-generated changes to the initial POJO parameter

### Handling of Version Fields

The UpdateItem request is constructed by iterating through all the annotated fields of the model object. A special handler is invoked when a field annotated with `@DynamoDBVersionAttribute` is encountered:

```java
// https://github.com/aws/aws-sdk-java/blob/9d9bc2fb303181b60f404af9a84b2300e8c20550/aws-java-sdk-dynamodb/src/main/java/com/amazonaws/services/dynamodbv2/datamodeling/DynamoDBMapper.java#L916-L931

/**
 * Auto-generates the version.
 * @param mapping The mapping details.
 */
private void onVersionAttribute(DynamoDBMapperFieldModel<Object,Object> field) {
    if ( getLocalSaveBehavior() != SaveBehavior.CLOBBER
            && !internalExpectedValueAssertions.containsKey(field.name())) {
        // First establish the expected (current) value for the
        // update call
        // For new objects, insist that the value doesn't exist.
        // For existing ones, insist it has the old value.
        final Object current = field.get(object);
        if (current == null) {
            internalExpectedValueAssertions.put(field.name(),
                new ExpectedAttributeValue().withExists(false));
        } else {
            internalExpectedValueAssertions.put(field.name(),
                new ExpectedAttributeValue().withExists(true).withValue(field.convert(current)));
        }
    }

    // Generate the new version value
    onAutoGenerate(field);
}
```

Essentially, it performs a check to determine if the POJO models a fresh new record, or one that already exists (previously loaded from `mapper.load`) based on the nullability of the version field, and creates a [ExpectedAttributeValue](https://docs.aws.amazon.com/AWSJavaSDK/latest/javadoc/com/amazonaws/services/dynamodbv2/model/ExpectedAttributeValue.html) object. This is a high level object-orientated API for describing conditional expressions. In addition, note the different behavior if the mapper is configured with the [`CLOBBER`](https://docs.aws.amazon.com/AWSJavaSDK/latest/javadoc/com/amazonaws/services/dynamodbv2/datamodeling/DynamoDBMapperConfig.SaveBehavior.html#CLOBBER) save behavior – no conditional expressions will be used and the value in DynamoDB will simply be replaced.

Subsequently, the `onAutoGenerate` function is called:

```java
// https://github.com/aws/aws-sdk-java/blob/9d9bc2fb303181b60f404af9a84b2300e8c20550/aws-java-sdk-dynamodb/src/main/java/com/amazonaws/services/dynamodbv2/datamodeling/DynamoDBMapper.java#L889-L893

/**
* Auto-generates the attribute value.
* @param mapping The mapping details.
*/
private void onAutoGenerate(DynamoDBMapperFieldModel<Object,Object> field) {
    AttributeValue value = field.convert(field.generate(field.get(object)));
    updateValues.put(field.name(),  new AttributeValueUpdate().withAction("PUT").withValue(value));
    inMemoryUpdates.add(new ValueUpdate(field, value, object));
}
```

This function calls a generator for the field type. Typically, if the value is `null`, it will be initialized with `1`, or it will be incremented. An example for the `Long` type is below.

```java
// https://github.com/bbsage/aws/blob/9243e0716bc2a649085480d3a4fb7606b6541da3/aws-java-sdk-dynamodb/src/main/java/com/amazonaws/services/dynamodbv2/datamodeling/DynamoDBAutoGeneratorRegistry.java#L333-L345

/**
* Version generator for {@code Long} types.
*/
static final class LongVersionGenerator extends NeverVersionGenerator<Long> {
    private LongVersionGenerator() {
        super(Long.class);
    }

    @Override
    public final Long generate(final Long currentValue) {
        if (currentValue == null) {
            return Long.valueOf(1L);
        }
        return (long)(currentValue + 1L);
    }
}
```

To better distill how the version fields is handled, we can transform it into pseudocode describing how parameters are added to the `UpdateItem` request for `@DynamoDBVersionAttribute` fields.

```python
# `$version_key` refers to the field name of the DynamoDBVersionAttribute
# `$version_value` refers to the client side value of the DynamoDBVersionAttribute

if the mapper save behavior is not `CLOBBER`:
    if `$version_value` in the provided object is null:
        # new object is being created here
        add to updateItem request: {
            "ConditionExpression": "attribute_not_exists($version_key)",
        }
    else:
        # the object already exists in DynamoDB
        add to updateItem request: {
           "ConditionExpression": "$version_key = :version",
           "ExpressionAttributeValues": {
               ":version": "$version_value"
        }

if the `$version_value` is null:
    add update parameter to request: set it to identity value
else:
    add update parameter to request: increment the value by 1
```

This results in the following edge cases that we have to be aware of:

- Saving POJOs to DynamoDB *with a non-null version* when it does not exist will result in a conditional check failed exception
- Irregardless of the save behavior, the version attribute will be initialized / incremented when it is saved.

As seen in the pseudocode, the [`CLOBBER`](https://docs.aws.amazon.com/AWSJavaSDK/latest/javadoc/com/amazonaws/services/dynamodbv2/datamodeling/DynamoDBMapperConfig.SaveBehavior.html#CLOBBER) save behavior can be used to configure the mapper so that DynamoDB skips the conditional checks. This can be useful when you are writing to multiple tables at once, say during a data migration.

### Updating the Client-side POJO

After the update is completed successfully, the DynamoDBMapper [updates the parameter object](https://github.com/aws/aws-sdk-java/blob/9d9bc2fb303181b60f404af9a84b2300e8c20550/aws-java-sdk-dynamodb/src/main/java/com/amazonaws/services/dynamodbv2/datamodeling/DynamoDBMapper.java#L740-L742) with any fields that have autogenerated changes, such as incremented / initialized version attributes. This updates the state of the local POJO model instance in an attempt to keep it in sync with the latest change made from this client.

```java
Book item = mapper.load(Book.class, "978-3-16-148410-0");
item.setTitle("New Title");

item.getVersion() // 1

// Save increments the version of `item` in DynamoDB
mapper.save(item);

item.getVersion() // 2 - Value is updated to reflect new value in DynamoDB
```

It can be useful to have the updated state of the object available for the application locally for further processing, but note the mutability pitfall here. Calling `mapper.save(book)` multiple times with the same parameter is not idempotent, as the `@DynamoDBVersionAttribute` on the input parameter will be mutated on each call to the mapper. In my case, I was making parallel calls across two DynamoDB tables, and this unexpected mutability of the input object interfered with upstream retry elements of my application, causing data inconsistencies.

## Wrapping Up

In this post, we have investigated the source code of the DynamoDB Mapper to shed some light on how locks on objects are implemented by the library, and highlighting some pitfalls at the same time.

It’s important to understand your abstractions when picking a tool to solve a problem; when you need more clarity from documentation, don’t be afraid to dive into the source (code) of truth! Online tools like [Sourcegraph](https://about.sourcegraph.com/) make it much easier to search and traverse source code on GitHub without having to setup an IDE and downloading the code. Here’s a [link](https://sourcegraph.com/github.com/aws/aws-sdk-java/-/blob/aws-java-sdk-dynamodb/src/main/java/com/amazonaws/services/dynamodbv2/datamodeling/DynamoDBMapper.java) to the corresponding page for the DynamoDB Mapper on Sourcegraph if you’re interested to explore more!
