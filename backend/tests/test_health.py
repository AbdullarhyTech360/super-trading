"""Tests for the placeholder backend.

Run with: `pytest` from the `backend/` directory.
"""

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health_returns_ok() -> None:
    response = client.get("/api/health")

    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_root_describes_placeholder() -> None:
    response = client.get("/")

    assert response.status_code == 200
    assert response.json()["status"] == "placeholder"
