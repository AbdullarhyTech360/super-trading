"use client";

import { useEffect, useRef } from "react";
import { Avatar } from "@/components/chat/Avatar";
import { MessageComposer } from "@/components/chat/MessageComposer";
import { ChevronLeft, Close, Collapse, Expand } from "@/components/ui/Icons";
import type { ChatMessage, Conversation } from "@/types/chat";

interface MessageThreadProps {
  conversation: Conversation;
  draft: string;
  maxLength: number;
  isTyping: boolean;
  isFull: boolean;
  suggestions: string[];
  onDraftChange: (value: string) => void;
  onSend: (override?: string) => void;
  onBack: () => void;
  onClose: () => void;
  onToggleFull: () => void;
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const mine = message.author === "me";

  return (
    <div
      className={[
        "flex flex-col",
        mine ? "items-end" : "items-start",
        message.id.startsWith("local-") ? "animate-arrive" : "",
      ].join(" ")}
    >
      <div
        className={[
          "max-w-[85%] rounded-[2px] px-3.5 py-2.5 text-sm leading-relaxed sm:max-w-[75%]",
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

function TypingBubble({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-start">
      <div className="flex items-center gap-1.5 rounded-[2px] rounded-bl-md border border-line bg-terminal-850 px-3.5 py-3.5">
        {[0, 1, 2].map((dot) => (
          <span
            key={dot}
            className="animate-typing h-1.5 w-1.5 rounded-full bg-mist-300"
            style={{ animationDelay: `${dot * 0.16}s` }}
          />
        ))}
      </div>
      <span className="mt-1 px-1 font-mono text-[0.58rem] text-mist-600">
        {name} is typing
      </span>
    </div>
  );
}

export function MessageThread({
  conversation,
  draft,
  maxLength,
  isTyping,
  isFull,
  suggestions,
  onDraftChange,
  onSend,
  onBack,
  onClose,
  onToggleFull,
}: MessageThreadProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const firstName = conversation.name.split(" ")[0];

  useEffect(() => {
    const node = scrollRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [conversation.id, conversation.messages.length, isTyping]);

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
            {isTyping ? `${firstName} is replying…` : conversation.role}
          </p>
        </div>

        <button
          type="button"
          onClick={onToggleFull}
          aria-label={isFull ? "Exit full chat mode" : "Enter full chat mode"}
          aria-pressed={isFull}
          className="btn btn-ghost p-1.5"
        >
          {isFull ? (
            <Collapse className="h-4 w-4" />
          ) : (
            <Expand className="h-4 w-4" />
          )}
        </button>

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
        aria-label={`Transcript with ${conversation.name}`}
        className="min-h-0 flex-1 space-y-4 overflow-y-auto px-3.5 py-4 sm:px-5"
      >
        <div className="flex items-center gap-3">
          <span className="h-px flex-1 bg-line" />
          <span className="font-mono text-[0.55rem] tracking-[0.16em] text-mist-600 uppercase">
            Today
          </span>
          <span className="h-px flex-1 bg-line" />
        </div>

        {conversation.messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {isTyping ? <TypingBubble name={firstName} /> : null}

        <p aria-live="polite" className="sr-only">
          {isTyping ? `${firstName} is typing a reply` : ""}
        </p>
      </div>

      <MessageComposer
        value={draft}
        maxLength={maxLength}
        suggestions={suggestions}
        onChange={onDraftChange}
        onSubmit={() => onSend()}
        onQuickReply={(text) => onSend(text)}
      />
    </div>
  );
}
