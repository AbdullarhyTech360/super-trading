import { SectionHeading } from "@/components/ui/SectionHeading";

const FEATURES = [
  {
    title: "Candlestick detail",
    body: "Bodies, wicks, grid lines, and a last-price marker drawn on one canvas that resizes with the panel.",
  },
  {
    title: "Context before opinion",
    body: "Price, 24-hour range, and spread sit together on every pair, so the number arrives with its boundaries.",
  },
  {
    title: "Readable at every size",
    body: "Axis labels live outside the canvas and the controls wrap, keeping prices legible from 360px upward.",
  },
  {
    title: "One visual language",
    body: "Warm near-black surfaces, hairline rules, and a single green accent. Type stays out of the way of data.",
  },
  {
    title: "Keyboard and screen reader paths",
    body: "Skip links, labelled controls, visible focus, and a table view of the last eight candles for the chart.",
  },
  {
    title: "Written plainly",
    body: "No return promises, no jargon, and no implied performance. What this site does is stated in the header.",
  },
];

export function FeatureGrid() {
  return (
    <section
      id="features"
      aria-labelledby="features-title"
      className="shell scroll-mt-24 pt-20 sm:pt-24"
    >
      <SectionHeading
        id="features-title"
        eyebrow="03 — Platform"
        title="What the first release focuses on"
        description="A short list, done properly: legible market context, an interface that respects attention, and a structure the backend can grow into."
      />

      <div className="mt-10 grid border-t border-line sm:grid-cols-2">
        {FEATURES.map((feature, index) => (
          <article
            key={feature.title}
            className="border-b border-line py-6 sm:odd:border-r sm:odd:pr-8 sm:even:pl-8"
          >
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[0.55rem] tracking-[0.22em] text-signal-300">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-[1.05rem] font-semibold text-mist-100">
                {feature.title}
              </h3>
            </div>
            <p className="mt-2 max-w-md pl-8 text-[0.85rem] leading-relaxed text-mist-400">
              {feature.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
