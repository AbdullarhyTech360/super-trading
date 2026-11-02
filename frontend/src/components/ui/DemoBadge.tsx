interface DemoBadgeProps {
  label?: string;
  className?: string;
}

/**
 * Marks any surface that shows simulated values. Reused instead of free-text
 * so the label stays consistent across the site.
 */
export function DemoBadge({ label = "Demo data", className }: DemoBadgeProps) {
  return (
    <span
      className={["badge badge-demo", className].filter(Boolean).join(" ")}
    >
      <span className="h-1.5 w-1.5 animate-blink rounded-full bg-signal-400" />
      {label}
    </span>
  );
}
