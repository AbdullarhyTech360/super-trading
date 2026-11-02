import type { Metadata } from "next";
import Link from "next/link";
import { ContactDetails } from "@/components/contact/ContactDetails";
import { ContactForm } from "@/components/contact/ContactForm";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { ArrowRight, Chat } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Super Trading System. The demo form validates in the browser; email delivery and storage arrive with the backend phase.",
};

export default function ContactPage() {
  return (
    <div className="shell pb-4">
      <header className="pt-12 sm:pt-16">
        <div className="flex flex-wrap items-center gap-2">
          <p className="eyebrow">Contact</p>
          <DemoBadge label="Simulated delivery" />
        </div>
        <h1 className="mt-3 max-w-3xl text-3xl leading-tight font-semibold tracking-tight text-mist-100 sm:text-4xl lg:text-[2.9rem]">
          Tell us what the demo is missing.
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-mist-400 sm:text-base">
          The form below runs the full validation path — required fields, email
          format, message length, and a success state — without sending
          anything. Use it to see how the experience behaves, then tell us what
          should change.
        </p>
      </header>

      <div className="mt-10 grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <ContactForm />
        <ContactDetails />
      </div>

      <section
        aria-labelledby="contact-next-title"
        className="mt-12 flex flex-col gap-5 rounded-xl border border-line bg-terminal-900/50 px-5 py-6 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h2
            id="contact-next-title"
            className="text-base font-semibold text-mist-100"
          >
            Looking for the demo chat instead?
          </h2>
          <p className="mt-1.5 text-sm text-mist-400">
            The /chat route holds six fictional conversations you can browse and
            reply to locally.
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <Link href="/chat" className="btn btn-primary">
            <Chat className="h-4 w-4" />
            Open chat demo
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
