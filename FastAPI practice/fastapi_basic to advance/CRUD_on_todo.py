# CRUD Operations ( create, read, update, delete ) on todo list
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

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

# Updating the data
@app.put("/todo/{todo_id}")
def update_todo(todo_id: int, updated_todo: Todo):
    for index, todo in enumerate(todos):
        if todo.id == todo_id:
            todos[index] = updated_todo
            return{
                "message" : "Date Updated",
                "data" : updated_todo
            }
    return{
        "Error" : "todos not found"
    }

# Delete API deleting the data
@app.delete("/todos/{todo_id}")
def del_data(todo_id: int):
    for index, todo in enumerate(todos):
        if todo.id == todo_id:
            todos.pop(index)
            return{
                "Message" : "Todo not found"
            }

    return{
        "Error" : "Todo not found"
        }
