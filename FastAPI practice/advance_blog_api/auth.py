from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
import schemas, models, utils
from database import get_db
from werkzeug.security import generate_password_hash, check_password_hash

router = APIRouter(tags=["Authentication"])

@router.post("/signup", response_model=schemas.UserResponse)
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    if db.query(models.User).filter(models.User.email == user.email).first():
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )
    if db.query(models.User).filter(models.User.username == user.username).first():
        raise HTTPException(
            status_code=400,
            detail="Username already taken"
        )
    hashed_password = generate_password_hash(user.password)

    new_user = models.User(
        username=user.username,
        email=user.email,
        password=hashed_password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.post("/login")
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
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
        "access_token": token,
        "token_type": "bearer",
        "user": {"id": db_user.id, "username": db_user.username}
    }

@router.post("/token")
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(
        (models.User.email == form_data.username) | (models.User.username == form_data.username)
    ).first()
    if not db_user or not check_password_hash(db_user.password, form_data.password):
        raise HTTPException(
            status_code=400,
            detail="Invalid username/email or password"
        )

    token = utils.create_token(db_user.id)
    return {
        "access_token": token,
        "token_type": "bearer"
    }
