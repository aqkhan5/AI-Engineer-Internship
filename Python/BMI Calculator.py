print("_____BMI Calculator!_____")
print("The Body Mass Index (BMI) is a measure used in medicine to check if someone is underweight or overweight. The formula to calculate BMI is:")

weight = float(input(" Kindly Enter your weight in Kilograms    "))
height = float(input(" Kindly Enter your height in Meters    "))

bmi = weight/height**2
print(" Your BMI is  ", bmi)