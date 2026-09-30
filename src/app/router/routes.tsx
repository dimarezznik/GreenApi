import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../../pages/LoginPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { AuthLayout } from "../../layouts/AuthLayout";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/chat" element={<></>} />
        <Route path="/chat/:chatId" element={<></>} />
      </Route>
      <Route path="*" element={<Navigate to="/chat" replace />} />
    </Routes>
  );
}
