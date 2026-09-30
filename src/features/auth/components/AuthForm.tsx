import type { ReactNode, SubmitEvent } from "react";
import { Button } from "../../../shared/ui/button";

interface AuthFormProps {
  submitText: string;
  loading: boolean;
  onSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
  children: ReactNode;
}

export function AuthForm({
  submitText,
  loading,
  onSubmit,
  children,
}: AuthFormProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      {children}
      <Button type="submit" disabled={loading} className="mt-4">
        {loading ? "Загрузка..." : submitText}
      </Button>
    </form>
  );
}
