# database.py
from sqlalchemy import create_engine, Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import declarative_base, sessionmaker, relationship

# 1. Database Connection URL (Creates a local SQLite file named test.db)
DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 2. Base class that all your database models will inherit from
Base = declarative_base()

# 3. Your first Database Model (A simple Users table)
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
        #  ADD THIS NEW COLUMN HERE:
    phone = Column(String, nullable=True) 

     #  Link this user to their posts. 
    # back_populates ensures that if you change a post's owner, the user's post list updates too.
    posts = relationship("Post", back_populates="owner")

    #  BRAND NEW TABLE MODEL
class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    content = Column(String, nullable=False)
    
    #  Foreign Key links this post directly to a User's ID
    owner_id = Column(Integer, ForeignKey("users.id"))

    #  Relationship mapping back to the parent User model
    owner = relationship("User", back_populates="posts")