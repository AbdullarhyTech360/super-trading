"use client";

import { useMemo, useState, type PointerEvent as ReactPointerEvent } from "react";
import { TrendPill } from "@/components/ui/TrendPill";
import {
  formatDay,
  formatPercent,
  formatPrice,
  formatSpread,
  formatTime,
  trendOf,
} from "@/lib/format";
import { seriesChangePercent, TIMEFRAMES } from "@/lib/market";
import type { Candle, ForexPair, Timeframe } from "@/types/market";

const UP = "var(--color-signal-400)";
const DOWN = "var(--color-loss-400)";
const GRID = "var(--color-line)";
const HAIRLINE = "var(--color-mist-400)";
const HOVER_TINT = "var(--color-mist-100)";

const PLOT_HEIGHT = "h-[260px] sm:h-[320px] lg:h-[360px]";

interface PriceChartProps {
  pairs: ForexPair[];
  defaultPairId?: string;
}

function CandleReadout({
  candle,
  pair,
  timeframe,
  previousClose,
}: {
  candle: Candle;
  pair: ForexPair;
  timeframe: Timeframe;
  previousClose: number;
}) {
  const change =
    previousClose === 0
      ? 0
      : ((candle.close - previousClose) / previousClose) * 100;

  return (
    <div className="pointer-events-none absolute top-2 left-2 z-10 flex max-w-[calc(100%-1rem)] flex-wrap items-center gap-x-3 gap-y-1 rounded-[2px] border border-line/80 bg-terminal-950/85 px-2.5 py-1.5 font-mono text-[0.6rem] text-mist-500 backdrop-blur-sm sm:text-[0.68rem]">
      <span className="text-mist-300">
        {timeframe === "1D" ? formatDay(candle.time) : formatTime(candle.time)}
      </span>
      <span>
        O <b className="font-medium text-mist-200">{formatPrice(candle.open, pair.digits)}</b>
      </span>
      <span>
        H <b className="font-medium text-mist-200">{formatPrice(candle.high, pair.digits)}</b>
      </span>
      <span>
        L <b className="font-medium text-mist-200">{formatPrice(candle.low, pair.digits)}</b>
      </span>
      <span>
        C <b className="font-medium text-mist-200">{formatPrice(candle.close, pair.digits)}</b>
      </span>
      <span className={trendOf(change) === "down" ? "text-loss-400" : "text-signal-400"}>
        {formatPercent(change)}
      </span>
    </div>
  );
}

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[2px] border border-line/70 bg-terminal-950/50 px-3 py-2">
      <dt className="font-mono text-[0.58rem] tracking-wider text-mist-600 uppercase">
        {label}
      </dt>
      <dd className="mono-num mt-1 text-xs text-mist-200">{value}</dd>
    </div>
  );
}

export function PriceChart({ pairs, defaultPairId }: PriceChartProps) {
  const [activeId, setActiveId] = useState(defaultPairId ?? pairs[0].id);
  const [timeframe, setTimeframe] = useState<Timeframe>("1H");
  const [hovered, setHovered] = useState<number | null>(null);

  const pair = pairs.find((item) => item.id === activeId) ?? pairs[0];
  const candles = pair.series[timeframe];

  const view = useMemo(() => {
    const highest = Math.max(...candles.map((candle) => candle.high));
    const lowest = Math.min(...candles.map((candle) => candle.low));
    const padding = (highest - lowest) * 0.12 || highest * 0.001;
    const max = highest + padding;
    const min = lowest - padding;
    const span = max - min || 1;
    const toY = (price: number) => ((max - price) / span) * 100;
    const ticks = Array.from({ length: 5 }, (_, index) => max - (span * index) / 4);

    return { max, min, toY, ticks };
  }, [candles]);

  const band = 100 / candles.length;
  const last = candles[candles.length - 1];
  const change = seriesChangePercent(candles);
  const readoutIndex = hovered ?? candles.length - 1;
  const readout = candles[readoutIndex];
  const previousClose =
    readoutIndex > 0 ? candles[readoutIndex - 1].close : readout.open;

  const sessionHigh = Math.max(...candles.map((candle) => candle.high));
  const sessionLow = Math.min(...candles.map((candle) => candle.low));

  const timeAxis = useMemo(() => {
    const labels = 6;
    return Array.from({ length: labels }, (_, index) => {
      const candleIndex = Math.round((index * (candles.length - 1)) / (labels - 1));
      const time = candles[candleIndex].time;
      return {
        key: `${candles[candleIndex].time}-${index}`,
        label: timeframe === "1D" ? formatDay(time) : formatTime(time),
      };
    });
  }, [candles, timeframe]);

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    if (rect.width === 0) return;
    const ratio = (event.clientX - rect.left) / rect.width;
    const index = Math.floor(ratio * candles.length);
    setHovered(Math.min(candles.length - 1, Math.max(0, index)));
  };

  const tableRows = candles.slice(-8).reverse();

  return (
    <div className="panel overflow-hidden">
      <div className="flex flex-col gap-3 border-b border-line px-4 py-3.5 sm:px-5 lg:flex-row lg:items-center lg:justify-between">
        <div
          role="tablist"
          aria-label="Select a currency pair"
          className="-mx-1 flex flex-wrap gap-1"
        >
          {pairs.map((item) => {
            const selected = item.id === pair.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => {
                  setActiveId(item.id);
                  setHovered(null);
                }}
                className={[
                  "rounded-[2px] px-2.5 py-1.5 font-mono text-xs font-medium transition-colors",
                  selected
                    ? "bg-terminal-800 text-signal-300 ring-1 ring-signal-600/30 ring-inset"
                    : "text-mist-400 hover:bg-terminal-850 hover:text-mist-200",
                ].join(" ")}
              >
                {item.symbol}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="label-mono">Simulated</span>
          <div
            role="group"
            aria-label="Select a timeframe"
            className="inline-flex rounded-[2px] border border-line bg-terminal-950/70 p-0.5"
          >
            {TIMEFRAMES.map((option) => {
              const selected = option === timeframe;
              return (
                <button
                  key={option}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => {
                    setTimeframe(option);
                    setHovered(null);
                  }}
                  className={[
                    "rounded-[2px] px-2.5 py-1 font-mono text-[0.7rem] font-medium transition-colors",
                    selected
                      ? "bg-signal-500/15 text-signal-300"
                      : "text-mist-400 hover:text-mist-200",
                  ].join(" ")}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-4 px-4 pt-4 sm:px-5">
        <div>
          <p className="font-mono text-[0.62rem] tracking-[0.18em] text-mist-500 uppercase">
            {pair.name}
          </p>
          <div className="mt-1.5 flex flex-wrap items-center gap-2.5">
            <span className="mono-num text-2xl font-semibold text-mist-100 sm:text-3xl">
              {formatPrice(pair.price, pair.digits)}
            </span>
            <TrendPill percent={pair.changePercent} />
          </div>
        </div>

        <dl className="flex gap-5">
          <div>
            <dt className="font-mono text-[0.58rem] tracking-wider text-mist-600 uppercase">
              Session high
            </dt>
            <dd className="mono-num mt-1 text-xs text-mist-300">
              {formatPrice(sessionHigh, pair.digits)}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[0.58rem] tracking-wider text-mist-600 uppercase">
              Session low
            </dt>
            <dd className="mono-num mt-1 text-xs text-mist-300">
              {formatPrice(sessionLow, pair.digits)}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[0.58rem] tracking-wider text-mist-600 uppercase">
              Spread
            </dt>
            <dd className="mono-num mt-1 text-xs text-mist-300">
              {formatSpread(pair.spread)}
            </dd>
          </div>
        </dl>
      </div>

      <div className="grid gap-6 px-4 py-4 sm:px-5 lg:grid-cols-[minmax(0,1fr)_13rem] lg:gap-5">
        <div className="min-w-0">
          <div className="flex gap-2">
            <div className="min-w-0 flex-1">
              <div
                role="img"
                aria-label={`${pair.symbol} ${timeframe} candlestick chart built from simulated data. Hover or tap a candle to read its open, high, low, and close.`}
                onPointerMove={onPointerMove}
                onPointerDown={onPointerMove}
                onPointerLeave={() => setHovered(null)}
                className={`relative ${PLOT_HEIGHT} cursor-crosshair touch-pan-y`}
              >
                <CandleReadout
                  candle={readout}
                  pair={pair}
                  timeframe={timeframe}
                  previousClose={previousClose}
                />

                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                  focusable="false"
                  className="absolute inset-0 h-full w-full"
                >
                  {[0, 25, 50, 75, 100].map((position) => (
                    <line
                      key={`h-${position}`}
                      x1={0}
                      x2={100}
                      y1={position}
                      y2={position}
                      stroke={GRID}
                      strokeWidth={1}
                      vectorEffect="non-scaling-stroke"
                    />
                  ))}
                  {[20, 40, 60, 80].map((position) => (
                    <line
                      key={`v-${position}`}
                      x1={position}
                      x2={position}
                      y1={0}
                      y2={100}
                      stroke={GRID}
                      strokeWidth={1}
                      vectorEffect="non-scaling-stroke"
                      opacity={0.7}
                    />
                  ))}

                  {hovered !== null ? (
                    <>
                      <rect
                        x={hovered * band}
                        y={0}
                        width={band}
                        height={100}
                        fill={HOVER_TINT}
                        opacity={0.05}
                      />
                      <line
                        x1={hovered * band + band / 2}
                        x2={hovered * band + band / 2}
                        y1={0}
                        y2={100}
                        stroke={HAIRLINE}
                        strokeWidth={1}
                        opacity={0.4}
                        vectorEffect="non-scaling-stroke"
                      />
                    </>
                  ) : null}

                  {candles.map((candle, index) => {
                    const rising = candle.close >= candle.open;
                    const color = rising ? UP : DOWN;
                    const center = index * band + band / 2;
                    const bodyWidth = band * 0.56;
                    const top = view.toY(Math.max(candle.open, candle.close));
                    const bottom = view.toY(Math.min(candle.open, candle.close));

                    return (
                      <g key={candle.time}>
                        <line
                          x1={center}
                          x2={center}
                          y1={view.toY(candle.high)}
                          y2={view.toY(candle.low)}
                          stroke={color}
                          strokeWidth={1}
                          opacity={0.75}
                          vectorEffect="non-scaling-stroke"
                        />
                        <rect
                          x={center - bodyWidth / 2}
                          y={top}
                          width={bodyWidth}
                          height={Math.max(bottom - top, 0.4)}
                          fill={color}
                          opacity={0.92}
                        />
                      </g>
                    );
                  })}

                  <line
                    x1={0}
                    x2={100}
                    y1={view.toY(last.close)}
                    y2={view.toY(last.close)}
                    stroke={UP}
                    strokeWidth={1}
                    opacity={0.45}
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </div>

              <div className="mt-2 flex justify-between font-mono text-[0.6rem] text-mist-500">
                {timeAxis.map((tick, index) => (
                  <span
                    key={tick.key}
                    className={
                      index === 0
                        ? "text-left"
                        : index === timeAxis.length - 1
                          ? "text-right"
                          : "text-center"
                    }
                  >
                    {tick.label}
                  </span>
                ))}
              </div>
            </div>

            <div
              className={`relative w-14 shrink-0 sm:w-16 ${PLOT_HEIGHT}`}
              aria-hidden="true"
            >
              {view.ticks.map((tick, index) => (
                <span
                  key={tick}
                  className="mono-num absolute right-0 -translate-y-1/2 text-[0.6rem] text-mist-500 sm:text-[0.65rem]"
                  style={{ top: `${(index / (view.ticks.length - 1)) * 100}%` }}
                >
                  {formatPrice(tick, pair.digits)}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line/70 pt-3">
            <span className="flex items-center gap-1.5 text-[0.65rem] text-mist-500">
              <span className="h-2 w-2 rounded-sm bg-signal-500" />
              Bullish
            </span>
            <span className="flex items-center gap-1.5 text-[0.65rem] text-mist-500">
              <span className="h-2 w-2 rounded-sm bg-loss-500" />
              Bearish
            </span>
            <span className="flex items-center gap-1.5 text-[0.65rem] text-mist-500">
              <span className="h-px w-4 bg-signal-400/60" />
              Last price
            </span>
            <span className="ml-auto hidden text-[0.65rem] text-mist-600 sm:block">
              Hover the chart to inspect a candle
            </span>
          </div>

          <dl className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:hidden">
            <StatTile label="Session open" value={formatPrice(candles[0].open, pair.digits)} />
            <StatTile label="Last close" value={formatPrice(last.close, pair.digits)} />
            <StatTile label={`${timeframe} change`} value={formatPercent(change)} />
            <StatTile label="Candles" value={String(candles.length)} />
            <StatTile label="Range" value={formatPrice(sessionHigh - sessionLow, pair.digits)} />
            <StatTile label="Digits" value={String(pair.digits)} />
          </dl>
        </div>

        <aside className="hidden lg:block">
          <div className="rounded-[2px] border border-line/70 bg-terminal-950/40 p-3.5">
            <h3 className="font-mono text-[0.6rem] tracking-[0.2em] text-mist-500 uppercase">
              Session stats
            </h3>
            <dl className="mt-3 grid grid-cols-2 gap-2">
              <StatTile label="Open" value={formatPrice(candles[0].open, pair.digits)} />
              <StatTile label="Close" value={formatPrice(last.close, pair.digits)} />
              <StatTile label="High" value={formatPrice(sessionHigh, pair.digits)} />
              <StatTile label="Low" value={formatPrice(sessionLow, pair.digits)} />
              <StatTile label={`${timeframe} move`} value={formatPercent(change)} />
              <StatTile label="Candles" value={String(candles.length)} />
            </dl>
            <p className="mt-3 text-[0.65rem] leading-relaxed text-mist-600">
              Generated locally from a fixed seed. Refresh the page and the
              series is identical.
            </p>
          </div>
        </aside>
      </div>

      <div className="border-t border-line px-4 py-3 sm:px-5">
        <details className="group">
          <summary className="cursor-pointer text-xs text-mist-400 transition-colors hover:text-mist-200">
            View the last 8 simulated candles
          </summary>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[28rem] text-left font-mono text-[0.68rem]">
              <caption className="sr-only">
                Simulated {pair.symbol} {timeframe} candles, not live quotes
              </caption>
              <thead>
                <tr className="text-mist-600">
                  <th scope="col" className="py-1.5 pr-3 font-medium">
                    Time (UTC)
                  </th>
                  <th scope="col" className="py-1.5 pr-3 font-medium">
                    Open
                  </th>
                  <th scope="col" className="py-1.5 pr-3 font-medium">
                    High
                  </th>
                  <th scope="col" className="py-1.5 pr-3 font-medium">
                    Low
                  </th>
                  <th scope="col" className="py-1.5 font-medium">
                    Close
                  </th>
                </tr>
              </thead>
              <tbody className="mono-num">
                {tableRows.map((candle) => (
                  <tr key={candle.time} className="border-t border-line/50">
                    <td className="py-1.5 pr-3 text-mist-500">
                      {timeframe === "1D"
                        ? formatDay(candle.time)
                        : formatTime(candle.time)}
                    </td>
                    <td className="py-1.5 pr-3 text-mist-300">
                      {formatPrice(candle.open, pair.digits)}
                    </td>
                    <td className="py-1.5 pr-3 text-mist-300">
                      {formatPrice(candle.high, pair.digits)}
                    </td>
                    <td className="py-1.5 pr-3 text-mist-300">
                      {formatPrice(candle.low, pair.digits)}
                    </td>
                    <td
                      className={
                        candle.close >= candle.open
                          ? "py-1.5 text-signal-300"
                          : "py-1.5 text-loss-300"
                      }
                    >
                      {formatPrice(candle.close, pair.digits)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      </div>
    </div>
  );
}
