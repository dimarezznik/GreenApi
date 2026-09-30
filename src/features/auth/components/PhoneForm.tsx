import { useState } from "react";
import { Input } from "../../../shared/ui/Input";
import { AuthForm } from "./AuthForm";

interface PhoneFormProps {
  loading: boolean;
  onSubmit: (phoneNumber: string) => void;
}

export function PhoneForm({ loading, onSubmit }: PhoneFormProps) {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit(phoneNumber);
  };

  return (
    <AuthForm onSubmit={handleSubmit} loading={loading} submitText="Получить код">
      <Input
        id="phoneNumber"
        label="Номер телефона"
        type="tel"
        value={phoneNumber}
        onChange={(event) => setPhoneNumber(event.target.value)}
        placeholder="79991234567"
      />
    </AuthForm>
  );
}
