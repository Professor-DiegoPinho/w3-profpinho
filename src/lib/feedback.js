import { FEEDBACK_QUESTIONS } from "@/lib/feedbackConfig";
import { adminDb } from "@/lib/firebaseAdmin";
import { getProjectSubmissions } from "@/lib/submissions";
import { FieldValue } from "firebase-admin/firestore";

/**
 * Verificar se o projeto foi aprovado
 * Procura na subcoleção 'submissions' do usuário por um status "approved"
 */
export async function isProjectApproved(userId, courseSlug) {
  if (!userId || !courseSlug) {
    return false;
  }

  try {
    const submissions = await getProjectSubmissions(userId, courseSlug);

    if (!submissions || !Array.isArray(submissions.attempts) || submissions.attempts.length === 0) {
      return false;
    }

    // Verificar se há alguma tentativa com status "approved"
    const isApproved = submissions.attempts.some((attempt) => attempt.status === "approved");
    return isApproved;
  } catch (error) {
    console.error("Erro ao verificar aprovação do projeto:", error);
    // Se houver erro, retorna false (user não fica bloqueado)
    return false;
  }
}

/**
 * Verificar elegibilidade para feedback
 * Requer: 100% completo + projeto aprovado + ainda não respondeu
 */
export async function isEligibleForFeedback(userId, courseSlug, progressData) {
  if (!userId || !courseSlug || !progressData) {
    return false;
  }

  // Verifica se curso está 100% completo
  if (progressData.completionPercentage !== 100) {
    return false;
  }

  // Verifica se projeto foi aprovado
  const projectApproved = await isProjectApproved(userId, courseSlug);
  if (!projectApproved) {
    return false;
  }

  // Verifica se já respondeu feedback
  if (progressData.feedbackResponded === true) {
    return false;
  }

  return true;
}

/**
 * Obter feedback do usuário (se existir)
 */
export async function getUserFeedback(userId, courseSlug) {
  if (!userId || !courseSlug) {
    return null;
  }

  try {
    const docId = `${userId}_${courseSlug}`;
    const doc = await adminDb
      .collection("courseFeedback")
      .doc(docId)
      .get();

    return doc.exists ? doc.data() : null;
  } catch (error) {
    console.error("Erro ao buscar feedback do usuário:", error);
    return null;
  }
}

/**
 * Salvar feedback e atualizar stats
 */
export async function submitFeedback(userId, courseSlug, feedbackData) {
  if (!userId || !courseSlug) {
    throw new Error("userId e courseSlug são obrigatórios");
  }

  // Validar NPS (0-10)
  if (typeof feedbackData.npsScore !== "number" || feedbackData.npsScore < 0 || feedbackData.npsScore > 10) {
    throw new Error("NPS deve ser um número entre 0 e 10");
  }

  // Validar respostas das perguntas
  const requiredQuestionIds = FEEDBACK_QUESTIONS.map((q) => q.id);
  for (const questionId of requiredQuestionIds) {
    if (!feedbackData.answers || !feedbackData.answers[questionId]) {
      throw new Error(`Resposta para pergunta '${questionId}' é obrigatória`);
    }
  }

  try {
    const docId = `${userId}_${courseSlug}`;
    const feedbackRef = adminDb.collection("courseFeedback").doc(docId);

    const feedbackPayload = {
      userId,
      courseSlug,
      npsScore: feedbackData.npsScore,
      answers: feedbackData.answers,
      comment: feedbackData.comment || "",
      respondedAt: FieldValue.serverTimestamp(),
    };

    // Salvar feedback
    await feedbackRef.set(feedbackPayload);

    // Atualizar progress com flag de feedback respondido
    const progressRef = adminDb
      .collection("users")
      .doc(userId)
      .collection("progress")
      .doc(courseSlug);

    await progressRef.set(
      {
        feedbackResponded: true,
        feedbackRespondedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    // Atualizar stats agregadas
    await updateFeedbackStats(courseSlug, feedbackData.npsScore);

    return {
      success: true,
      feedbackId: docId,
    };
  } catch (error) {
    console.error("Erro ao salvar feedback:", error);
    throw error;
  }
}

/**
 * Atualizar estatísticas agregadas de feedback
 */
async function updateFeedbackStats(courseSlug, newNpsScore) {
  try {
    const statsRef = adminDb
      .collection("courseFeedbackStats")
      .doc(courseSlug);

    const feedbacksRef = adminDb
      .collection("courseFeedback")
      .where("courseSlug", "==", courseSlug);

    const feedbacksSnapshot = await feedbacksRef.get();

    if (feedbacksSnapshot.empty) {
      return;
    }

    // Calcular agregações
    let totalScore = 0;
    const distributionNps = {};

    // Inicializar distribuição de 0-10
    for (let i = 0; i <= 10; i++) {
      distributionNps[i] = 0;
    }

    feedbacksSnapshot.docs.forEach((doc) => {
      const nps = doc.data().npsScore;
      totalScore += nps;
      distributionNps[nps] = (distributionNps[nps] || 0) + 1;
    });

    const totalResponses = feedbacksSnapshot.size;
    const avgNps = (totalScore / totalResponses).toFixed(1);

    await statsRef.set(
      {
        courseSlug,
        totalResponses,
        avgNps: parseFloat(avgNps),
        distributionNps,
        lastUpdatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error("Erro ao atualizar stats de feedback:", error);
    // Não lanço erro aqui para não bloquear o salvamento do feedback
  }
}

/**
 * Obter estatísticas agregadas de um curso
 */
export async function getFeedbackStats(courseSlug) {
  if (!courseSlug) {
    return null;
  }

  try {
    const doc = await adminDb
      .collection("courseFeedbackStats")
      .doc(courseSlug)
      .get();

    return doc.exists
      ? doc.data()
      : {
          courseSlug,
          totalResponses: 0,
          avgNps: 0,
          distributionNps: {},
        };
  } catch (error) {
    console.error("Erro ao buscar stats de feedback:", error);
    return null;
  }
}

/**
 * Validar dados de feedback antes de salvar
 */
export function validateFeedbackData(data) {
  const errors = [];

  // Validar NPS
  if (typeof data.npsScore !== "number" || data.npsScore < 0 || data.npsScore > 10) {
    errors.push("NPS deve ser um número entre 0 e 10");
  }

  // Validar respostas
  if (!data.answers || typeof data.answers !== "object") {
    errors.push("Respostas são obrigatórias");
  } else {
    for (const question of FEEDBACK_QUESTIONS) {
      if (!data.answers[question.id]) {
        errors.push(`Resposta para "${question.text}" é obrigatória`);
      }
    }
  }

  // Validar comentário (opcional, mas verificar length)
  if (data.comment && typeof data.comment !== "string") {
    errors.push("Comentário deve ser texto");
  }

  if (data.comment && data.comment.length > 1000) {
    errors.push("Comentário não pode ter mais de 1000 caracteres");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
