import { auth } from "@/auth";
import CourseEnrollmentButton from "@/components/CourseEnrollmentButton";
import Layout from "@/components/Layout";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { courses } from "@/data/courses";
import {
  getCourseEnrollmentCount,
  getCourseEnrollmentDate,
  getEnrolledCourseIds,
  mapSidebarWithAccess,
} from "@/lib/enrollment";
import {
  getCategories,
  getPostsInCategory,
  getSidebarData,
} from "@/lib/markdown";
import Image from "next/image";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

function getShortLink(url) {
  try {
    const parsedUrl = new URL(url);
    const domain = parsedUrl.hostname.replace(/^www\./, "");
    const path = parsedUrl.pathname === "/" ? "" : parsedUrl.pathname;
    const shortPath = path.length > 18 ? `${path.slice(0, 18)}...` : path;

    return `${domain}${shortPath}`;
  } catch {
    return url;
  }
}

export async function generateStaticParams() {
  const categories = getCategories();

  return categories.map((category) => ({
    category,
  }));
}

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const posts = getPostsInCategory(category);
  const course = courses.find((item) => item.slug === category);

  if (!posts.length) {
    notFound();
  }

  const session = await auth();
  const userId = session?.user?.id;
  const enrolledCourseIds = Array.isArray(session?.user?.enrolledCourseIds)
    ? session.user.enrolledCourseIds
    : await getEnrolledCourseIds(userId);

  const sidebarData = mapSidebarWithAccess(getSidebarData(), enrolledCourseIds);
  const firstPost = posts[0];
  const totalLessons = posts.length;
  const totalReadingMinutes = posts.reduce(
    (acc, post) => acc + (post.readingTime?.minutes || 0),
    0,
  );
  const totalEnrolledStudents = await getCourseEnrollmentCount(category);
  const courseTitle =
    course?.title || category.charAt(0).toUpperCase() + category.slice(1);
  const courseDescription =
    course?.description ||
    firstPost.description ||
    `Aprenda ${category} com aulas progressivas do básico ao avançado.`;
  const courseBadge = course?.badge || "Curso";
  const courseTags = Array.isArray(course?.tags) ? course.tags : [];
  const coursePrerequisites = Array.isArray(course?.prerequisites)
    ? course.prerequisites
    : [];
  const courseAccessLabel = course?.isFree ? "Gratuito" : "Premium";
  const courseImage = course?.image;
  const coursePresentationVideoId =
    typeof course?.youtubeId === "string" && course.youtubeId.trim()
      ? course.youtubeId.trim()
      : null;
  const courseEbook = course?.ebook || {};
  const hasCourseEbook = Object.keys(courseEbook).length > 0;
  const courseEbookLink = courseEbook.url;
  const courseUsefulLinks = Array.isArray(course?.usefulLinks)
    ? course.usefulLinks
        .map((link) => {
          if (typeof link === "string") {
            return {
              label: link,
              url: link,
            };
          }

          if (link?.url) {
            return {
              label: link.label || link.url,
              url: link.url,
            };
          }

          return null;
        })
        .filter(Boolean)
    : [];
  const hasCourseResources = courseUsefulLinks.length > 0;
  const isUserEnrolled = enrolledCourseIds.includes(category);
  const enrollmentDate = isUserEnrolled
    ? await getCourseEnrollmentDate(userId, category)
    : null;
  const enrollmentDateLabel = enrollmentDate
    ? new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(enrollmentDate)
    : null;

  return (
    <Layout sidebarData={sidebarData} currentCategory={category}>
      <section className="course-enrollment-page">
        <header className="course-enrollment-header">
          {courseImage && (
            <div className="course-enrollment-logo">
              <Image
                src={courseImage}
                alt={`Logo do curso ${courseTitle}`}
                width={72}
                height={72}
              />
            </div>
          )}
          <div className="course-enrollment-badges">
            <span className="course-enrollment-badge">{courseBadge}</span>
            <span className="course-enrollment-badge">{courseAccessLabel}</span>
          </div>
          <h1>{courseTitle}</h1>
          <p>{courseDescription}</p>
        </header>

        <div className="course-enrollment-summary">
          <div className="course-summary-item">
            <strong>{totalLessons}</strong>
            <span>lições disponíveis</span>
          </div>
          <div className="course-summary-item">
            <strong>{totalEnrolledStudents}</strong>
            <span>alunos inscritos</span>
          </div>
          <div className="course-summary-item">
            <strong>{totalReadingMinutes}</strong>
            <span>minutos de leitura estimado</span>
          </div>
        </div>

        {coursePresentationVideoId && (
          <div className="course-meta-block">
            <h2>Saiba mais sobre o curso</h2>
            <YouTubeEmbed videoId={coursePresentationVideoId} />
          </div>
        )}

        {hasCourseEbook && (
          <div className="course-meta-block">
            <h2>Ebook do curso</h2>
            <a
              href={courseEbookLink}
              target="_blank"
              rel="noopener noreferrer"
              className="course-ebook-card"
            >
              {courseEbook.image ? (
                <div
                  className="course-ebook-card-image"
                  style={{ backgroundImage: `url(${courseEbook.image})` }}
                  role="img"
                  aria-label={`Imagem do site ${courseEbook.siteName}`}
                />
              ) : (
                <div className="course-ebook-card-image-fallback">
                  {courseEbook.siteName.slice(0, 1).toUpperCase()}
                </div>
              )}
              <div className="course-ebook-card-content">
                <p className="course-ebook-card-site">{courseEbook.siteName}</p>
                <h3 className="course-ebook-card-title">{courseEbook.title}</h3>
                <p className="course-ebook-card-domain">{courseEbook.displayUrl}</p>
                <span className="course-ebook-card-cta">Abrir ebook completo ↗</span>
              </div>
            </a>
          </div>
        )}

        {hasCourseResources && (
          <div className="course-meta-block">
            <h2>Recursos do curso</h2>
            <ul className="course-resource-list">
              {courseUsefulLinks.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="course-resource-link"
                  >
                    {getShortLink(link.url)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {courseTags.length > 0 && (
          <div className="course-meta-block">
            <h2>Tags</h2>
            <div className="course-tags-list">
              {courseTags.map((tag) => (
                <span key={tag} className="course-tag-chip">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="course-meta-block">
          {coursePrerequisites.length > 0 && (
            <>
              <h2>Pré-requisitos</h2>
              <ul className="course-prerequisites-list">
                {coursePrerequisites.map((prerequisite) => (
                  <li key={prerequisite}>{prerequisite}</li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className="course-enrollment-actions">
          <CourseEnrollmentButton
            category={category}
            firstPostSlug={firstPost.slug}
          />
          {enrollmentDateLabel && (
            <p className="course-enrollment-date">Inscreveu-se em {enrollmentDateLabel}</p>
          )}
        </div>
      </section>
    </Layout>
  );
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  const posts = getPostsInCategory(category);
  const course = courses.find((item) => item.slug === category);

  if (!posts.length) {
    return {
      title: "Curso não encontrado",
    };
  }

  const firstPost = posts[0];
  const seo = course?.seo;
  const title =
    seo?.metaTitle ||
    `Inscrição - ${course?.title || category.charAt(0).toUpperCase() + category.slice(1)}`;
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
