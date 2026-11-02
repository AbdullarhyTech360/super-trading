import { Sparkline } from "@/components/home/Sparkline";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { closesOf } from "@/lib/market";
import { formatPercent, formatPrice, formatSpread, trendOf } from "@/lib/format";
import type { ForexPair } from "@/types/market";

interface MarketOverviewProps {
  pairs: ForexPair[];
}

const ROW =
  "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-line px-1 py-4 transition-colors last:border-b-0 hover:bg-terminal-900/50 lg:grid-cols-[minmax(0,1.4fr)_7.5rem_6.5rem_minmax(0,1.6fr)_4.5rem_5rem] lg:py-3";

/** Where the last price sits inside the 24-hour range. */
function RangeBar({ pair }: { pair: ForexPair }) {
  const span = pair.high24h - pair.low24h;
  const raw = span <= 0 ? 50 : ((pair.price - pair.low24h) / span) * 100;
  const position = Math.min(100, Math.max(0, raw));

  return (
    <div className="w-full">
      <div className="relative h-[3px] w-full bg-terminal-800">
        <span
          className="absolute inset-y-0 left-0 bg-signal-500/35"
          style={{ width: `${position}%` }}
        />
        <span
          className="absolute top-1/2 h-2.5 w-[2px] -translate-y-1/2 bg-signal-300"
          style={{ left: `calc(${position}% - 1px)` }}
        />
      </div>
      <div className="mt-1.5 flex justify-between font-mono text-[0.55rem] text-mist-600">
        <span>{formatPrice(pair.low24h, pair.digits)}</span>
        <span>{formatPrice(pair.high24h, pair.digits)}</span>
      </div>
    </div>
  );
}

function PairRow({ pair }: { pair: ForexPair }) {
  const trend = trendOf(pair.changePercent);

  return (
    <li className={ROW}>
      <div className="flex min-w-0 items-baseline gap-2.5">
        <span className="font-mono text-[0.82rem] font-medium tracking-wide text-mist-100">
          {pair.symbol}
        </span>
        <span className="hidden truncate text-[0.72rem] text-mist-500 sm:inline">
          {pair.name}
        </span>
      </div>

      <div className="flex flex-col items-end gap-1 lg:flex-row lg:items-baseline lg:gap-0">
        <span className="mono-num text-[0.95rem] font-medium text-mist-100 lg:text-[0.88rem]">
          {formatPrice(pair.price, pair.digits)}
        </span>
        <span
          className={[
            "mono-num text-[0.7rem] lg:hidden",
            trend === "down" ? "text-loss-400" : "text-signal-400",
          ].join(" ")}
        >
          {formatPercent(pair.changePercent)}
        </span>
      </div>

      <span
        className={[
          "mono-num hidden text-[0.78rem] lg:block",
          trend === "down" ? "text-loss-400" : "text-signal-400",
        ].join(" ")}
      >
        {formatPercent(pair.changePercent)}
      </span>

      <div className="hidden lg:block">
        <RangeBar pair={pair} />
      </div>

      <span className="mono-num hidden font-mono text-[0.72rem] text-mist-400 lg:block">
        {formatSpread(pair.spread)}
      </span>

      <Sparkline
        values={closesOf(pair.series["1H"]).slice(-30)}
        id={`market-${pair.id}`}
        className="hidden h-6 w-20 lg:block"
      />
    </li>
  );
}

export function MarketOverview({ pairs }: MarketOverviewProps) {
  return (
    <section
      id="markets"
      aria-labelledby="markets-title"
      className="shell scroll-mt-24 pt-20 sm:pt-24"
    >
      <SectionHeading
        id="markets-title"
        eyebrow="01 — Market overview"
        title="Six pairs, one glance"
        description="A compact tape of the instruments the workspace follows. Context arrives before opinion."
        action={<span className="label-mono">Session snapshot</span>}
      />

      <div className="mt-8 border-t border-line">
        <div
          aria-hidden="true"
          className="hidden grid-cols-[minmax(0,1.4fr)_7.5rem_6.5rem_minmax(0,1.6fr)_4.5rem_5rem] gap-4 px-1 pb-2.5 lg:grid"
        >
          <span className="label-mono">Pair</span>
          <span className="label-mono">Last</span>
          <span className="label-mono">Change</span>
          <span className="label-mono">24h range</span>
          <span className="label-mono">Spread</span>
          <span className="label-mono">Trend</span>
        </div>

        <ul>
          {pairs.map((pair) => (
            <PairRow key={pair.id} pair={pair} />
          ))}
        </ul>
      </div>

      <p className="mt-4 font-mono text-[0.6rem] tracking-[0.16em] text-mist-600 uppercase">
        Fixed seed snapshot · not live quotes
      </p>
    </section>
  );
}
