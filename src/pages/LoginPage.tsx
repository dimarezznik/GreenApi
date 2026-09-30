import { CodeForm } from "../features/auth/components/CodeForm";
import { CredentialsForm } from "../features/auth/components/CredentionalsForm";
import { PhoneForm } from "../features/auth/components/PhoneForm";
import { useAuthLogic } from "../shared/hooks/auth/useAuthLogic";

export function LoginPage() {
  const {
    step,
    loading,
    error,
    handleCredentialsSubmit,
    handlePhoneSubmit,
    handleCodeSubmit,
  } = useAuthLogic();

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-8">
      <section className="w-full max-w-105 rounded-[28px] bg-white px-7 py-8 shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
        <header className="mb-8 flex flex-col items-center text-center">
          <h1 className="text-[28px] font-bold tracking-[-0.02em] text-slate-900">
            Telegram Chat
          </h1>
          <p className="mt-2 max-w-70 text-sm leading-6 text-slate-500">
            Авторизация через GREEN-API
          </p>
        </header>

        {step === "credentials" && (
          <CredentialsForm
            loading={loading}
            onSubmit={handleCredentialsSubmit}
          />
        )}

        {step === "phone" && (
          <PhoneForm loading={loading} onSubmit={handlePhoneSubmit} />
        )}

        {step === "code" && (
          <CodeForm loading={loading} onSubmit={handleCodeSubmit} />
        )}

        {error && (
          <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-center text-xs leading-5 text-red-600">
            {error}
          </p>
        )}

      </section>
    </main>
  );
}
