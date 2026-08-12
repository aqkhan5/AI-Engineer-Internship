#Custom codes and responses and basic error handling
from fastapi import FastAPI, status, HTTPException


app = FastAPI()
# Status codes check 
@app.post("/create_user", status_code=status.HTTP_201_CREATED)
def create_users():
    return {
        "message" : "User Created"
    }


# custom Response
@app.get("/user")
def get_user():
    return {
        "status" : "Success",
        "message" : "User Fetched", 
        "data" : {
            "name" : "Mohsin",
            "age" : 25
        }
    }


# Basic Exception
@app.get("/user/{user_id}")
def get_users( user_id :int):
    if user_id != 1:
        raise HTTPException(
            status_code= 404,
            detail= "User Not Found"
        )
    return{
        "id" : 1,
        "name" : "Mohsin"
    }