import { adminDb } from "@/lib/firebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";

/**
 * Adiciona uma nova tentativa de entrega do projeto
 * @param {string} userId - ID do usuário
 * @param {string} courseSlug - Slug do curso
 * @param {string} submissionUrl - URL da entrega
 * @param {string} platform - Plataforma detectada
 * @returns {object} - Dados da submissão criada
 */
export async function submitProjectUrl(userId, courseSlug, submissionUrl, platform) {
  if (!userId || !courseSlug || !submissionUrl) {
    throw new Error("userId, courseSlug e submissionUrl são obrigatórios.");
  }

  const ref = adminDb
    .collection("users")
    .doc(userId)
    .collection("submissions")
    .doc(courseSlug);

  const snap = await ref.get();
  const data = snap.exists ? snap.data() : { attempts: [] };

  const attempts = Array.isArray(data.attempts) ? data.attempts : [];

  const newSubmission = {
    url: submissionUrl,
    platform: platform || "Outro",
    submittedAt: new Date().toISOString(),
    id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  };

  const updatedAttempts = [...attempts, newSubmission];

  await ref.set(
    {
      attempts: updatedAttempts,
      lastSubmittedAt: FieldValue.serverTimestamp(),
      courseSlug,
    },
    { merge: true }
  );

  return {
    submission: newSubmission,
    totalAttempts: updatedAttempts.length,
  };
}

/**
 * Serializa as submissões, convertendo Firestore Timestamps em ISO strings
 * @param {object} submissionData - Dados brutos do Firestore
 * @returns {object} - Dados serializados e seguros para passar ao cliente
 */
function serializeSubmissionData(submissionData) {
  if (!submissionData) return null;

  // Serializar para JSON puro (remove métodos não-serializáveis)
  let plainData;
  try {
    plainData = JSON.parse(JSON.stringify(submissionData));
  } catch (e) {
    console.error("Erro ao serializar dados de submissão:", e);
    return null;
  }

  // Se tem attempts, serializar cada um
  if (Array.isArray(plainData.attempts)) {
    plainData.attempts = plainData.attempts.map((attempt) => {
      const result = {};
      for (const [key, value] of Object.entries(attempt)) {
        // Converter Firestore Timestamps para ISO strings
        if (value && typeof value === "object" && value._seconds !== undefined) {
          result[key] = new Date(value._seconds * 1000).toISOString();
        } else {
          result[key] = value || null;
        }
      }
      return result;
    });
  }

  // Serializar lastSubmittedAt se for Timestamp
  if (plainData.lastSubmittedAt && typeof plainData.lastSubmittedAt === "object" && plainData.lastSubmittedAt._seconds !== undefined) {
    plainData.lastSubmittedAt = new Date(plainData.lastSubmittedAt._seconds * 1000).toISOString();
  }

  return plainData;
}

/**
 * Obtém as tentativas de entrega do projeto
 * @param {string} userId - ID do usuário
 * @param {string} courseSlug - Slug do curso
 * @returns {object} - Dados das submissões
 */
export async function getProjectSubmissions(userId, courseSlug) {
  if (!userId || !courseSlug) return null;

  const ref = adminDb
    .collection("users")
    .doc(userId)
    .collection("submissions")
    .doc(courseSlug);

  const snap = await ref.get();
  if (!snap.exists) {
    return {
      attempts: [],
      lastSubmittedAt: null,
    };
  }

  return serializeSubmissionData(snap.data());
}

/**
 * Deleta uma tentativa de entrega específica
 * @param {string} userId - ID do usuário
 * @param {string} courseSlug - Slug do curso
 * @param {string} submissionId - ID da submissão
 * @returns {object} - Dados atualizados
 */
export async function deleteProjectSubmission(userId, courseSlug, submissionId) {
  if (!userId || !courseSlug || !submissionId) {
    throw new Error("userId, courseSlug e submissionId são obrigatórios.");
  }

  const ref = adminDb
    .collection("users")
    .doc(userId)
    .collection("submissions")
    .doc(courseSlug);

  const snap = await ref.get();
  if (!snap.exists) {
    throw new Error("Submissão não encontrada.");
  }

  const data = snap.data();
  const attempts = Array.isArray(data.attempts) ? data.attempts : [];

  const updatedAttempts = attempts.filter(att => att.id !== submissionId);

  await ref.set(
    {
      attempts: updatedAttempts,
      lastSubmittedAt: updatedAttempts.length > 0 
        ? updatedAttempts[updatedAttempts.length - 1].submittedAt
        : null,
    },
    { merge: true }
  );

  return {
    totalAttempts: updatedAttempts.length,
  };
}
