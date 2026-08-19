from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {
        "message" : "API is running smoothly"
    }

@app.get("/add")
def add(a : int, b: int):
    return {
        a + b
    }