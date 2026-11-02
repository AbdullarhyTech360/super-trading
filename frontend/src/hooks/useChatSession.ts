"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { formatLocalClock } from "@/lib/format";
import type { ChatMessage, Conversation } from "@/types/chat";

const MAX_MESSAGE_LENGTH = 500;
const TYPING_DELAY_MS = 420;
const REPLY_MIN_MS = 1100;
const REPLY_MAX_MS = 2600;

/**
 * Browser-only chat session.
 *
 * Sending a message appends it immediately, then a simulated reply arrives
 * after a short pause so the thread behaves like a real conversation. Nothing
 * leaves the tab: swapping this hook for an API client is the only change a
 * real backend needs.
 */
export function useChatSession(seed: Conversation[]) {
  const [conversations, setConversations] = useState<Conversation[]>(seed);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");
  const [typingIn, setTypingIn] = useState<string | null>(null);

  const localId = useRef(0);
  const replyIndex = useRef<Record<string, number>>({});
  const timers = useRef<number[]>([]);
  const activeRef = useRef<string | null>(null);

  useEffect(() => {
    activeRef.current = activeId;
  }, [activeId]);

  useEffect(
    () => () => {
      timers.current.forEach((timer) => window.clearTimeout(timer));
      timers.current = [];
    },
    [],
  );

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

  const sendMessage = useCallback(
    (override?: string) => {
      const body = (override ?? draft).trim();
      if (!activeId || !body) return false;

      const conversationId = activeId;

      localId.current += 1;
      const message: ChatMessage = {
        id: `local-${localId.current}`,
        author: "me",
        body: body.slice(0, MAX_MESSAGE_LENGTH),
        time: formatLocalClock(new Date()),
      };

      setConversations((previous) =>
        previous.map((conversation) =>
          conversation.id === conversationId
            ? {
                ...conversation,
                unread: 0,
                messages: [...conversation.messages, message],
              }
            : conversation,
        ),
      );
      setDraft("");

      const thinkFor =
        REPLY_MIN_MS + Math.random() * (REPLY_MAX_MS - REPLY_MIN_MS);

      const typingTimer = window.setTimeout(
        () => setTypingIn(conversationId),
        TYPING_DELAY_MS,
      );

      const replyTimer = window.setTimeout(() => {
        setTypingIn((current) =>
          current === conversationId ? null : current,
        );

        setConversations((previous) =>
          previous.map((conversation) => {
            if (conversation.id !== conversationId) return conversation;

            const pool =
              conversation.replies.length > 0
                ? conversation.replies
                : ["Thanks — noted."];
            const index = replyIndex.current[conversationId] ?? 0;
            replyIndex.current[conversationId] = index + 1;

            const reply: ChatMessage = {
              id: `reply-${conversationId}-${index}`,
              author: "them",
              body: pool[index % pool.length],
              time: formatLocalClock(new Date()),
            };

            const isOpen = activeRef.current === conversationId;

            return {
              ...conversation,
              unread: isOpen ? 0 : conversation.unread + 1,
              messages: [...conversation.messages, reply],
            };
          }),
        );
      }, thinkFor);

      timers.current.push(typingTimer, replyTimer);
      return true;
    },
    [activeId, draft],
  );

  const resetSession = useCallback(() => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
    replyIndex.current = {};
    localId.current = 0;
    setConversations(seed);
    setActiveId(null);
    setQuery("");
    setDraft("");
    setTypingIn(null);
  }, [seed]);

  return {
    conversations,
    filteredConversations,
    activeConversation,
    activeId,
    query,
    draft,
    typingIn,
    isTyping: typingIn !== null && typingIn === activeId,
    maxLength: MAX_MESSAGE_LENGTH,
    setQuery,
    setDraft,
    selectConversation,
    clearSelection,
    sendMessage,
    resetSession,
  };
}
