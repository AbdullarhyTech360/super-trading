# Frontend — Super Trading

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
| `src/app/` | Routes and the root layout (theme script, header, footer, metadata) |
| `src/app/globals.css` | Both palettes, `@theme` tokens, shared primitives (`.panel`, `.btn`, `.input`, `.label-mono`) |
| `src/components/layout/` | Header, footer, logo, theme toggle |
| `src/components/home/` | Hero, ticker, market tape, sparkline, candlestick chart, platform notes |
| `src/components/about/` | Mission/vision, capabilities, disclaimer |
| `src/components/contact/` | Validated contact form and contact details |
| `src/components/chat/` | Chat shell, conversation list, transcript, composer, empty state |
| `src/components/ui/` | Icons, trend pill, section heading |
| `src/data/` | `market-data.ts` (the session snapshot) and `chat-data.ts` (seed threads + reply pools) |
| `src/lib/` | Market generator, formatters, contact validation, navigation helpers |
| `src/hooks/` | `useChatSession` — browser chat state with simulated replies |
| `src/types/` | Shared market and chat types |

## Theme

Two complete palettes live in `globals.css`: the default warm near-black, and
`[data-theme="light"]`. Every utility reads a token, so switching the
`data-theme` attribute on `<html>` repaints the site without a separate
stylesheet. `ThemeToggle` only flips that attribute and stores the choice in
`localStorage`; the inline script in `app/layout.tsx` applies it before first
paint so there is no flash.

Type: **Fraunces** for display, **Instrument Sans** for interface, **IBM Plex
Mono** for anything numeric.

## How the market data works

`src/lib/market.ts` builds every candle with a seeded PRNG and a fixed UTC
anchor, so the series is deterministic: the server and the browser render the
same numbers, and a refresh never changes the chart. Nothing calls a network
endpoint. When the backend serves real data, replace `src/data/market-data.ts`
with a fetch and keep the `ForexPair` type.

## How the chat works

`src/data/chat-data.ts` holds six seed threads, each with a `replies` pool.
`useChatSession` appends your message immediately, then shows a typing state and
delivers a reply from that pool after a short pause. Everything lives in React
state, which is why a refresh restores the original transcript.

## Conventions

- Server components by default; `"use client"` only where state or pointer
  events are needed (`Header`, `ThemeToggle`, `PriceChart`, `ContactForm`, chat).
- Dates are formatted in UTC with an explicit locale to avoid hydration
  mismatches.
- Styling uses the tokens in `globals.css`; avoid raw hex values in components.
- Corners are square (`rounded-[2px]` at most). Surfaces are hairline borders
  rather than floating cards.
