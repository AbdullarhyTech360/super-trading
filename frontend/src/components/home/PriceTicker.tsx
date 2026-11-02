import { formatPercent, formatPrice, trendOf } from "@/lib/format";
import type { ForexPair } from "@/types/market";

interface PriceTickerProps {
  pairs: ForexPair[];
}

/**
 * Decorative marquee of the same simulated snapshot. Two identical groups are
 * rendered so the CSS translate loop is seamless.
 */
export function PriceTicker({ pairs }: PriceTickerProps) {
  const groups = [0, 1];

  return (
    <div className="relative overflow-hidden border-y border-line bg-terminal-900/50">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-terminal-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-terminal-950 to-transparent" />

      <div className="flex w-max animate-ticker">
        {groups.map((group) => (
          <div
            key={group}
            className="flex shrink-0 gap-8 pr-8"
            aria-hidden={group === 1 ? "true" : undefined}
          >
            {pairs.map((pair) => (
              <div
                key={`${group}-${pair.id}`}
                className="flex items-center gap-2.5 py-2.5 whitespace-nowrap font-mono text-[0.7rem]"
              >
                <span className="text-mist-500">{pair.symbol}</span>
                <span className="text-mist-200">
                  {formatPrice(pair.price, pair.digits)}
                </span>
                <span
                  className={
                    trendOf(pair.changePercent) === "down"
                      ? "text-loss-400"
                      : "text-signal-400"
                  }
                >
                  {formatPercent(pair.changePercent)}
                </span>
              </div>
            ))}
            <div className="flex items-center py-2.5 font-mono text-[0.6rem] tracking-[0.2em] text-mist-600 uppercase">
              Simulated
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
