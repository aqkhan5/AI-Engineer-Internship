# Advance Exception handling
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse

app = FastAPI()

# HTTP Exception    built-in
@app.get("/users/{user_id}")
def get_user(user_id : int):
    if user_id != 1:
        raise HTTPException(
            status_code= 404,
            detail= " User Not found"
        )
    return{
        "id" : 1,
        "name" : "Mohsin"
    }

# Custom exceptions handling   built-in
class UserNotFoundException(Exception):
    def __init__(self, name):
        self.name = name

@app.get("/user{name}")
def get_users(name: str):
    if name != "mohsin":
        raise UserNotFoundException(name)
    return {
        "name" : name
    }

# Global Errors   Customized
class UserNotFoundException(Exception):
    def __init__(self, name):
        self.name = name

@app.exception_handler(UserNotFoundException)
def user_not_found_handler(request : Request, exc: UserNotFoundException):
    return JSONResponse(
        status_code= 404,
        content={
            "status": "Error",
            "message" : f" User {exc.name} not found"
        }
    )

@app.get("/user{name}")
def get_users(name: str):
    if name != "mohsin":
        raise UserNotFoundException(name)
    return {
        "name" : name
    }
