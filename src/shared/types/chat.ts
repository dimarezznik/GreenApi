import type { Message } from "./message";

export interface Chat {
  id: string;
  phone: string;
  title: string;
  messages: Message[];
}
