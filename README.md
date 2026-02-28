# GeoBot

AI Search Visibility Audit Platform (GEO).

## Prerequisites

- Python 3.12+
- Node.js 18+
- npm

## Quick Start

### Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate   # Windows
# source .venv/bin/activate  # macOS/Linux
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Both (from root)

```bash
npm install
npm run dev
```

## Project Structure

- `/backend` — FastAPI API server
- `/frontend` — Next.js web application
