"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { formatLocalClock } from "@/lib/format";
import type { ChatMessage, Conversation } from "@/types/chat";

const MAX_MESSAGE_LENGTH = 500;

/**
 * Local-only chat state for the demo page.
 *
 * Messages are held in React state, so they disappear on refresh by design.
 * Swapping this hook for an API client is the only change a real backend needs.
 */
export function useDemoChat(seed: Conversation[]) {
  const [conversations, setConversations] = useState<Conversation[]>(seed);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");
  const localIdCounter = useRef(0);

  const activeConversation =
    conversations.find((conversation) => conversation.id === activeId) ?? null;

  const filteredConversations = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return conversations;

    return conversations.filter((conversation) => {
      const haystack = [
        conversation.name,
        conversation.role,
        ...conversation.messages.map((message) => message.body),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(term);
    });
  }, [conversations, query]);

  const selectConversation = useCallback((id: string) => {
    setActiveId(id);
    setDraft("");
    setConversations((previous) =>
      previous.map((conversation) =>
        conversation.id === id ? { ...conversation, unread: 0 } : conversation,
      ),
    );
  }, []);

  const clearSelection = useCallback(() => {
    setActiveId(null);
    setDraft("");
  }, []);

  const sendMessage = useCallback(() => {
    const body = draft.trim();
    if (!activeId || !body) return false;

    localIdCounter.current += 1;
    const message: ChatMessage = {
      id: `local-${localIdCounter.current}`,
      author: "me",
      body: body.slice(0, MAX_MESSAGE_LENGTH),
      time: formatLocalClock(new Date()),
    };

    setConversations((previous) =>
      previous.map((conversation) =>
        conversation.id === activeId
          ? {
              ...conversation,
              unread: 0,
              messages: [...conversation.messages, message],
            }
          : conversation,
      ),
    );
    setDraft("");
    return true;
  }, [activeId, draft]);

  const resetDemo = useCallback(() => {
    setConversations(seed);
    setActiveId(null);
    setQuery("");
    setDraft("");
    localIdCounter.current = 0;
  }, [seed]);

  return {
    conversations,
    filteredConversations,
    activeConversation,
    activeId,
    query,
    draft,
    maxLength: MAX_MESSAGE_LENGTH,
    setQuery,
    setDraft,
    selectConversation,
    clearSelection,
    sendMessage,
    resetDemo,
  };
}
