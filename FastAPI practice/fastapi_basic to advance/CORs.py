# Practicing CORS handling in FastAPI
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allowed Origins (Frontend URLs that are permitted to make requests)
origins = [
    "http://localhost:5173",     # Vite / React default
    "http://127.0.0.1:5173",
    "http://localhost:3000",     # Create React App default
    "http://127.0.0.1:3000",
    "http://localhost:5500",     # VS Code Live Server default
    "http://127.0.0.1:5500",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
    "null",                      # When opened directly via file:// in browser
    "*"                          # Allow all origins
]

# Add CORS Middleware to FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],         # Allow any frontend origin for seamless testing
    allow_credentials=False,
    allow_methods=["*"],         # Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],         # Allow all HTTP headers
)

@app.get("/")
def home():
    return {
        "message": "CORS Enabled API is working successfully!"
    }

@app.get("/api/data")
def get_sample_data():
    return {
        "status": "success",
        "message": "Data fetched from FastAPI Backend!",
        "skills": ["FastAPI", "React", "CORS Middleware"]
    }