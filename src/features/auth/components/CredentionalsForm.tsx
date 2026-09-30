import { useState } from "react";
import { Input } from "../../../shared/ui/Input";
import { AuthForm } from "./AuthForm";

interface CredentialsFormProps {
  loading: boolean;
  onSubmit: (idInstance: string, apiTokenInstance: string) => void;
}

export function CredentialsForm({ loading, onSubmit }: CredentialsFormProps) {
  const [idInstance, setIdInstance] = useState("");

  const [apiTokenInstance, setApiTokenInstance] = useState("");

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit(idInstance, apiTokenInstance);
  };

  return (
    <AuthForm submitText="Продолжить" loading={loading} onSubmit={handleSubmit}>
      <div className="flex flex-col gap-5">
        <Input
          id="idInstance"
          label="ID Instance"
          value={idInstance}
          onChange={(event) => setIdInstance(event.target.value)}
          placeholder="Введите ID Instance"
        />

        <Input
          id="apiTokenInstance"
          label="API Token Instance"
          type="password"
          value={apiTokenInstance}
          onChange={(event) => setApiTokenInstance(event.target.value)}
          placeholder="Введите API Token"
        />
      </div>
    </AuthForm>
  );
}
