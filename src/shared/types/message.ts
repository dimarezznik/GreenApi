export interface ReceiveNotificationResponse {
  receiptId: number;
  body: IncomingMessageBody;
}

export interface IncomingMessageBody {
  typeWebhook: string;
  instanceData: InstanceData;
  timestamp: number;
  idMessage: string;
  senderData: SenderData;
  messageData: MessageData;
}

export interface InstanceData {
  idInstance: number;
  wid: string;
  typeInstance: string;
}

export interface SenderData {
  chatId: string;
  chatType: string;
  sender: string;
  chatName: string;
  senderName: string;
  senderType: string;
  senderContactName: string;
  senderPhoneNumber: number;
}

export interface MessageData {
  typeMessage: string;
  textMessageData?: TextMessageData;
}

export interface TextMessageData {
  textMessage: string;
}