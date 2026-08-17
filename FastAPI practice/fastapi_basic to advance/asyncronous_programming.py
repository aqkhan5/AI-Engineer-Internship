from fastapi import FastAPI
import time
import asyncio

app = FastAPI()

@app.get("/")
async def a_task():
    await asyncio.sleep(3)
    return {
        "message" : "Async API"
    }