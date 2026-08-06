# Roller Coaster Pricing system
print("------ROLLERCOASTER BOOKINTG------")
print("Start")

# Variable for Statistical accounting
total_customers = 0
total_revenue: float = 0
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
        if photos == "yes":
            photo_cost: float = 3
            photo_packages_sold += 1

        else:
            #caluculate bill
            photo_cost: float = 0

        # Calculate bill
        total_bill: float = ticket_price + photo_cost
        print(f"Your total_bill is ${total_bill}")
        total_revenue += total_bill
        total_customers += 1

        print("\n ------your Bill-----")
        if ticket_price == 0:
            print("ticket price $0 Senior Discount!")
        else:
            print(f"Ticket Price is ${ticket_price}")

        print(f"photo_cost is ${photo_cost}")
        print("--------------------------") 
        print(f"Total bill is ${total_bill}")

        if ticket_price == 0:
            print("Thanks for celebrating with us")

    another = input("\n Process another customer. yes/no ").strip().lower()
    if another != "yes":
        break
    customer +=1

# ------session summary--------
print("---------SESSION SUMMARY----------")
print(f"Total customer processed {total_customers}")
print(f"Total Revenue Generated {total_revenue}")
print(f"Phot0 Pakage Sold {photo_packages_sold}")
print(f"Senior Free Rides {senior_free_rides}")

if total_customers > 0:
    average = total_revenue/total_customers
else:
    average = 0

print(f"The average revenue per customer. ${average:.2f}")
print("THANKS FOR VISITING")