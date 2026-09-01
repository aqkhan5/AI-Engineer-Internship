from pydantic import BaseModel, EmailStr, ConfigDict


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

    model_config = ConfigDict(from_attributes=True)

class PostCreate(BaseModel):
    title: str
    content: str

class PostResponse(BaseModel):
    id: int
    title : str
    content: str
    author : str

    model_config = ConfigDict(from_attributes=True)