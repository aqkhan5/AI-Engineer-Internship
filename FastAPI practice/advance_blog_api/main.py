from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
import models, database
from auth import router as auth_router
from routers.posts import router as posts_router
from routers.users import router as users_router


import os
from fastapi.staticfiles import StaticFiles

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="Modern Blog API")

app.add_middleware(
    CORSMiddleware,
    allow_origins= ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(auth_router)
app.include_router(posts_router)
app.include_router(users_router)

# Mount React Frontend if built
if os.path.exists("frontend/dist"):
    app.mount("/", StaticFiles(directory="frontend/dist", html=True), name="frontend")