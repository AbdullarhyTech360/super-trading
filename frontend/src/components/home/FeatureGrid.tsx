import {
  Candles,
  Code,
  Devices,
  Layers,
  ShieldCheck,
  Sparkles,
} from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";

const FEATURES = [
  {
    icon: Candles,
    title: "Candlestick detail",
    body: "Bullish and bearish bodies, wicks, grid lines, and a last-price marker on one responsive canvas.",
  },
  {
    icon: Sparkles,
    title: "One visual language",
    body: "Near-black surfaces, charcoal panels, and a single green accent keep attention on the numbers.",
  },
  {
    icon: Devices,
    title: "Readable at every size",
    body: "Axis labels sit outside the canvas and controls wrap, so prices stay legible from 360px upward.",
  },
  {
    icon: ShieldCheck,
    title: "Demo-first honesty",
    body: "Every simulated price, change, and conversation is labelled. No implied performance, ever.",
  },
  {
    icon: Layers,
    title: "Reusable components",
    body: "Cards, badges, headings, and form fields are shared primitives rather than one-off markup.",
  },
  {
    icon: Code,
    title: "Backend-ready structure",
    body: "Typed frontend today; a FastAPI and SQLModel skeleton is scaffolded for the next phase.",
  },
];

export function FeatureGrid() {
  return (
    <section
      id="features"
      aria-labelledby="features-title"
      className="shell scroll-mt-24 pt-16 sm:pt-20"
    >
      <SectionHeading
        id="features-title"
        eyebrow="Built with intent"
        title="What the first release focuses on"
        description="A small number of things done properly: legible market context, an honest demo experience, and a structure the backend can grow into."
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature) => (
          <article key={feature.title} className="panel panel-hover p-5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-signal-600/25 bg-signal-950/60">
              <feature.icon className="h-4 w-4 text-signal-400" />
            </span>
            <h3 className="mt-4 text-sm font-semibold text-mist-100">
              {feature.title}
            </h3>
            <p className="mt-2 text-[0.82rem] leading-relaxed text-mist-400">
              {feature.body}
            </p>
          </article>
        ))}
      </div>

      <p className="mt-6 font-mono text-[0.68rem] tracking-wide text-mist-600">
        Next.js · TypeScript · Tailwind CSS — backend scaffold: FastAPI ·
        SQLModel · PostgreSQL
      </p>
    </section>
  );
}
