// ===== Capa VIEW: guard de rutas privadas (requiere sesion) =====
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../controllers/useAuth";
import { Navbar } from "./Navbar";

export function ProtectedRoute() {
  const { status } = useAuth();

  // Mientras rehidratamos la sesion desde el token no decidimos nada aun
  if (status === "loading") {
    return <div style={{ padding: "2rem", color: "#64748b" }}>Cargando…</div>;
  }

  // Sin sesion -> al login
  if (status === "unauthenticated") {
    return <Navigate to="/login" replace />;
  }

  // Con sesion: layout con navbar + la ruta hija
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
