from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {
        "message" : "welcome to Karachi"
    }

@app.get("/users")
def users():
    return {
        "message" : "welcome to Lahore"
    }

@app.get("/about")
def about():
    return {
        "message" : "welcome to Rawalpindi"
    }