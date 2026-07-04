// ===== Capa VIEW: pagina de Login =====
import { Link, useLocation } from "react-router-dom";
import { useLoginForm } from "../../controllers/useLoginForm";
import styles from "../../css/LoginPage.module.css";

export function LoginPage() {
  const { values, errors, apiError, submitting, handleChange, handleSubmit } =
    useLoginForm();

  // Si venimos de un registro exitoso mostramos un aviso
  const location = useLocation();
  const registrado = (location.state as { registrado?: boolean } | null)
    ?.registrado;

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>Iniciar sesión</h1>
        <p className={styles.subtitle}>Ingresá con tu cuenta de NodoDev</p>

        {registrado && (
          <div className={styles.success}>
            Cuenta creada con éxito. Ya podés iniciar sesión.
          </div>
        )}

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {apiError && <div className={styles.alert}>{apiError}</div>}

          <div className={styles.field}>
            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
              value={values.email}
              onChange={handleChange}
              placeholder="tucorreo@ejemplo.com"
            />
            {errors.email && (
              <span className={styles.errorText}>{errors.email}</span>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="password">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
              value={values.password}
              onChange={handleChange}
              placeholder="••••••••"
            />
            {errors.password && (
              <span className={styles.errorText}>{errors.password}</span>
            )}
          </div>

          <button className={styles.button} type="submit" disabled={submitting}>
            {submitting ? "Ingresando…" : "Ingresar"}
          </button>
        </form>

        <p className={styles.footer}>
          ¿No tenés cuenta?{" "}
          <Link to="/register" className={styles.link}>
            Registrate
          </Link>
        </p>
      </div>
    </div>
  );
}
