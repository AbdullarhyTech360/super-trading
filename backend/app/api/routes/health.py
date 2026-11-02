"""Liveness endpoint used by deployment checks and the future frontend client."""

from fastapi import APIRouter
from pydantic import BaseModel

from app.core.config import settings

router = APIRouter(tags=["meta"])


class HealthResponse(BaseModel):
    status: str
    environment: str


@router.get("/health", response_model=HealthResponse)
def health() -> HealthResponse:
    """Returns a static payload; there are no dependencies to check yet."""
    return HealthResponse(status="ok", environment=settings.environment)
