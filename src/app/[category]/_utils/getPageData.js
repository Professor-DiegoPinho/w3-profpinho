import { content } from "@/data";
import {
    courseRequiresEnrollment,
    getCourseAccessLabel,
    getCourseAccessType,
    isCourseVisibleToUser,
    isPaidCourse,
} from "@/lib/courseAccess";
import {
    getCourseEnrollmentCount,
    getCourseEnrollmentDate,
    getEnrolledCourseIds,
} from "@/lib/enrollment";
import { isProjectApproved } from "@/lib/feedback";
import {
    getCourseLessonsCount,
    getPostsInCategory,
} from "@/lib/markdown";
import { getLessonProgress } from "@/lib/progress";

export async function getCoursePageData(category, session) {
  const posts = getPostsInCategory(category);
  const course = content.find((item) => item.slug === category);

  // Dados básicos
  const firstPost = posts[0];
  const totalLessons = getCourseLessonsCount(category);
  const courseWorkloadHours = Number.isInteger(course?.workloadHours)
    ? course.workloadHours
    : 0;
  const totalEnrolledStudents = await getCourseEnrollmentCount(category);

  // Título e descrição
  const courseTitle =
    course?.title || category.charAt(0).toUpperCase() + category.slice(1);
  const courseDescription =
    course?.description ||
    firstPost.description ||
    `Aprenda ${category} com aulas progressivas do básico ao avançado.`;

  // Badges e tags
  const courseBadge =
    typeof course?.badge === "string" && course.badge.trim().length > 0
      ? course.badge.trim()
      : null;
  const courseTags = Array.isArray(course?.tags) ? course.tags : [];
  const coursePrerequisites = Array.isArray(course?.prerequisites)
    ? course.prerequisites
    : [];

  // Tipos de acesso
  const courseAccessType = getCourseAccessType(course);
  const courseAccessLabel = getCourseAccessLabel(course);
  const showAccessBadge = courseAccessType === "free-course";
  const requiresEnrollment = courseRequiresEnrollment(course);
  const requiresPayment = isPaidCourse(course);

  // Verificar redirecionamento
  const shouldRedirect =
    (courseAccessType === "tutorial" || courseAccessType === "resume") &&
    firstPost?.slug;

  // Imagens e vídeos
  const courseImage = course?.image;
  const coursePresentationVideoId =
    typeof course?.youtubeId === "string" && course.youtubeId.trim()
      ? course.youtubeId.trim()
      : null;

  // Ebook
  const courseEbook = course?.ebook || {};

  // Recursos úteis
  const courseUsefulLinks = Array.isArray(course?.usefulLinks)
    ? course.usefulLinks
      .map((link) => {
        if (typeof link === "string") return { label: link, url: link };
        if (link?.url) return { label: link.label || link.url, url: link.url };
        return null;
      })
      .filter(Boolean)
    : [];

  // Sessão e inscrição
  const userId = session?.user?.id;
  const enrolledCourseIds = Array.isArray(session?.user?.enrolledCourseIds)
    ? session.user.enrolledCourseIds
    : await getEnrolledCourseIds(userId);

  // Visibilidade do curso
  const isCourseVisible = isCourseVisibleToUser(category, enrolledCourseIds);

  const isUserEnrolled = enrolledCourseIds.includes(category);
  const enrollmentDate =
    requiresEnrollment && isUserEnrolled
      ? await getCourseEnrollmentDate(userId, category)
      : null;
  const enrollmentDateLabel = enrollmentDate
    ? new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(enrollmentDate)
    : null;

  // Progresso do usuário
  const progressData = userId ? await getLessonProgress(userId, category) : null;
  const completedLessons = progressData?.completedLessons ?? [];
  const completionPercentage = totalLessons > 0
    ? Math.round((completedLessons.length / totalLessons) * 100)
    : 0;

  const serializedProgress = progressData
    ? {
      completedLessons: progressData.completedLessons ?? [],
      totalLessons,
      completionPercentage,
      completedAt: progressData.completedAt?._seconds
        ? new Date(progressData.completedAt._seconds * 1000).toISOString()
        : null,
    }
    : null;

  // Props comuns para CTABanner e EnrollmentActions
  const enrollmentProps = {
    category,
    firstPostSlug: firstPost?.slug,
    accessType: courseAccessType,
    requiresEnrollment,
    requiresPayment,
    checkoutUrl: course?.checkoutUrl,
  };

  // Feedback e aprovação de projeto
  let projectApproved = false;
  let feedbackResponded = false;
  if (userId && isUserEnrolled) {
    projectApproved = await isProjectApproved(userId, category);
    feedbackResponded = progressData?.feedbackResponded === true;
  }

  return {
    // Validação
    postsExist: posts.length > 0,
    isCourseVisible,
    shouldRedirect,
    redirectUrl: shouldRedirect ? `/${category}/${firstPost.slug}` : null,

    // Posts e curso
    posts,
    course,
    firstPost,

    // Informações do curso
    courseTitle,
    courseDescription,
    courseBadge,
    courseTags,
    coursePrerequisites,
    courseAccessType,
    courseAccessLabel,
    showAccessBadge,
    requiresEnrollment,
    requiresPayment,

    // Mídia
    courseImage,
    coursePresentationVideoId,
    courseEbook,
    courseUsefulLinks,

    // Métricas
    totalLessons,
    courseWorkloadHours,
    totalEnrolledStudents,

    // Inscrição e sessão
    userId,
    enrolledCourseIds,
    isUserEnrolled,
    enrollmentDateLabel,

    // Progresso
    completedLessons,
    completionPercentage,
    serializedProgress,

    // Feedback
    projectApproved,
    feedbackResponded,

    // Props pré-montadas
    enrollmentProps,
  };
}
