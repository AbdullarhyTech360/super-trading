# Super Trading System — Project Plan

Status: **frontend complete (phases 1–5)**, backend and deployment pending.
Last updated: October 2026.

## 1. Overview

**Project:** Super Trading System
**Domain:** super-trading.com
**Audience:** forex traders and general website visitors.

A responsive forex workspace: a tape of six pairs, an inspectable candlestick
chart, company background, a validated contact form, and a chat route with
simulated replies. Market values are generated in the browser from a fixed seed
and conversations are invented; both are stated plainly on the site.

The public site carries no plan, phase table, or roadmap. Those live here, in
`docs/`, so visitors never read an internal backlog.

## 2. Technology stack

| Layer | Choice | Status |
| --- | --- | --- |
| Frontend framework | Next.js 16 (App Router, Turbopack) | Built |
| Language | TypeScript (strict) | Built |
| Styling | Tailwind CSS v4 with `@theme` design tokens | Built |
| Fonts | Fraunces, Instrument Sans, IBM Plex Mono via `next/font` | Built |
| Icons | Hand-written inline SVG components | Built |
| Backend | FastAPI + Python 3.11+ | Placeholder only |
| ORM | SQLModel | Not started |
| Database | PostgreSQL | Not started |

The backend directory exists from the start so the split is explicit, but it
implements nothing beyond a health check until phase 7.

## 3. Design system

Defined once in `frontend/src/app/globals.css` and consumed through Tailwind
class names. Two complete palettes live in the same file: the default warm
near-black ("ember") and `[data-theme="light"]` warm off-white ("paper"). Every
utility reads a token, so flipping `data-theme` on `<html>` repaints the entire
site without a second stylesheet.

**Colour — ember (default)**

| Token | Value | Use |
| --- | --- | --- |
| `terminal-950` | `#0a0908` | Page background |
| `terminal-900` … `terminal-700` | `#0e0d0b` → `#2a2721` | Panels, rails, hover states |
| `line` / `line-strong` | `#262320` / `#3a352e` | Hairlines and borders |
| `mist-100` … `mist-600` | `#f7f4ed` → `#8a8274` | Primary to tertiary text |
| `signal-300` … `signal-600` | `#86f0ae` → `#128a49` | Accent, positive movement, primary actions |
| `loss-300` … `loss-500` | `#ffb4b4` → `#f26565` | Negative movement, validation errors |

**Colour — paper (light)**

The same token names are remapped: surfaces run `#f6f3ec` → `#d5cdba`, text
`#14120d` → `#6f6858`, and the accent becomes a deep `#0b7a45` so small text
still clears 4.5:1. No component knows which palette is active.

**Type:** Fraunces for display headings (with italic accent phrases), Instrument
Sans for interface text, IBM Plex Mono with tabular numerals for prices, ranges,
timestamps, and labels. Headings default to the display serif in the base layer.

**Theme switching:** an inline script in `app/layout.tsx` reads
`localStorage["sts-theme"]` (falling back to the system preference) and sets
`data-theme` before first paint. `ThemeToggle` only flips that attribute, so
there is no flash and no hydration mismatch. `@custom-variant light` exposes
`light:` utilities for the rare case where a component needs a per-palette
tweak.

**Components:** `.shell` page gutter, `.panel` hairline surface, `.btn`
variants, `.input` / `.field-label` / `.field-error` form primitives, `.badge`,
`.eyebrow`, `.label-mono`, `.section-title`, `.section-lead`, `.bg-grid` backdrop.

**Layout:** single-column content at a 1240px max width. Editorial rules replace
floating cards: hairline dividers, numbered section eyebrows, and a market tape
rather than a grid of pair cards. Corners are square (`rounded-[2px]` at most).
Charts and tables degrade to stacked views below `lg`. Motion is limited to a
ticker marquee, chart hover states, a chat typing indicator, and message
arrival; `prefers-reduced-motion` disables all of it.

## 4. Pages

### Home (`/`)

- Sticky header with the redesigned logo, four-route navigation, theme toggle,
  chat CTA, and a mobile menu.
- Hero: serif headline, two primary actions, a three-item note row, and a pair
  panel with sparkline plus two secondary pairs.
- Price ticker marquee of the same snapshot.
- Market tape: six pairs with last price, change, a 24-hour range bar showing
  where price sits inside the range, spread, and a sparkline.
- Chart workspace: interactive candlestick chart with pair and timeframe
  switching, hover/tap candle readout, price axis, time axis, session stats,
  legend, and an expandable table of the last eight candles.
- Platform notes as a hairline numbered grid, then a closing call to action.

### About (`/about`)

- Editorial header, then "The idea" with an at-a-glance fact list.
- Mission and vision as two statements, plus three principles.
- Four capabilities as hairline link rows.
- Disclosure section (`#disclaimer`): simulated prices, local chat, provisional
  company details, and the margin-risk paragraph.
- Links to Contact and Home.

### Contact (`/contact`)

- Form with name, email, subject select, and message; required-field rules,
  email format check, and 20–1000 character message bounds.
- Inline field errors wired with `aria-invalid` / `aria-describedby`, a form
  level `role="alert"` summary, and focus moving to the first invalid field.
- Simulated 800 ms submit with a disabled/busy state, then a success panel that
  names the subject and states that nothing was sent or stored.
- Contact channels (email, phone, office, hours) and a note that submissions
  stop in the browser.

### Chat (`/chat`)

- Standalone route, not a floating widget.
- Six threads with initials avatars, roles, unread counts, last-message previews,
  and search.
- Message transcript with timestamps and clear "You" / participant grouping.
- Sending: your message appends immediately, the participant shows a typing
  indicator after a short pause, then a reply from their own pool arrives
  between 1.1 and 2.6 seconds later. Quick-reply chips fill the composer when the
  draft is empty.
- Composer: Enter sends, Shift+Enter adds a line, character counter, labelled
  send button.
- Empty state when no thread is selected, with quick-pick chips.
- Single-pane layout below `lg` with a back button; two panes above it. Picking a
  thread in the stacked layout scrolls the panel into view, so the opened
  transcript is never left below the fold.
- Full-chat mode: **Full chat** expands the panel to the viewport (`fixed inset-0`)
  and locks page scrolling; **Exit full chat**, the thread-header toggle, or Escape
  returns it to the page.
- "Reset" restores the seed threads; a refresh discards the session.

## 5. Data honesty rules

1. One deterministic snapshot feeds the hero, ticker, tape, and chart, so no two
   surfaces can contradict each other.
2. Series are generated from a fixed seed and a fixed anchor time, never from
   `Date.now()`, which also keeps server and client renders identical.
3. Meaning comes from labelling, not from banners: the ticker, the chart toolbar,
   and the tape each carry a short "simulated" or "not live quotes" note, and the
   footer repeats it once. There is no site-wide demo banner and no badge on
   every element.
4. Chat participants, messages, and replies are invented. The composer states
   that replies are simulated and that nothing leaves the tab.
5. The contact form validates locally and its success state says so explicitly.
6. `/about` carries the full disclosure: simulated prices, local chat, provisional
   company details, and margin risk. Nothing on the site promises a return or
   calls a direction.

## 6. Directory structure

```text
super-trading/
├── frontend/
│   ├── public/
│   │   ├── icons/logo-mark.svg
│   │   └── images/            (empty, reserved)
│   └── src/
│       ├── app/
│       │   ├── layout.tsx      fonts, theme script, header, footer, metadata
│       │   ├── page.tsx        home
│       │   ├── globals.css     both palettes, tokens, primitives
│       │   ├── icon.svg        favicon
│       │   ├── about/page.tsx
│       │   ├── contact/page.tsx
│       │   └── chat/page.tsx
│       ├── components/
│       │   ├── layout/         Header, Footer, Logo, ThemeToggle
│       │   ├── home/           Hero, PriceTicker, MarketOverview, Sparkline,
│       │   │                   PriceChart, FeatureGrid, CtaBand
│       │   ├── about/          MissionVision, CapabilityList, DisclaimerPanel
│       │   ├── contact/        ContactForm, ContactDetails
│       │   ├── chat/           ChatShell, ConversationList, MessageThread,
│       │   │                   MessageComposer, ChatEmptyState, Avatar
│       │   └── ui/             Icons, TrendPill, SectionHeading
│       ├── data/               market-data.ts, chat-data.ts
│       ├── hooks/              useChatSession.ts
│       ├── lib/                market.ts, format.ts, contact.ts, nav.ts
│       └── types/              market.ts, chat.ts
├── backend/
│   ├── app/                    main.py, api/routes, core, models, schemas,
│   │                           services, db
│   ├── tests/
│   ├── pyproject.toml
│   └── .env.example
├── docs/project-plan.md
├── .gitignore
└── README.md
```

## 7. Phases and roadmap

Work is tracked in seven stages. A stage closes only when the previous one is
verified on desktop and mobile, and this table — not the public site — is the
source of truth for what is done.

| # | Stage | Scope | Status |
| --- | --- | --- | --- |
| 01 | Foundation | Repository layout, Next.js + TypeScript + Tailwind, design tokens, backend skeleton | Done |
| 02 | Market surface | Header, footer, hero, ticker, six-pair tape, candlestick workspace | Done |
| 03 | Company surface | About page, contact page with validation and feedback | Done |
| 04 | Chat | `/chat` route, six seed threads, typing state, simulated replies | Done |
| 05 | Polish | Redesign and theme toggle, navigation, responsive pass, contrast review, build and lint | Done |
| 06 | Launch | Production build, domain configuration, environment variables | Pending |
| 07 | Backend | FastAPI endpoints, SQLModel + PostgreSQL, auth, persistence, licensed market feed | Pending |

### Redesign record

The first build was visually generic and over-labelled: a demo banner, a badge on
every price surface, a roadmap section inside `/about`, and a line of framework
names in the feature grid. The current version replaces all four with a single
editorial art direction (serif display type, hairline rules, warm palettes, both
themes), one disclosure section on `/about` plus a footer note, and a roadmap
that lives only in this document.

## 8. Functional requirements checklist

- [x] All four pages render (`/`, `/about`, `/contact`, `/chat`).
- [x] Navigation works on desktop and mobile, with active-route indication.
- [x] Theme toggle switches palettes, persists the choice, and applies it before
      first paint.
- [x] Chart renders with pair and timeframe switching.
- [x] Market tape shows prices, changes, ranges, and spreads.
- [x] Contact form validates name, email, subject, and message.
- [x] Simulated submission produces success feedback; invalid input produces
      field and summary errors.
- [x] Chat threads can be switched, searched, and closed; switching scrolls the
      opened transcript into view.
- [x] Chat opens in a full-viewport mode and leaves it again by button, header
      toggle, or Escape.
- [x] Messages send immediately and a simulated reply follows with a typing
      indicator.
- [x] Layout works from 360px to wide desktop, in both palettes.

## 9. Non-functional requirements

- Responsive, editorial layout with a single accent colour and two palettes.
- Reusable components and typed data models; no duplicated markup for headings,
  badges, buttons, or list rows.
- Clear frontend/backend separation with a documented API path.
- No secrets in the repository; `.env` files are ignored with examples
  committed.
- No paid services, no analytics, no third-party charting or UI dependencies.
- Accessibility: skip link, semantic landmarks, labelled controls, visible focus
  rings, `aria-live` feedback, reduced-motion support, and a data table
  alternative for the chart.
- Contrast: every text token clears 4.5:1 against the page and panel surfaces in
  both palettes.

## 10. Excluded from this version

Real-time forex prices, user accounts and authentication, persistent chat,
WebSockets, payments, trading execution, brokerage integration, production
database, and real email delivery.

## 11. To confirm before launch

- Official company description, branding assets, and legal entity details.
- Final contact email, phone number, and office address.
- Whether chat serves customer support, trader-to-trader messaging, or both.
- Market-data provider, redistribution terms, and licensing cost.
- Whether accounts are required, and how they should be authenticated.
- Hosting and deployment preferences for the frontend and backend.

## 12. Definition of done (frontend)

- [x] Home, About, Contact, and Chat pages work.
- [x] Frontend lives in `frontend/` with a separate `backend/` directory.
- [x] Chart and chat operate without a production backend.
- [x] Contact validation and feedback work.
- [x] Light and dark themes both ship from one token set.
- [x] Layout is responsive on desktop and mobile.
- [x] Simulated data is disclosed once per surface, without a site-wide banner.
- [x] No roadmap, phase table, or framework list appears in the UI.
- [x] Project structure documented and ready for backend work.

## 13. Local development

```bash
cd frontend
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # ESLint
```

Backend (optional, placeholder only):

```bash
cd backend
python -m venv .venv && .venv\Scripts\activate
pip install -e ".[dev]"
uvicorn app.main:app --reload --port 8000
```

## 14. Deployment notes (phase 6)

- The frontend builds four static routes; any Node-capable host works, with
  Vercel the shortest path for Next.js.
- Set `NEXT_PUBLIC_API_BASE_URL` when the backend API is live.
- Point `super-trading.com` at the deployment and verify all four routes, anchor
  links, the theme toggle, and the API health check.
- Keep the market-data note, the chat disclosure, and the `/about` disclosure in
  place until real data and delivery are wired up.
