import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../../pages/LoginPage";
import { ProtectedRoute } from "./ProtectedRoute";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/chat" element={<></>} />
        <Route path="/chat/:chatId" element={<></>} />
      </Route>
      <Route path="*" element={<Navigate to="/chat" replace />} />
    </Routes>
  );
}
