import { useState, type Dispatch, type SetStateAction } from "react";
import { chatApi } from "../../api/chat";
import type { GreenApiCredentials } from "../../types/api";
import type { ChatMessage } from "../../types/chat";

interface SendMessagesParams {
  credentials: GreenApiCredentials | null;
  chatId: string | null;
  setMessages: Dispatch<SetStateAction<ChatMessage[]>>;
  setError: Dispatch<SetStateAction<string | null>>;
}

export const useSendMessage = ({
  credentials,
  chatId,
  setMessages,
  setError,
}: SendMessagesParams) => {
  const [sending, setSending] = useState(false);
  const handleSendMessage = async (message: string) => {
    if (!credentials || !chatId) return false;
    setSending(true);
    setError(null);
    try {
      const response = await chatApi.sendMessage(credentials, chatId, message);
      setMessages((current) => [
        ...current,
        {
          id: response.idMessage,
          text: message,
          direction: "outgoing",
          timestamp: new Date().getTime().toString(),
        },
      ]);
      return true;
    } catch {
      setError("Не удалось отправить сообщение");
      return false;
    } finally {
      setSending(false);
    }
  };

  return { handleSendMessage, sending };
};
