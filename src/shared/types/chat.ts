export interface CheckAccountResponse {
  exist?: boolean;
  chatId?: string;
  username?: string;
  phoneNumber?: number;

  status?: boolean;
  reason?: string;
}

export interface SendMessageResponse {
  idMessage: string;
}

export interface IncomingNotification {
  receiptId: number;
  body: {
    typeWebhook: string;
    idMessage: string;
    timestamp: number;

    senderData: {
      chatId: string;
      chatName?: string;
      senderName?: string;
      senderPhoneNumber?: number;
    };

    messageData: {
      typeMessage: string;
      textMessageData?: {
        textMessage: string;
      };
    };
  };
}

export interface ChatMessage {
  id: string;
  text: string;
  direction: "incoming" | "outgoing";
  timestamp: string;
}