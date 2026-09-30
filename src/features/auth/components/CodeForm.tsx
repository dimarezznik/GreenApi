import { useState } from "react";
import { Input } from "../../../shared/ui/Input";
import { AuthForm } from "./AuthForm";

interface CodeFormProps {
  loading: boolean;
  onSubmit: (code: string, password: string) => void;
}

export function CodeForm({ loading, onSubmit }: CodeFormProps) {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit(code, password);
  };

  return (
    <AuthForm submitText="Войти" loading={loading} onSubmit={handleSubmit}>
      <div className="flex flex-col gap-5">
        <Input
          id="code"
          label="Код авторизации"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          placeholder="Введите код"
        />
        <Input
          id="password"
          label="Пароль Telegram"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Введите пароль 2FA"
        />
      </div>
    </AuthForm>
  );
}
