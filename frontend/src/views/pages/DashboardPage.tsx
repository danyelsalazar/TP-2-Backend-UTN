// ===== Capa VIEW: dashboard visible para cualquier usuario logueado =====
import { useAuth } from "../../controllers/useAuth";
import styles from "../../css/DashboardPage.module.css";

export function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Hola, {user?.nombre} 👋</h1>
      <p className={styles.text}>
        Este es tu panel personal. Desde acá vas a poder gestionar tus materias
        y publicaciones.
      </p>

      <div className={styles.grid}>
        <div className={styles.stat}>
          <div className={styles.statLabel}>Rol</div>
          <div className={styles.statValue}>{user?.role}</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statLabel}>Materias</div>
          <div className={styles.statValue}>{user?.materias.length ?? 0}</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statLabel}>Publicaciones</div>
          <div className={styles.statValue}>
            {user?.publicaciones.length ?? 0}
          </div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statLabel}>Email</div>
          <div className={styles.statValue}>{user?.email}</div>
        </div>
      </div>
    </div>
  );
}
