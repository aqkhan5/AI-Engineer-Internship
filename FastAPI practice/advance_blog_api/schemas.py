from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    username: str
    email : EmailStr
    password:str

class UserLogin(BaseModel):
    email: EmailStr
    password : str

class UserResponse(BaseModel):
    id : int
    username : str
    email: EmailStr

    class Config:
        orm_mode = True

class PostCreate(BaseModel):
    title: str
    content: str

class PostResponse(BaseModel):
    id: int
    title : str
    content: str
    author : str

    class Config:
        orm_mode = True