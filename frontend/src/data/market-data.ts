import { buildForexPair } from "@/lib/market";
import type { ForexPair } from "@/types/market";

/**
 * The session snapshot the whole site reads from.
 *
 * Prices are generated locally from a fixed seed. They are NOT live, delayed,
 * or exchange-derived quotes and must never be presented as such.
 */
const PAIR_CONFIGS = [
  {
    id: "eurusd",
    symbol: "EUR/USD",
    name: "Euro / US Dollar",
    digits: 4,
    spread: 0.6,
    price: 1.0842,
    volatility: 0.0016,
    drift: 0.00018,
  },
  {
    id: "gbpusd",
    symbol: "GBP/USD",
    name: "British Pound / US Dollar",
    digits: 4,
    spread: 0.9,
    price: 1.2718,
    volatility: 0.0019,
    drift: -0.00012,
  },
  {
    id: "usdjpy",
    symbol: "USD/JPY",
    name: "US Dollar / Japanese Yen",
    digits: 2,
    spread: 0.7,
    price: 156.42,
    volatility: 0.0017,
    drift: 0.00026,
  },
  {
    id: "audusd",
    symbol: "AUD/USD",
    name: "Australian Dollar / US Dollar",
    digits: 4,
    spread: 1.1,
    price: 0.6584,
    volatility: 0.0021,
    drift: -0.00021,
  },
  {
    id: "usdcad",
    symbol: "USD/CAD",
    name: "US Dollar / Canadian Dollar",
    digits: 4,
    spread: 1.0,
    price: 1.3621,
    volatility: 0.0015,
    drift: 0.00009,
  },
  {
    id: "xauusd",
    symbol: "XAU/USD",
    name: "Gold / US Dollar",
    digits: 2,
    spread: 2.4,
    price: 2384.55,
    volatility: 0.0028,
    drift: 0.00031,
  },
];

export const marketPairs: ForexPair[] = PAIR_CONFIGS.map(buildForexPair);

/** The pair the homepage chart opens on. */
export const featuredPair: ForexPair = marketPairs[0];
