import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { ArrowUpRight, Mail, MapPin } from "@/components/ui/Icons";

const PLATFORM_LINKS = [
  { href: "/#markets", label: "Market overview" },
  { href: "/#chart", label: "Candlestick chart" },
  { href: "/#features", label: "Features" },
  { href: "/chat", label: "Chat demo" },
] as const;

const COMPANY_LINKS = [
  { href: "/about", label: "About" },
  { href: "/about#roadmap", label: "Roadmap" },
  { href: "/contact", label: "Contact" },
  { href: "/about#disclaimer", label: "Disclaimer" },
] as const;

export function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-terminal-950/80">
      <div className="shell grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-mist-400">
            A demo-first forex workspace concept: clear market context, honest
            labelling, and a layout that works from phone to desk.
          </p>
          <p className="mt-4 font-mono text-[0.65rem] tracking-wider text-mist-600 uppercase">
            super-trading.com
          </p>
        </div>

        <nav aria-label="Platform" className="text-sm">
          <h2 className="font-mono text-[0.65rem] tracking-[0.22em] text-mist-500 uppercase">
            Platform
          </h2>
          <ul className="mt-4 space-y-2.5">
            {PLATFORM_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-mist-300 transition-colors hover:text-signal-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company" className="text-sm">
          <h2 className="font-mono text-[0.65rem] tracking-[0.22em] text-mist-500 uppercase">
            Company
          </h2>
          <ul className="mt-4 space-y-2.5">
            {COMPANY_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-mist-300 transition-colors hover:text-signal-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="text-sm">
          <h2 className="font-mono text-[0.65rem] tracking-[0.22em] text-mist-500 uppercase">
            Contact
          </h2>
          <ul className="mt-4 space-y-3 text-mist-300">
            <li className="flex items-start gap-2.5">
              <Mail className="mt-0.5 h-4 w-4 text-signal-500" />
              <span>
                hello@super-trading.com
                <span className="mt-1 block font-mono text-[0.6rem] tracking-wide text-mist-600 uppercase">
                  Placeholder
                </span>
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 text-signal-500" />
              <span>
                Office details to be confirmed
                <span className="mt-1 block font-mono text-[0.6rem] tracking-wide text-mist-600 uppercase">
                  Placeholder
                </span>
              </span>
            </li>
          </ul>
          <Link
            href="/contact"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-signal-300 hover:text-signal-200"
          >
            Send an enquiry
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      <div className="border-t border-line/80">
        <div className="shell flex flex-col gap-3 py-5 text-[0.7rem] leading-relaxed text-mist-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Super Trading System. Demo project.</p>
          <p className="max-w-xl sm:text-right">
            No live prices, no trading services, no investment advice. Trading
            foreign exchange carries a high level of risk.
          </p>
        </div>
      </div>
    </footer>
  );
}
