import { useState } from "react";
import { authApi } from "../../api/auth";
import type { GreenApiCredentials } from "../../types/api";
import type { AuthStep } from "../../../features/auth/types/auth-step";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../app/store/auth.store";

export const useAuthLogic = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [step, setStep] = useState<AuthStep>("credentials");
  const [credentials, setCredentials] = useState<GreenApiCredentials | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCredentialsSubmit = async (
    idInstance: string,
    apiTokenInstance: string,
  ) => {
    const nextCredentials: GreenApiCredentials = {
      idInstance: Number(idInstance),
      apiTokenInstance,
    };
    setLoading(true);
    setError(null);
    try {
      const data = await authApi.getStateInstance(nextCredentials);
      if (data === "authorized") {
        login();
        navigate("/chat");
      }
      setCredentials(nextCredentials);
      setStep("phone");
    } catch {
      setError("Не удалось проверить данные GREEN-API");
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneSubmit = async (phoneNumber: string) => {
    if (!credentials) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await authApi.startAuthorization(
        credentials,
        phoneNumber,
      );
      if (!response.status || response.data.status === "fail") {
        setError(response.data.reason ?? "Не удалось начать авторизацию");
        return;
      }
      setStep("code");
    } catch {
      setError("Не удалось отправить код авторизации");
    } finally {
      setLoading(false);
    }
  };

  const handleCodeSubmit = async (code: string, password: string) => {
    if (!credentials) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await authApi.sendAuthorizationCode(
        credentials,
        code,
        password,
      );
      if (!response.status || response.data.status === "fail") {
        setError(response.data.reason ?? "Не удалось подтвердить код");
        return;
      }
      login();
      navigate("/chat");
    } catch {
      setError("Не удалось подтвердить код");
    } finally {
      setLoading(false);
    }
  };

  return {step, loading, error, handleCredentialsSubmit, handlePhoneSubmit, handleCodeSubmit}
};
