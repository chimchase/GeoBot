from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routers import audit

app = FastAPI(
    title="GeoBot API",
    description="GEO Audit API for AI Search Visibility",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(audit.router, prefix="/api/v1")


@app.get("/health")
async def health_check():
    return {"status": "healthy"}
