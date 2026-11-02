# Super Trading System — Backend (placeholder)

FastAPI service for the Super Trading System. This directory exists from day
one so the repository has a clear frontend/backend split, but **no product
functionality is implemented yet** (phase 7).

## What is here

| Path | Purpose |
| --- | --- |
| `app/main.py` | FastAPI application, CORS setup, router wiring |
| `app/api/routes/` | Route handlers — only `health.py` today |
| `app/core/config.py` | Environment-driven settings via pydantic-settings |
| `app/models/` | Placeholder for SQLModel table definitions |
| `app/schemas/` | Placeholder for request/response models |
| `app/services/` | Placeholder for business logic |
| `app/db/` | Placeholder for engine/session setup |
| `tests/` | Smoke tests for the placeholder routes |

## What is deliberately missing

- No database connection, no SQLModel tables, no migrations.
- No market-data provider or quote endpoints.
- No contact-form endpoint or email delivery.
- No chat persistence or WebSocket channel.
- No authentication or authorization.

The frontend currently runs entirely on simulated data, so it does not call
this service.

## Run locally

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate          # Windows (source .venv/bin/activate on macOS/Linux)
pip install -e ".[dev]"
copy .env.example .env          # cp on macOS/Linux
uvicorn app.main:app --reload --port 8000
```

- API root: <http://localhost:8000/>
- Health check: <http://localhost:8000/api/health>
- Interactive docs: <http://localhost:8000/docs>

## Tests and lint

```bash
pytest
ruff check .
```

## Phase 7 plan

1. Add `models/contact_message.py` plus a `POST /api/contact` router with the
   same validation rules the frontend already applies.
2. Add SQLModel models for `Conversation` and `ChatMessage`, enable the `db`
   extra, and create the PostgreSQL session dependency.
3. Move the simulated candle generator behind `GET /api/market/pairs` so the
   frontend can swap its local data module for a fetch call.
4. Only then evaluate a licensed market-data provider, and add authentication
   before any endpoint exposes per-user data.

## Environment variables

See `.env.example`. No secret values are committed, and `.env` is ignored.
