// ===== Capa CONTROLLER: logica del formulario de login =====
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { ApiError } from "../models/apiClient";
import { validarEmail, validarPasswordLogin } from "./validators";
import type { FieldErrors } from "./validators";

export function useLoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // limpiamos el error del campo apenas el usuario corrige
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validar = (): boolean => {
    const next: FieldErrors = {};
    const eEmail = validarEmail(values.email);
    const ePass = validarPasswordLogin(values.password);
    if (eEmail) next.email = eEmail;
    if (ePass) next.password = ePass;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    if (!validar()) return;

    setSubmitting(true);
    try {
      await login(values);
      navigate("/dashboard");
    } catch (err) {
      setApiError(
        err instanceof ApiError ? err.message : "Error al iniciar sesión",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return { values, errors, apiError, submitting, handleChange, handleSubmit };
}
