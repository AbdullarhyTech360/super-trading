# Super Trading System — Project Plan

Status: **frontend complete (phases 1–5)**, backend and deployment pending.
Last updated: October 2026.

## 1. Overview

**Project:** Super Trading System
**Domain:** super-trading.com
**Audience:** forex traders and general website visitors.

A modern, responsive trading website with a dark terminal-style interface,
market chart previews, company information, a contact route, and a dedicated
chat page powered by dummy data. All market values and conversations are
simulated and labelled as such.

## 2. Technology stack

| Layer | Choice | Status |
| --- | --- | --- |
| Frontend framework | Next.js 16 (App Router, Turbopack) | Built |
| Language | TypeScript (strict) | Built |
| Styling | Tailwind CSS v4 with `@theme` design tokens | Built |
| Icons | Hand-written inline SVG components | Built |
| Backend | FastAPI + Python 3.11+ | Placeholder only |
| ORM | SQLModel | Not started |
| Database | PostgreSQL | Not started |

The backend directory exists from the start so the split is explicit, but it
implements nothing beyond a health check until phase 7.

## 3. Design system

Defined once in `frontend/src/app/globals.css` and consumed through Tailwind
class names.

**Colour**

| Token | Value | Use |
| --- | --- | --- |
| `terminal-950` | `#04070a` | Page background |
| `terminal-900` … `terminal-700` | `#070b10` → `#16212b` | Panels, rails, hover states |
| `line` / `line-strong` | `#1a2530` / `#27343f` | Hairlines and borders |
| `mist-100` … `mist-600` | `#eef3f8` → `#55636f` | Primary to tertiary text |
| `signal-300` … `signal-600` | `#7bf3a8` → `#16a75a` | Accent, positive movement, primary actions |
| `loss-300` … `loss-500` | `#ffa4a8` → `#ef4b53` | Negative movement, validation errors |

**Type:** Geist Sans for interface text, Geist Mono with tabular numerals for
prices, ranges, timestamps, and labels.

**Components:** `.shell` page gutter, `.panel` surface, `.btn` variants,
`.input` / `.field-label` / `.field-error` form primitives, `.badge` pills
(plus the `DemoBadge` component), `.eyebrow`, `.bg-grid` backdrop.

**Layout:** single-column content with a 1200px max width, 16px/24px/32px
gutters. Charts and tables degrade to scrollable or stacked views below the
`lg` breakpoint. Motion is limited to a ticker marquee, a status dot pulse,
and hover transitions; `prefers-reduced-motion` disables all of it.

## 4. Pages

### Home (`/`)

- Sticky header with logo, four-route navigation, mobile menu, chat CTA.
- Hero: positioning copy, two primary actions, three trust points, and a
  simulated pair card with sparkline plus two secondary pair cards.
- Simulated price ticker marquee.
- Market overview: six pairs with price, trend pill, 24h range, spread, and
  sparkline.
- Chart workspace: interactive candlestick chart with pair and timeframe
  switching, hover/tap candle readout, price axis, time axis, session stats,
  legend, and an expandable table of the last eight candles.
- Feature highlights and a closing call to action.

### About (`/about`)

- Platform introduction and an "at a glance" fact list.
- Mission, vision, and three values.
- Key features and benefits, each linking to the relevant route or section.
- Roadmap with honest phase statuses.
- Disclaimer block (`#disclaimer`) covering simulated data, missing features,
  and the information still to confirm before launch.
- Links back to Home and Contact.

### Contact (`/contact`)

- Form with name, email, subject select, and message; required-field rules,
  email format check, and 20–1000 character message bounds.
- Inline field errors wired with `aria-invalid` / `aria-describedby`, a form
  level `role="alert"` summary, and focus moving to the first invalid field.
- Simulated 800 ms submit with a disabled/busy state, then a success panel
  that states plainly that nothing was sent or stored.
- Placeholder contact channels (email, phone, office, hours) and an
  explanation of how submission will work once the backend exists.

### Chat (`/chat`)

- Standalone route, not a floating widget.
- Six fictional conversations with initials avatars, roles, unread counts,
  last-message previews, and search.
- Message transcript with timestamps and clear "You" / participant grouping.
- Local sending via the composer (Enter sends, Shift+Enter adds a line) with
  auto-scroll to the newest message.
- Empty state when no conversation is selected, with quick-pick chips.
- Single-pane list/thread layout below `lg` with a back button; two panes
  above it.
- "Reset demo" restores the seed data; the page states that messages vanish on
  refresh and that no accounts exist.

## 5. Data honesty rules

1. Every surface that shows a price carries a `DemoBadge` or a written note.
2. A site-wide banner above the header repeats the demo status on all pages.
3. The chart, ticker, and cards all read from one deterministic snapshot, so
   numbers never contradict each other.
4. Simulated series are generated from a fixed seed and a fixed anchor time,
   never from `Date.now()`, which also keeps server and client renders
   identical.
5. Chat participants, messages, and timestamps are fictional and labelled in
   the page, the transcript header, and the composer.
6. Contact submission is described as simulated in the form, the success
   state, the contact panel, and the footer.

## 6. Directory structure

```text
super-trading/
├── frontend/
│   ├── public/
│   │   ├── icons/logo-mark.svg
│   │   └── images/            (empty, reserved)
│   └── src/
│       ├── app/
│       │   ├── layout.tsx      root shell: notice, header, footer, metadata
│       │   ├── page.tsx        home
│       │   ├── globals.css     design tokens + primitives
│       │   ├── icon.svg        favicon
│       │   ├── about/page.tsx
│       │   ├── contact/page.tsx
│       │   └── chat/page.tsx
│       ├── components/
│       │   ├── layout/         Header, Footer, Logo, DemoNotice
│       │   ├── home/           Hero, PriceTicker, MarketOverview, PairCard,
│       │   │                   Sparkline, PriceChart, FeatureGrid, CtaBand
│       │   ├── about/          MissionVision, CapabilityList, Roadmap,
│       │   │                   DisclaimerPanel
│       │   ├── contact/        ContactForm, ContactDetails
│       │   ├── chat/           ChatShell, ConversationList, MessageThread,
│       │   │                   MessageComposer, ChatEmptyState, Avatar
│       │   └── ui/             Icons, DemoBadge, TrendPill, SectionHeading
│       ├── data/               market-demo.ts, chat-demo.ts
│       ├── hooks/              useDemoChat.ts
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

## 7. Phases

| Phase | Scope | Status |
| --- | --- | --- |
| 1 | Repository layout, Next.js + TypeScript + Tailwind, theme, backend skeleton | Complete |
| 2 | Header, footer, hero, features, market overview, candlestick chart | Complete |
| 3 | About page, contact page with validation and feedback | Complete |
| 4 | `/chat` route with dummy conversations and local sending | Complete |
| 5 | Navigation, responsive, accessibility, contrast, demo labelling, build/lint | Complete |
| 6 | Production deployment and domain configuration | Pending |
| 7 | FastAPI endpoints, SQLModel/PostgreSQL, auth, persistence, live data | Pending |

## 8. Functional requirements checklist

- [x] All four pages render (`/`, `/about`, `/contact`, `/chat`).
- [x] Navigation works on desktop and mobile, with active-route indication.
- [x] Demo chart renders with pair and timeframe switching.
- [x] Market overview shows prices, changes, ranges, and spreads.
- [x] Contact form validates name, email, subject, and message.
- [x] Simulated submission produces success feedback; invalid input produces
      field and summary errors.
- [x] Chat conversations can be switched, searched, and closed.
- [x] Messages can be sent locally and appear immediately.
- [x] Layout works from 360px to wide desktop.

## 9. Non-functional requirements

- Responsive, dark-and-green design with a single accent colour.
- Reusable components and typed data models; no duplicated markup for cards,
  badges, headings, or buttons.
- Clear frontend/backend separation with a documented API path.
- No secrets in the repository; `.env` files are ignored with examples
  committed.
- No paid services, no analytics, no third-party charting or UI dependencies.
- Accessibility: skip link, semantic landmarks, labelled controls, visible
  focus rings, `aria-live` feedback, reduced-motion support, and a data table
  alternative for the chart.

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
- [x] Demo chart and chat operate without a production backend.
- [x] Contact validation and feedback work.
- [x] Layout is responsive on desktop and mobile.
- [x] Dummy content is clearly identified.
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
- Point `super-trading.com` at the deployment and verify all four routes,
  anchor links, and the API health check.
- Keep the demo banner and disclaimers in place until real data and delivery
  are wired up.
