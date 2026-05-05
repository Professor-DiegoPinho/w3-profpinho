import { auth } from "@/auth";
import { isUserAdmin } from "@/lib/adminAuth";
import { adminDb } from "@/lib/firebaseAdmin";
import Link from "next/link";
import { redirect } from "next/navigation";
import "../feedbacks.css";
import { FeedbacksPageClient } from "./FeedbacksPageClient";

function convertTimestamp(value) {
  if (!value) return null;

  if (typeof value?.toDate === "function") {
    return value.toDate().toISOString();
  }

  const date = value instanceof Date ? value : new Date(value);
  return isNaN(date.getTime()) ? null : date.toISOString();
}

async function getCourseTitle(courseSlug) {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/sidebar`, {
      cache: "no-store",
    });

    if (!response.ok) return courseSlug;

    const courses = await response.json();
    const course = courses.find((c) => c.category === courseSlug);
    return course?.title || courseSlug;
  } catch (error) {
    console.error("Erro ao buscar título do curso:", error);
    return courseSlug;
  }
}

async function getCourseFeedbacks(courseSlug) {
  try {
    const feedbacks = [];
    const feedbacksSnapshot = await adminDb
      .collection("courseFeedback")
      .where("courseSlug", "==", courseSlug)
      .get();

    // Buscar dados de usuários em paralelo para otimizar
    const userCache = {};

    for (const feedbackDoc of feedbacksSnapshot.docs) {
      const feedbackData = feedbackDoc.data();
      const userId = feedbackData.userId;

      // Buscar dados do usuário (com cache)
      let userData = userCache[userId];
      if (!userData) {
        try {
          const userDoc = await adminDb.collection("users").doc(userId).get();
          userData = userDoc.exists ? userDoc.data() : {};
          userCache[userId] = userData;
        } catch (error) {
          console.error(`Erro ao buscar usuário ${userId}:`, error);
          userData = {};
          userCache[userId] = userData;
        }
      }

      feedbacks.push({
        id: feedbackDoc.id,
        userId: userId,
        userName: userData.name || "Usuário Desconhecido",
        userEmail: userData.email || null,
        courseSlug: feedbackData.courseSlug,
        npsScore: feedbackData.npsScore,
        answers: feedbackData.answers || {},
        questionComments: feedbackData.questionComments || {},
        comment: feedbackData.comment || "",
        respondedAt: convertTimestamp(feedbackData.respondedAt),
      });
    }

    // Ordenar por data mais recente
    feedbacks.sort((a, b) => {
      const aTime = new Date(a.respondedAt || 0).getTime();
      const bTime = new Date(b.respondedAt || 0).getTime();
      return bTime - aTime;
    });

    return feedbacks;
  } catch (error) {
    console.error("Erro ao buscar feedbacks:", error);
    return [];
  }
}

export default async function CourseFeedbacksPage({ params }) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/");
  }

  const isAdmin = await isUserAdmin(session.user.id);
  if (!isAdmin) {
    redirect("/");
  }

  const { courseSlug } = await params;
  const [courseTitle, feedbacks] = await Promise.all([
    getCourseTitle(courseSlug),
    getCourseFeedbacks(courseSlug),
  ]);

  const npsAverage =
    feedbacks.length > 0
      ? (feedbacks.reduce((sum, f) => sum + f.npsScore, 0) / feedbacks.length).toFixed(1)
      : 0;

  return (
    <div className="admin-feedbacks-container">
      <div className="admin-feedbacks-header">
        <div className="admin-feedbacks-back-section">
          <Link href="/admin/feedbacks" className="admin-feedbacks-back-link">
            ← Voltar
          </Link>
          <h1 className="admin-feedbacks-title">{courseTitle}</h1>
        </div>
      </div>

      {feedbacks.length === 0 ? (
        <div className="admin-feedbacks-empty">Nenhum feedback encontrado</div>
      ) : (
        <>
          <div className="admin-feedbacks-stats">
            <div className="admin-feedbacks-stat-item">
              <span className="admin-feedbacks-stat-label">Total de Feedbacks:</span>
              <span className="admin-feedbacks-stat-value">{feedbacks.length}</span>
            </div>
            <div className="admin-feedbacks-stat-item">
              <span className="admin-feedbacks-stat-label">NPS Médio:</span>
              <span className="admin-feedbacks-stat-value">{npsAverage}</span>
            </div>
          </div>

          <div className="admin-feedbacks-list">
            <FeedbacksPageClient feedbacks={feedbacks} />
          </div>
        </>
      )}
    </div>
  );
}
