const TONES = [
  "border-signal-600/40 bg-signal-950/80 text-signal-300",
  "border-sky-500/30 bg-sky-950/60 text-sky-300",
  "border-amber-500/30 bg-amber-950/50 text-amber-300",
  "border-violet-500/30 bg-violet-950/50 text-violet-300",
  "border-rose-500/30 bg-rose-950/50 text-rose-300",
  "border-teal-500/30 bg-teal-950/50 text-teal-300",
];

const SIZES = {
  xs: "h-5 w-5 text-[0.5rem]",
  sm: "h-8 w-8 text-[0.62rem]",
  md: "h-10 w-10 text-xs",
  lg: "h-11 w-11 text-sm",
} as const;

interface AvatarProps {
  initials: string;
  tone: number;
  size?: keyof typeof SIZES;
  className?: string;
}

/** Initials avatar for a fictional chat participant. */
export function Avatar({ initials, tone, size = "md", className }: AvatarProps) {
  return (
    <span
      aria-hidden="true"
      className={[
        "flex shrink-0 items-center justify-center rounded-full border font-mono font-semibold tracking-wide",
        SIZES[size],
        TONES[tone % TONES.length],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {initials}
    </span>
  );
}
