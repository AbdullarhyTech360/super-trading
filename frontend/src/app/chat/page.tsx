import type { Metadata } from "next";
import Link from "next/link";
import { ChatShell } from "@/components/chat/ChatShell";
import { ArrowLeft, Mail } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Chat",
  description:
    "A conversation workspace: switch threads, read the history, and send a message to see a simulated reply.",
};

const NOTES = [
  {
    title: "Browser only",
    body: "The thread lives in this tab. A refresh restores the original transcript.",
  },
  {
    title: "Answers arrive",
    body: "Send a message and the participant replies after a short pause, so the rhythm feels real.",
  },
  {
    title: "No accounts",
    body: "There is no sign-in and no directory. Persistence arrives with the backend phase.",
  },
];

export default function ChatPage() {
  return (
    <div className="shell pb-4">
      <header className="border-b border-line pt-14 pb-10 sm:pt-20">
        <p className="eyebrow">04 — Chat</p>
        <h1 className="mt-4 max-w-3xl text-[2.2rem] leading-[1.05] font-semibold text-mist-100 sm:text-[3rem] lg:text-[3.4rem]">
          A conversation with <span className="italic text-signal-300">the desk</span>
        </h1>
        <p className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-mist-400">
          Switch threads, read the history, and write a message. Replies come
          back after a pause, and every exchange stays in your browser.
        </p>
      </header>

      <div className="mt-8">
        <ChatShell />
      </div>

      <section aria-labelledby="chat-notes-title" className="mt-10">
        <h2 id="chat-notes-title" className="label-mono">
          How this works
        </h2>
        <div className="mt-4 grid gap-px border border-line bg-line sm:grid-cols-3">
          {NOTES.map((note) => (
            <div key={note.title} className="bg-terminal-950 px-4 py-5">
              <h3 className="font-display text-[0.98rem] font-semibold text-mist-100">
                {note.title}
              </h3>
              <p className="mt-1.5 text-[0.8rem] leading-relaxed text-mist-500">
                {note.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 flex flex-col gap-5 border border-line px-5 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-base font-semibold text-mist-100">
            Need the enquiry form instead?
          </h2>
          <p className="mt-1.5 text-sm text-mist-400">
            The contact route walks through validation, errors, and the success
            state end to end.
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <Link href="/contact" className="btn btn-primary">
            <Mail className="h-4 w-4" />
            Contact
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
