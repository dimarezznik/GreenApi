export type MessageDirection = "incoming" | "outgoing";

export type MessageStatus = "pending" | "sent" | "failed" | "received";

export interface Message {
  id: string;
  chatId: string;
  text: string;
  timestamp: number;
  direction: MessageDirection;
  status: MessageStatus;
}
