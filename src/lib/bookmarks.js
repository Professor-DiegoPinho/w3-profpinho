import { adminDb } from "@/lib/firebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";

/**
 * Retorna todos os bookmarks de um usuário, ordenados por data (mais recente primeiro).
 * Subcoleção: users/{userId}/bookmarks/{lessonId}
 */
export async function getUserBookmarks(userId) {
  if (!userId) {
    return [];
  }

  const snapshot = await adminDb
    .collection("users")
    .doc(userId)
    .collection("bookmarks")
    .orderBy("savedAt", "desc")
    .get();

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      lessonId: doc.id,
      category: data.category ?? null,
      slug: data.slug ?? null,
      title: data.title ?? null,
      description: data.description ?? null,
      categoryTitle: data.categoryTitle ?? null,
      savedAt: data.savedAt?.toDate?.()?.toISOString?.() ?? null,
    };
  });
}

/**
 * Adiciona um bookmark para o usuário.
 * Se o bookmark já existe, retorna sem duplicar.
 */
export async function addBookmark(userId, bookmark) {
  if (!userId || !bookmark?.lessonId) {
    throw new Error("userId e lessonId são obrigatórios.");
  }

  const { lessonId, category, slug, title, description, categoryTitle } = bookmark;

  // Valida que os campos obrigatórios estão presentes
  if (!category || !slug) {
    throw new Error("category e slug são obrigatórios.");
  }

  const ref = adminDb
    .collection("users")
    .doc(userId)
    .collection("bookmarks")
    .doc(lessonId);

  const existing = await ref.get();

  if (existing.exists) {
    // Retorna o bookmark existente sem duplicar
    const data = existing.data();
    return {
      lessonId,
      category: data.category,
      slug: data.slug,
      title: data.title,
      description: data.description,
      categoryTitle: data.categoryTitle,
      savedAt: data.savedAt?.toDate?.()?.toISOString?.() ?? null,
      alreadyExisted: true,
    };
  }

  const payload = {
    lessonId,
    category,
    slug,
    title: title ?? null,
    description: description ?? null,
    categoryTitle: categoryTitle ?? null,
    savedAt: FieldValue.serverTimestamp(),
  };

  await ref.set(payload);

  return {
    ...payload,
    savedAt: new Date().toISOString(),
    alreadyExisted: false,
  };
}

/**
 * Remove um bookmark do usuário.
 */
export async function removeBookmark(userId, lessonId) {
  if (!userId || !lessonId) {
    throw new Error("userId e lessonId são obrigatórios.");
  }

  const ref = adminDb
    .collection("users")
    .doc(userId)
    .collection("bookmarks")
    .doc(lessonId);

  await ref.delete();

  return { ok: true };
}

/**
 * Verifica se uma aula está favoritada pelo usuário.
 */
export async function isLessonBookmarked(userId, lessonId) {
  if (!userId || !lessonId) {
    return false;
  }

  const ref = adminDb
    .collection("users")
    .doc(userId)
    .collection("bookmarks")
    .doc(lessonId);

  const doc = await ref.get();

  return doc.exists;
}
