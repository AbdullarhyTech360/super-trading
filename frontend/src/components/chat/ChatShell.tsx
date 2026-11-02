"use client";

import { ChatEmptyState } from "@/components/chat/ChatEmptyState";
import { ConversationList } from "@/components/chat/ConversationList";
import { MessageThread } from "@/components/chat/MessageThread";
import { demoConversations } from "@/data/chat-demo";
import { useDemoChat } from "@/hooks/useDemoChat";

const COLUMN_HEIGHT =
  "h-[32rem] lg:h-[min(44rem,calc(100dvh-12rem))]";

export function ChatShell() {
  const {
    conversations,
    filteredConversations,
    activeConversation,
    activeId,
    query,
    draft,
    maxLength,
    setQuery,
    setDraft,
    selectConversation,
    clearSelection,
    sendMessage,
    resetDemo,
  } = useDemoChat(demoConversations);

  return (
    <div className="panel overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-line bg-terminal-950/50 px-3.5 py-2">
        <p className="flex items-center gap-2 font-mono text-[0.58rem] tracking-[0.18em] text-mist-500 uppercase">
          <span className="h-1.5 w-1.5 animate-blink rounded-full bg-signal-400" />
          Local demo session
        </p>
        <button
          type="button"
          onClick={resetDemo}
          className="rounded px-1.5 py-0.5 text-[0.65rem] text-mist-500 transition-colors hover:text-mist-200"
        >
          Reset demo
        </button>
      </div>

      <div className="grid lg:grid-cols-[19rem_minmax(0,1fr)]">
        <div
          className={[
            COLUMN_HEIGHT,
            "min-h-0 flex-col border-line lg:flex lg:border-r",
            activeId ? "hidden" : "flex",
          ].join(" ")}
        >
          <ConversationList
            conversations={filteredConversations}
            activeId={activeId}
            total={conversations.length}
            query={query}
            onQueryChange={setQuery}
            onSelect={selectConversation}
          />
        </div>

        <div
          className={[
            COLUMN_HEIGHT,
            "min-h-0 flex-col bg-terminal-900/30",
            activeId ? "flex" : "hidden lg:flex",
          ].join(" ")}
        >
          {activeConversation ? (
            <MessageThread
              conversation={activeConversation}
              draft={draft}
              maxLength={maxLength}
              onDraftChange={setDraft}
              onSend={sendMessage}
              onBack={clearSelection}
              onClose={clearSelection}
            />
          ) : (
            <ChatEmptyState
              conversations={conversations}
              onSelect={selectConversation}
            />
          )}
        </div>
      </div>
    </div>
  );
}
