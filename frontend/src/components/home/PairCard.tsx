import { Sparkline } from "@/components/home/Sparkline";
import { TrendPill } from "@/components/ui/TrendPill";
import { formatPrice, formatSpread } from "@/lib/format";
import { closesOf } from "@/lib/market";
import type { ForexPair } from "@/types/market";

interface PairCardProps {
  pair: ForexPair;
}

export function PairCard({ pair }: PairCardProps) {
  const sparkline = closesOf(pair.series["1H"]).slice(-24);

  return (
    <article className="panel panel-hover group flex flex-col p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-mono text-sm font-semibold tracking-wide text-mist-100">
            {pair.symbol}
          </h3>
          <p className="mt-1 truncate text-xs text-mist-500">{pair.name}</p>
        </div>
        <TrendPill percent={pair.changePercent} />
      </div>

      <div className="mt-5 flex items-end justify-between gap-4">
        <p className="mono-num text-2xl font-semibold text-mist-100">
          {formatPrice(pair.price, pair.digits)}
        </p>
        <Sparkline
          values={sparkline}
          id={pair.id}
          className="h-10 w-24 shrink-0 opacity-90 transition-opacity group-hover:opacity-100"
        />
      </div>

      <dl className="mt-5 grid grid-cols-3 gap-2 border-t border-line/80 pt-3.5">
        <div>
          <dt className="font-mono text-[0.6rem] tracking-wider text-mist-600 uppercase">
            24h low
          </dt>
          <dd className="mono-num mt-1 text-xs text-mist-300">
            {formatPrice(pair.low24h, pair.digits)}
          </dd>
        </div>
        <div>
          <dt className="font-mono text-[0.6rem] tracking-wider text-mist-600 uppercase">
            24h high
          </dt>
          <dd className="mono-num mt-1 text-xs text-mist-300">
            {formatPrice(pair.high24h, pair.digits)}
          </dd>
        </div>
        <div>
          <dt className="font-mono text-[0.6rem] tracking-wider text-mist-600 uppercase">
            Spread
          </dt>
          <dd className="mono-num mt-1 text-xs text-mist-300">
            {formatSpread(pair.spread)}
          </dd>
        </div>
      </dl>
    </article>
  );
}
