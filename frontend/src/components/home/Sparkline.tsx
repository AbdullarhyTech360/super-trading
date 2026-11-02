import { trendOf } from "@/lib/format";

interface SparklineProps {
  values: number[];
  /** Unique suffix for the gradient id, e.g. the pair id. */
  id: string;
  className?: string;
}

const STROKE = { up: "#22d46b", down: "#ef4b53", flat: "#71808f" } as const;

/** Tiny non-interactive trend line. Purely decorative, hidden from a11y tree. */
export function Sparkline({ values, id, className }: SparklineProps) {
  if (values.length < 2) return null;

  const width = 100;
  const height = 32;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const trend = trendOf(values[values.length - 1] - values[0]);
  const stroke = STROKE[trend];

  const points = values.map((value, index) => {
    const x = (index / (values.length - 1)) * width;
    const y = height - ((value - min) / span) * height;
    return `${index === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
  });

  const line = points.join(" ");
  const area = `${line} L${width} ${height} L0 ${height} Z`;
  const gradientId = `spark-${id}`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.3" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gradientId})`} />
      <path
        d={line}
        fill="none"
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
