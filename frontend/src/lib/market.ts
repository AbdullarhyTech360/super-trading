import type {
  Candle,
  ForexPair,
  ForexPairConfig,
  Timeframe,
} from "@/types/market";

export const TIMEFRAMES: readonly Timeframe[] = ["1H", "4H", "1D"];

/**
 * Fixed anchor so server and client always build identical candle series.
 * Using `Date.now()` here would risk hydration mismatches.
 */
const ANCHOR_UTC = Date.UTC(2026, 9, 29, 20, 0, 0);

const TIMEFRAME_INTERVAL_MS: Record<Timeframe, number> = {
  "1H": 60 * 60 * 1000,
  "4H": 4 * 60 * 60 * 1000,
  "1D": 24 * 60 * 60 * 1000,
};

const TIMEFRAME_CANDLES: Record<Timeframe, number> = {
  "1H": 48,
  "4H": 42,
  "1D": 30,
};

/** Wider timeframes need wider ranges to stay readable. */
const TIMEFRAME_VOLATILITY_SCALE: Record<Timeframe, number> = {
  "1H": 1,
  "4H": 1.9,
  "1D": 3.2,
};

/** Small deterministic PRNG (mulberry32) so demo charts never reshuffle. */
function mulberry32(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashSeed(value: string): number {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function round(value: number, digits: number): number {
  return Number(value.toFixed(digits));
}

interface SeriesOptions {
  seedKey: string;
  endPrice: number;
  digits: number;
  timeframe: Timeframe;
  volatility: number;
  drift: number;
}

function generateSeries({
  seedKey,
  endPrice,
  digits,
  timeframe,
  volatility,
  drift,
}: SeriesOptions): Candle[] {
  const count = TIMEFRAME_CANDLES[timeframe];
  const interval = TIMEFRAME_INTERVAL_MS[timeframe];
  const scale = TIMEFRAME_VOLATILITY_SCALE[timeframe];
  const random = mulberry32(hashSeed(seedKey));
  const step = volatility * scale;

  // Walk backwards from the configured end price, then rebuild forwards so
  // the final candle always closes on the advertised price.
  const closes = new Array<number>(count);
  let price = endPrice;
  for (let index = count - 1; index >= 0; index -= 1) {
    closes[index] = price;
    const shock = (random() - 0.5) * 2 * step;
    price = price / (1 + shock + drift * scale);
  }

  return closes.map((close, index) => {
    const open = index === 0 ? closes[0] / (1 + drift * scale) : closes[index - 1];
    const bodyHigh = Math.max(open, close);
    const bodyLow = Math.min(open, close);
    const wickUp = random() * step * 0.9 * bodyHigh;
    const wickDown = random() * step * 0.9 * bodyLow;

    return {
      time: ANCHOR_UTC - (count - 1 - index) * interval,
      open: round(open, digits),
      high: round(Math.max(bodyHigh + wickUp, bodyHigh), digits),
      low: round(Math.max(bodyLow - wickDown, 0.0001), digits),
      close: round(close, digits),
    };
  });
}

/** Builds a fully simulated pair, including its 24h statistics. */
export function buildForexPair(config: ForexPairConfig): ForexPair {
  const series = {} as Record<Timeframe, Candle[]>;

  for (const timeframe of TIMEFRAMES) {
    series[timeframe] = generateSeries({
      seedKey: `${config.id}:${timeframe}`,
      endPrice: config.price,
      digits: config.digits,
      timeframe,
      volatility: config.volatility,
      drift: config.drift,
    });
  }

  const hourly = series["1H"];
  const last = hourly[hourly.length - 1];
  const reference = hourly[Math.max(0, hourly.length - 25)];
  const dayWindow = hourly.slice(-24);

  return {
    id: config.id,
    symbol: config.symbol,
    name: config.name,
    digits: config.digits,
    spread: config.spread,
    price: last.close,
    changePercent: ((last.close - reference.close) / reference.close) * 100,
    high24h: Math.max(...dayWindow.map((candle) => candle.high)),
    low24h: Math.min(...dayWindow.map((candle) => candle.low)),
    series,
  };
}

/** Closes of a series, used for sparklines. */
export function closesOf(candles: Candle[]): number[] {
  return candles.map((candle) => candle.close);
}

/** Percentage move between the first and last close of a series. */
export function seriesChangePercent(candles: Candle[]): number {
  if (candles.length < 2) return 0;
  const first = candles[0].close;
  const last = candles[candles.length - 1].close;
  return ((last - first) / first) * 100;
}
