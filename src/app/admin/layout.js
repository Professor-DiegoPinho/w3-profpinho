import { AdminSidebar } from "./_components/AdminSidebar/AdminSidebar";
import styles from "./layout.module.css";

export default function AdminLayout({ children }) {
  return (
    <div className={styles.adminContainer}>
      <AdminSidebar />

      <main className={styles.adminMain}>
        {children}
      </main>
    </div>
  );
}
