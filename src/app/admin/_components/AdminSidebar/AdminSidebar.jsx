"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./AdminSidebar.module.css";

export function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/usuarios", label: "Usuários" },
    { href: "/admin/submissoes", label: "Submissões" },
    { href: "/admin/feedbacks", label: "Feedbacks" },
  ];

  return (
    <aside className={styles.adminSidebar}>
      <nav className={styles.adminNav}>
        <h2 className={styles.adminNavTitle}>Administrador</h2>
        <ul className={styles.adminNavList}>
          {links.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`${styles.adminNavLink} ${isActive ? styles.active : ""}`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
