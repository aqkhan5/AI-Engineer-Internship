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

# Get all blogs
@app.get("/blogs", response_model=list[schemas.BlogResponse])
def get_blogs(db: Session = Depends(get_db)):
    blogs = db.query(models.Blog).order_by(models.Blog.id).all()
    return blogs

#get sepecific data
@app.get("/blogs/{id}", response_model=schemas.BlogResponse)
def get_blog(id:int, db:Session = Depends(get_db)):
    blog = db.query(models.Blog).filter(models.Blog.id == id).first()
    if not blog:
        raise HTTPException(
            status_code=404,
            detail= "Blog Not Found!"
        )
    return blog

# update data
@app.put("/blogs/{id}", response_model= schemas.BlogResponse)
def update_blog(id: int, blog: schemas.BlogCreate, db: Session = Depends(get_db)):
    existing_blog = db.query(models.Blog).filter(models.Blog.id == id).first()
    if not existing_blog:
        raise HTTPException(
            status_code= 404,
            detail= " Details not found"
        )
    existing_blog.title = blog.title
    existing_blog.content = blog.content

    db.commit()
    db.refresh(existing_blog)
    return existing_blog

# Delete blog data
@app.delete("/blogs/{id}")
def delete_blog(id: int, db: Session = Depends(get_db)):
    blog = db.query(models.Blog).filter(models.Blog.id == id)
    if not blog.first():
        raise HTTPException(
            status_code= 404,
            detail= "Blog not found!"
        )
    blog.delete()
    db.commit()
    db.refresh(blog)
    return {
        "Blog deleted successfully"
    }

