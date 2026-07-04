// ===== Capa MODEL: cliente HTTP centralizado (fetch nativo) =====
import type { ErrorDetalle } from "./types";

// La base de la API sale de una variable de entorno de Vite, con fallback al puerto local (3005)
const API_URL: string =
  import.meta.env.VITE_API_URL ?? "http://localhost:3005/api";

const TOKEN_KEY = "nodo_token";

// Helpers de persistencia del token JWT
export const tokenStorage = {
  get: (): string | null => localStorage.getItem(TOKEN_KEY),
  set: (token: string): void => localStorage.setItem(TOKEN_KEY, token),
  clear: (): void => localStorage.removeItem(TOKEN_KEY),
};

// Error propio que ademas de mensaje transporta el status y los detalles de Zod
export class ApiError extends Error {
  status: number;
  detalles: ErrorDetalle[];

  constructor(message: string, status: number, detalles: ErrorDetalle[] = []) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.detalles = detalles;
  }
}

interface RequestOptions {
  method?: string;
  body?: unknown;
  auth?: boolean; // si true, adjunta el Authorization: Bearer <token>
}

// Funcion base que usan todos los servicios
export async function apiRequest<T>(
  path: string,
  { method = "GET", body, auth = false }: RequestOptions = {},
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (auth) {
    const token = tokenStorage.get();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    // Falla de red / servidor caido
    throw new ApiError("No se pudo conectar con el servidor", 0);
  }

  // Puede no venir body (ej: 204); protegemos el .json()
  const data = await res.json().catch(() => null);

  if (!res.ok) {
    // El backend usa distintas claves segun el origen del error:
    //  - errorHandler central -> { message }
    //  - validaciones de Zod   -> { error, detalles: [{campo, mensaje}] }
    const message =
      data?.message ?? data?.error ?? "Ocurrió un error inesperado";
    throw new ApiError(message, res.status, data?.detalles ?? []);
  }

  return data as T;
}
