import AdditionalInfo from "@/app/[category]/_components/AdditionalInfo/AdditionalInfo";
import EnrollmentActions from "@/app/[category]/_components/EnrollmentActions/EnrollmentActions";
import Header from "@/app/[category]/_components/Header/Header";
import LessonsSection from "@/app/[category]/_components/LessonsSection/LessonsSection";
import Summary from "@/app/[category]/_components/Summary/Summary";
import CTABanner from "@/app/[category]/_components/CTABanner/CTABanner";
import FeedbackCard from "@/app/[category]/_components/FeedbackCard/FeedbackCard";
import Progress from "@/app/[category]/_components/Progress/Progress";
import { auth } from "@/auth";
import { content } from "@/data";
import { getCourseAccessLabel } from "@/lib/courseAccess";
import { getCategories, getPostsInCategory } from "@/lib/markdown";
import { getCoursePageData } from "@/app/[category]/_utils/getPageData";
import { notFound, redirect } from "next/navigation";
import styles from "./page.module.css";

export const revalidate = 3600; // ISR: revalida a cada 1 hora

export async function generateStaticParams() {
  const categories = getCategories();
  return categories.map((category) => ({ category }));
}

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const session = await auth();

  const data = await getCoursePageData(category, session);

  if (!data.postsExist) {
    notFound();
  }

  if (!data.isCourseVisible) {
    notFound();
  }

  if (data.shouldRedirect) {
    redirect(data.redirectUrl);
  }

  const { userId, isUserEnrolled } = data;

  return (
    <section className={styles.page}>
      <Header
        courseImage={data.courseImage}
        courseBadge={data.courseBadge}
        showAccessBadge={data.showAccessBadge}
        courseAccessLabel={data.courseAccessLabel}
        courseTitle={data.courseTitle}
        courseDescription={data.courseDescription}
      />

      <Summary
        totalLessons={data.totalLessons}
        totalEnrolledStudents={data.totalEnrolledStudents}
        courseWorkloadHours={data.courseWorkloadHours}
      />

      {userId && isUserEnrolled && (
        <Progress
          courseSlug={category}
          totalLessons={data.totalLessons}
          initialProgress={data.serializedProgress}
          enrollmentDateLabel={data.enrollmentDateLabel}
        />
      )}

      {userId && isUserEnrolled && (
        <FeedbackCard
          courseSlug={category}
          completionPercentage={data.completionPercentage}
          projectApproved={data.projectApproved}
          feedbackResponded={data.feedbackResponded}
        />
      )}

      {!isUserEnrolled && (
        <CTABanner {...data.enrollmentProps} />
      )}

      <LessonsSection
        posts={data.posts}
        category={category}
        completedLessons={data.completedLessons}
        isEnrolled={isUserEnrolled}
      />



      <AdditionalInfo
        isUserEnrolled={isUserEnrolled}
        coursePresentationVideoId={data.coursePresentationVideoId}
        courseEbook={data.courseEbook}
        courseUsefulLinks={data.courseUsefulLinks}
        courseTags={data.courseTags}
        coursePrerequisites={data.coursePrerequisites}
      />

      {!isUserEnrolled && (
        <EnrollmentActions {...data.enrollmentProps} />
      )}
    </section>
  );
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  const posts = getPostsInCategory(category);
  const course = content.find((item) => item.slug === category);

  if (!posts.length) {
    return { title: "Curso não encontrado" };
  }

  const firstPost = posts[0];
  const seo = course?.seo;
  const title =
    seo?.metaTitle ||
    `${course?.title || category.charAt(0).toUpperCase() + category.slice(1)
    } - ${getCourseAccessLabel(course)}`;
  const description =
    seo?.metaDescription ||
    course?.description ||
    firstPost.description ||
    `Resumo e inscrição para o curso de ${category}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: seo?.ogImage ? [seo.ogImage] : undefined,
      type: "website",
    },
  };
}