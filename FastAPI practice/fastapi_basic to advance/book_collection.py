# Book Collection API
# Simple API to manage a collection of books. A pure CRUD application with in-memory storage.
from fastapi import FastAPI, HTTPException, Path
from pydantic import BaseModel
from typing import Optional, List


app = FastAPI(title="Book Collection API")

# Request Model  What client send
class BookCreate(BaseModel):
    title: str
    author: str
    year: Optional[int] = None
    read: bool = False


# Response model what API return
class BookResponse(BaseModel):
    id: int
    title: str
    author: str
    year: Optional[int] = None
    read: bool

books_db = []
book_id_counter = 1

# Add Books
@app.post("/books", response_model= BookResponse, status_code=201)
async def creat_books(book: BookCreate):
    global book_id_counter
    new_book = BookResponse(
        id = book_id_counter,
        title = book.title,
        author = book.author,
        year = book.year,
        read = book.read
    )

    books_db.append(new_book)
    book_id_counter += 1

    return new_book


# Get all books
@app.get("/books/", response_model=List[BookResponse])
def get_all_books(read: Optional[bool] = None):
    if read is None:
        return books_db
    return [book for book in books_db if book.read == read]


# Get a specific book
@app.get("/books/{book_id}", response_model=BookResponse)
def get_book(book_id : int= Path(..., gt=0, description="Book ID must be positive")):
    for book in books_db:
        if book.id == book_id:
            return book

    raise HTTPException(status_code=404, detail="Book not found")


# Update data
@app.put("/books/{book_id}", response_model= BookResponse)
def update_book(book_id: int, updated_book: BookCreate):
    for index, book in enumerate(books_db):
        if book.id == book_id:
            books_db[index] = BookResponse(
                id=book.id,
                title=updated_book.title,
                author=updated_book.author,
                year=updated_book.year,
                read=updated_book.read
            )
            return books_db[index]
        
    raise HTTPException(status_code= 404, detail= "Book not found")


# Delete a book
@app.delete("/books/{book_id}", status_code=204)
def delete_book(book_id: int):
    for index, book in enumerate(books_db):
        if book.id == book_id:
            books_db.pop(index)
            return 
        
    raise HTTPException(status_code= 404, detail= "Book not found")
