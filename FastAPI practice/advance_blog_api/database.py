import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase

load_dotenv()

DATABASE_URL = os.getenv("neon_db")
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread"})
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocomlete = False)

class Base(DeclarativeBase):
    pass