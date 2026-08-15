import sqlite3
from fastapi import FastAPI

app = FastAPI()
connect_lite = sqlite3.connect("test.db", check_same_thread=False)
db_cursor = connect_lite.cursor()

db_cursor.execute("""
CREATE TABLE IF NOT EXISTS todos (
            id INT PRIMARY KEY,
            title TEXT,
            completed TEXT
)
""")
connect_lite.commit()

@app.get("/")
def home():
    return{
        "message" : "SQLite database connect fine!"
    }