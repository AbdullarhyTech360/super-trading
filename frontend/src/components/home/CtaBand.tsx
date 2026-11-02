import Link from "next/link";
import { ArrowRight, Chat, Mail } from "@/components/ui/Icons";

export function CtaBand() {
  return (
    <section className="shell pt-20 sm:pt-24">
      <div className="relative overflow-hidden border-y border-line py-12 sm:py-16">
        <div
          aria-hidden="true"
          className="bg-grid pointer-events-none absolute inset-0 opacity-[0.14] [mask-image:linear-gradient(to_right,black,transparent_70%)]"
        />

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">05 — Start</p>
            <h2 className="mt-4 text-[1.9rem] leading-[1.08] font-semibold text-mist-100 sm:text-[2.6rem]">
              Read the chart, then
              <br />
              <span className="italic text-signal-300">talk to the desk.</span>
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-mist-400">
              Four routes, one visual system, no sign-up. The enquiry form
              validates in the browser and tells you exactly what happened.
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="btn btn-primary px-5 py-3">
              <Mail className="h-4 w-4" />
              Send an enquiry
            </Link>
            <Link href="/chat" className="btn btn-outline px-5 py-3">
              <Chat className="h-4 w-4" />
              Open chat
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
