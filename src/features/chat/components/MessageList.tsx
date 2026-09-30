import type { ChatMessage } from "../../../shared/types/chat";
import { Message } from "./Message";

interface MessageListProps {
  messages: ChatMessage[];
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 px-4 py-5">
      <div className="mx-auto flex max-w-3xl flex-col gap-2">
        {messages.length === 0 ? (
          <div className="flex flex-1 items-center justify-center py-20">
            <div className="max-w-xs text-center">
              <p className="text-sm font-medium text-slate-700">
                Здесь пока нет сообщений
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-400">
                Отправьте первое сообщение, чтобы начать диалог
              </p>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <Message key={message.id} message={message} />
          ))
        )}
      </div>
    </div>
  );
}
