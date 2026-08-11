from fastapi import FastAPI

app = FastAPI()

# Dynamic routing using path parameters
@app.get("/users/{user_id}")
def get_data(user_id):
    return {
        "u_id" : user_id
    }

# Dynamic routing using path parameter and according to data types
@app.get("/operator/{aqkhan}")
def get_admin(aqkhan: int):
    return {
        "admin_id" : aqkhan
    }
