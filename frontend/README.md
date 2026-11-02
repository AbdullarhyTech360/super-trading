# Frontend — Super Trading System

Next.js 16 App Router application with TypeScript and Tailwind CSS v4.

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint    # ESLint (flat config)
```

## Where things live

| Path | Purpose |
| --- | --- |
| `src/app/` | Routes and the root layout (header, footer, demo banner, metadata) |
| `src/app/globals.css` | Design tokens (`@theme`) plus shared primitives (`.panel`, `.btn`, `.input`, `.badge`) |
| `src/components/layout/` | Header, footer, logo, site-wide demo notice |
| `src/components/home/` | Hero, ticker, market cards, sparkline, candlestick chart, features |
| `src/components/about/` | Mission/vision, capabilities, roadmap, disclaimer |
| `src/components/contact/` | Validated contact form and contact details |
| `src/components/chat/` | Chat shell, conversation list, transcript, composer, empty state |
| `src/components/ui/` | Icons, demo badge, trend pill, section heading |
| `src/data/` | `market-demo.ts` (simulated snapshot) and `chat-demo.ts` (fictional conversations) |
| `src/lib/` | Market generator, formatters, contact validation, navigation helpers |
| `src/hooks/` | `useDemoChat` — local chat state |
| `src/types/` | Shared market and chat types |

## How the demo data works

`src/lib/market.ts` builds every candle with a seeded PRNG and a fixed UTC
anchor, so the series is deterministic: the server and the browser render the
same numbers, and a refresh never changes the chart. Nothing calls a network
endpoint. When the backend serves real data, replace `src/data/market-demo.ts`
with a fetch and keep the `ForexPair` type.

Chat data is plain seed data in `src/data/chat-demo.ts`. `useDemoChat` keeps
messages in React state only, which is why a refresh resets the transcript.

## Conventions

- Server components by default; `"use client"` only where state or pointer
  events are needed (`Header`, `PriceChart`, `ContactForm`, chat components).
- Dates are formatted in UTC with an explicit locale to avoid hydration
  mismatches.
- All simulated values must sit next to a `DemoBadge` or an explicit note.
- Styling uses the tokens in `globals.css`; avoid raw hex values in components.
