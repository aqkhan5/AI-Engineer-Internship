from jose import jwt, JWTError
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
import models
from database import get_db

SECRET_KEY = "my secret"
ALGORITHM = "HS256"

oauth_schema = OAuth2PasswordBearer(tokenUrl="login")

def create_token(user_id: int)