import Link from "next/link";
import { ArrowUpRight, Check } from "@/components/ui/Icons";

const CAPABILITIES = [
  {
    title: "Market overview at a glance",
    body: "Six pairs with price, 24 hour range, spread, and a trend line — all from one simulated snapshot.",
    href: "/#markets",
  },
  {
    title: "Candlestick chart workspace",
    body: "Switch pairs and timeframes, inspect each candle, and read the session statistics beside the chart.",
    href: "/#chart",
  },
  {
    title: "Contact with real validation",
    body: "Inline field errors, a summary alert, and a success state — with a clear note that delivery is simulated.",
    href: "/contact",
  },
  {
    title: "Dedicated chat demo",
    body: "A standalone route with fictional conversations, message history, and locally sent replies.",
    href: "/chat",
  },
];

const BENEFITS = [
  "No account, install, or paywall to explore the demo.",
  "Consistent dark interface across all four pages.",
  "Responsive from a 360px phone to a wide desktop.",
  "Typed data models ready for an API layer.",
];

export function CapabilityList() {
  return (
    <section aria-labelledby="capabilities-title" className="pt-14 sm:pt-16">
      <p className="eyebrow">What is inside</p>
      <h2 id="capabilities-title" className="section-title mt-2.5">
        Key features and benefits
      </h2>

      <div className="mt-7 grid gap-4 lg:grid-cols-[1.35fr_1fr]">
        <div className="grid gap-3 sm:grid-cols-2">
          {CAPABILITIES.map((capability) => (
            <Link
              key={capability.title}
              href={capability.href}
              className="panel panel-hover group flex flex-col p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-semibold text-mist-100">
                  {capability.title}
                </h3>
                <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-mist-600 transition-colors group-hover:text-signal-400" />
              </div>
              <p className="mt-2.5 text-[0.82rem] leading-relaxed text-mist-400">
                {capability.body}
              </p>
            </Link>
          ))}
        </div>

        <div className="rounded-xl border border-signal-600/25 bg-signal-950/30 p-5">
          <h3 className="font-mono text-[0.62rem] tracking-[0.2em] text-signal-300 uppercase">
            Benefits
          </h3>
          <ul className="mt-4 space-y-3">
            {BENEFITS.map((benefit) => (
              <li key={benefit} className="flex gap-2.5 text-[0.82rem] leading-relaxed text-mist-300">
                <Check className="mt-0.5 h-3.5 w-3.5 text-signal-400" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
