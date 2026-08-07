# Finding the max even number in the list.
numbers = numbers = [21, 19, 17]
max_even_number = None

for num in numbers:
 if num % 2 == 0:
    if max_even_number is None or num > max_even_number:
        max_even_number = num

if max_even_number is None:
    print("No even number found.")
else:
    print(f"Largest even number is {max_even_number}")