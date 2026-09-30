import { getInstancePath } from "../config/env";
import type { GreenApiCredentials } from "../types/api";
import { axiosClient } from "./axios";

export type InstanceState =
  | "authorized"
  | "notAuthorized"
  | "starting"
  | "blocked"
  | "suspended"
  | "pendingPassword";

interface GetStateInstanceResponse {
  stateInstance: InstanceState;
}

interface StartAuthorizationResponse {
  status: boolean;
  data: {
    status: "success" | "fail";
    reason?: string;
    retryAfter?: number;
  };
}

interface SendAuthorizationCodeResponse {
  status: boolean;
  data: {
    status: "success" | "fail";
    reason?: string;
  };
}

export const authApi = {
  async getStateInstance(
    credentials: GreenApiCredentials,
  ): Promise<InstanceState> {
    const response = await axiosClient.get<GetStateInstanceResponse>(
      `${getInstancePath(credentials)}/getStateInstance/${credentials.apiTokenInstance}`,
    );

    return response.data.stateInstance;
  },

  async startAuthorization(
    credentials: GreenApiCredentials,
    phoneNumber: string,
  ): Promise<StartAuthorizationResponse> {
    const response = await axiosClient.post<StartAuthorizationResponse>(
      `${getInstancePath(credentials)}/startAuthorization/${credentials.apiTokenInstance}`,
      { phoneNumber: Number(phoneNumber) },
    );

    return response.data;
  },

  async sendAuthorizationCode(
    credentials: GreenApiCredentials,
    code: string,
    password:string
  ): Promise<SendAuthorizationCodeResponse> {
    const response = await axiosClient.post<SendAuthorizationCodeResponse>(
      `${getInstancePath(credentials)}/sendAuthorizationCode/${credentials.apiTokenInstance}`,
      { code, password },
    );

    return response.data;
  },
};
