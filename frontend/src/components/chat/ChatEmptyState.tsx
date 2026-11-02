"use client";

import { Avatar } from "@/components/chat/Avatar";
import { Chat } from "@/components/ui/Icons";
import type { Conversation } from "@/types/chat";

interface ChatEmptyStateProps {
  conversations: Conversation[];
  onSelect: (id: string) => void;
}

export function ChatEmptyState({
  conversations,
  onSelect,
}: ChatEmptyStateProps) {
  return (
    <div className="relative flex min-h-0 flex-1 flex-col items-center justify-center px-6 py-12 text-center">
      <div
        aria-hidden="true"
        className="bg-grid absolute inset-0 opacity-[0.09] [mask-image:radial-gradient(55%_55%_at_50%_45%,black,transparent)]"
      />

      <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-line bg-terminal-850">
        <Chat className="h-6 w-6 text-signal-500" />
      </span>
      <h2 className="relative mt-4 text-base font-semibold text-mist-100">
        No conversation selected
      </h2>
      <p className="relative mt-2 max-w-sm text-sm leading-relaxed text-mist-400">
        Choose a fictional conversation from the list to preview the chat
        experience. Messages you send stay in this browser tab and disappear on
        refresh.
      </p>

      <div className="relative mt-6 flex flex-wrap justify-center gap-2">
        {conversations.slice(0, 3).map((conversation) => (
          <button
            key={conversation.id}
            type="button"
            onClick={() => onSelect(conversation.id)}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-terminal-850 py-1 pr-3 pl-1.5 text-xs text-mist-300 transition-colors hover:border-signal-600/50 hover:text-signal-200"
          >
            <Avatar
              initials={conversation.initials}
              tone={conversation.avatarTone}
              size="xs"
            />
            {conversation.name}
          </button>
        ))}
      </div>
    </div>
  );
}
