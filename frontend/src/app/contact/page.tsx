import type { Metadata } from "next";
import Link from "next/link";
import { ContactDetails } from "@/components/contact/ContactDetails";
import { ContactForm } from "@/components/contact/ContactForm";
import { ArrowRight, Chat } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Send an enquiry to Super Trading. The form validates in the browser; delivery and storage arrive with the backend phase.",
};

export default function ContactPage() {
  return (
    <div className="shell pb-4">
      <header className="border-b border-line pt-14 pb-10 sm:pt-20">
        <p className="eyebrow">Contact</p>
        <h1 className="mt-4 max-w-3xl text-[2.2rem] leading-[1.05] font-semibold text-mist-100 sm:text-[3rem] lg:text-[3.4rem]">
          Tell us what is <span className="italic text-signal-300">missing</span>
        </h1>
        <p className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-mist-400">
          The form runs the full validation path — required fields, email format,
          message length, and a success state. Use it to see how the experience
          behaves, then tell us what should change.
        </p>
      </header>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <ContactForm />
        <ContactDetails />
      </div>

      <section
        aria-labelledby="contact-next-title"
        className="mt-14 flex flex-col gap-5 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h2
            id="contact-next-title"
            className="font-display text-base font-semibold text-mist-100"
          >
            Rather talk it through?
          </h2>
          <p className="mt-1.5 text-sm text-mist-400">
            The chat route holds six threads you can browse and reply to.
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <Link href="/chat" className="btn btn-primary">
            <Chat className="h-4 w-4" />
            Open chat
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
