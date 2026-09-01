# QR Code Generator - React Frontend

Clean, modern single-page React frontend built with Vite, Tailwind CSS, and Lucide Icons, connected to the FastAPI QR Code Generator backend.

## Quick Start

### 1. Install dependencies
```bash
cd frontend
npm install
```

### 2. Configure Environment (Optional)
The backend URL defaults to `http://localhost:8000`. You can change it in `.env`:
```env
VITE_API_URL=http://localhost:8000
```

### 3. Start Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000`.

### 4. Start FastAPI Backend (In Root Directory)
```bash
# In the project root
uvicorn main:app --reload --port 8000
```
