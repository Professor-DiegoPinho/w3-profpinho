import { adminDb } from "@/lib/firebaseAdmin";

/**
 * Gera um ID único e compacto para o certificado
 * Formato: YYYYMMDD + 6 caracteres aleatórios
 * Exemplo: 20260414A7K9M2
 */
export function generateUniqueCertificateId() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const datePart = `${year}${month}${day}`;

  // 6 caracteres aleatórios (a-z, A-Z, 0-9)
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomPart = "";
  for (let i = 0; i < 6; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return `${datePart}${randomPart}`;
}

/**
 * Cria um novo certificado no Firestore
 * @param {string} userId - ID do usuário
 * @param {object} certificateData - Dados do certificado
 * @returns {Promise<object>} Documento criado com ID
 */
export async function createCertificate(userId, certificateData) {
  try {
    const certificateId = generateUniqueCertificateId();
    const certificatesRef = adminDb
      .collection("users")
      .doc(userId)
      .collection("certificates");

    const newCertificate = {
      certificateId,
      studentName: certificateData.studentName,
      courseSlug: certificateData.courseSlug,
      courseName: certificateData.courseName,
      workloadHours: certificateData.workloadHours,
      generatedAt: new Date(),
      submissionId: certificateData.submissionId || null,
      validatedCount: 0,
      lastValidatedAt: null,
    };

    await certificatesRef.doc(certificateId).set(newCertificate);

    return {
      id: certificateId,
      ...newCertificate,
    };
  } catch (error) {
    console.error("Erro ao criar certificado:", error);
    throw error;
  }
}

/**
 * Recupera um certificado do Firestore
 * @param {string} userId - ID do usuário
 * @param {string} certificateId - ID do certificado
 * @returns {Promise<object|null>} Dados do certificado ou null
 */
export async function getCertificate(userId, certificateId) {
  try {
    const docRef = adminDb
      .collection("users")
      .doc(userId)
      .collection("certificates")
      .doc(certificateId);

    const docSnap = await docRef.get();
    return docSnap.exists ? docSnap.data() : null;
  } catch (error) {
    console.error("Erro ao recuperar certificado:", error);
    throw error;
  }
}

/**
 * Lista certificados de um usuário
 * @param {string} userId - ID do usuário
 * @returns {Promise<array>} Array de certificados
 */
export async function listUserCertificates(userId) {
  try {
    const certificatesRef = adminDb
      .collection("users")
      .doc(userId)
      .collection("certificates");

    const querySnap = await certificatesRef.orderBy("generatedAt", "desc").get();

    const certificates = [];
    querySnap.forEach((doc) => {
      certificates.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return certificates;
  } catch (error) {
    console.error("Erro ao listar certificados do usuário:", error);
    throw error;
  }
}

/**
 * Valida um certificado por ID (utilizado na página pública)
 * Incrementa o contador de validações
 * @param {string} certificateId - ID do certificado
 * @returns {Promise<object|null>} Dados do certificado com info do aluno ou null se não encontrado
 */
export async function validateAndGetCertificate(certificateId) {
  try {
    // Procurar em todos os usuários (lento, mas necessário para validação pública)
    const usersRef = adminDb.collection("users");
    const usersSnap = await usersRef.get();

    let foundCertificate = null;
    let foundUserId = null;

    for (const userDoc of usersSnap.docs) {
      const certRef = userDoc.ref.collection("certificates").doc(certificateId);
      const certSnap = await certRef.get();

      if (certSnap.exists) {
        foundCertificate = certSnap.data();
        foundUserId = userDoc.id;
        break;
      }
    }

    if (!foundCertificate) {
      return null;
    }

    // Incrementar contador de validações
    if (foundUserId) {
      await adminDb
        .collection("users")
        .doc(foundUserId)
        .collection("certificates")
        .doc(certificateId)
        .update({
          validatedCount: (foundCertificate.validatedCount || 0) + 1,
          lastValidatedAt: new Date(),
        });
    }

    // Retornar dados públicos do certificado
    return {
      valid: true,
      certificateId: foundCertificate.certificateId,
      studentName: foundCertificate.studentName,
      courseName: foundCertificate.courseName,
      workloadHours: foundCertificate.workloadHours,
      generatedAt: foundCertificate.generatedAt?.toDate?.() || foundCertificate.generatedAt,
    };
  } catch (error) {
    console.error("Erro ao validar certificado:", error);
    return null;
  }
}

/**
 * Recupera certificado pelo courseSlug (usa-se para determinar se existe certificado para um curso)
 * @param {string} userId - ID do usuário
 * @param {string} courseSlug - Slug do curso
 * @returns {Promise<object|null>}
 */
export async function getCertificateByOrCourse(userId, courseSlug) {
  try {
    const certificatesRef = adminDb
      .collection("users")
      .doc(userId)
      .collection("certificates");

    const query = certificatesRef.where("courseSlug", "==", courseSlug);
    const querySnap = await query.get();

    if (querySnap.empty) {
      return null;
    }

    const doc = querySnap.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
    };
  } catch (error) {
    console.error("Erro ao recuperar certificado por curso:", error);
    throw error;
  }
}
