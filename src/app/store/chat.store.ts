import { create } from "zustand";
import type { Chat } from "../../shared/types/chat";

interface ChatState {
  chats: Chat[];
  activeChatId: string | null;

  addChat: (chat: Chat) => void;

  setActiveChat: (chatId: string | null) => void;

  updateChat: (chatId: string, data: Partial<Chat>) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  chats: [],
  activeChatId: null,

  addChat: (chat) =>
    set((state) => ({
      chats: [...state.chats, chat],
    })),

  setActiveChat: (chatId) =>
    set({
      activeChatId: chatId,
    }),

  updateChat: (chatId, data) =>
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId ? { ...chat, ...data } : chat,
      ),
    })),
}));
