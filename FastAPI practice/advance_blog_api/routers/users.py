from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
import models, schemas
from database import get_db

router = APIRouter(prefix="/user", tags=["user"])

@router.get("/", response_model= schemas.UserResponse)
def get_user(db: Session = Depends(get_db)):
    return db.query(models.User).all()