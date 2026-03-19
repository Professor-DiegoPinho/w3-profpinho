import {
  canUserAccessCourseLessons,
  getCourseAccessType,
  getCourseVisibility,
  isCourseVisibleToUser,
} from "@/lib/courseAccess";
import { adminDb } from "@/lib/firebaseAdmin";

export async function hasCourseEnrollment(userId, courseId) {
  if (!userId || !courseId) {
    return false;
  }

  try {
    const enrollmentId = `${userId}_${courseId}`;
    const enrollmentDoc = await adminDb.collection("enrollments").doc(enrollmentId).get();

    return enrollmentDoc.exists;
  } catch (error) {
    console.error("Erro ao verificar matrícula:", error);
    return false;
  }
}

export async function getEnrolledCourseIds(userId) {
  if (!userId) {
    return [];
  }

  try {
    const enrollmentsSnapshot = await adminDb
      .collection("enrollments")
      .where("userId", "==", userId)
      .get();

    return enrollmentsSnapshot.docs
      .map((enrollmentDoc) => enrollmentDoc.data()?.courseId)
      .filter((courseId) => typeof courseId === "string" && courseId.length > 0);
  } catch (error) {
    console.error("Erro ao buscar cursos matriculados:", error);
    return [];
  }
}

export async function getCourseEnrollmentDate(userId, courseId) {
  if (!userId || !courseId) {
    return null;
  }

  try {
    const enrollmentId = `${userId}_${courseId}`;
    const enrollmentDoc = await adminDb.collection("enrollments").doc(enrollmentId).get();

    if (!enrollmentDoc.exists) {
      return null;
    }

    const enrolledAt = enrollmentDoc.data()?.enrolledAt;

    if (!enrolledAt) {
      return null;
    }

    if (typeof enrolledAt?.toDate === "function") {
      return enrolledAt.toDate();
    }

    const parsedDate = new Date(enrolledAt);
    return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
  } catch (error) {
    console.error("Erro ao buscar data de matrícula:", error);
    return null;
  }
}

export async function getCourseEnrollmentCount(courseId) {
  if (!courseId) {
    return 0;
  }

  try {
    const enrollmentsSnapshot = await adminDb
      .collection("enrollments")
      .where("courseId", "==", courseId)
      .get();

    return enrollmentsSnapshot.size;
  } catch (error) {
    console.error("Erro ao buscar contagem de matrículas:", error);
    return 0;
  }
}

export function mapSidebarWithAccess(sidebarData, enrolledCourseIds = []) {
  return sidebarData
    .filter((categoryData) =>
      isCourseVisibleToUser(categoryData.category, enrolledCourseIds)
    )
    .map((categoryData) => {
      const hasCategoryAccess = canUserAccessCourseLessons(
        categoryData.category,
        enrolledCourseIds
      );
      const isEnrolled = enrolledCourseIds.includes(categoryData.category);

      return {
        ...categoryData,
        accessType: getCourseAccessType(categoryData.category),
        visibility: getCourseVisibility(categoryData.category),
        isEnrolled,
        posts: categoryData.posts.map((post) => ({
          ...post,
          isRestricted: !hasCategoryAccess,
        })),
      };
    });
}
