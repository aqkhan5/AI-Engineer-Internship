# Finding the second largest in the list
numbers = [12, 45, 7, 89, 34, 89, 56]
largest = numbers[0]
second_largest = 0

for num in numbers:
    if num > largest:
        second_largest = largest
        largest = num
    elif num > second_largest and num != largest:
        second_largest = num

print(f"The Second largest number is {second_largest}")
