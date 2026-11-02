# Super Trading System

A demo-first forex website with a dark trading-terminal interface: market
overview, an interactive candlestick chart, company information, a validated
contact form, and a standalone chat page. Every price and conversation is
simulated and labelled as such.

**Live domain (planned):** super-trading.com
**Status:** frontend complete, backend scaffolded, deployment pending.

## Stack

- **Frontend:** Next.js 16 (App Router), TypeScript, Tailwind CSS v4
- **Backend:** FastAPI + SQLModel (placeholder only, phase 7)
- **Data:** simulated locally from a fixed seed — no market feed, no database

## Quick start

```bash
cd frontend
npm install
npm run dev
```

Open <http://localhost:3000>. Production build: `npm run build`.

The backend is optional at this stage:

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -e ".[dev]"
uvicorn app.main:app --reload --port 8000
```

## Pages

| Route | What is there |
| --- | --- |
| `/` | Hero, simulated price ticker, six-pair market overview, interactive candlestick chart, feature highlights |
| `/about` | Platform introduction, mission and vision, features, roadmap, full disclaimer |
| `/contact` | Contact form with validation, error/success states, placeholder contact channels |
| `/chat` | Demo chat workspace with six fictional conversations and local message sending |

## Repository layout

```text
super-trading/
├── frontend/   Next.js application (routes, components, data, hooks, lib, types)
├── backend/    FastAPI placeholder (health check and structure only)
└── docs/       project-plan.md — scope, phases, design system, open questions
```

## Honesty rules this build follows

- Market prices, candles, ranges, and changes are generated locally and are
  never presented as live quotes.
- Chat participants and messages are fictional; nothing is transmitted.
- The contact form validates in the browser and clearly states that nothing is
  emailed or stored.
- A banner on every page and a disclaimer on `/about` repeat these limits.

## What is not included yet

Live market data, user accounts, persistent chat, WebSockets, payments,
trading execution, a production database, and real email delivery. See
[`docs/project-plan.md`](docs/project-plan.md) for the full scope and phase 7
plan.

## Scripts

| Command | Where | Purpose |
| --- | --- | --- |
| `npm run dev` | `frontend/` | Development server |
| `npm run build` | `frontend/` | Production build (static routes) |
| `npm run lint` | `frontend/` | ESLint |
| `pytest` | `backend/` | Placeholder API tests |
