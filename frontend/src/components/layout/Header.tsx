"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogoLink } from "@/components/layout/Logo";
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
    <header className="sticky top-0 z-40 border-b border-line/80 bg-terminal-950/85 backdrop-blur-md">
      <div className="shell flex h-16 items-center justify-between gap-4">
        <LogoLink />

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = isActivePath(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={[
                  "rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-terminal-800 text-signal-300"
                    : "text-mist-300 hover:bg-terminal-850 hover:text-mist-100",
                ].join(" ")}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/chat"
            className="btn btn-outline btn-sm hidden sm:inline-flex"
          >
            Open demo chat
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
            className="btn btn-ghost -mr-2 p-2"
          >
            {isOpen ? (
              <Close className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {isOpen ? (
        <div
          id="mobile-nav"
          className="border-t border-line bg-terminal-950/97 lg:hidden"
        >
          <nav aria-label="Mobile" className="shell flex flex-col gap-1 py-3">
            {NAV_LINKS.map((link) => {
              const active = isActivePath(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-terminal-800 text-signal-300"
                      : "text-mist-300 hover:bg-terminal-850 hover:text-mist-100",
                  ].join(" ")}
                >
                  {link.label}
                  {active ? (
                    <span className="h-1.5 w-1.5 rounded-full bg-signal-400" />
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
