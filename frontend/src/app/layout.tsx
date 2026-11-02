import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Mono, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const SITE_NAME = "Super Trading";
const SITE_DESCRIPTION =
  "A forex workspace for reading the session: pair overviews, an inspectable candlestick chart, company background, and a direct line to the desk.";

export const metadata: Metadata = {
  metadataBase: new URL("https://super-trading.com"),
  title: {
    default: `${SITE_NAME} — Forex market workspace`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "forex",
    "trading terminal",
    "candlestick chart",
    "market overview",
    "currency pairs",
  ],
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Forex market workspace`,
    description: SITE_DESCRIPTION,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Forex market workspace`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  /* Single value; the script below and ThemeToggle rewrite it when the chosen
     theme differs from the operating-system preference. */
  themeColor: "#0a0908",
  colorScheme: "dark light",
};

/**
 * Applies the stored (or system) theme before first paint so the page never
 * flashes the wrong palette, and keeps the browser chrome colour in step with
 * it. Kept inline and tiny on purpose.
 */
const THEME_SCRIPT = `(function(){var C={dark:"#0a0908",light:"#f6f3ec"};try{var s=localStorage.getItem("sts-theme");var t=s==="light"||s==="dark"?s:(window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");document.documentElement.dataset.theme=t;var m=document.querySelector("meta[name=theme-color]");if(m)m.setAttribute("content",C[t]);}catch(e){document.documentElement.dataset.theme="dark";}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${fraunces.variable} ${instrumentSans.variable} ${plexMono.variable} h-full`}
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-dvh flex-col antialiased">
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <a
          href="#main-content"
          className="sr-only rounded-[2px] bg-signal-500 px-3 py-2 text-sm font-semibold text-terminal-950 focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
