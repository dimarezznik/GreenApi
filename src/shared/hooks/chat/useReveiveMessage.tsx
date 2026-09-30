import { useEffect, type Dispatch, type SetStateAction } from "react";

import { chatApi } from "../../../shared/api/chat";
import type { GreenApiCredentials } from "../../../shared/types/api";
import type { ChatMessage } from "../../types/chat";

interface ReceiveMessagesParams {
  credentials: GreenApiCredentials | null;
  chatId: string | null;
  setMessages: Dispatch<SetStateAction<ChatMessage[]>>;
  onError: (message: string) => void;
}

export function useReceiveMessages({
  credentials,
  chatId,
  setMessages,
  onError,
}: ReceiveMessagesParams) {
  useEffect(() => {
    if (!credentials || !chatId) {
      return;
    }

    const controller = new AbortController();

    const receiveMessages = async () => {
      while (!controller.signal.aborted) {
        try {
          const notification = await chatApi.receiveNotification(
            credentials,
            controller.signal,
          );
          if (!notification) {
            continue;
          }
          const { body, receiptId } = notification;
          if (
            body.typeWebhook === "incomingMessageReceived" &&
            body.senderData.chatId === chatId &&
            body.messageData.typeMessage === "textMessage"
          ) {
            const text = body.messageData.textMessageData?.textMessage;
            if (text) {
              setMessages((currentMessages) => {
                const exists = currentMessages.some(
                  (message) => message.id === body.idMessage,
                );
                if (exists) return currentMessages;

                return [
                  ...currentMessages,
                  {
                    id: body.idMessage,
                    text,
                    direction: "incoming",
                    timestamp: body.timestamp.toString(),
                  },
                ];
              });
            }
          }

          await chatApi.deleteNotification(
            credentials,
            receiptId,
            controller.signal,
          );
        } catch (e) {
          console.debug(e);
          if (controller.signal.aborted) return;

          onError("Не удалось получить новое сообщение");
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
    };
    receiveMessages();
    return () => controller.abort();
  }, [credentials, chatId, setMessages, onError]);
}
