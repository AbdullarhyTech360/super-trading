"use client";

import { Send } from "@/components/ui/Icons";

interface MessageComposerProps {
  value: string;
  maxLength: number;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export function MessageComposer({
  value,
  maxLength,
  onChange,
  onSubmit,
}: MessageComposerProps) {
  const canSend = value.trim().length > 0;
  const remaining = maxLength - value.length;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (canSend) onSubmit();
    }
  };

  return (
    <div className="border-t border-line bg-terminal-950/40 px-3 py-3 sm:px-4">
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
          placeholder="Write a demo message…"
          className="input max-h-28 min-h-11 resize-none py-2.5 text-sm"
        />
        <button
          type="submit"
          disabled={!canSend}
          className="btn btn-primary h-11 shrink-0 px-3.5"
          aria-label="Send demo message"
        >
          <Send className="h-4 w-4" />
          <span className="hidden sm:inline">Send</span>
        </button>
      </form>

      <div className="mt-2 flex items-center justify-between gap-3 text-[0.6rem] text-mist-600">
        <span>Enter sends · Shift + Enter adds a line · demo only</span>
        <span className={remaining <= 0 ? "mono-num text-loss-300" : "mono-num"}>
          {value.length}/{maxLength}
        </span>
      </div>
    </div>
  );
}
