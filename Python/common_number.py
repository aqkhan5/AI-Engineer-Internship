# Finding the common numbers among the lists
list1 = [1, 2, 3, 4, 5]
list2 = [3, 5, 7, 8]

print("printing the common numbers")
for num1 in list1:
    for num2 in list2:
        if num1 == num2:
            print(num1)