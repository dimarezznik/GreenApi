import {
  Navigate,
  Outlet,
  useLocation,
} from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';


export function ProtectedRoute() {
  const credentials = useAuthStore(
    (state) => state.credentials,
  );

  const location = useLocation();
console.log(credentials);

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