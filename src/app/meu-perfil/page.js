import { auth } from "@/auth";
import {
  getCourseEnrollmentDate,
  getEnrolledCourseIds,
} from "@/lib/enrollment";
import { adminDb } from "@/lib/firebaseAdmin";
import { getCourseLessonsCount, getPostsInCategory } from "@/lib/markdown";
import { getLessonProgress } from "@/lib/progress";
import { redirect } from "next/navigation";
import { Content } from "./_components/Content/Content";
import { buildConnectedAccounts } from "./_utils/connections";
import { getCorrectLessonProgress, resolveCourseLabel } from "./_utils/courses";
import { formatDateToPtBr } from "./_utils/date";
import { serializeProgressData } from "./_utils/progress";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Meu perfil | Diego Pinho Learning Hub",
  description:
    "Acompanhe os cursos em que voce esta inscrito e veja os detalhes da sua conta.",
};

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
      const completedLessonsCount = progressData?.completedLessons?.length ?? 0;
      const correctPercentage = getCorrectLessonProgress(correctTotalLessons, completedLessonsCount);

      const completedSlugs = progressData?.completedLessons ?? [];
      const nextLesson = courseLessons.find(
        (lesson) => !completedSlugs.includes(lesson.slug)
      );
      const nextLessonSlug = nextLesson?.slug || (courseLessons[0]?.slug ?? null);

      return {
        id: courseId,
        title: resolveCourseLabel(courseId),
        enrolledAt,
        enrolledAtLabel: formatDateToPtBr(enrolledAt),
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
  const createdAtLabel = formatDateToPtBr(userData?.createdAt);
  const totalEnrolledCoursesLabel =
    enrolledCourses.length === 1
      ? "1 curso inscrito"
      : `${enrolledCourses.length} cursos inscritos`;

  const providerConnections =
    userData?.providerConnections && typeof userData.providerConnections === "object"
      ? userData.providerConnections
      : {};

  const connectedAccounts = buildConnectedAccounts(providerConnections, availableProviders);

  return (
    <Content
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
