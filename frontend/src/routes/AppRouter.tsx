// ===== Capa ROUTES: mapa de rutas de la aplicacion =====
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PublicRoute } from "../views/components/PublicRoute";
import { ProtectedRoute } from "../views/components/ProtectedRoute";
import { RoleRoute } from "../views/components/RoleRoute";
import { LoginPage } from "../views/pages/LoginPage";
import { RegisterPage } from "../views/pages/RegisterPage";
import { DashboardPage } from "../views/pages/DashboardPage";
import { AdminPage } from "../views/pages/AdminPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Publicas: si ya hay sesion, redirigen al dashboard */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Privadas: requieren token valido */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />

          {/* Anidada: ademas del token, exige rol ADMIN */}
          <Route element={<RoleRoute allow={["ADMIN"]} />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>
        </Route>

        {/* Raiz y catch-all -> dashboard (que decide segun sesion) */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
