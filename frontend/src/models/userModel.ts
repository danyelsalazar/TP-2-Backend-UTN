// ===== Capa MODEL: servicio de perfil de usuario =====
import { apiRequest } from "./apiClient";
import type { ApiSuccess, User } from "./types";

// GET /api/user -> perfil del usuario logueado (requiere token)
// Lo usamos tras el login para conocer el rol y el nombre a mostrar en el menu.
export function getProfile(): Promise<ApiSuccess<User>> {
  return apiRequest("/user", { auth: true });
}
