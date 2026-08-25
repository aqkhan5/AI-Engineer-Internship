from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from database import sessionLocal, User

app = FastAPI(title="Alembic Demo")


# helper function or common logic
def get_db():
    db = sessionLocal()
    try:
        yield db
    finally:
        db.close()


class UserCreate(BaseModel):
    email: EmailStr
    password : str


class UserResponse(BaseModel):
    id: int
    email : str
    is_active : bool

    class Config:
        from_attributes = True


# 3: API Endpoints
@app.post("/users/", response_model= UserResponse)
def add_user(user: UserCreate, db:Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(
            status_code=400,
            detail= "Email already exists!"
        )
    new_user = User(email = user.email, hashed_password = user.password)

    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


@app.get("/users/", response_model = list[UserResponse])
def get_all_user(db: Session = Depends(get_db)):
    return db.query(User).all()