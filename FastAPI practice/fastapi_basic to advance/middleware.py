from fastapi import FastAPI, Request
from pydantic import BaseModel
import time

app = FastAPI()

#@app.middleware("http")
#async def my_middleware(request: Request, call_next):
 #   print("Request Received")
  #  response = await call_next(request)
   # print("Response Received")
    #return response

todos = []

class Todo(BaseModel):
    id : int
    title : str
    completed : bool

# creating the data
@app.post("/todos")
def create_todo(todo: Todo):
    todos.append(todo)
    return {
        "message" : "Todo added",
        "data"  : todo

    }

# get the entire data.
@app.get("/todo")
def get_todo():
    return todos

# get a specific data using path parameters
@app.get("/todo/{todo_id}")
def get_specific(todo_id: int):
    for todo in todos:
        if todo.id == todo_id:
            return todo
    return {
        "Error" : "Todo not found!"
    }


@app.middleware("http")
async def log_middleware(request: Request, call_next):
    start_time = time.time()
    print("Request Received")
    response = await call_next(request)
    process_time = start_time - time.time()
    print(f"Path {request.url.path} | time: {process_time}")
    print("Response Received")
    return response