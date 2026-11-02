/**
 * Formatting helpers.
 *
 * Dates are always rendered in UTC with an explicit locale so the server and
 * the browser produce the same string (no hydration mismatches).
 */

const priceFormatters = new Map<number, Intl.NumberFormat>();

function priceFormatter(digits: number): Intl.NumberFormat {
  const cached = priceFormatters.get(digits);
  if (cached) return cached;

  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
    useGrouping: false,
  });
  priceFormatters.set(digits, formatter);
  return formatter;
}

export function formatPrice(value: number, digits = 2): string {
  return priceFormatter(digits).format(value);
}

/** Always keeps the sign so gains and losses read at a glance. */
export function formatSigned(value: number, digits = 2): string {
  const sign = value > 0 ? "+" : value < 0 ? "-" : "";
  return `${sign}${priceFormatter(digits).format(Math.abs(value))}`;
}

export function formatPercent(value: number, digits = 2): string {
  return `${formatSigned(value, digits)}%`;
}

const timeFormatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "UTC",
});

const dayFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  timeZone: "UTC",
});

const weekdayFormatter = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "2-digit",
  timeZone: "UTC",
});

export function formatTime(time: number): string {
  return timeFormatter.format(time);
}

export function formatDay(time: number): string {
  return dayFormatter.format(time);
}

export function formatWeekday(time: number): string {
  return weekdayFormatter.format(time);
}

/** Clock time for messages sent in the browser (client-only code paths). */
export function formatLocalClock(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

export function formatSpread(spread: number): string {
  return `${spread.toFixed(1)} pips`;
}

/** Splits the sign from a percentage for two-tone badges. */
export function trendOf(value: number): "up" | "down" | "flat" {
  if (value > 0) return "up";
  if (value < 0) return "down";
  return "flat";
}
