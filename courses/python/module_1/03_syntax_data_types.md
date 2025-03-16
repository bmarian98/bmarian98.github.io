# Basic Syntax, Variables, and Data Types

##  Python Syntax Basics

Python relies on indentation to define blocks of code instead of curly braces (`{}`) like in other languages.
```py
if True:
  print("This is indented correctly")
```
## Variables
**Variables** store data in Python. Python is dynamically typed, so you don’t need to specify a type.
```py
name = "Alice"
age = 25
is_student = True
```
## Data Types in Python
|Data Type | Example|
|----------|--------|
| Integer  |      10|
| Float    |    10.5|
| String   | 'Hello' or "World"|
| Boolean  | True, False |
| List     | [1, 2, 3] |
| Tuple    | (1, 2, 3) |
|  Dictionary | {"key": "value"} |
| Set | {1, 2, 3} |
## Type Checking and Conversion
Use type() to check the type of a variable:
```py
x = 10
print(type(x))  # Output: <class 'int'>
```
### Convert between types:
```py
x = "100"
y = int(x)  # Converts string to integer
print(y + 10)  # Output: 110
```
## Hands-On Activity
Declare variables of different types and print their values.
Use type() to check variable types.
Convert a string number into an integer and perform arithmetic operations.