from fastapi import FastAPI, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from database import engine, sessionLocal
import models, schemas


models.Base.metadata.create_all(bind = engine)
app  = FastAPI(title= "blogAPI")

def get_db():
    db = sessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/blogs" , response_model= schemas.BlogResponse)
def creat_blog(blog: schemas.BlogCreate, db: Session = Depends(get_db)):
    new_blog = models.Blog(
        title = blog.title,
        content = blog.content
    )
    db.add(new_blog)
    db.commit()
    db.refresh(new_blog)
    return new_blog

