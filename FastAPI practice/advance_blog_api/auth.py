from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
import schemas, models, utils
from database import get_db
from werkzeug.security import generate_password_hash, check_password_hash

router = APIRouter(tags=["Authentication"])

@router.post("/signup", response_model= schemas.UserResponse)
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(models.User).filter(models.User.emial == user.email).first()
    if existing_user:
        raise HTTPException(
            status_code= 400,
            detail=" Email ALready Registered"
        )
    hashed_password = generate_password_hash(user.password)

    new_user = models.User(
        username = user.username,
        email = user.email,
        password = hashed_password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.post("/login/")
def login(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.emial == user.email).filter()
    if not db_user:
        raise HTTPException(
            status_code=400,
            detail="Invalid email or password"
    )
    if not check_password_hash(db_user.password, user.password):
        raise HTTPException(
            status_code=400,
            detail="Invalid email or password"
    )

    token = utils.create_token(db_user.id)
    return {
        "access_token" : token,
        "token_type" : "bearer",
        "user" : {"id": db_user.id, "username": db_user.username}
    }
