# Find the Frequency of a Number
numbers = [1, 2, 3, 2, 4, 1, 5, 3, 2, 1]
print("Frequency Finder for a number")


number_freq = 0
num = int(input("Enter the number whose frequency you want to find.  "))

for i in numbers:
    if num == i:
        number_freq += 1

print(f" {num} appears {number_freq} times")
