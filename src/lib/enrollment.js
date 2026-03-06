import {
    canUserAccessCourseLessons,
    getCourseAccessType,
    getCourseVisibility,
    isCourseVisibleToUser,
} from "@/lib/courseAccess";
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

export async function getCourseEnrollmentDate(userId, courseId) {
  if (!userId || !courseId) {
    return null;
  }

  const enrollmentId = `${userId}_${courseId}`;
  const enrollmentRef = doc(db, "enrollments", enrollmentId);
  const enrollmentDoc = await getDoc(enrollmentRef);

  if (!enrollmentDoc.exists()) {
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
}

export async function getCourseEnrollmentCount(courseId) {
  if (!courseId) {
    return 0;
  }

  const enrollmentsQuery = query(
    collection(db, "enrollments"),
    where("courseId", "==", courseId)
  );

  const enrollmentsSnapshot = await getDocs(enrollmentsQuery);

  return enrollmentsSnapshot.size;
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
