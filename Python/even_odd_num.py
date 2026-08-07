# Finding the even odd numbers in the list
numbers = [12, 7, 18, 5, 45, 20, 12, 9, 14]
even_numbers = 0
odd_numbers = 0
for num in numbers:
  if num % 2 == 0:
    even_numbers += 1
  else:
    odd_numbers += 1
print(f"Even numbers {even_numbers}")
print(f"Odd numbers  {odd_numbers}")