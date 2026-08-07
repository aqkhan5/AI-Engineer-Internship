# calculator which takes input from the user, beside basic functionality include modulus, floor division, Exponentiation

def calculator():
    while True:
        operator = input("Enter the operations  (+, -, /, *, //, **, q to quit):  ")
        if operator.lower() == 'q':
            break
        if operator not in ('+', '-', '*', '/', '%', '//', '**'):
            print("Invalid operation selected!")
            continue
        try:
            num_1 = int(input("Enter the first number    "))
            num_2 = int(input("Enter the second number   "))
        except ValueError:
            print("Invalid Input! Please enter the number only.")
            continue
        if operator == '+':
            result = num_1+num_2
        elif operator == '-':
            result = num_1-num_2
        elif operator == '*':
            result = num_1*num_2
        elif operator == '/':
            if num_2 != 0:
                result = num_1/num_2
            else:
                print("Error. Divided by zero")
        elif operator == '%':
            result = num_1%num_2
        elif operator == '//':
            if num_2 != 0:
                result = num_1//num_2
            else:
                print("Error. Divided by zero")
            continue
        elif operator == '**':
            result = num_1**num_2

        print("Result", result)
calculator()
