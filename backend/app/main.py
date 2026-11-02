"""FastAPI entry point for the Super Trading System backend.

Phase 1 keeps this deliberately small: the service boots, exposes a health
check, and nothing else. Market data, contact delivery, and chat
persistence arrive in phase 7.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import health
from app.core.config import settings

app = FastAPI(
    title=settings.app_name,
    version="0.1.0",
    description=(
        "Placeholder API for the Super Trading System frontend. "
        "No market data or message delivery is implemented yet."
    ),
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, prefix=settings.api_prefix)


@app.get("/", tags=["meta"])
def read_root() -> dict[str, str]:
    return {
        "service": settings.app_name,
        "status": "placeholder",
        "docs": "/docs",
    }
