import type { Metadata } from "next";
import Link from "next/link";
import { CapabilityList } from "@/components/about/CapabilityList";
import { DisclaimerPanel } from "@/components/about/DisclaimerPanel";
import { MissionVision } from "@/components/about/MissionVision";
import { ArrowRight, Mail } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "About",
  description:
    "What Super Trading is, what it is not, and what the workspace is built to do.",
};

const GLANCE = [
  { label: "Domain", value: "super-trading.com" },
  { label: "Focus", value: "Forex research workspace" },
  { label: "Instruments", value: "Six majors and metals" },
  { label: "Timeframes", value: "1H · 4H · 1D" },
];

export default function AboutPage() {
  return (
    <div className="shell pb-4">
      <header className="border-b border-line pt-14 pb-10 sm:pt-20">
        <p className="eyebrow">About</p>
        <h1 className="mt-4 max-w-3xl text-[2.2rem] leading-[1.05] font-semibold text-mist-100 sm:text-[3rem] lg:text-[3.4rem]">
          A desk for people who <span className="italic text-signal-300">read the tape</span>
        </h1>
        <p className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-mist-400">
          Super Trading is a forex workspace: a tape of the majors, candlestick
          detail you can inspect, and a line straight to the desk. No account,
          no clutter, no promises about returns.
        </p>
      </header>

      <section
        aria-labelledby="intro-title"
        className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr]"
      >
        <div>
          <h2 id="intro-title" className="section-title">
            The idea
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-mist-400">
            <p>
              Most trading sites greet you with a claim and bury the instrument.
              We start the other way around: the price, the range it moved
              through, the spread you would pay, and a chart you can open
              candle by candle.
            </p>
            <p>
              Everything on the site is built to be read once and understood —
              no dashboard to assemble, no sign-up wall, no autoplay video. If a
              number needs a caveat, the caveat sits beside it.
            </p>
            <p>
              Quotes here are generated in the browser from a fixed seed rather
              than streamed from a provider. A licensed feed needs a backend
              that can cache, throttle, and attribute it; until that layer is in
              place, the numbers are illustrative and the interface says so.
            </p>
          </div>
        </div>

        <div>
          <h2 className="label-mono">At a glance</h2>
          <dl className="mt-4 border-t border-line">
            {GLANCE.map((item) => (
              <div
                key={item.label}
                className="flex items-baseline justify-between gap-4 border-b border-line py-3"
              >
                <dt className="text-xs text-mist-500">{item.label}</dt>
                <dd className="text-right text-xs font-medium text-mist-200">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <MissionVision />
      <CapabilityList />
      <DisclaimerPanel />

      <section className="mt-14 flex flex-col gap-5 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-base font-semibold text-mist-100">
            Questions for the desk?
          </h2>
          <p className="mt-1.5 text-sm text-mist-400">
            Write through the contact form, or open a thread and see how a reply
            arrives.
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <Link href="/contact" className="btn btn-primary">
            <Mail className="h-4 w-4" />
            Contact
          </Link>
          <Link href="/" className="btn btn-outline">
            Back to home
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
