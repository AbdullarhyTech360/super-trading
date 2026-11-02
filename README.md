# Super Trading System

A forex workspace for reading a session: a tape of six pairs, an inspectable
candlestick chart, company background, a validated contact form, and a chat
route with simulated replies. Prices are generated in the browser from a fixed
seed and are never presented as live quotes.

**Live domain (planned):** super-trading.com
**Status:** frontend complete, backend scaffolded, deployment pending.

## Stack

- **Frontend:** Next.js 16 (App Router), TypeScript, Tailwind CSS v4
- **Backend:** FastAPI + SQLModel (placeholder only, phase 7)
- **Data:** one deterministic snapshot generated locally — no market feed, no database

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
| `/` | Hero with a live-looking pair panel, ticker, six-pair market tape, interactive candlestick chart, platform notes |
| `/about` | Company idea, mission and vision, four capabilities, disclosure of limits |
| `/contact` | Contact form with validation, error and success states, contact details |
| `/chat` | Chat workspace with six threads, typing indicator, simulated replies, and a full-screen mode |

Every route carries a theme toggle in the header: light and dark, remembered
between visits, applied before first paint.

## Design language

- **Palettes:** warm near-black "ember" by default, warm off-white "paper" in
  light mode. Both are complete token sets, so no component is duplicated.
- **Type:** Fraunces (display serif), Instrument Sans (interface), IBM Plex Mono
  (anything numeric).
- **Surfaces:** hairline rules instead of floating cards, square corners, a
  single signal green as the only accent.
- **Structure:** numbered section eyebrows, a tape rather than a grid of cards,
  and a chart that keeps its readout inside the plot.

Tokens live in [`frontend/src/app/globals.css`](frontend/src/app/globals.css).

## Repository layout

```text
super-trading/
├── frontend/   Next.js application (routes, components, data, hooks, lib, types)
├── backend/    FastAPI placeholder (health check and structure only)
└── docs/       project-plan.md — scope, phases, design system, roadmap, open questions
```

## Honesty rules this build follows

- Market prices, candles, ranges, and changes are generated locally from a fixed
  seed and are never presented as live quotes.
- Chat participants, messages, and replies are invented; sending is simulated in
  the browser and nothing is transmitted.
- The contact form validates locally and says that nothing is emailed or stored.
- `/about` states these limits in full; the footer repeats the market-data note.

## What is not included yet

Live market data, user accounts, persistent chat, WebSockets, payments, trading
execution, a production database, and real email delivery. The phase plan and
roadmap live in [`docs/project-plan.md`](docs/project-plan.md).

## Scripts

| Command | Where | Purpose |
| --- | --- | --- |
| `npm run dev` | `frontend/` | Development server |
| `npm run build` | `frontend/` | Production build (static routes) |
| `npm run lint` | `frontend/` | ESLint |
| `pytest` | `backend/` | Placeholder API tests |
