"use client";

import { useEffect, useRef } from "react";
import { Avatar } from "@/components/chat/Avatar";
import { MessageComposer } from "@/components/chat/MessageComposer";
import { ChevronLeft, Close } from "@/components/ui/Icons";
import type { ChatMessage, Conversation } from "@/types/chat";

interface MessageThreadProps {
  conversation: Conversation;
  draft: string;
  maxLength: number;
  onDraftChange: (value: string) => void;
  onSend: () => void;
  onBack: () => void;
  onClose: () => void;
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const mine = message.author === "me";

  return (
    <div className={mine ? "flex flex-col items-end" : "flex flex-col items-start"}>
      <div
        className={[
          "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed sm:max-w-[75%]",
          mine
            ? "rounded-br-md border border-signal-600/30 bg-signal-500/10 text-mist-100"
            : "rounded-bl-md border border-line bg-terminal-850 text-mist-200",
        ].join(" ")}
      >
        {message.body}
      </div>
      <div className="mt-1 px-1 font-mono text-[0.58rem] text-mist-600">
        <time>{message.time}</time>
        {mine ? " · You" : ""}
      </div>
    </div>
  );
}

export function MessageThread({
  conversation,
  draft,
  maxLength,
  onDraftChange,
  onSend,
  onBack,
  onClose,
}: MessageThreadProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = scrollRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [conversation.id, conversation.messages.length]);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <header className="flex items-center gap-2.5 border-b border-line px-3 py-2.5 sm:px-4">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to conversation list"
          className="btn btn-ghost -ml-1 p-1.5 lg:hidden"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <Avatar
          initials={conversation.initials}
          tone={conversation.avatarTone}
          size="lg"
        />

        <div className="min-w-0 flex-1">
          <h2 className="truncate text-sm font-semibold text-mist-100">
            {conversation.name}
          </h2>
          <p className="truncate font-mono text-[0.6rem] text-mist-500">
            {conversation.role} · fictional
          </p>
        </div>

        <span className="badge badge-demo hidden sm:inline-flex">Demo</span>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close conversation"
          className="btn btn-ghost p-1.5"
        >
          <Close className="h-4 w-4" />
        </button>
      </header>

      <div
        ref={scrollRef}
        role="log"
        aria-label={`Demo transcript with ${conversation.name}`}
        className="min-h-0 flex-1 space-y-4 overflow-y-auto px-3.5 py-4 sm:px-5"
      >
        <div className="flex items-center gap-3">
          <span className="h-px flex-1 bg-line" />
          <span className="font-mono text-[0.55rem] tracking-[0.16em] text-mist-600 uppercase">
            Demo transcript · fictional
          </span>
          <span className="h-px flex-1 bg-line" />
        </div>

        {conversation.messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </div>

      <MessageComposer
        value={draft}
        maxLength={maxLength}
        onChange={onDraftChange}
        onSubmit={onSend}
      />
    </div>
  );
}
