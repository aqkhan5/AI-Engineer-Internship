import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

load_dotenv()

env_url = os.getenv("neon_db")
DATABASE_URL = env_url

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread"})

sessionLocal = sessionmaker(autoflush= False, auto_commit = False, bind= engine)

Base = declarative_base