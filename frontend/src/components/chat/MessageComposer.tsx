"use client";

import { Send } from "@/components/ui/Icons";

interface MessageComposerProps {
  value: string;
  maxLength: number;
  suggestions: string[];
  onChange: (value: string) => void;
  onSubmit: () => void;
  onQuickReply: (text: string) => void;
}

export function MessageComposer({
  value,
  maxLength,
  suggestions,
  onChange,
  onSubmit,
  onQuickReply,
}: MessageComposerProps) {
  const canSend = value.trim().length > 0;
  const remaining = maxLength - value.length;
  const showSuggestions = value.trim().length === 0;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (canSend) onSubmit();
    }
  };

  return (
    <div className="border-t border-line bg-terminal-950/40 px-3 py-3 sm:px-4">
      {showSuggestions ? (
        <div className="mb-2.5 flex flex-wrap gap-1.5">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => onQuickReply(suggestion)}
              className="rounded-[2px] border border-line px-2 py-1 text-left text-[0.68rem] text-mist-400 transition-colors hover:border-signal-600/60 hover:text-signal-300"
            >
              {suggestion}
            </button>
          ))}
        </div>
      ) : null}

      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (canSend) onSubmit();
        }}
        className="flex items-end gap-2"
      >
        <label htmlFor="chat-composer" className="sr-only">
          Message
        </label>
        <textarea
          id="chat-composer"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          maxLength={maxLength}
          placeholder="Write a message…"
          className="input max-h-28 min-h-11 resize-none py-2.5 text-sm"
        />
        <button
          type="submit"
          disabled={!canSend}
          className="btn btn-primary h-11 shrink-0 px-3.5"
          aria-label="Send message"
        >
          <Send className="h-4 w-4" />
          <span className="hidden sm:inline">Send</span>
        </button>
      </form>

      <div className="mt-2 flex items-center justify-between gap-3 text-[0.6rem] text-mist-600">
        <span>Enter sends · Shift + Enter adds a line</span>
        <span className={remaining <= 0 ? "mono-num text-loss-300" : "mono-num"}>
          {value.length}/{maxLength}
        </span>
      </div>
    </div>
  );
}
