"use client";

import { Moon, Sun } from "@/components/ui/Icons";

const STORAGE_KEY = "sts-theme";

/* Browser-chrome colour per palette, kept in step with the token values. */
const THEME_COLOR = { dark: "#0a0908", light: "#f6f3ec" } as const;

/**
 * Swaps `data-theme` on <html>. The stored value is applied before paint by the
 * inline script in the root layout, and both icons are always rendered so the
 * correct one can be selected with CSS — no state, no hydration mismatch.
 */
export function ThemeToggle() {
  function toggle() {
    const current = document.documentElement.dataset.theme;
    const next = current === "light" ? "dark" : "light";

    document.documentElement.dataset.theme = next;

    const meta = document.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"]',
    );
    if (meta) meta.content = THEME_COLOR[next];

    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* Private mode: the toggle still works for this session. */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="btn btn-ghost h-9 w-9 border border-line p-0"
    >
      <Sun className="h-4 w-4 light:hidden" />
      <Moon className="hidden h-4 w-4 light:block" />
      <span className="sr-only light:hidden">Switch to light theme</span>
      <span className="sr-only hidden light:inline">Switch to dark theme</span>
    </button>
  );
}
