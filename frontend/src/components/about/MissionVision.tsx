import { Check, ShieldCheck, Sparkles, Layers } from "@/components/ui/Icons";

const PILLARS = [
  {
    icon: Sparkles,
    title: "Mission",
    body: "Make market context readable before it becomes noise. Prices, ranges, and spreads should be understandable in a glance, on any screen, without an account.",
  },
  {
    icon: ShieldCheck,
    title: "Vision",
    body: "A workspace where a trader can read a session, review a chart, and reach the team in one sitting — with simulated data labelled honestly at every step.",
  },
];

const VALUES = [
  {
    icon: Layers,
    title: "Clarity over decoration",
    body: "One accent colour, generous spacing, and a typographic scale that keeps numbers first.",
  },
  {
    icon: ShieldCheck,
    title: "Candour about limits",
    body: "No live feed, no execution, no advice. The interface says so instead of implying otherwise.",
  },
  {
    icon: Check,
    title: "Craft that scales",
    body: "Shared primitives, typed data, and a documented path from demo data to a real API.",
  },
];

export function MissionVision() {
  return (
    <section aria-labelledby="mission-title" className="pt-14 sm:pt-16">
      <p className="eyebrow">Direction</p>
      <h2 id="mission-title" className="section-title mt-2.5">
        Mission and vision
      </h2>

      <div className="mt-7 grid gap-4 lg:grid-cols-2">
        {PILLARS.map((pillar) => (
          <article key={pillar.title} className="panel p-6">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-signal-600/25 bg-signal-950/60">
              <pillar.icon className="h-4 w-4 text-signal-400" />
            </span>
            <h3 className="mt-4 text-base font-semibold text-mist-100">
              {pillar.title}
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-mist-400">
              {pillar.body}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {VALUES.map((value) => (
          <div
            key={value.title}
            className="rounded-xl border border-line/70 bg-terminal-900/40 p-4"
          >
            <value.icon className="h-4 w-4 text-signal-500" />
            <h3 className="mt-3 text-sm font-medium text-mist-200">
              {value.title}
            </h3>
            <p className="mt-1.5 text-[0.8rem] leading-relaxed text-mist-500">
              {value.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
