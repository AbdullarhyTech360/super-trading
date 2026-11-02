"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogoLink } from "@/components/layout/Logo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { ArrowUpRight, Close, Menu } from "@/components/ui/Icons";
import { isActivePath, NAV_LINKS } from "@/lib/nav";

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-terminal-950/90 backdrop-blur-md">
      <div className="shell flex h-16 items-center justify-between gap-4">
        <LogoLink />

        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = isActivePath(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={[
                  "relative py-1 text-[0.82rem] font-medium tracking-wide transition-colors",
                  active
                    ? "text-mist-100"
                    : "text-mist-400 hover:text-mist-100",
                ].join(" ")}
              >
                {link.label}
                {active ? (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1.5 left-0 h-px w-full bg-signal-400"
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/chat" className="btn btn-outline btn-sm hidden sm:inline-flex">
            Chat
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
          <Link href="/contact" className="btn btn-primary btn-sm lg:hidden">
            Contact
          </Link>
          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            className="btn btn-ghost -mr-2 h-9 w-9 border border-line p-0 lg:hidden"
          >
            {isOpen ? (
              <Close className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {isOpen ? (
        <div id="mobile-nav" className="border-t border-line lg:hidden">
          <nav aria-label="Mobile" className="shell flex flex-col py-2">
            {NAV_LINKS.map((link, index) => {
              const active = isActivePath(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "flex items-center justify-between border-b border-line/60 py-3 text-sm font-medium transition-colors last:border-b-0",
                    active ? "text-mist-100" : "text-mist-400",
                  ].join(" ")}
                >
                  <span className="flex items-baseline gap-3">
                    <span className="font-mono text-[0.55rem] tracking-[0.2em] text-mist-600">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {link.label}
                  </span>
                  {active ? (
                    <span className="h-1 w-1 bg-signal-400" />
                  ) : null}
                </Link>
              );
            })}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
