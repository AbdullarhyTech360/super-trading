import type { Metadata } from "next";
import Link from "next/link";
import { ChatShell } from "@/components/chat/ChatShell";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { ArrowLeft, Info, Mail } from "@/components/ui/Icons";
import { CHAT_DEMO_NOTICE } from "@/data/chat-demo";

export const metadata: Metadata = {
  title: "Chat demo",
  description:
    "A standalone demo chat workspace with fictional conversations, message history, and local sending. Nothing is transmitted or stored.",
};

const LIMITS = [
  {
    title: "Fictional participants",
    body: "Every name, role, and message is invented for the demo. No real users are represented.",
  },
  {
    title: "Nothing is saved",
    body: "Messages live in component state, so a refresh restores the original transcript.",
  },
  {
    title: "No accounts yet",
    body: "There is no authentication layer. Real conversations arrive with the backend phase.",
  },
];

export default function ChatPage() {
  return (
    <div className="shell pb-4">
      <header className="pt-12 sm:pt-16">
        <div className="flex flex-wrap items-center gap-2">
          <p className="eyebrow">Chat demo</p>
          <DemoBadge label="Fictional conversations" />
        </div>
        <h1 className="mt-3 max-w-3xl text-3xl leading-tight font-semibold tracking-tight text-mist-100 sm:text-4xl lg:text-[2.9rem]">
          A chat workspace, wired to nothing.
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-mist-400 sm:text-base">
          Explore the layout the support or trader messaging experience will
          eventually use: switch conversations, read the history, and send a
          message to watch it appear locally. Nothing leaves your browser.
        </p>

        <p className="mt-6 flex max-w-2xl items-start gap-2 rounded-lg border border-signal-600/25 bg-signal-950/30 px-3.5 py-3 text-[0.75rem] leading-relaxed text-signal-200/85">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-signal-400" />
          {CHAT_DEMO_NOTICE}
        </p>
      </header>

      <div className="mt-8">
        <ChatShell />
      </div>

      <section
        aria-labelledby="chat-limits-title"
        className="mt-6 grid gap-3 sm:grid-cols-3"
      >
        <h2 id="chat-limits-title" className="sr-only">
          Demo limitations
        </h2>
        {LIMITS.map((limit) => (
          <article
            key={limit.title}
            className="rounded-xl border border-line/70 bg-terminal-900/40 p-4"
          >
            <h3 className="text-xs font-semibold text-mist-200">
              {limit.title}
            </h3>
            <p className="mt-1.5 text-[0.78rem] leading-relaxed text-mist-500">
              {limit.body}
            </p>
          </article>
        ))}
      </section>

      <section className="mt-10 flex flex-col gap-5 rounded-xl border border-line bg-terminal-900/50 px-5 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-mist-100">
            Want to talk to the real thing?
          </h2>
          <p className="mt-1.5 text-sm text-mist-400">
            The contact form is simulated too, but it shows exactly how the
            enquiry flow will behave.
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <Link href="/contact" className="btn btn-primary">
            <Mail className="h-4 w-4" />
            Contact page
          </Link>
          <Link href="/" className="btn btn-outline">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </section>
    </div>
  );
}
