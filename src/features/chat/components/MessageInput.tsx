import { useState, type SubmitEvent } from "react";
import { Button } from "../../../shared/ui/button";

interface MessageInputProps {
  disabled?: boolean;
  loading?: boolean;
  onSubmit: (message: string) => Promise<boolean>;
}

export function MessageInput({
  disabled = false,
  loading = false,
  onSubmit,
}: MessageInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedMessage = message.trim();
    if (!trimmedMessage || disabled) return;
    const success = await onSubmit(trimmedMessage);
    if (success) {
      setMessage("");
    }
  };

  return (
    <div className="border-t border-slate-100 bg-white px-4 py-3">
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex max-w-3xl items-end gap-3"
      >
        <div className="flex min-h-12 flex-1 items-center rounded-2xl bg-slate-100 px-4 transition focus-within:bg-slate-50 focus-within:ring-2 focus-within:ring-blue-400/10">
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            disabled={disabled}
            rows={1}
            placeholder="Написать сообщение..."
            className="max-h-32 min-h-6 w-full resize-none bg-transparent py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 disabled:opacity-60"
          />
        </div>

        <Button
          type="submit"
          disabled={disabled || loading || !message.trim()}
          className="flex h-12 max-w-12 shrink-0 items-center justify-center rounded-full bg-blue-400 p-0 text-white shadow-sm transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Send
        </Button>
      </form>
    </div>
  );
}
