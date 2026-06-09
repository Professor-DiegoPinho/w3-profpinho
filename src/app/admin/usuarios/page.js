import { auth } from "@/auth";
import { isUserAdmin } from "@/lib/adminAuth";
import { redirect } from "next/navigation";
import { getUsers } from "../_utils/users";
import { UsersTable } from "../_components/UsersTable/UsersTable";
import styles from "./page.module.css";

export const dynamic = 'force-dynamic';

export default async function UsuariosPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/");
  }

  const isAdmin = await isUserAdmin(session.user.id);
  if (!isAdmin) {
    redirect("/");
  }

  const users = await getUsers();

  return (
    <div className={styles.usuariosContainer}>
      <h1 className={styles.usuariosTitle}>Usuários</h1>

      <UsersTable users={users} />

      <p className={styles.usuariosInfo}>Total: {users.length} usuários</p>
    </div>
  );
}
