import { requireAdmin } from "@/lib/adminAuth";
import { adminDb } from "@/lib/firebaseAdmin";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { authorized, response } = await requireAdmin();

    if (!authorized) {
      return response;
    }

    // Extrair courseSlug da query string
    const { searchParams } = new URL(request.url);
    const courseSlug = searchParams.get("courseSlug");

    const feedbacks = [];
    
    let feedbacksSnapshot;
    if (courseSlug) {
      // Se courseSlug fornecido, filtrar por curso
      feedbacksSnapshot = await adminDb
        .collection("courseFeedback")
        .where("courseSlug", "==", courseSlug)
        .get();
    } else {
      // Se não, buscar todos
      feedbacksSnapshot = await adminDb.collection("courseFeedback").get();
    }

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

      // Converter timestamps
      function convertTimestamp(value) {
        if (!value) return null;
        
        if (typeof value?.toDate === "function") {
          return value.toDate().toISOString();
        }
        
        const date = value instanceof Date ? value : new Date(value);
        return isNaN(date.getTime()) ? null : date.toISOString();
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

    return NextResponse.json({
      success: true,
      data: feedbacks,
      count: feedbacks.length,
    });
  } catch (error) {
    console.error("Erro ao buscar feedbacks:", error);
    return NextResponse.json(
      { success: false, error: "Erro ao buscar feedbacks" },
      { status: 500 }
    );
  }
}
