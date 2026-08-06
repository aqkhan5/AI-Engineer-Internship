
# TREASURE ISLAND ADVENTURE GAME
print("Welcome to Treature Island Adventure Game")
print("Your Mission is to find treasure")
print("  Choose Direction!  ")
print("Do you go left or right? left?")
level_1 = int(input("Choose \n1 for left \n2 for right    "))

# building the Logic
if level_1 == 1:
    print("Next level ")
    print("Do you swim or wait? wait?")
    level_2 = int(input("Choose \n1 for wait \n2 for swim   "))


    #Next 2
    if level_2 == 1:
        print("You passed level 2. Now next level ")  
        print("In which door You want to Enter. Red, Yellow or Blue")


        #Level 3
        level_3  = int(input("Choose \n1 for red \n2 for yellow \n3 for blue   "))
        if level_3 == 1:
            print("    Red \nBurned by fire.  \nGame over!")
        elif level_3 == 2:
            print("\n\n  Yellow \n  Win! \n Congratulations")
        elif level_3 == 3:
            print("    \nBlue. Eaten by beasts. \nGame OVer!")
        else:
            print("    \nInvalid input. \n Game over!")

    #Calculating the total bill    
    elif level_2 == 2:
        print("   \nAttacked by traut. \nDead Game over!")
    else:
         print("   \nInvalid input. /n Game over!")


elif level_1 == 2:
    print("    \nWrong direction, Dead. \nGame Over!")
else:
    print("    \nInvalid input. \n Game over!")
