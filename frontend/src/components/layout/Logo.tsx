import Link from "next/link";

interface LogoProps {
  /** Hide the wordmark, e.g. inside tight mobile rows. */
  markOnly?: boolean;
}

export function Logo({ markOnly = false }: LogoProps) {
  return (
    <span className="flex items-center gap-2.5">
      <svg
        viewBox="0 0 32 32"
        aria-hidden="true"
        className="h-8 w-8 shrink-0 drop-shadow-[0_0_12px_rgba(34,212,107,0.25)]"
      >
        <defs>
          <linearGradient id="sts-mark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#45e98a" />
            <stop offset="100%" stopColor="#16a75a" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="9" fill="url(#sts-mark)" />
        <g stroke="#04140c" strokeWidth="1.8" strokeLinecap="round">
          <path d="M11 8.5v3" />
          <path d="M11 19v4.5" />
          <path d="M16 6v2.5" />
          <path d="M16 17.5V26" />
          <path d="M21 8v3" />
          <path d="M21 20.5V24" />
        </g>
        <g fill="#04140c">
          <rect x="8.6" y="11.5" width="4.8" height="7.5" rx="1" />
          <rect x="13.6" y="8.5" width="4.8" height="9" rx="1" />
          <rect x="18.6" y="11" width="4.8" height="9.5" rx="1" />
        </g>
      </svg>
      {markOnly ? null : (
        <span className="leading-none">
          <span className="block text-[0.95rem] font-semibold tracking-tight text-mist-100">
            Super Trading
          </span>
          <span className="mt-1 block font-mono text-[0.55rem] tracking-[0.32em] text-mist-500 uppercase">
            System
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
      aria-label="Super Trading System — home"
      className="rounded-md transition-opacity hover:opacity-90"
    >
      <Logo />
    </Link>
  );
}
