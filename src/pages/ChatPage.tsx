import { useEffect, useState } from "react";
import { useCredentialsStore } from "../app/store/credentials.store";
import { chatApi } from "../shared/api/chat";
import { MessageList } from "../features/chat/components/MessageList";
import { MessageInput } from "../features/chat/components/MessageInput";
import type { ChatMessage } from "../shared/types/chat";
import { useReceiveMessages } from "../shared/hooks/chat/useReveiveMessage";
import { useSendMessage } from "../shared/hooks/chat/useSendMessage";

export function ChatPage() {
  const credentials = useCredentialsStore((state) => state.credentials);
  const [chatId, setChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { handleSendMessage, sending } = useSendMessage({
    credentials,
    chatId,
    setMessages,
    setError
  });

  const handleReceiveError = (message: string) => {
    setError(message);
  };

  useReceiveMessages({
    credentials,
    chatId,
    setMessages,
    onError: handleReceiveError,
  });

  useEffect(() => {
    if (!credentials) return;
    const getSettingsAccount = async () => {
      try {
        const data = await chatApi.getAccountSettings(credentials);
        setChatId(data.chatId);
      } catch (e) {
        console.debug(e);
      }
    };
    getSettingsAccount();
  }, [credentials]);

  return (
    <main className="min-h-screen p-4">
      <section className="mx-auto flex h-[calc(100vh-32px)] w-full max-w-xl flex-col overflow-hidden bg-white shadow-xl rounded-3xl">
        <MessageList messages={messages} />
        <MessageInput
          disabled={!chatId}
          loading={sending}
          onSubmit={handleSendMessage}
        />
        {error && (
          <p className="px-4 py-2 text-center text-xs text-red-500">{error}</p>
        )}
      </section>
    </main>
  );
}
