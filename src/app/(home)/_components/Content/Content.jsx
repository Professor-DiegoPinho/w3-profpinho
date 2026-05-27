import { CONTENT_TYPE, courses, resumes, tutorials } from '@/data';
import { getPostsCountInCategory } from '@/lib/markdown';
import Link from 'next/link';
import styles from './Content.module.css';

export default function Content() {
  const tutorialsWithPosts = tutorials
    .map((tutorial) => ({
      category: tutorial.slug,
      title: tutorial.title,
      description: tutorial.description,
      accessType: CONTENT_TYPE.TUTORIAL,
      postsCount: getPostsCountInCategory(tutorial.slug),
    }));

  const coursesWithPosts = courses
    .map((course) => ({
      category: course.slug,
      title: course.title,
      description: course.description,
      accessType: course.accessType,
      postsCount: getPostsCountInCategory(course.slug),
    }));

  const resumesWithPosts = resumes
    .map((resume) => ({
      category: resume.slug,
      title: resume.title,
      description: resume.description,
      accessType: CONTENT_TYPE.RESUME,
      postsCount: getPostsCountInCategory(resume.slug),
    }));

  const freeCoursesWithPosts = coursesWithPosts.filter(
    (course) => course.accessType === CONTENT_TYPE.FREE_COURSE
  );

  return (
    <section className={styles.catalogSection}>
      <ContentCategory
        title="Tutoriais"
        categories={tutorialsWithPosts}
        ctaLabel="Comece por aqui"
        isDirectPostSection={true}
      />

      <ContentCategory
        title="Cursos"
        categories={freeCoursesWithPosts}
        ctaLabel="Saiba mais"
        showFreeBadge={true}
      />

      <ContentCategory
        title="Resumos"
        categories={resumesWithPosts}
        ctaLabel="Ver resumo"
        isDirectPostSection={true}
      />
    </section>
  );
}

function ContentCategory({ title, categories, ctaLabel, isDirectPostSection = false, showFreeBadge = false }) {
  if (!categories.length) {
    return null;
  }

  return (
    <section className={styles.catalogSection}>
      <h2 className={styles.catalogTitle}>{title}</h2>
      <div className={styles.categoriesGrid}>
        {categories.map((categoryData) => {
          // Filtra apenas categorias que têm conteúdo
          if (!categoryData.postsCount || categoryData.postsCount === 0) {
            return null;
          }

          const href = isDirectPostSection
            ? `/${categoryData.category}`
            : `/${categoryData.category}`;

          return (
            <CategoryCard
              key={categoryData.category}
              categoryData={categoryData}
              ctaLabel={ctaLabel}
              href={href}
              showFreeBadge={showFreeBadge}
            />
          );
        })}
      </div>
    </section>
  );
}
        
function CategoryCard({ categoryData, ctaLabel, href, showFreeBadge = false }) {
  const isFreeCourse = categoryData.accessType === CONTENT_TYPE.FREE_COURSE;

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2>{categoryData.title}</h2>
        {showFreeBadge && isFreeCourse && (
          <span className={styles.freeBadge}>Gratuito</span>
        )}
      </div>
      <p>{categoryData.description || 'Conteudo em desenvolvimento.'}</p>
      <div className={styles.stats}>
        <span>{categoryData?.postsCount || 0} lições</span>
      </div>
      <Link href={href} className={styles.btn}>
        {ctaLabel}
      </Link>
    </div>
  );
}