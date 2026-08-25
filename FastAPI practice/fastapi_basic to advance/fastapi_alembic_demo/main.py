# main.py

# ==============================================================================
# 1. IMPORTS & APP INITIALIZATION
# ------------------------------------------------------------------------------
# - FastAPI: Core web framework components (FastAPI instance, Depends for dependency
#   injection, HTTPException for error responses).
# - SQLAlchemy Session: Used for type-hinting database sessions in route handlers.
# - Pydantic: BaseModel and EmailStr for request body validation and response serialization.
# - database: SessionLocal (database session factory) and ORM models (User, Post).
# - app: The central FastAPI application instance.
# ==============================================================================
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from database import SessionLocal, User, Post

app = FastAPI(title="FastAPI Alembic Demo")


# ==============================================================================
# 2. DATABASE DEPENDENCY (Session Management)
# ------------------------------------------------------------------------------
# get_db is a generator function used with FastAPI's Depends():
# - Opens a fresh SQLAlchemy database session for an incoming request.
# - Yields the session to the route handler.
# - The 'finally' block ensures db.close() always runs after the request finishes,
#   preventing database connection leaks even if exceptions occur.
# ==============================================================================
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ==============================================================================
# 3. PYDANTIC SCHEMAS (Request Validation & Response Serialization)
# ------------------------------------------------------------------------------
# - PostCreate: Validates payload when creating a post (title, content).
# - PostResponse: Serializes post data returned to the client (id, title, content, owner_id).
# - UserCreate: Validates registration payload (valid email, password, optional phone).
# - UserResponse: Formats returned user data (excludes hashed_password, embeds nested posts).
# - from_attributes = True: Tells Pydantic to read attributes directly from SQLAlchemy
#   ORM model instances instead of dictionary keys.
# ==============================================================================
class PostCreate(BaseModel):
    title: str
    content: str


class PostResponse(BaseModel):
    id: int
    title: str
    content: str
    owner_id: int

    class Config:
        from_attributes = True


class UserCreate(BaseModel):
    email: EmailStr
    password: str
    phone: str | None = None


class UserResponse(BaseModel):
    id: int
    email: str
    is_active: bool
    phone: str | None = None
    posts: list[PostResponse] = []

    class Config:
        from_attributes = True


# ==============================================================================
# 4. USER ROUTE HANDLERS
# ------------------------------------------------------------------------------
# - POST /users/:
#     1. Queries the database to verify the email is not already in use.
#     2. Raises HTTP 400 Bad Request if the email already exists.
#     3. Extracts payload data and maps it to the User ORM model (storing password as hashed_password).
#     4. Persists the record (add -> commit -> refresh) and returns the created user.
# - GET /users/:
#     Queries and returns all user records from the database, automatically serialized
#     with their associated posts via UserResponse.
# ==============================================================================
@app.post("/users/", response_model=UserResponse)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    user_data = user.model_dump()
    password = user_data.pop("password")
    new_user = User(**user_data, hashed_password=password)
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


@app.get("/users/", response_model=list[UserResponse])
def get_all_users(db: Session = Depends(get_db)):
    return db.query(User).all()


# ==============================================================================
# 5. POST ROUTE HANDLERS
# ------------------------------------------------------------------------------
# - POST /users/{user_id}/posts/:
#     1. Verifies that the specified user exists in the database.
#     2. Raises HTTP 404 Not Found if no user is found with user_id.
#     3. Instantiates the Post model with request body data and links owner_id = user_id.
#     4. Persists the post to the database (add -> commit -> refresh) and returns it.
# ==============================================================================
@app.post("/users/{user_id}/posts/", response_model=PostResponse)
def create_post_for_user(user_id: int, post: PostCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    new_post = Post(**post.model_dump(), owner_id=user_id)
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post