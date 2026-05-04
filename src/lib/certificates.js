import { adminDb, adminStorage } from "@/lib/firebaseAdmin";

/**
 * Faz upload do PDF do certificado para Firebase Storage
 * @param {Buffer} pdfBuffer - Buffer do PDF
 * @param {string} certificateId - ID do certificado
 * @returns {Promise<string>} URL pública do PDF
 */
export async function uploadCertificatePDF(pdfBuffer, certificateId) {
  try {
    // Obter o nome do bucket do Firebase Storage
    const bucketName = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
    if (!bucketName) {
      throw new Error("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET não está configurado");
    }

    const bucket = adminStorage.bucket(bucketName);
    const filePath = `certificates/${certificateId}.pdf`;
    const file = bucket.file(filePath);

    // Usar createWriteStream para evitar corrupção do PDF
    return new Promise((resolve, reject) => {
      const writeStream = file.createWriteStream({
        metadata: {
          contentType: "application/pdf",
          cacheControl: "public, max-age=31536000",
        },
        public: true,
      });

      writeStream.on("error", (error) => {
        console.error("Erro ao escrever PDF no Storage:", error);
        reject(error);
      });

      writeStream.on("finish", () => {
        // Gerar URL pública
        const url = `https://storage.googleapis.com/${bucketName}/${filePath}`;
        console.log("PDF salvo com sucesso:", url);
        resolve(url);
      });

      writeStream.end(pdfBuffer);
    });
  } catch (error) {
    console.error("Erro ao fazer upload do certificado PDF:", error);
    throw error;
  }
}

/**
 * Atualiza o certificado com a URL do PDF
 * @param {string} userId - ID do usuário
 * @param {string} certificateId - ID do certificado
 * @param {string} pdfUrl - URL do PDF no Storage
 */
export async function updateCertificatePdfUrl(userId, certificateId, pdfUrl) {
  try {
    await adminDb
      .collection("users")
      .doc(userId)
      .collection("certificates")
      .doc(certificateId)
      .update({
        pdfUrl,
        pdfUploadedAt: new Date(),
      });
  } catch (error) {
    console.error("Erro ao atualizar URL do PDF no certificado:", error);
    throw error;
  }
}

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

    // Usar batch para salvar em dois lugares atomicamente
    const batch = adminDb.batch();

    // 1. Documento completo na subcoleção do usuário
    const userCertRef = adminDb
      .collection("users")
      .doc(userId)
      .collection("certificates")
      .doc(certificateId);
    batch.set(userCertRef, newCertificate);

    // 2. Índice na coleção raiz (apenas userId e certificateId para lookup rápido)
    const rootCertRef = adminDb
      .collection("certificates")
      .doc(certificateId);
    batch.set(rootCertRef, {
      userId,
      certificateId,
      createdAt: new Date(),
    });

    await batch.commit();

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
    // 1️⃣ Usar índice na coleção raiz para lookup rápido (1 leitura)
    const certIndexSnap = await adminDb
      .collection("certificates")
      .doc(certificateId)
      .get();

    if (!certIndexSnap.exists) {
      return null;
    }

    const { userId } = certIndexSnap.data();

    // 2️⃣ Buscar dados completos do certificado (1 leitura)
    const certSnap = await adminDb
      .collection("users")
      .doc(userId)
      .collection("certificates")
      .doc(certificateId)
      .get();

    if (!certSnap.exists) {
      return null;
    }

    const foundCertificate = certSnap.data();

    // 3️⃣ Incrementar contador de validações
    await adminDb
      .collection("users")
      .doc(userId)
      .collection("certificates")
      .doc(certificateId)
      .update({
        validatedCount: (foundCertificate.validatedCount || 0) + 1,
        lastValidatedAt: new Date(),
      });

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
