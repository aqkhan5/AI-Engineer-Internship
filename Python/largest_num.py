# Finding the largest number in the list
numbers = [12, 45, 7, 89, 34]
largest = numbers[0]
for i in numbers:
  if i > largest:
    largest = i
print(f"The largest is {largest}")