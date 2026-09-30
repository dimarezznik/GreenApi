import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../../pages/LoginPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { MainLayout } from "../../layouts/MainLayout";
import { ChatPage } from "../../pages/ChatPage";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/chat/:chatId" element={<></>} />
        </Route>
        <Route path="*" element={<Navigate to="/chat" replace />} />
      </Route>
    </Routes>
  );
}
