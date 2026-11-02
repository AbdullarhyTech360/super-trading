import Link from "next/link";

interface LogoProps {
  /** Hide the wordmark, e.g. inside tight mobile rows. */
  markOnly?: boolean;
}

/**
 * The mark is a framed staircase with the last step filled — a rising series
 * reduced to its simplest form.
 */
export function Logo({ markOnly = false }: LogoProps) {
  return (
    <span className="flex items-center gap-2.5">
      <svg
        viewBox="0 0 32 32"
        aria-hidden="true"
        className="h-8 w-8 shrink-0 text-signal-400"
      >
        <rect
          x="0.75"
          y="0.75"
          width="30.5"
          height="30.5"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.32"
        />
        <path
          d="M7 24.5V18h6v-6h6V6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="miter"
        />
        <rect x="24" y="3" width="5" height="5" fill="currentColor" />
      </svg>

      {markOnly ? null : (
        <span className="leading-none">
          <span className="block font-display text-[1.02rem] leading-none font-semibold tracking-[-0.02em] text-mist-100">
            Super Trading
          </span>
          <span className="mt-1.5 block font-mono text-[0.5rem] tracking-[0.34em] text-mist-500 uppercase">
            Forex workspace
          </span>
        </span>
      )}
    </span>
  );
}

export function LogoLink() {
  return (
    <Link
      href="/"
      aria-label="Super Trading — home"
      className="rounded-[2px] transition-opacity hover:opacity-85"
    >
      <Logo />
    </Link>
  );
}
