// ===== Capa VIEW: barra de navegacion con menu segun rol =====
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../controllers/useAuth";
import styles from "../../css/Navbar.module.css";

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const esAdmin = user?.role === "ADMIN";

  return (
    <nav className={styles.nav}>
      <Link to="/dashboard" className={styles.brand}>
        NodoDev
      </Link>

      <div className={styles.links}>
        <Link to="/dashboard" className={styles.link}>
          Inicio
        </Link>

        {/* El enlace al panel admin solo se renderiza para el rol ADMIN */}
        {esAdmin && (
          <Link to="/admin" className={styles.adminLink}>
            Panel Admin
          </Link>
        )}

        <div className={styles.user}>
          <span
            className={`${styles.badge} ${esAdmin ? styles.badgeAdmin : ""}`}
          >
            {user?.role}
          </span>
          <span className={styles.link}>{user?.nombre}</span>
          <button className={styles.logout} onClick={handleLogout}>
            Salir
          </button>
        </div>
      </div>
    </nav>
  );
}
