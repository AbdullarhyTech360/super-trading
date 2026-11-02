type PhaseStatus = "complete" | "current" | "planned";

interface Phase {
  index: string;
  title: string;
  body: string;
  status: PhaseStatus;
}

const PHASES: Phase[] = [
  {
    index: "01",
    title: "Project setup",
    body: "Monorepo layout, Next.js with TypeScript and Tailwind, theme tokens, and a backend placeholder.",
    status: "complete",
  },
  {
    index: "02",
    title: "Home page",
    body: "Navigation, hero, pair overview, ticker, and the interactive candlestick chart.",
    status: "complete",
  },
  {
    index: "03",
    title: "About and contact",
    body: "Company narrative, mission and vision, plus a validated contact form with simulated delivery.",
    status: "complete",
  },
  {
    index: "04",
    title: "Chat demo",
    body: "Dedicated /chat route with fictional conversations, message history, and local sending.",
    status: "complete",
  },
  {
    index: "05",
    title: "Testing and polish",
    body: "Route checks, responsive passes, contrast review, and demo labelling audit.",
    status: "current",
  },
  {
    index: "06",
    title: "Deployment",
    body: "Production build, environment variables, and the super-trading.com domain.",
    status: "planned",
  },
  {
    index: "07",
    title: "Backend and integrations",
    body: "FastAPI endpoints, SQLModel and PostgreSQL, authentication, and a licensed market-data provider.",
    status: "planned",
  },
];

const STATUS_LABEL: Record<PhaseStatus, string> = {
  complete: "Complete",
  current: "In review",
  planned: "Planned",
};

const STATUS_CLASS: Record<PhaseStatus, string> = {
  complete: "border-signal-600/40 bg-signal-950/70 text-signal-300",
  current: "border-signal-500/60 bg-signal-500/10 text-signal-200",
  planned: "border-line bg-terminal-800 text-mist-400",
};

export function Roadmap() {
  return (
    <section
      id="roadmap"
      aria-labelledby="roadmap-title"
      className="scroll-mt-24 pt-14 sm:pt-16"
    >
      <p className="eyebrow">Roadmap</p>
      <h2 id="roadmap-title" className="section-title mt-2.5">
        Where the build stands
      </h2>
      <p className="section-lead mt-3">
        Statuses describe the demo build only. Deployment and backend work
        begin once the frontend is signed off.
      </p>

      <ol className="mt-7 space-y-3">
        {PHASES.map((phase) => (
          <li
            key={phase.index}
            className="panel flex flex-col gap-3 p-4 sm:flex-row sm:items-start sm:gap-5 sm:p-5"
          >
            <span className="mono-num shrink-0 font-mono text-xs text-mist-600">
              {phase.index}
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-semibold text-mist-100">
                {phase.title}
              </h3>
              <p className="mt-1.5 text-[0.82rem] leading-relaxed text-mist-400">
                {phase.body}
              </p>
            </div>
            <span
              className={[
                "badge shrink-0 self-start",
                STATUS_CLASS[phase.status],
              ].join(" ")}
            >
              {STATUS_LABEL[phase.status]}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
