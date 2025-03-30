# Functions in Python

## Defining a Function
Functions help in organizing code and reusing logic. We define functions using the `def` keyword.

```python
def greet():
    print("Hello, welcome to Python!")

greet()  # Calling the function
```

## Function Parameters and Arguments
Functions can take parameters to process data.

```python
def greet(name):
    print(f"Hello, {name}!")

greet("Alice")
```

### Default Parameters
If no value is provided, the default value is used.

```python
def greet(name="Guest"):
    print(f"Hello, {name}!")

greet()  # Output: Hello, Guest!
```

### Return Statement
Functions can return values using `return`.

```python
def add(a, b):
    return a + b

result = add(5, 3)
print(result)  # Output: 8
```

## Lambda Functions
Lambda functions are anonymous functions that can have any number of arguments but only one expression.

```python
square = lambda x: x ** 2
print(square(4))  # Output: 16
```

Functions help in code reusability and modular programming. Who?