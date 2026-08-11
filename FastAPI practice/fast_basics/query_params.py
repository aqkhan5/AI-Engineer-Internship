# used to handle extra data in the url after ?   e.g /users?name=mohsin

from fastapi import FastAPI

app = FastAPI()

@app.get("/users")
def get_users(name):
    return {
        "Name" : name
    }

# Optional parameters to handle the error or not providing value in url
@app.get("/students")
def get_users(name: str = None):
    return {
        "Name" : name
    }

# providing the Default value then you can
@app.get("/items")
def get_product(limit: int = 10):
    return {
        "LIMIT" : limit
    }


# Handling the Multiple parameters
@app.get("/products")
def get_users(name: str = None, price: int = 0):
    return {
        "Name" : name,
        "Price": price
    }
