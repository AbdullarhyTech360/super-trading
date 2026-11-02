"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChatEmptyState } from "@/components/chat/ChatEmptyState";
import { ConversationList } from "@/components/chat/ConversationList";
import { MessageThread } from "@/components/chat/MessageThread";
import { Collapse, Expand } from "@/components/ui/Icons";
import { conversations as seedConversations } from "@/data/chat-data";
import { useChatSession } from "@/hooks/useChatSession";

/* Height of the two panes when the chat sits in the page flow. */
const DOCKED_HEIGHT = "h-[32rem] lg:h-[min(44rem,calc(100dvh-12rem))]";

const SUGGESTIONS = [
  "What is the spread on EUR/USD?",
  "Can you resend the session notes?",
  "Thanks — let's talk after the close.",
];

export function ChatShell() {
  const {
    conversations,
    filteredConversations,
    activeConversation,
    activeId,
    query,
    draft,
    isTyping,
    maxLength,
    setQuery,
    setDraft,
    selectConversation,
    clearSelection,
    sendMessage,
    resetSession,
  } = useChatSession(seedConversations);

  const [isFull, setIsFull] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  /**
   * A thread can open below the fold — the pane is tall and the page header
   * pushes it down — so bring the panel into view whenever it does not fit.
   * Full mode already fills the viewport.
   */
  const handleSelect = useCallback(
    (id: string) => {
      selectConversation(id);

      if (isFull) return;
      window.requestAnimationFrame(() => {
        const panel = panelRef.current;
        if (!panel) return;

        const rect = panel.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) return;

        panel.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    },
    [selectConversation, isFull],
  );

  /* Escape leaves full mode. */
  useEffect(() => {
    if (!isFull) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsFull(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isFull]);

  /*
   * Full mode owns the viewport: the page stops scrolling, and the offset taken
   * before entering is restored on the way out so the chat is not left behind.
   * `<html>` scrolls smoothly, hence the temporary override.
   */
  useEffect(() => {
    if (!isFull) return;

    const { body, documentElement } = document;
    const previousBody = body.style.overflow;
    const previousRoot = documentElement.style.overflow;
    const previousBehavior = documentElement.style.scrollBehavior;
    const offset = window.scrollY;

    body.style.overflow = "hidden";
    documentElement.style.overflow = "hidden";
    panelRef.current?.focus();

    return () => {
      body.style.overflow = previousBody;
      documentElement.style.overflow = previousRoot;
      documentElement.style.scrollBehavior = "auto";
      window.scrollTo(0, offset);
      documentElement.style.scrollBehavior = previousBehavior;
    };
  }, [isFull]);

  const columnSize = isFull ? "h-full min-h-0" : DOCKED_HEIGHT;

  return (
    <div
      ref={panelRef}
      tabIndex={-1}
      aria-label={isFull ? "Chat, full screen" : undefined}
      className={[
        "scroll-mt-20 overflow-hidden outline-none",
        isFull
          ? "fixed inset-0 z-50 flex flex-col bg-terminal-950"
          : "panel",
      ].join(" ")}
    >
      <div className="flex items-center justify-between gap-3 border-b border-line px-3.5 py-2">
        <p className="label-mono">
          Inbox · {conversations.length} threads
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={resetSession}
            className="font-mono text-[0.62rem] tracking-[0.14em] text-mist-500 uppercase transition-colors hover:text-mist-200"
          >
            Reset
          </button>

          {isFull ? (
            <button
              type="button"
              onClick={() => setIsFull(false)}
              className="btn btn-ghost btn-sm"
            >
              <Collapse className="h-3.5 w-3.5" />
              Exit full chat
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsFull(true)}
              className="btn btn-outline btn-sm"
            >
              <Expand className="h-3.5 w-3.5" />
              Full chat
            </button>
          )}
        </div>
      </div>

      <div
        className={[
          "grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[19rem_minmax(0,1fr)]",
          isFull ? "min-h-0 flex-1" : "",
        ].join(" ")}
      >
        <div
          className={[
            columnSize,
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
            onSelect={handleSelect}
          />
        </div>

        <div
          className={[
            columnSize,
            "min-h-0 flex-col bg-terminal-900/30",
            activeId ? "flex" : "hidden lg:flex",
          ].join(" ")}
        >
          {activeConversation ? (
            <MessageThread
              conversation={activeConversation}
              draft={draft}
              maxLength={maxLength}
              isTyping={isTyping}
              suggestions={SUGGESTIONS}
              onDraftChange={setDraft}
              onSend={sendMessage}
              onBack={clearSelection}
              onClose={clearSelection}
              isFull={isFull}
              onToggleFull={() => setIsFull((value) => !value)}
            />
          ) : (
            <ChatEmptyState
              conversations={conversations}
              onSelect={handleSelect}
            />
          )}
        </div>
      </div>
    </div>
  );
}
