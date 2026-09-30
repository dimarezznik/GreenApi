import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

export function ProtectedRoute() {
  const credentials = useAuthStore((state) => state.isAuthenticated);
  const location = useLocation();

  if (!credentials) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  return <Outlet />;
}
