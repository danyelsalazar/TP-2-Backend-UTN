// ===== Capa VIEW: pagina de Registro =====
import { Link } from "react-router-dom";
import { useRegisterForm } from "../../controllers/useRegisterForm";
import styles from "../../css/RegisterPage.module.css";

export function RegisterPage() {
  const { values, errors, apiError, submitting, handleChange, handleSubmit } =
    useRegisterForm();

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>Crear cuenta</h1>
        <p className={styles.subtitle}>Registrate para empezar a usar NodoDev</p>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {apiError && <div className={styles.alert}>{apiError}</div>}

          <div className={styles.field}>
            <label className={styles.label} htmlFor="nombre">
              Nombre
            </label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              className={`${styles.input} ${errors.nombre ? styles.inputError : ""}`}
              value={values.nombre}
              onChange={handleChange}
              placeholder="Tu nombre completo"
            />
            {errors.nombre && (
              <span className={styles.errorText}>{errors.nombre}</span>
            )}
          </div>

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
            {errors.password ? (
              <span className={styles.errorText}>{errors.password}</span>
            ) : (
              <span className={styles.hint}>
                Mínimo 8 caracteres, una mayúscula, un número y un símbolo.
              </span>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="confirmacion">
              Confirmar contraseña
            </label>
            <input
              id="confirmacion"
              name="confirmacion"
              type="password"
              className={`${styles.input} ${errors.confirmacion ? styles.inputError : ""}`}
              value={values.confirmacion}
              onChange={handleChange}
              placeholder="••••••••"
            />
            {errors.confirmacion && (
              <span className={styles.errorText}>{errors.confirmacion}</span>
            )}
          </div>

          <button className={styles.button} type="submit" disabled={submitting}>
            {submitting ? "Creando cuenta…" : "Registrarme"}
          </button>
        </form>

        <p className={styles.footer}>
          ¿Ya tenés cuenta?{" "}
          <Link to="/login" className={styles.link}>
            Iniciá sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
