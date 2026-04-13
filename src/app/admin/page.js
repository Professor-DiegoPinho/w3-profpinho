import { adminDb } from "@/lib/firebaseAdmin";
import "./dashboard.css";

async function getTotalUsers() {
  try {
    const usersSnapshot = await adminDb.collection("users").count().get();
    return usersSnapshot.data().count;
  } catch (error) {
    console.error("Erro ao contar usuários:", error);
    return 0;
  }
}

async function getSubmissionStats() {
  try {
    const usersSnapshot = await adminDb.collection("users").get();
    let totalSubmissions = 0;
    let pendingEvaluations = 0;
    let approved = 0;
    let rejected = 0;
    let totalAttempts = 0;
    const courseCounts = {};

    for (const userDoc of usersSnapshot.docs) {
      const submissionsSnapshot = await userDoc.ref
        .collection("submissions")
        .get();

      for (const submissionDoc of submissionsSnapshot.docs) {
        const submissionData = submissionDoc.data();
        const attempts = Array.isArray(submissionData.attempts)
          ? submissionData.attempts
          : [];

        totalSubmissions += attempts.length;
        totalAttempts += attempts.length;

        if (submissionData.courseSlug) {
          courseCounts[submissionData.courseSlug] =
            (courseCounts[submissionData.courseSlug] || 0) + attempts.length;
        }

        attempts.forEach((attempt) => {
          if (!attempt.status || attempt.status === "pending") {
            pendingEvaluations++;
          } else if (attempt.status === "approved") {
            approved++;
          } else if (attempt.status === "rejected") {
            rejected++;
          }
        });
      }
    }

    let topCourse = null;
    let topCourseCount = 0;
    for (const [course, count] of Object.entries(courseCounts)) {
      if (count > topCourseCount) {
        topCourseCount = count;
        topCourse = { name: course, count };
      }
    }

    return {
      total: totalSubmissions,
      pending: pendingEvaluations,
      approved: approved,
      rejected: rejected,
      averageAttemptsPerUser:
        usersSnapshot.size > 0
          ? (totalSubmissions / usersSnapshot.size).toFixed(1)
          : 0,
      topCourse: topCourse,
    };
  } catch (error) {
    console.error("Erro ao buscar estatísticas de submissões:", error);
    return {
      total: 0,
      pending: 0,
      approved: 0,
      rejected: 0,
      averageAttemptsPerUser: 0,
      topCourse: null,
    };
  }
}

async function getRecentActivity() {
  try {
    const recentUsers = [];
    const usersSnapshot = await adminDb
      .collection("users")
      .orderBy("createdAt", "desc")
      .limit(5)
      .get();

    if (usersSnapshot.empty) {
      return [];
    }

    for (const userDoc of usersSnapshot.docs) {
      const userData = userDoc.data();
      recentUsers.push({
        name: userData.name || "Usuário",
        createdAt: userData.createdAt,
      });
    }

    return recentUsers;
  } catch (error) {
    console.error("Erro ao buscar atividade recente:", error);
    return [];
  }
}

export default async function AdminDashboard() {
  const totalUsers = await getTotalUsers();
  const submissionStats = await getSubmissionStats();
  const recentActivity = await getRecentActivity();

  return (
    <div className="admin-dashboard-container">
      <h1 className="admin-dashboard-title">Dashboard Admin</h1>

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <h2 className="admin-stat-title">Total de Usuários</h2>
            <span className="admin-stat-icon">👥</span>
          </div>
          <p className="admin-stat-value">{totalUsers}</p>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <h2 className="admin-stat-title">Total de Submissões</h2>
            <span className="admin-stat-icon">📤</span>
          </div>
          <p className="admin-stat-value">{submissionStats.total}</p>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <h2 className="admin-stat-title">Média de Tentativas</h2>
            <span className="admin-stat-icon">📊</span>
          </div>
          <p className="admin-stat-value">
            {submissionStats.averageAttemptsPerUser}
          </p>
        </div>
      </div>

      <div className="admin-stats-grid">
        <div className="admin-stat-card admin-stat-card-pending">
          <div className="admin-stat-header">
            <h2 className="admin-stat-title">Pendentes de Avaliação</h2>
            <span className="admin-stat-icon">⏳</span>
          </div>
          <p className="admin-stat-value">{submissionStats.pending}</p>
        </div>

        <div className="admin-stat-card admin-stat-card-approved">
          <div className="admin-stat-header">
            <h2 className="admin-stat-title">Aprovadas</h2>
            <span className="admin-stat-icon">✅</span>
          </div>
          <p className="admin-stat-value">{submissionStats.approved}</p>
        </div>

        <div className="admin-stat-card admin-stat-card-rejected">
          <div className="admin-stat-header">
            <h2 className="admin-stat-title">Reprovadas</h2>
            <span className="admin-stat-icon">❌</span>
          </div>
          <p className="admin-stat-value">{submissionStats.rejected}</p>
        </div>
      </div>
    </div>
  );
}
