// ===== Capa VIEW: guard para rutas publicas (login / register) =====
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../controllers/useAuth";

// Si ya hay sesion activa, no tiene sentido ver login/register: al dashboard.
export function PublicRoute() {
  const { status } = useAuth();

  if (status === "loading") {
    return <div style={{ padding: "2rem", color: "#64748b" }}>Cargando…</div>;
  }

  if (status === "authenticated") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
