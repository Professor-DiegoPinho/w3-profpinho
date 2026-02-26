import { db } from "@/lib/firebase";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";

export async function hasCourseEnrollment(userId, courseId) {
  if (!userId || !courseId) {
    return false;
  }

  const enrollmentId = `${userId}_${courseId}`;
  const enrollmentRef = doc(db, "enrollments", enrollmentId);
  const enrollmentDoc = await getDoc(enrollmentRef);

  return enrollmentDoc.exists();
}

export async function getEnrolledCourseIds(userId) {
  if (!userId) {
    return [];
  }

  const enrollmentsQuery = query(
    collection(db, "enrollments"),
    where("userId", "==", userId)
  );

  const enrollmentsSnapshot = await getDocs(enrollmentsQuery);

  return enrollmentsSnapshot.docs
    .map((enrollmentDoc) => enrollmentDoc.data()?.courseId)
    .filter((courseId) => typeof courseId === "string" && courseId.length > 0);
}

export function mapSidebarWithLocks(sidebarData, enrolledCourseIds = []) {
  const enrolledSet = new Set(enrolledCourseIds);

  return sidebarData.map((categoryData) => {
    const isCategoryUnlocked = enrolledSet.has(categoryData.category);

    return {
      ...categoryData,
      posts: categoryData.posts.map((post) => ({
        ...post,
        isLocked: !isCategoryUnlocked,
      })),
    };
  });
}
