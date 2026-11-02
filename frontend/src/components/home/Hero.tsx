import Link from "next/link";
import { Sparkline } from "@/components/home/Sparkline";
import { TrendPill } from "@/components/ui/TrendPill";
import { ArrowRight, Chat } from "@/components/ui/Icons";
import { closesOf } from "@/lib/market";
import { formatPercent, formatPrice, formatSpread, trendOf } from "@/lib/format";
import type { ForexPair } from "@/types/market";

interface HeroProps {
  pairs: ForexPair[];
}

const NOTES = [
  { value: "06", label: "pairs followed" },
  { value: "3", label: "timeframes" },
  { value: "0", label: "accounts needed" },
];

export function Hero({ pairs }: HeroProps) {
  const [primary, secondary, tertiary] = pairs;

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 opacity-[0.16] [mask-image:linear-gradient(to_bottom,black,transparent_78%)]"
      />

      <div className="shell relative grid gap-14 pt-14 pb-4 sm:pt-20 lg:grid-cols-[1.08fr_0.92fr] lg:items-start lg:gap-12">
        <div>
          <p className="eyebrow">Forex market workspace</p>

          <h1 className="mt-5 max-w-[15ch] text-[2.5rem] leading-[0.98] font-semibold text-mist-100 sm:text-[3.6rem] lg:text-[4.1rem]">
            Read the session,
            <br />
            <span className="italic text-signal-300">not the noise.</span>
          </h1>

          <p className="mt-6 max-w-lg text-[0.95rem] leading-relaxed text-mist-400">
            A quiet terminal for following currency pairs: candlestick detail,
            ranges and spreads in one place, and a direct line to the desk.
            Nothing here asks for a login or promises a return.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="#chart" className="btn btn-primary px-6 py-3">
              Open the chart
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/chat" className="btn btn-outline px-6 py-3">
              <Chat className="h-4 w-4" />
              Talk to the desk
            </Link>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-3 border-t border-line">
            {NOTES.map((note) => (
              <div key={note.label} className="border-r border-line py-4 pr-3 last:border-r-0">
                <dt className="mono-num text-xl leading-none font-medium text-mist-100">
                  {note.value}
                </dt>
                <dd className="mt-1.5 text-[0.7rem] leading-snug text-mist-500">
                  {note.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <p className="label-mono mb-3">Latest close · session snapshot</p>

          <div className="panel">
            <div className="flex items-baseline justify-between gap-3 border-b border-line px-4 py-2.5">
              <span className="font-mono text-xs font-medium tracking-wide text-mist-200">
                {primary.symbol}
              </span>
              <span className="font-mono text-[0.6rem] tracking-[0.18em] text-mist-600 uppercase">
                Simulated
              </span>
            </div>

            <div className="px-4 pt-4 pb-4">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <p className="mono-num text-[2rem] leading-none font-medium text-mist-100 sm:text-4xl">
                  {formatPrice(primary.price, primary.digits)}
                </p>
                <TrendPill percent={primary.changePercent} />
              </div>
              <p className="mt-2 text-[0.72rem] text-mist-500">{primary.name}</p>

              <Sparkline
                values={closesOf(primary.series["1H"]).slice(-30)}
                id={`hero-${primary.id}`}
                className="mt-4 h-24 w-full sm:h-28"
              />

              <dl className="mt-4 grid grid-cols-3 border-t border-line pt-3">
                <div>
                  <dt className="font-mono text-[0.55rem] tracking-[0.16em] text-mist-600 uppercase">
                    24h low
                  </dt>
                  <dd className="mono-num mt-1 text-xs text-mist-300">
                    {formatPrice(primary.low24h, primary.digits)}
                  </dd>
                </div>
                <div className="border-l border-line pl-3">
                  <dt className="font-mono text-[0.55rem] tracking-[0.16em] text-mist-600 uppercase">
                    24h high
                  </dt>
                  <dd className="mono-num mt-1 text-xs text-mist-300">
                    {formatPrice(primary.high24h, primary.digits)}
                  </dd>
                </div>
                <div className="border-l border-line pl-3">
                  <dt className="font-mono text-[0.55rem] tracking-[0.16em] text-mist-600 uppercase">
                    Spread
                  </dt>
                  <dd className="mono-num mt-1 text-xs text-mist-300">
                    {formatSpread(primary.spread)}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 border border-line">
            {[secondary, tertiary].map((pair, index) => (
              <div
                key={pair.id}
                className={[
                  "px-3.5 py-3",
                  index === 0 ? "border-r border-line" : "",
                ].join(" ")}
              >
                <p className="font-mono text-[0.65rem] tracking-wide text-mist-400">
                  {pair.symbol}
                </p>
                <p className="mono-num mt-1.5 text-base font-medium text-mist-100">
                  {formatPrice(pair.price, pair.digits)}
                </p>
                <p
                  className={[
                    "mono-num mt-0.5 text-[0.68rem]",
                    trendOf(pair.changePercent) === "down"
                      ? "text-loss-400"
                      : "text-signal-400",
                  ].join(" ")}
                >
                  {formatPercent(pair.changePercent)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
