import Link from "next/link";
import "./admin.css";

export default function AdminLayout({ children }) {
  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <nav className="admin-nav">
          <h2 className="admin-nav-title">Administrador</h2>
          <ul className="admin-nav-list">
            <li>
              <Link href="/admin" className="admin-nav-link">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/admin/usuarios" className="admin-nav-link">
                Usuários
              </Link>
            </li>
            <li>
              <Link href="/admin/submissoes" className="admin-nav-link">
                Submissões
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}
