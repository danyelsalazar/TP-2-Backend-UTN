// ===== Capa VIEW: panel de administracion (solo ADMIN) =====
// Placeholder protegido: la logica de datos (listado/edicion de usuarios)
// se conectara a GET /api/admin mas adelante.
import styles from "../../css/AdminPage.module.css";

export function AdminPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Panel de administración</h1>
        <span className={styles.badge}>ADMIN</span>
      </div>
      <p className={styles.text}>
        Solo los usuarios con rol <strong>ADMIN</strong> pueden ver esta
        sección.
      </p>

      <div className={styles.placeholder}>
        <h2>🚧 En construcción</h2>
        <p>Próximamente vas a poder gestionar la plataforma desde acá:</p>
        <ul className={styles.list}>
          <li>Listar usuarios paginados (GET /api/admin)</li>
          <li>Cambiar el rol de un usuario (PATCH /api/admin/users/:id)</li>
          <li>Eliminar usuarios (DELETE /api/admin/users/:id)</li>
          <li>Moderar publicaciones</li>
        </ul>
      </div>
    </div>
  );
}
