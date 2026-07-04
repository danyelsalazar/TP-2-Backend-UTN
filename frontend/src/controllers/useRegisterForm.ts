// ===== Capa CONTROLLER: logica del formulario de registro =====
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { ApiError } from "../models/apiClient";
import {
  validarConfirmacion,
  validarEmail,
  validarNombre,
  validarPasswordRegistro,
} from "./validators";
import type { FieldErrors } from "./validators";

export function useRegisterForm() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmacion: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validar = (): boolean => {
    const next: FieldErrors = {};
    const eNombre = validarNombre(values.nombre);
    const eEmail = validarEmail(values.email);
    const ePass = validarPasswordRegistro(values.password);
    const eConf = validarConfirmacion(values.password, values.confirmacion);
    if (eNombre) next.nombre = eNombre;
    if (eEmail) next.email = eEmail;
    if (ePass) next.password = ePass;
    if (eConf) next.confirmacion = eConf;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    if (!validar()) return;

    setSubmitting(true);
    try {
      await register({
        nombre: values.nombre.trim(),
        email: values.email.trim(),
        password: values.password,
      });
      // El backend no auto-loguea: mandamos al login con aviso de exito
      navigate("/login", { state: { registrado: true } });
    } catch (err) {
      if (err instanceof ApiError) {
        // Si el backend devolvio detalles de Zod, los mapeamos a cada campo
        if (err.detalles.length > 0) {
          const next: FieldErrors = {};
          for (const d of err.detalles) next[d.campo] = d.mensaje;
          setErrors(next);
        }
        setApiError(err.message);
      } else {
        setApiError("Error al registrarse");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return { values, errors, apiError, submitting, handleChange, handleSubmit };
}
