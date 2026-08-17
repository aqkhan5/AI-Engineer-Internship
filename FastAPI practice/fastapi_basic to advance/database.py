from sqlalchemy.orm import sessionmaker, declarative_base, Session
from sql_alchemy import create_engine, Column, Integer, String
from fastapi import FastAPI, Depends

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

@app.get("/")
def home(db: Session = Depends(get_db)):
    return {
        "message" : "DB Connected fine"
    }
  