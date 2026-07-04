// ===== Capa VIEW: guard por rol (ej: solo ADMIN) =====
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../controllers/useAuth";
import type { Role } from "../../models/types";

interface Props {
  allow: Role[];
}

// Si el rol del usuario no esta permitido, lo devolvemos al dashboard.
export function RoleRoute({ allow }: Props) {
  const { user } = useAuth();

  if (!user || !allow.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
