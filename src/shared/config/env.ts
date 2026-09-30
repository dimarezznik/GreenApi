import type { GreenApiCredentials } from "../types/api";

export const env = {
  greenApiUrl: import.meta.env.VITE_GREEN_API_URL,
} as const;

export const getInstancePath = (credentials: GreenApiCredentials) =>
  `/waInstance${credentials.idInstance}`;