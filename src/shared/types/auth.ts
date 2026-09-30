export type InstanceState =
  | "authorized"
  | "notAuthorized"
  | "starting"
  | "blocked"
  | "suspended"
  | "pendingPassword";

export interface GetStateInstanceResponse {
  stateInstance: InstanceState;
}

export interface StartAuthorizationResponse {
  status: boolean;
  data: {
    status: "success" | "fail";
    reason?: string;
    retryAfter?: number;
  };
}

export interface SendAuthorizationCodeResponse {
  status: boolean;
  data: {
    status: "success" | "fail";
    reason?: string;
  };
}