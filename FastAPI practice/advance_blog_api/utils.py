import os
from dotenv import load_dotenv
from jose import jwt, JWTError
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
import models
from database import get_db

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY", "my secret")
ALGORITHM = os.getenv("ALGORITHM", "HS256")

oauth_schema = OAuth2PasswordBearer(tokenUrl="token")

def create_token(user_id: int):
    return jwt.encode({"user_id": user_id}, SECRET_KEY, algorithm=ALGORITHM)

def verify_current_token(token: str = Depends(oauth_schema), db: Session = Depends(get_db)):
    try: 
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("user_id")
        if not user_id:
            raise HTTPException(
                status_code= 401,
                detail="Invalid Token"
            )
        user = db.query(models.User).filter(models.User.id == user_id).first()
        if not user:
            raise HTTPException(
                status_code= 404,
                detail= "Not found"
            )
        return user
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid Token")