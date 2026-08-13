from fastapi import FastAPI

app = FastAPI()

@app.get("/")

def route():
    return{"message" : "Welcome to happyland"}

@app.get("/about")

def about_req():
    return{"message" : "the supply shock is comming soon.... wait!"}

@app.get("/user")

def user_data():
    return{
        "user" : ["sabika", "kiran", "batool", "qurban"]
        }

