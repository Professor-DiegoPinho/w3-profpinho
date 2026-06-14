import { auth } from "@/auth";
import { isUserAdmin } from "@/lib/adminAuth";
import { redirect } from "next/navigation";
import { getTotalUsers, getSubmissionStats } from "./_utils/dashboard";
import { StatsGrid } from "./_components/StatsGrid/StatsGrid";
import { StatCard } from "./_components/StatCard/StatCard";
import styles from "./page.module.css";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/");
  }

  const isAdmin = await isUserAdmin(session.user.id);
  if (!isAdmin) {
    redirect("/");
  }

  const totalUsers = await getTotalUsers();
  const submissionStats = await getSubmissionStats();

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.dashboardTitle}>Dashboard Admin</h1>

      <StatsGrid>
        <StatCard
          title="Total de Usuários"
          value={totalUsers}
          icon="👥"
        />
        <StatCard
          title="Total de Submissões"
          value={submissionStats.total}
          icon="📤"
        />
        <StatCard
          title="Média de Tentativas"
          value={submissionStats.averageAttemptsPerUser}
          icon="📊"
        />
      </StatsGrid>

      <StatsGrid>
        <StatCard
          title="Pendentes de Avaliação"
          value={submissionStats.pending}
          icon="⏳"
          variant="pending"
        />
        <StatCard
          title="Aprovadas"
          value={submissionStats.approved}
          icon="✅"
          variant="approved"
        />
        <StatCard
          title="Reprovadas"
          value={submissionStats.rejected}
          icon="❌"
          variant="rejected"
        />
      </StatsGrid>
    </div>
  );
}
