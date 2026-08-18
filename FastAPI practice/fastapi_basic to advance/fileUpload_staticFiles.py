from fastapi import FastAPI, UploadFile, HTTPException, File
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os
import shutil

# =====================================================================
# 1. FastAPI Application Setup
# =====================================================================
# Create the FastAPI app instance
app = FastAPI()

# =====================================================================
# 2. Upload Folder Setup
# =====================================================================
# Name of the folder where uploaded files will be stored
UPLOAD_DIR = "uploads"

# Check if the folder exists; if not, create it
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

# =====================================================================
# 3. Mount Static Directory
# =====================================================================
# Mount the 'uploads' folder to the URL path '/files'
# Any file inside 'uploads/' can now be accessed at: http://127.0.0.1:8000/files/<filename>
app.mount("/files", StaticFiles(directory=UPLOAD_DIR), name="files")

# =====================================================================
# 4. File Upload Endpoint (POST)
# =====================================================================
@app.post("/upload")
def upload_file(file: UploadFile = File(...)):
    # Extract the original name of the uploaded file
    file_name = file.filename

    # Validate that a file was actually provided
    if not file_name:
        raise HTTPException(
            status_code=400,
            detail="File not selected"
        )

    # Build the full destination path (e.g., "uploads/my_photo.png")
    file_path = os.path.join(UPLOAD_DIR, file_name)

    # Open local file in write-binary mode ("wb") and save the uploaded stream
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Return upload confirmation and the direct static URL to access the image
    return { 
        "message": "File uploaded successfully",
        "fileName": file_name,
        # Direct link served by StaticFiles mounted at /files
        "file_url": f"http://127.0.0.1:8000/files/{file_name}"
    }

# =====================================================================
# 5. Custom File Retrieval Endpoint (GET)
# =====================================================================
@app.get("/file/{filename}")
def get_file(filename: str):
    # Construct the path to the requested file in the uploads folder
    file_path = os.path.join(UPLOAD_DIR, filename)

    # If the file does not exist on disk, return a 404 Not Found error
    if not os.path.exists(file_path):
        raise HTTPException(
            status_code=404,
            detail="File not found"
        )

    # FileResponse reads the file from disk and streams it directly to the browser
    return FileResponse(file_path)

# =====================================================================
# 6. Root Health Check Endpoint
# =====================================================================
@app.get("/")
def home():
    # Simple JSON message to verify the server is running
    return {
        "message": "API is running"
    }