import { auth } from "@/auth";
import { isUserAdmin } from "@/lib/adminAuth";
import { redirect } from "next/navigation";
import { getSubmissions } from "../_utils/submissions";
import { SubmissionsTable } from "../_components/SubmissionsTable/SubmissionsTable";
import styles from "./page.module.css";

export const dynamic = 'force-dynamic';

export default async function SubmissoesPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/");
  }

  const isAdmin = await isUserAdmin(session.user.id);
  if (!isAdmin) {
    redirect("/");
  }

  const allAttempts = await getSubmissions();

  return (
    <div className={styles.submissionsContainer}>
      <h1 className={styles.submissionsTitle}>Submissões de Projetos</h1>

      <SubmissionsTable attempts={allAttempts} />

      <p className={styles.submissionsInfo}>
        Total: {allAttempts.length} tentativas submetidas
      </p>
    </div>
  );
}
