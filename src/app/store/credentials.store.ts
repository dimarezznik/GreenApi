import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  AccountSettings,
  GreenApiCredentials,
} from "../../shared/types/api";

interface CredentialsState {
  credentials: GreenApiCredentials | null;
  accountSettings: AccountSettings | null;
  setCredentials: (credentials: GreenApiCredentials | null) => void;
  setAccountSettings: (accountSettings: AccountSettings | null) => void;
}

export const useCredentialsStore = create(
  persist<CredentialsState>(
    (set) => ({
      credentials: null,
      accountSettings: null,
      setCredentials: (credentials) => set({ credentials }),
      setAccountSettings: (accountSettings) => set({ accountSettings }),
    }),
    {
      name: "credential-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
