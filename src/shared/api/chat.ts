import { axiosClient } from "./axios";
import type { AccountSettings, GreenApiCredentials } from "../types/api";
import type { IncomingNotification, SendMessageResponse } from "../types/chat";
import { getInstancePath } from "../config/env";

export const chatApi = {
  async getAccountSettings(
    credentials: GreenApiCredentials,
  ): Promise<AccountSettings> {
    const { data } = await axiosClient.get<AccountSettings>(
      `${getInstancePath(credentials)}/getAccountSettings/${credentials.apiTokenInstance}`,
    );
    return data;
  },

  async receiveNotification(
    credentials: GreenApiCredentials,
    signal?: AbortSignal,
  ): Promise<IncomingNotification | null> {
    const { data } = await axiosClient.get<IncomingNotification>(
      `${getInstancePath(credentials)}/receiveNotification/${credentials.apiTokenInstance}`,
      { params: { receiveTimeout: 60 }, signal },
    );
    if (!data?.receiptId) return null;
    return data;
  },

  async deleteNotification(
    credentials: GreenApiCredentials,
    receiptId: number,
    signal?: AbortSignal,
  ): Promise<void> {
    await axiosClient.delete(
      `${getInstancePath(credentials)}/deleteNotification/${credentials.apiTokenInstance}/${receiptId}`,
      { signal },
    );
  },

  async sendMessage(
    credentials: GreenApiCredentials,
    chatId: string,
    message: string,
  ): Promise<SendMessageResponse> {
    const { data } = await axiosClient.post<SendMessageResponse>(
      `${getInstancePath(credentials)}/sendMessage/${credentials.apiTokenInstance}`,
      { chatId, message },
    );
    return data;
  },
};
