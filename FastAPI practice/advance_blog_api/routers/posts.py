from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import models, schemas, utils
from database import get_db

router = APIRouter(prefix="/posts", tags=["Posts"])

@router.post('/', response_model= schemas.PostResponse)
def create_post(
    post: schemas.PostCreate, 
    db: Session = Depends(get_db), 
    current_user: models.User = Depends(utils.verify_current_token)
    ):
    new_post = models.Post(
        title = post.title,
        content = post.content,
        user_id = current_user.id
    )

    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return schemas.PostResponse(
        id = new_post.id,
        title = new_post.title,
        content = new_post.content,
        author= current_user.username
    )

@router.get("/", response_model= List[schemas.PostResponse])
def get_posts(db: Session = Depends(get_db)):
    posts = db.query(models.Post).all()
    return [
        schemas.PostResponse(
            id = post.id,
            title = post.title,
            content = post.content,
            author = post.owner.username

        )
        for post in posts
    ]

@router.put("/{post_id}",response_model= schemas.PostResponse)
def update_post(
    post_id: int,
    updated_post: schemas.PostCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(utils.verify_current_token)
    ):
    post = db.query(models.Post).filter(models.Post.id == post_id).first()

    if not post:
        raise HTTPException(
            status_code= 404,
            detail= " Post Not Found!"
        )
    if post.user_id != current_user.id:
        raise HTTPException(
            status_code= 403,
            detail= " Not Authorized!"
        )
    post.title = updated_post.title
    post.content= updated_post.content

    db.commit()
    db.refresh(post)

    return schemas.PostResponse(
            id = post.id,
            title = post.title,
            content = post.content,
            author = current_user.username

    )

# Delete post
@router.delete("/{post_id}")
def delete_post(
    post_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(utils.verify_current_token)
    ):
    post = db.query(models.Post).filter(models.Post.id == post_id).first()
    if not post:
        raise HTTPException(
            status_code= 404,
            detail= " Post Not Found!"
        )
    if post.user_id != current_user.id:
        raise HTTPException(
            status_code= 403,
            detail= " Not Authorized!"
        )
  
    db.delete(post)
    db.commit()

    return {"Details" : "Post Deleted Successfully"}