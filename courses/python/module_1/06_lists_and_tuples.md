# Lists and Tuples in Python

## Lists
A **list** is an ordered, mutable collection that allows duplicate elements.

### Creating a List
```python
fruits = ["apple", "banana", "cherry"]
print(fruits)
```

### Accessing Elements
```python
print(fruits[0])  # Output: apple
print(fruits[-1]) # Output: cherry
```

### Modifying a List
```python
fruits.append("orange")  # Adds an element
fruits[1] = "blueberry"  # Modifies an element
print(fruits)
```

### Removing Elements
```python
fruits.remove("apple")  # Removes by value
del fruits[0]          # Removes by index
print(fruits)
```

## Tuples
A **tuple** is an ordered, immutable collection that allows duplicate elements.

### Creating a Tuple
```python
colors = ("red", "green", "blue")
print(colors)
```

### Accessing Elements
```python
print(colors[0])  # Output: red
```

### Tuple Unpacking
```python
r, g, b = colors
print(r, g, b)  # Output: red green blue
```

Lists are mutable, whereas tuples are immutable. Choose based on whether you need to modify the collection.
