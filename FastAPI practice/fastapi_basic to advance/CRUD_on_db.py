from sqlalchemy.orm import sessionmaker, declarative_base, Session
from sqlalchemy import create_engine, Column, Integer, String
from fastapi import FastAPI, Depends, HTTPException

app = FastAPI()

# Database connection
DATABASE_URL = "sqlite:///.test.db"
engine = create_engine(
    DATABASE_URL,
    connect_args = {"check_same_thread": False}
)


# Session and base configration
# You can perform operations ( handle transactions) in db by creating a sessionLocal object using a sessionmaker class
sessionLocal = sessionmaker(bind=engine)
# We provided base to make model using declarative_base function. 
Base = declarative_base()


# Creating a database model which inherits from Base
class Todo(Base):
    __tablename__ = "todos"
    id = Column(Integer, primary_key = True, index = True)
    title = Column(String)
    completed = Column(String)

# Table creation
Base.metadata.create_all(bind = engine)


# Common Dependency Function to handle DB connections per request
def get_db():
    db = sessionLocal()
    try:
        yield db
    finally:
        db.close()

# Creat API
@app.post("/todos")
def create_todo(title: str, db: Session = Depends(get_db)):
    todo = Todo(title = title, completed = "False")
    db.add(todo)
    db.commit()
    db.refresh(todo)
    return{
        "message" : "Todo Created",
        "data" : todo
   }

# Read all data
@app.get("/todos")
def get_todos(db:Session = Depends(get_db)):
    todos = db.query(Todo).all()
    return{
        "Total" : len(todos),
        "data" : todos
    }

# Read Specific Data
@app.get("/todos/{todo_id}")
def get_todo(todo_id: int, db:Session = Depends(get_db)):
    todo = db.query(Todo).filter(Todo.id == todo_id).first()

    if not todo:
        raise HTTPException(
            status_code= 404,
            detail= "Todo Not Found"
        )
    return todo

# Update the Data
@app.put("/todos/{todo_id}")
def update_todo(todo_id: int, title: str, db:Session = Depends(get_db)):
    todo = db.query(Todo).filter(Todo.id == todo_id).first()

    if not todo:
        raise HTTPException(
            status_code= 404,
            detail= " Todo not found"
        )
    todo.title = title
    db.commit()
    return{
        "message" : "Todo Updated",
        "data" : todo
    }

# Delete data
@app.delete("/todos/{todo_id}")
def del_todo(todo_id: int, db:Session = Depends(get_db)):
    todo = db.query(Todo).filter( Todo.id == todo_id).first()

    if not todo:
        raise HTTPException(
            status_code= 404,
            detail= "Todo not found"
        )
    db.delete(todo)
    db.commit()
    return{
        "message" : "Todo Deleted"
    }