import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { ArrowUpRight, Mail, MapPin } from "@/components/ui/Icons";

const PLATFORM_LINKS = [
  { href: "/#markets", label: "Market overview" },
  { href: "/#chart", label: "Candlestick chart" },
  { href: "/#features", label: "Features" },
  { href: "/chat", label: "Chat" },
] as const;

const COMPANY_LINKS = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/about#disclaimer", label: "Disclaimer" },
] as const;

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="shell grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.1fr]">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-5 text-sm leading-relaxed text-mist-400">
            A forex workspace for reading the session: pair overviews,
            candlestick detail, and a direct line to the desk.
          </p>
          <p className="mt-5 font-mono text-[0.62rem] tracking-[0.22em] text-mist-600 uppercase">
            super-trading.com
          </p>
        </div>

        <nav aria-label="Platform" className="text-sm">
          <h2 className="label-mono">Platform</h2>
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
          <h2 className="label-mono">Company</h2>
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
          <h2 className="label-mono">Desk</h2>
          <ul className="mt-4 space-y-3 text-mist-300">
            <li className="flex items-start gap-2.5">
              <Mail className="mt-0.5 h-4 w-4 text-signal-400" />
              hello@super-trading.com
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 text-signal-400" />
              <span>
                Office address
                <span className="mt-0.5 block text-xs text-mist-500">
                  to be confirmed
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

      <div className="border-t border-line">
        <div className="shell flex flex-col gap-2 py-5 text-[0.7rem] leading-relaxed text-mist-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Super Trading</p>
          <p className="max-w-xl sm:text-right">
            Prices on this site are simulated, not live market quotes. Nothing
            here is investment advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
