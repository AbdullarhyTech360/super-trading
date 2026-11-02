/**
 * Shared market-domain types.
 *
 * Every price in this project is simulated. The shapes here mirror what a
 * real market-data provider would return so the future FastAPI backend can
 * serve the same structures without touching the UI.
 */

export type Timeframe = "1H" | "4H" | "1D";

export interface Candle {
  /** UTC epoch milliseconds for the candle open. */
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface ForexPair {
  /** Stable slug, e.g. "eurusd". */
  id: string;
  /** Display symbol, e.g. "EUR/USD". */
  symbol: string;
  /** Human readable instrument name. */
  name: string;
  /** Decimal places used for quotes. */
  digits: number;
  /** Simulated spread in pips. */
  spread: number;
  /** Last simulated price (identical to the last candle close). */
  price: number;
  /** Simulated change over the last 24 hourly candles, in percent. */
  changePercent: number;
  /** Simulated 24h high and low. */
  high24h: number;
  low24h: number;
  /** Simulated candle series per timeframe. */
  series: Record<Timeframe, Candle[]>;
}

export interface ForexPairConfig {
  id: string;
  symbol: string;
  name: string;
  digits: number;
  spread: number;
  /** Price the simulated series ends on. */
  price: number;
  /** Relative per-candle volatility, e.g. 0.0018 for 0.18%. */
  volatility: number;
  /** Relative per-candle drift, positive for an uptrend. */
  drift: number;
}
