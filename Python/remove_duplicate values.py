# Remove duplicate values from the code
numbers: list = [1, 2, 3, 2, 4, 1, 5, 3]
unique_value: list = []

#Traverse and remove values
for num in numbers:
    if num not in unique_value:
        unique_value.append(num)
print(f"Unique values are {unique_value}")

