// ===== Capa CONTROLLER: validadores del cliente =====
// Reflejan las reglas de Zod del backend (validarRegistroMiddleware.js)
// para dar feedback inmediato antes de golpear la API.

// Formato de email (equivalente practico al z.string().email())
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Caracteres especiales aceptados por el backend
const SPECIAL_RE = /[@$!%*?&_#.\-]/;

export type FieldErrors = Record<string, string>;

export function validarNombre(nombre: string): string | null {
  if (!nombre.trim()) return "El nombre es obligatorio";
  if (nombre.trim().length < 3)
    return "El nombre debe tener al menos 3 caracteres";
  return null;
}

export function validarEmail(email: string): string | null {
  if (!email.trim()) return "El email es obligatorio";
  if (!EMAIL_RE.test(email)) return "El formato del email no es válido";
  return null;
}

// Validacion fuerte para el REGISTRO (min 8, mayuscula, numero, especial)
export function validarPasswordRegistro(password: string): string | null {
  if (!password) return "La contraseña es obligatoria";
  if (password.length < 8)
    return "La contraseña debe tener al menos 8 caracteres";
  if (!/[A-Z]/.test(password))
    return "Debe incluir al menos una letra mayúscula";
  if (!/[0-9]/.test(password)) return "Debe incluir al menos un número";
  if (!SPECIAL_RE.test(password))
    return "Debe incluir un carácter especial (ej: @, $, !, %, *)";
  return null;
}

// Validacion liviana para el LOGIN (solo que no este vacio)
export function validarPasswordLogin(password: string): string | null {
  if (!password) return "La contraseña es obligatoria";
  return null;
}

export function validarConfirmacion(
  password: string,
  confirmacion: string,
): string | null {
  if (!confirmacion) return "Confirmá la contraseña";
  if (password !== confirmacion) return "Las contraseñas no coinciden";
  return null;
}
