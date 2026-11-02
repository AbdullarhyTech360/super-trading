const PILLARS = [
  {
    label: "Mission",
    statement: "Make market context readable before it becomes noise.",
    body: "Prices, ranges, and spreads should be understandable in a glance, on any screen, without an account. Super Trading exists to put the number next to its boundaries instead of beside a promise.",
  },
  {
    label: "Vision",
    statement: "One sitting, from first look to first reply.",
    body: "A workspace where a trader reads a session, inspects a chart, and reaches the desk without leaving the page — with simulated data stated plainly wherever it appears.",
  },
];

const PRINCIPLES = [
  {
    title: "Clarity over decoration",
    body: "One accent colour, hairline rules, and a type scale that keeps numbers first.",
  },
  {
    title: "Candour about limits",
    body: "No live feed, no execution, no advice. The interface says so rather than implying otherwise.",
  },
  {
    title: "Built for the next layer",
    body: "Shared primitives and typed models, so a real feed replaces a source rather than a screen.",
  },
];

export function MissionVision() {
  return (
    <section aria-labelledby="mission-title" className="pt-14 sm:pt-16">
      <p className="eyebrow">Direction</p>
      <h2 id="mission-title" className="section-title mt-2.5">
        What the desk is for
      </h2>

      <div className="mt-8 grid gap-10 border-t border-line pt-8 lg:grid-cols-2 lg:gap-14">
        {PILLARS.map((pillar) => (
          <article key={pillar.label}>
            <p className="label-mono">{pillar.label}</p>
            <p className="mt-4 font-display text-[1.35rem] leading-[1.25] font-medium text-mist-100 sm:text-[1.6rem]">
              {pillar.statement}
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-mist-400">
              {pillar.body}
            </p>
          </article>
        ))}
      </div>

      <dl className="mt-10 grid gap-x-10 gap-y-6 border-t border-line pt-8 sm:grid-cols-3">
        {PRINCIPLES.map((principle, index) => (
          <div key={principle.title}>
            <dt className="flex items-baseline gap-2.5">
              <span className="font-mono text-[0.55rem] tracking-[0.22em] text-signal-300">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-[0.85rem] font-semibold text-mist-200">
                {principle.title}
              </span>
            </dt>
            <dd className="mt-2 pl-8 text-[0.82rem] leading-relaxed text-mist-400">
              {principle.body}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
