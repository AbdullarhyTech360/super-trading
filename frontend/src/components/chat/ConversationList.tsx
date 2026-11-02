"use client";

import { Avatar } from "@/components/chat/Avatar";
import { Close, Search } from "@/components/ui/Icons";
import type { Conversation } from "@/types/chat";

interface ConversationListProps {
  conversations: Conversation[];
  activeId: string | null;
  total: number;
  query: string;
  onQueryChange: (value: string) => void;
  onSelect: (id: string) => void;
}

export function ConversationList({
  conversations,
  activeId,
  total,
  query,
  onQueryChange,
  onSelect,
}: ConversationListProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="border-b border-line px-3.5 py-3">
        <div className="flex items-center justify-between gap-2">
          <h2 className="label-mono">Inbox</h2>
          <span className="mono-num text-[0.6rem] text-mist-600">
            {total} threads
          </span>
        </div>

        <div className="relative mt-3">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2 text-mist-600" />
          <label htmlFor="chat-search" className="sr-only">
            Search conversations
          </label>
          <input
            id="chat-search"
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search name or message"
            className="input py-2 pr-8 pl-8 text-xs"
          />
          {query ? (
            <button
              type="button"
              onClick={() => onQueryChange("")}
              aria-label="Clear search"
              className="absolute top-1/2 right-1.5 -translate-y-1/2 rounded p-1 text-mist-500 hover:text-mist-200"
            >
              <Close className="h-3 w-3" />
            </button>
          ) : null}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="px-5 py-10 text-center">
            <p className="text-sm text-mist-300">No conversations match</p>
            <p className="mt-1.5 text-xs text-mist-500">
              Try a participant name or a word from a message.
            </p>
            <button
              type="button"
              onClick={() => onQueryChange("")}
              className="btn btn-outline btn-sm mt-4"
            >
              Clear search
            </button>
          </div>
        ) : (
          <ul className="divide-y divide-line/60">
            {conversations.map((conversation) => {
              const last = conversation.messages[conversation.messages.length - 1];
              const active = conversation.id === activeId;

              return (
                <li key={conversation.id}>
                  <button
                    type="button"
                    onClick={() => onSelect(conversation.id)}
                    aria-current={active ? "true" : undefined}
                    className={[
                      "flex w-full items-start gap-3 px-3.5 py-3 text-left transition-colors",
                      active
                        ? "bg-terminal-800"
                        : "hover:bg-terminal-850/70",
                    ].join(" ")}
                  >
                    <Avatar
                      initials={conversation.initials}
                      tone={conversation.avatarTone}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline justify-between gap-2">
                        <span className="truncate text-sm font-medium text-mist-100">
                          {conversation.name}
                        </span>
                        <span className="shrink-0 font-mono text-[0.58rem] text-mist-600">
                          {last?.time}
                        </span>
                      </span>
                      <span className="mt-0.5 flex items-center justify-between gap-2">
                        <span className="truncate text-xs text-mist-500">
                          {last?.author === "me" ? "You: " : ""}
                          {last?.body}
                        </span>
                        {conversation.unread > 0 ? (
                          <span className="mono-num flex h-4 min-w-4 shrink-0 items-center justify-center rounded-full bg-signal-500 px-1 text-[0.55rem] font-semibold text-terminal-950">
                            {conversation.unread}
                          </span>
                        ) : null}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <p className="border-t border-line px-3.5 py-2.5 text-[0.62rem] leading-relaxed text-mist-600">
        Simulated replies · nothing leaves this tab
      </p>
    </div>
  );
}
