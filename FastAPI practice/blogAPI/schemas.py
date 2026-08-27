from pydantic import BaseModel

class BlogCreate(BaseModel):
    titl : str
    content : str

class BlogResponse(BaseModel):
    id : int
    title : str
    content : str    