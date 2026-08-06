# Roller Coaster Pricing system
print("------ROLLERCOASTER BOOKINTG------")
print("Start")

#Checking Height
print("Height Test!")
height = int(input("Enter Your height in cm"))
if height > 120:
    print("Height Standard Ok    \nCan Ride!")

    #Checking Age
    age = int(input("Enter Your age."))
    if age <= 12:
        ticket_price: float = 5
        print(f"Ticket price is ${ticket_price}")
    elif age > 12 & age <18:
        ticket_price: float = 7
        print(f"Ticket Cost {ticket_price}")
    elif age >= 18:
        ticket_price: float= 12
        print(f"Ticket price ${ticket_price}")
else:
    print("Too Short \nSorry Can't ride.  ")
