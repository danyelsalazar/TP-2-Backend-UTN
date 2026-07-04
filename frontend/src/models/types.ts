// ===== Capa MODEL: tipos de dominio compartidos =====

// El backend usa un enum de roles USER / ADMIN (constants/roles.js)
export type Role = "USER" | "ADMIN";

// Perfil del usuario tal como lo devuelve GET /api/user (sin password)
export interface User {
  _id: string;
  nombre: string;
  email: string;
  role: Role;
  materias: string[];
  publicaciones: string[];
  createdAt: string;
  updatedAt: string;
}

// Forma estandar de las respuestas OK del backend: { success, data, message }
export interface ApiSuccess<T> {
  success: true;
  data: T;
  message?: string;
}

// Payload que espera POST /api/auth/register
export interface RegisterPayload {
  nombre: string;
  email: string;
  password: string;
}

// Payload que espera POST /api/auth/login
export interface LoginPayload {
  email: string;
  password: string;
}

// data del login: solo viene el token JWT
export interface LoginData {
  token: string;
}

// Detalle de error de validacion de Zod que devuelve el backend
export interface ErrorDetalle {
  campo: string;
  mensaje: string;
}
