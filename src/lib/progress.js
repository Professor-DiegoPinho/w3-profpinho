import { adminDb } from "@/lib/firebaseAdmin";
import { getCourseLessonsCount } from "@/lib/markdown";
import { FieldValue } from "firebase-admin/firestore";

export async function getLessonProgress(userId, courseSlug) {
  if (!userId || !courseSlug) return null;

  const ref = adminDb
    .collection("users")
    .doc(userId)
    .collection("progress")
    .doc(courseSlug);

  const snap = await ref.get();
  if (!snap.exists) {
    return {
      completedLessons: [],
      totalLessons: 0,
      completionPercentage: 0,
      completedAt: null,
    };
  }

  return snap.data();
}

export async function toggleLessonComplete(
  userId,
  courseSlug,
  lessonSlug,
  totalLessons
) {
  if (!userId || !courseSlug || !lessonSlug) {
    throw new Error("userId, courseSlug e lessonSlug são obrigatórios.");
  }

  const ref = adminDb
    .collection("users")
    .doc(userId)
    .collection("progress")
    .doc(courseSlug);

  const snap = await ref.get();
  const data = snap.exists ? snap.data() : { completedLessons: [] };

  const completed = Array.isArray(data.completedLessons)
    ? data.completedLessons
    : [];

  const alreadyDone = completed.includes(lessonSlug);

  const newCompleted = alreadyDone
    ? completed.filter((s) => s !== lessonSlug)
    : [...completed, lessonSlug];

  // Sempre calcular o total correto usando getCourseLessonsCount
  // Isso garante que excluamos projeto.md da contagem, mesmo de dados antigos
  const total = getCourseLessonsCount(courseSlug);
  const percentage =
    total > 0 ? Math.round((newCompleted.length / total) * 100) : 0;

  const isCourseCompleted = newCompleted.length === total && total > 0;

  await ref.set(
    {
      completedLessons: newCompleted,
      totalLessons: total,
      completionPercentage: percentage,
      lastUpdatedAt: FieldValue.serverTimestamp(),
      // Só define completedAt na primeira vez que 100% é atingido
      completedAt: isCourseCompleted
        ? data.completedAt ?? FieldValue.serverTimestamp()
        : null,
    },
    { merge: true }
  );

  return {
    completedLessons: newCompleted,
    totalLessons: total,
    completionPercentage: percentage,
    isCompleted: !alreadyDone, // estado NOVO da aula (após o toggle)
    isCourseCompleted,
  };
}

export function isLessonCompleted(progressData, lessonSlug) {
  if (!progressData?.completedLessons) return false;
  return progressData.completedLessons.includes(lessonSlug);
}