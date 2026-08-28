from pydantic import BaseModel
from typing import List


class BlogCreate(BaseModel):
    title : str
    content : str

class BlogResponse(BaseModel):
    id : int
    title : str
    content : str

    class Config:
        from_attribute = True

class PaginatedBlogResponse(BaseModel):
    page: int
    limit: int
    total: int
    data: List[BlogResponse]