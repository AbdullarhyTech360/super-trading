/**
 * Types for the `/chat` route. The backend will eventually replace the seed
 * data in `src/data/chat-data.ts` with persisted conversations.
 */

export type MessageAuthor = "me" | "them";

export interface ChatMessage {
  id: string;
  author: MessageAuthor;
  body: string;
  /** Display clock time, e.g. "09:42". */
  time: string;
}

export interface ChatParticipant {
  /** Palette index for the initials avatar (0-5). */
  avatarTone: number;
  /** Role line, e.g. "Prop desk · Stockholm". */
  role: string;
}

export interface Conversation extends ChatParticipant {
  id: string;
  name: string;
  initials: string;
  unread: number;
  messages: ChatMessage[];
  /** Canned responses used by the simulated reply loop, in order. */
  replies: string[];
}
