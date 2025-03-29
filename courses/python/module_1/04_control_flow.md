# Control Flow in Python

## Conditional Statements
Python supports `if`, `elif`, and `else` statements for decision-making.

```python
age = int(input("Enter your age: "))
if age < 18:
    print("You are a minor.")
elif age >= 18 and age < 65:
    print("You are an adult.")
else:
    print("You are a senior.")
```

## Loops in Python
Loops help execute a block of code multiple times.

### For Loop
Used to iterate over a sequence (list, tuple, string, etc.).

```python
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)
```

### While Loop
Repeats as long as a condition is `True`.

```python
count = 0
while count < 5:
    print("Count is:", count)
    count += 1
```

## Loop Control Statements
- **`break`**: Stops the loop early.
- **`continue`**: Skips the current iteration.
- **`pass`**: Does nothing (placeholder for future code).

```python
for num in range(10):
    if num == 5:
        break  # Stops loop at 5
    print(num)
```

```python
for num in range(10):
    if num == 5:
        continue  # Skips 5
    print(num)
```

Conditional statements and loops help control the flow of execution in Python programs.

