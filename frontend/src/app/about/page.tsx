import type { Metadata } from "next";
import Link from "next/link";
import { CapabilityList } from "@/components/about/CapabilityList";
import { DisclaimerPanel } from "@/components/about/DisclaimerPanel";
import { MissionVision } from "@/components/about/MissionVision";
import { Roadmap } from "@/components/about/Roadmap";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { ArrowRight, Mail } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "About",
  description:
    "What Super Trading System is, what it is not, and how the demo build is structured. Company information is placeholder content until official details are supplied.",
};

const GLANCE = [
  { label: "Domain", value: "super-trading.com" },
  { label: "Focus", value: "Forex research workspace" },
  { label: "Frontend", value: "Next.js · TypeScript · Tailwind" },
  { label: "Backend", value: "FastAPI · SQLModel (planned)" },
  { label: "Market data", value: "Simulated, labelled demo data" },
  { label: "Status", value: "Frontend demo build" },
];

export default function AboutPage() {
  return (
    <div className="shell pb-4">
      <header className="pt-12 sm:pt-16">
        <div className="flex flex-wrap items-center gap-2">
          <p className="eyebrow">About</p>
          <DemoBadge label="Placeholder copy" />
        </div>
        <h1 className="mt-3 max-w-3xl text-3xl leading-tight font-semibold tracking-tight text-mist-100 sm:text-4xl lg:text-[2.9rem]">
          A forex workspace concept, built in the open.
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-mist-400 sm:text-base">
          Super Trading System is a demonstration build for a forex-focused
          website: a dark terminal-style interface with pair overviews,
          candlestick detail, company information, a contact route, and a
          fictional chat workspace. The official company description, branding,
          and contact details are placeholders and will be replaced before
          launch.
        </p>
      </header>

      <section
        aria-labelledby="intro-title"
        className="mt-10 grid gap-4 lg:grid-cols-[1.35fr_1fr]"
      >
        <div className="panel p-6 sm:p-7">
          <h2 id="intro-title" className="text-lg font-semibold text-mist-100">
            What we are building
          </h2>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-mist-400">
            <p>
              The first release concentrates on the parts of a trading site that
              visitors actually read: a market snapshot, a chart they can
              inspect, a company story that is easy to follow, and a contact
              route that tells them plainly whether their message was accepted.
            </p>
            <p>
              Data is simulated on purpose. Real quotes need a licensed provider,
              an agreement about redistribution, and a backend that can cache
              and throttle requests. Until those exist, every price on the site
              is generated locally from a fixed seed and labelled as demo data.
            </p>
            <p>
              The interface, component library, and type definitions are
              production-shaped, so the next phase swaps a data source rather
              than rebuilding the UI.
            </p>
          </div>
        </div>

        <div className="panel p-6">
          <h2 className="font-mono text-[0.62rem] tracking-[0.2em] text-mist-500 uppercase">
            At a glance
          </h2>
          <dl className="mt-4 divide-y divide-line/70">
            {GLANCE.map((item) => (
              <div
                key={item.label}
                className="flex items-baseline justify-between gap-4 py-2.5"
              >
                <dt className="text-xs text-mist-500">{item.label}</dt>
                <dd className="text-right text-xs font-medium text-mist-200">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <MissionVision />
      <CapabilityList />
      <Roadmap />
      <DisclaimerPanel />

      <section className="mt-14 flex flex-col gap-5 rounded-xl border border-line bg-terminal-900/50 px-5 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-mist-100">
            Questions about the build?
          </h2>
          <p className="mt-1.5 text-sm text-mist-400">
            Head back to the homepage for the chart, or use the contact form to
            see the validation states in action.
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <Link href="/contact" className="btn btn-primary">
            <Mail className="h-4 w-4" />
            Contact page
          </Link>
          <Link href="/" className="btn btn-outline">
            Back to home
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
