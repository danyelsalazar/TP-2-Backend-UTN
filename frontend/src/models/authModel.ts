// ===== Capa MODEL: servicio de autenticacion =====
import { apiRequest } from "./apiClient";
import type {
  ApiSuccess,
  LoginData,
  LoginPayload,
  RegisterPayload,
} from "./types";

// POST /api/auth/register -> devuelve { success, message } (NO auto-loguea)
export function register(
  payload: RegisterPayload,
): Promise<ApiSuccess<never>> {
  return apiRequest("/auth/register", { method: "POST", body: payload });
}

// POST /api/auth/login -> devuelve { success, data: { token }, message }
export function login(
  payload: LoginPayload,
): Promise<ApiSuccess<LoginData>> {
  return apiRequest("/auth/login", { method: "POST", body: payload });
}
