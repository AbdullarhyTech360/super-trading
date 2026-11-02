import { ArrowDown, ArrowUp } from "@/components/ui/Icons";
import { formatPercent, trendOf } from "@/lib/format";

interface TrendPillProps {
  percent: number;
  className?: string;
}

const TONES = {
  up: "border-signal-600/30 bg-signal-950/80 text-signal-300",
  down: "border-loss-500/30 bg-loss-950/80 text-loss-300",
  flat: "border-line bg-terminal-800 text-mist-400",
} as const;

export function TrendPill({ percent, className }: TrendPillProps) {
  const trend = trendOf(percent);
  const Arrow = trend === "up" ? ArrowUp : ArrowDown;

  return (
    <span
      className={["badge", TONES[trend], className].filter(Boolean).join(" ")}
    >
      {trend === "flat" ? null : <Arrow className="h-3 w-3" />}
      {formatPercent(percent)}
    </span>
  );
}
