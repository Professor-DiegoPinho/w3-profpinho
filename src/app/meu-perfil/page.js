import { auth } from "@/auth";
import { content } from "@/data";
import {
  getCourseEnrollmentDate,
  getEnrolledCourseIds,
} from "@/lib/enrollment";
import { adminDb } from "@/lib/firebaseAdmin";
import { getCategoryTitle, getCourseLessonsCount, getPostsInCategory } from "@/lib/markdown";
import { getLessonProgress } from "@/lib/progress";
import { redirect } from "next/navigation";
import { ProfileContent } from "./ProfileContent";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Meu perfil | Diego Pinho Learning Hub",
  description:
    "Acompanhe os cursos em que voce esta inscrito e veja os detalhes da sua conta.",
};

function formatDate(value) {
  if (!value) {
    return null;
  }

  if (typeof value?.toDate === "function") {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(value.toDate());
  }

  const parsedDate = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(parsedDate);
}

function serializeProgressData(progressData) {
  if (!progressData) return null;
  
  return {
    totalLessons: progressData.totalLessons,
    completionPercentage: progressData.completionPercentage,
    completedLessons: progressData.completedLessons || [],
    feedbackResponded: progressData.feedbackResponded || false,
    // Convert Firestore Timestamps to ISO strings or null
    completedAt: progressData.completedAt?.toDate?.() 
      ? progressData.completedAt.toDate().toISOString() 
      : null,
    lastUpdatedAt: progressData.lastUpdatedAt?.toDate?.()
      ? progressData.lastUpdatedAt.toDate().toISOString()
      : null,
    feedbackRespondedAt: progressData.feedbackRespondedAt?.toDate?.()
      ? progressData.feedbackRespondedAt.toDate().toISOString()
      : null,
  };
}

function resolveCourseLabel(courseId) {
  const matchingCourse = content.find((course) => course.slug === courseId);

  if (matchingCourse?.title) {
    return matchingCourse.title;
  }

  return getCategoryTitle(courseId);
}

export default async function MyProfilePage() {
  const availableProviders = {
    google:
      typeof process.env.AUTH_GOOGLE_ID === "string" &&
      process.env.AUTH_GOOGLE_ID.length > 0 &&
      typeof process.env.AUTH_GOOGLE_SECRET === "string" &&
      process.env.AUTH_GOOGLE_SECRET.length > 0,
    github:
      typeof process.env.AUTH_GITHUB_ID === "string" &&
      process.env.AUTH_GITHUB_ID.length > 0 &&
      typeof process.env.AUTH_GITHUB_SECRET === "string" &&
      process.env.AUTH_GITHUB_SECRET.length > 0,
  };

  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect("/");
  }

  const enrolledCourseIds = Array.isArray(session?.user?.enrolledCourseIds)
    ? session.user.enrolledCourseIds
    : await getEnrolledCourseIds(userId);

  const userDoc = await adminDb.collection("users").doc(userId).get().catch(() => null);

  if (!userDoc?.exists) {
    redirect("/");
  }

  const userData = userDoc.data() || {};

  const enrolledCourses = await Promise.all(
    enrolledCourseIds.map(async (courseId) => {
      const enrolledAt = await getCourseEnrollmentDate(userId, courseId);
      const progressData = await getLessonProgress(userId, courseId);
      const courseLessons = getPostsInCategory(courseId);
      const correctTotalLessons = getCourseLessonsCount(courseId);
      
      // Recalcular a porcentagem com o totalLessons correto (excluindo projeto.md)
      const completedLessons = progressData?.completedLessons?.length ?? 0;
      const correctPercentage = correctTotalLessons > 0 
        ? Math.round((completedLessons / correctTotalLessons) * 100)
        : 0;
      
      const completedSlugs = progressData?.completedLessons ?? [];
      const nextLesson = courseLessons.find(
        (lesson) => !completedSlugs.includes(lesson.slug)
      );
      const nextLessonSlug = nextLesson?.slug || (courseLessons[0]?.slug ?? null);

      return {
        id: courseId,
        title: resolveCourseLabel(courseId),
        enrolledAt,
        enrolledAtLabel: formatDate(enrolledAt),
        progress: serializeProgressData({
          ...progressData,
          totalLessons: correctTotalLessons,
          completionPercentage: correctPercentage,
        }),
        nextLessonSlug,
      };
    }),
  );

  enrolledCourses.sort((a, b) => {
    if (!a.enrolledAt && !b.enrolledAt) {
      return a.title.localeCompare(b.title, "pt-BR");
    }

    if (!a.enrolledAt) {
      return 1;
    }

    if (!b.enrolledAt) {
      return -1;
    }

    return b.enrolledAt.getTime() - a.enrolledAt.getTime();
  });

  const userName = session?.user?.name || userData?.name || "Aluno";
  const userEmail = session?.user?.email || userData?.email || "Nao informado";
  const userImage =
    session?.user?.image || userData?.image || "/default-avatar.svg";
  const createdAtLabel = formatDate(userData?.createdAt);
  const totalEnrolledCoursesLabel =
    enrolledCourses.length === 1
      ? "1 curso inscrito"
      : `${enrolledCourses.length} cursos inscritos`;

  const providerConnections =
    userData?.providerConnections && typeof userData.providerConnections === "object"
      ? userData.providerConnections
      : {};

  const connectedAccounts = [
    {
      key: "google",
      label: "Google",
      iconClassName: "profile-connection-icon--google",
      description: "Login social com conta Google.",
      connection: providerConnections.google,
    },
    {
      key: "github",
      label: "GitHub",
      iconClassName: "profile-connection-icon--github",
      description: "Login social com conta GitHub.",
      connection: providerConnections.github,
    },
  ].map((providerItem) => {
    const providerConnection =
      providerItem.connection && typeof providerItem.connection === "object"
        ? providerItem.connection
        : null;

    const isConnected =
      typeof providerConnection?.providerAccountId === "string" &&
      providerConnection.providerAccountId.length > 0;

    return {
      key: providerItem.key,
      label: providerItem.label,
      iconClassName: providerItem.iconClassName,
      description: providerItem.description,
      isAvailable: Boolean(availableProviders[providerItem.key]),
      isConnected,
      connectedAtLabel: formatDate(providerConnection?.connectedAt),
      lastLoginAtLabel: formatDate(providerConnection?.lastLoginAt),
    };
  });

  return (
    <ProfileContent
      userImage={userImage}
      userName={userName}
      userEmail={userEmail}
      enrolledCourses={enrolledCourses}
      totalEnrolledCoursesLabel={totalEnrolledCoursesLabel}
      createdAtLabel={createdAtLabel}
      connectedAccounts={connectedAccounts}
      userId={userId}
    />
  );
}
