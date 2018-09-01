---
title: Mistakes Were Made
date: 2018-06-19
path: /blog/mistakes-were-made/
cover: ./cover.jpg
excerpt: Bamboozled by some Python
---

Last weekend, I was *bamboozled* for a while when working through a Python problem, which seems to be worth sharing.

## Background
Before going into that, let’s talk about short-circuit operators for some background. Most Pythonistas would know that the boolean operators, `and` and `or` are [short-circuit operators](https://docs.python.org/3/library/stdtypes.html#boolean-operations-and-or-not).

```python
def do_something():
    print("I love Python!")
    return True
```

```python
>>> True and do_something()
I Love Python!
True
>>> False and do_something()
False
# "I love Python!" is not printed above
```

When the result of a boolean operator can be derived from the left side argument, Python cleverly avoids evaluating the other argument.

## Messing with Pointers
In this toy example, we will create a `change_pointer`  function. Using a one element list as a pointer, `change_pointer(pointer)` will set the element to `True`, and return `True`.

```python
def change_pointer(pointer):
    print("Changing pointer!")
    pointer[0] = True
    return True
```

```python
def case0():
    result_pointer = [False]

    return result_pointer[0] and change_pointer(result_pointer)
```

Take a moment to walk through the code and deduce the output of `case0()` before going to the next section.

---

```python
>>> case0()
False
```

If you got it correctly, great! Why is this so?

Let’s look at the return statement:

```python
return result_pointer[0] and change_pointer(result_pointer)
```

Referring to the left and right sides of the boolean operator `and` as `a` and `b`, `a` is bound to the value `False`, the first element of `result_pointer` even before the `change_pointer()` bound to `b` executes. Because of short-circuit evaluation, `change_pointer` does not even execute! (Notice that “Changing pointer!” is not printed as well)

How can we get this function to return `True` instead then?

## Working Around Short-circuit Evaluation
```python
def case2():
    result_pointer = [False]

    a = result_pointer[0]
    b = change_pointer(result_pointer)

    return a and b
```

In `case2()`, we will evaluate `a` and `b` before passing them to the boolean `and`, so that `change_pointer()` will be forced to be evaluated.

```python
>>> case2()
Changing pointer!
False
```

However, the return value of `case2()` is still `False`, because `a` has already been bound to `False` *value* even before `change_pointer()` executes; Changing the elements of `result_pointer` will have no effect.

## Swapping the Order

```python
def case3():
    result_pointer = [False]

    b = change_pointer(result_pointer)
    a = result_pointer[0]

    return a and b
```

If we want to use the elements of `result_pointer` only after `change_pointer()` has been evaluated, `a` should only be bound *after* the execution of `change_pointer()`. We can also clean up the code to take advantage of short-circuit evaluation should it be desired:

```python
def case4():
    result_pointer = [False]

    # run change_pointer() first
    return change_pointer(result_pointer) and result_pointer[0]
```

The results are:

```python
>>> case3()
Changing pointer!
True
>>> case4()
Changing pointer!
True
```

## Going Deeper
Since I was playing around with the [disassembler](https://docs.python.org/3/library/dis.html) module the other day, I thought it would be interesting to add in a section to see what goes on behind the scenes, specifically for `case1()` and `case4()`.

Running `dis(func)` shows us the instructions that will be executed in the course of running `func`. Here’s what each column represents:

> 1. The line number, for the first instruction of each line
> 2. The current instruction, indicated as `-->` (Not shown in our example above)
> 3. A labelled instruction, indicated with `>>`
> 4. The address of the instruction
> 5. The operation code name ([Reference List](https://docs.python.org/3/library/dis.html#python-bytecode-instructions))
> 6. Operation parameters
> 7. Interpretation of the parameters in parentheses.
> [Source](https://docs.python.org/3/library/dis.html#dis.disco)

Let’s try to understand what happens here, for the return statement.

### `case1()`

```python
>>> dis(case1)
 17           0 LOAD_CONST               1 (False)
              2 BUILD_LIST               1
              4 STORE_FAST               0 (result_pointer)

 19           6 LOAD_FAST                0 (result_pointer)
              8 LOAD_CONST               2 (0)
             10 BINARY_SUBSCR
             12 JUMP_IF_FALSE_OR_POP    20
             14 LOAD_GLOBAL              0 (change_pointer)
             16 LOAD_FAST                0 (result_pointer)
             18 CALL_FUNCTION            1
        >>   20 RETURN_VALUE
```

1. `LOAD_FAST` pushes the reference for `result_pointer` onto the stack. Current Stack: `[result_pointer]`
2. `LOAD_CONST` pushes `0`, the index accessor onto the stack. Current Stack: `[result_pointer, 0]`
3. `BINARY_SUBSCR` takes the top of the stack and uses it to access values from the second element on the stack. Current Stack: `[result_pointer, 0, result_pointer[0]]`
4. `JUMP_IF_FALSE_OR_POP` checks the top of the stack (`result_pointer[0]`). If it is `False`, it causes a jump to instruction `20` (which is the return value).
5. Instructions `14`, `16` and `18` call the `change_pointer()` function with its parameters, which leaves the result on top of the stack. Current Stack: `[result_pointer, 0, result_pointer[0], change_pointer(result_pointer)]`
6. `RETURN_VALUE` returns the boolean value on top of the stack

We can see here a few things that reflect the analysis earlier:

- The value of `result_pointer[0]` is bound to the parameters of the boolean operator; whether `change_pointer()` is called does not affect it’s value on the stack
- `JUMP_IF_FALSE_OR_POP` will skip execution of `change_pointer()` should the value on top of the stack be `False` — short-circuit evaluation

### `case4()`

```python
>>> dis(case4)
 54           0 LOAD_CONST               1 (False)
              2 BUILD_LIST               1
              4 STORE_FAST               0 (result_pointer)

 56           6 LOAD_GLOBAL              0 (change_pointer)
              8 LOAD_FAST                0 (result_pointer)
             10 CALL_FUNCTION            1
             12 JUMP_IF_FALSE_OR_POP    20
             14 LOAD_FAST                0 (result_pointer)
             16 LOAD_CONST               2 (0)
             18 BINARY_SUBSCR
        >>   20 RETURN_VALUE
```

1.  Instructions `6`, `8` and `10` call the `change_pointer()` function with its parameters, which leaves the result on top of the stack. Current Stack: `[change_pointer(result_pointer)]`
2. `JUMP_IF_FALSE_OR_POP` checks the top of the stack (`change_pointer(result_pointer)`). If it is `False`, it causes a jump to instruction `20` (which is the return value)
3. Similarly to steps 1, 2, and 3 above for `case0`, instructions `14`, `16`, and `18` pushes the value of `result_pointer[0]` onto the stack. Current Stack: `[change_pointer(result_pointer), result_pointer, 0, result_pointer[0]]`
4. `RETURN_VALUE` returns the boolean value on top of the stack

Here, we see that `change_pointer()` is called before any elements from `result_pointer` are pushed onto the stack, so their values can be mutated before the final result is returned.

## Difference between `and` and `&`
On the side, it’s also worth noting that there is a difference between using the logical `and` operator and the bitwise `&` operators.

```python
a() and b() # b() will not be called if a() is True

a() & b() # b() will be called irregardless of the result of a()

result = result and b()
# vs
result &= b() # No short circuit evaluation
```

## Final Notes
I came across this problem when I was trying to recursively iterate across a tree while extracting out values into a global variable. It might be obvious in simple examples, but these errors are easy to overlook in larger pieces of code.

This is also why using [pure functions](https://www.wikiwand.com/en/Pure_function) are much safer and can help us avoid such pitfalls. It’s pretty stupid to do so for the previous example, but it can be written in this contrived manner:

```python
def pure_change_pointer(pointer):
    print("Changing pointer! (Not really)")
    return True, True

def case5():
    result_pointer = [False]

    return_val, new_result = pure_change_pointer(result_pointer)
    result_pointer[0] = new_result

    return result_pointer[0] and return_val
```

Hopefully you’ll learn something from this post, and avoid making the same mistakes as me. Let me know if you have any feedback at [@jiahaog](https://twitter.com/jiahaog)!

---

I used Python `3.6.5` for the examples in this article, but the concepts here should apply for Python 2 as well.
