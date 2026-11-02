import Link from "next/link";
import { Sparkline } from "@/components/home/Sparkline";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { TrendPill } from "@/components/ui/TrendPill";
import {
  ArrowRight,
  Candles,
  Check,
  Chat,
  ShieldCheck,
  Devices,
} from "@/components/ui/Icons";
import { DEMO_SNAPSHOT_LABEL } from "@/data/market-demo";
import { closesOf } from "@/lib/market";
import { formatPercent, formatPrice, formatSpread, trendOf } from "@/lib/format";
import type { ForexPair } from "@/types/market";

interface HeroProps {
  pairs: ForexPair[];
}

const GUARANTEES = [
  { icon: ShieldCheck, label: "Demo data clearly labelled" },
  { icon: Candles, label: "Candlestick detail on every pair" },
  { icon: Devices, label: "Built for phone, tablet, and desk" },
];

export function Hero({ pairs }: HeroProps) {
  const [primary, secondary, tertiary] = pairs;

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 opacity-[0.14] [mask-image:radial-gradient(65%_55%_at_50%_25%,black,transparent)]"
      />

      <div className="shell relative grid gap-12 py-12 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10 lg:py-20">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <DemoBadge label="Frontend demo" />
            <span className="badge badge-neutral">No account needed</span>
          </div>

          <h1 className="mt-5 text-[2.15rem] leading-[1.08] font-semibold tracking-tight text-mist-100 sm:text-5xl lg:text-[3.35rem]">
            A trading terminal built for a clearer read on the session.
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-mist-400 sm:text-base">
            Super Trading System pairs a dark, low-noise interface with pair
            overviews, candlestick detail, and a direct line to the team.
            Everything you see is clearly labelled demo data — no account, no
            noise, no implied performance.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="#chart" className="btn btn-primary px-5 py-3">
              Explore the demo chart
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/chat" className="btn btn-outline px-5 py-3">
              <Chat className="h-4 w-4" />
              Open the chat demo
            </Link>
          </div>

          <ul className="mt-8 grid gap-2.5 text-sm text-mist-300 sm:grid-cols-2 lg:grid-cols-1">
            {GUARANTEES.map((item) => (
              <li key={item.label} className="flex items-center gap-2.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-md border border-signal-600/25 bg-signal-950/60">
                  <item.icon className="h-3.5 w-3.5 text-signal-400" />
                </span>
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute -inset-5 rounded-[2rem] bg-signal-500/[0.07] blur-2xl"
          />

          <div className="panel relative overflow-hidden shadow-2xl shadow-black/50">
            <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 animate-blink rounded-full bg-signal-400" />
                <span className="font-mono text-xs font-medium tracking-wide text-mist-200">
                  {primary.symbol}
                </span>
              </div>
              <DemoBadge label="Demo feed" />
            </div>

            <div className="px-4 pt-5 pb-4">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <p className="mono-num text-3xl font-semibold text-mist-100 sm:text-4xl">
                  {formatPrice(primary.price, primary.digits)}
                </p>
                <TrendPill percent={primary.changePercent} />
              </div>
              <p className="mt-1.5 text-[0.7rem] text-mist-500">
                {primary.name} · {DEMO_SNAPSHOT_LABEL}
              </p>

              <Sparkline
                values={closesOf(primary.series["1H"]).slice(-30)}
                id={`hero-${primary.id}`}
                className="mt-5 h-24 w-full sm:h-28"
              />

              <dl className="mt-5 grid grid-cols-3 gap-2 border-t border-line/80 pt-3.5">
                <div>
                  <dt className="font-mono text-[0.55rem] tracking-wider text-mist-600 uppercase">
                    24h low
                  </dt>
                  <dd className="mono-num mt-1 text-xs text-mist-300">
                    {formatPrice(primary.low24h, primary.digits)}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.55rem] tracking-wider text-mist-600 uppercase">
                    24h high
                  </dt>
                  <dd className="mono-num mt-1 text-xs text-mist-300">
                    {formatPrice(primary.high24h, primary.digits)}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.55rem] tracking-wider text-mist-600 uppercase">
                    Spread
                  </dt>
                  <dd className="mono-num mt-1 text-xs text-mist-300">
                    {formatSpread(primary.spread)}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3">
            {[secondary, tertiary].map((pair) => (
              <div key={pair.id} className="panel px-3.5 py-3">
                <p className="font-mono text-[0.65rem] tracking-wide text-mist-400">
                  {pair.symbol}
                </p>
                <p className="mono-num mt-1.5 text-base font-semibold text-mist-100">
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

          <p className="mt-4 flex items-center gap-1.5 text-[0.65rem] text-mist-600">
            <Check className="h-3 w-3 text-signal-600" />
            Snapshot generated from a fixed seed for demonstration.
          </p>
        </div>
      </div>
    </section>
  );
}
