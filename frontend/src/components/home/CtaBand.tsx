import Link from "next/link";
import { ArrowRight, Chat, Mail } from "@/components/ui/Icons";

export function CtaBand() {
  return (
    <section className="shell pt-16 sm:pt-20">
      <div className="panel relative overflow-hidden px-6 py-10 sm:px-10 sm:py-12">
        <div
          aria-hidden="true"
          className="bg-grid pointer-events-none absolute inset-0 opacity-[0.12] [mask-image:radial-gradient(70%_100%_at_20%_0%,black,transparent)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -bottom-24 h-64 w-64 rounded-full bg-signal-500/10 blur-3xl"
        />

        <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">Next step</p>
            <h2 className="mt-2.5 text-2xl font-semibold text-mist-100 sm:text-3xl">
              Walk the full demo, then tell us what is missing.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-mist-400">
              Four routes, one visual system, no sign-up. The contact form is
              simulated for now, so use it to see the validation states rather
              than to reach a real inbox.
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="btn btn-primary px-5 py-3">
              <Mail className="h-4 w-4" />
              Try the contact form
            </Link>
            <Link href="/chat" className="btn btn-outline px-5 py-3">
              <Chat className="h-4 w-4" />
              Open the chat demo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
