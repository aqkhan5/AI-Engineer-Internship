from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class User(BaseModel):
    name : str
    age: int
    email: str

@app.post("/users")

def create_user(user : User):
    return  {
        "Message" : "User Data Created",
        "data" : user
    }

# Nested Nested in pydantic
class Address(BaseModel):
    data: User
    city: str
    pincode: int

@app.post("/person")
def create_nested(user: Address):
    return{
        "Message": "Nested Data created",
        "data" : user

    }
