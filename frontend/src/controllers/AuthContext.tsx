// ===== Capa CONTROLLER: estado global de autenticacion =====
import { createContext, useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import * as authModel from "../models/authModel";
import { getProfile } from "../models/userModel";
import { tokenStorage } from "../models/apiClient";
import type { LoginPayload, RegisterPayload, User } from "../models/types";

// loading: verificando token al arrancar | authenticated | unauthenticated
type AuthStatus = "loading" | "authenticated" | "unauthenticated";

export interface AuthContextValue {
  user: User | null;
  status: AuthStatus;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");

  // Trae el perfil con el token guardado; si falla, limpia la sesion
  const cargarPerfil = useCallback(async () => {
    try {
      const { data } = await getProfile();
      setUser(data);
      setStatus("authenticated");
    } catch {
      tokenStorage.clear();
      setUser(null);
      setStatus("unauthenticated");
    }
  }, []);

  // Al montar: si hay token intentamos rehidratar la sesion
  useEffect(() => {
    if (tokenStorage.get()) {
      void cargarPerfil();
    } else {
      setStatus("unauthenticated");
    }
  }, [cargarPerfil]);

  // Login: guarda token -> pide perfil (para conocer rol y nombre)
  const login = useCallback(
    async (payload: LoginPayload) => {
      const { data } = await authModel.login(payload);
      tokenStorage.set(data.token);
      await cargarPerfil();
    },
    [cargarPerfil],
  );

  // Register: el backend NO auto-loguea, solo crea la cuenta
  const register = useCallback(async (payload: RegisterPayload) => {
    await authModel.register(payload);
  }, []);

  const logout = useCallback(() => {
    tokenStorage.clear();
    setUser(null);
    setStatus("unauthenticated");
  }, []);

  return (
    <AuthContext.Provider value={{ user, status, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
