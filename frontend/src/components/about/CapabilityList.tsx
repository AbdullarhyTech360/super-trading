import Link from "next/link";
import { ArrowUpRight } from "@/components/ui/Icons";

const CAPABILITIES = [
  {
    title: "Market tape",
    body: "Six pairs with last price, 24-hour range, spread, and where the current price sits inside that range.",
    href: "/#markets",
  },
  {
    title: "Chart workspace",
    body: "Switch pairs and timeframes, then inspect any candle for its open, high, low, and close.",
    href: "/#chart",
  },
  {
    title: "Contact, properly validated",
    body: "Inline field errors, a summary alert, and a success state that names the subject you sent.",
    href: "/contact",
  },
  {
    title: "A desk you can write to",
    body: "Threads with history, quick replies, and answers that arrive a moment later — all in this tab.",
    href: "/chat",
  },
];

const BENEFITS = [
  "No account, install, or paywall.",
  "Light and dark, chosen by you and remembered.",
  "Responsive from a 360px phone upward.",
  "Typed models ready for an API layer.",
];

export function CapabilityList() {
  return (
    <section aria-labelledby="capabilities-title" className="pt-14 sm:pt-16">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">What is inside</p>
          <h2 id="capabilities-title" className="section-title mt-2.5">
            Four things it does well
          </h2>
        </div>
        <p className="label-mono">Nothing beyond that</p>
      </div>

      <ul className="mt-8 border-t border-line">
        {CAPABILITIES.map((capability, index) => (
          <li key={capability.title} className="border-b border-line">
            <Link
              href={capability.href}
              className="group grid gap-2 py-5 sm:grid-cols-[2.5rem_minmax(0,13rem)_minmax(0,1fr)_1.5rem] sm:items-baseline sm:gap-6"
            >
              <span className="font-mono text-[0.55rem] tracking-[0.22em] text-signal-300">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-[1.05rem] font-semibold text-mist-100 transition-colors group-hover:text-signal-300">
                {capability.title}
              </h3>
              <p className="max-w-xl text-[0.85rem] leading-relaxed text-mist-400">
                {capability.body}
              </p>
              <ArrowUpRight className="hidden h-4 w-4 text-mist-600 transition-colors group-hover:text-signal-400 sm:block" />
            </Link>
          </li>
        ))}
      </ul>

      <dl className="mt-10 grid gap-x-10 gap-y-5 border-t border-line pt-6 sm:grid-cols-2">
        {BENEFITS.map((benefit) => (
          <div key={benefit} className="flex items-baseline gap-3">
            <span aria-hidden="true" className="h-px w-4 shrink-0 translate-y-[-0.2rem] bg-signal-500" />
            <dt className="text-[0.82rem] leading-relaxed text-mist-300">{benefit}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}
