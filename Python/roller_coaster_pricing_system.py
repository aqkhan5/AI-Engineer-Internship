# Roller Coaster Pricing system
print("------ROLLERCOASTER BOOKINTG------")
print("Start")

# Variable for Statistical accounting
total_customers = 0
total_revenue = 0
senior_free_rides = 0
photo_packages_sold = 0

#Checking Height
customer = 1

while True:

    print(f"\nCustomer {customer}")
    print("----------")

    # Height Validation
    try:
        height = int(input("What is your height (in cm)? "))

        if height <= 0 or height > 300:
            print("Invalid height entered!")
            continue

    except ValueError:
        print("Please enter a valid number for height.")
        continue

    if height < 120:
        print("Sorry! You are too short to ride.")

    else:
        print("✓ Great! You can ride this rollercoaster!")


        #Checking Age
        try:
            age = int(input("\nWhat is Your age? "))

            if age < 0 or age > 120:
                print("Invalid age entered!")
                continue

        except ValueError:
            print("Please enter a valid number for age.")
            continue
        
        if age <= 12:
            ticket_price: float = 5
            print(f"Ticket cost ${ticket_price}")
        elif 12 < age < 18:
            ticket_price: float = 7
            print(f"Ticket Cost {ticket_price}")
        elif 18 <= age < 45:
            ticket_price: float= 12
            print(f"Ticket cost ${ticket_price}")
        elif  45 <= age <= 55:
            ticket_price: float = 0
            senior_free_rides += 1
            print("Age group: Senior (45-55)")
            print(" SPECIAL DISCOUNT! ")
            print("Your ride is completely Free!")
        else:
            print("Invalid Input!")

        # Photo Demands
        photos = input("Do you want photos \nyes/no.  ").strip().lower()
        if photos == "yes" or photos == "Yes":
            photo_cost: float = 3
            print(f"photos cost for ${3}")

            # Calculate bill
            total_bill: float = ticket_price + photo_cost
            print(f"Your total_bill is ${total_bill}")
        else:
            #caluculate bill
            total_bill = ticket_price
            print(f"Your total bill is ${total_bill}")