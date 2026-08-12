from fastapi import FastAPI
# Validating the dictionary data by pydantic
from pydantic_models import BaseModel

class User(BaseModel):
    name : str
    age: int


app = FastAPI()

# to add data in server like login, signup and form submition
@app.post("/users")
def add_user(name:str, age:int):
    return {
        "User Name": name,
        "User Age" : age
    }

# adding the infinite data using dictionary parameter instead of string or intergers.

@app.post("/admins")
def add_admin(data: dict):
    return{
        "message": "Data Successfully Created",
        "Admin Data": data
    }


@app.post("/students")
def add_student(data: User):
    return{
        "Message" : "Data Successfully created",
        "Student_data": data
    }