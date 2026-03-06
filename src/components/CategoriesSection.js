import { COURSE_ACCESS_TYPES } from '@/data/courses';
import Link from 'next/link';

function CategoryCard({ categoryData, ctaLabel, href, showFreeBadge = false }) {
  const isFreeCourse = categoryData.accessType === COURSE_ACCESS_TYPES.FREE_COURSE;

  return (
    <div className="category-card">
      <div className="category-card-header">
        <h2>{categoryData.title}</h2>
        {showFreeBadge && isFreeCourse && (
          <span className="category-free-badge">Gratuito</span>
        )}
      </div>
      <p>{categoryData.description || 'Conteudo em desenvolvimento.'}</p>
      <div className="category-stats">
        <span>{categoryData?.posts.length || 0} licoes</span>
      </div>
      <Link href={href} className="start-learning-btn">
        {ctaLabel}
      </Link>
    </div>
  );
}

function CategorySection({ title, categories, ctaLabel, isTutorialSection = false, showFreeBadge = false }) {
  if (!categories.length) {
    return null;
  }

  return (
    <section className="home-catalog-section">
      <h2 className="home-catalog-title">{title}</h2>
      <div className="categories-grid">
        {categories.map((categoryData) => {
          const firstPost = categoryData?.posts?.[0];

          if (!firstPost) {
            return null;
          }

          const href = isTutorialSection
            ? `/${categoryData.category}/${firstPost.slug}`
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

export default function CategoriesSection({ sidebarData }) {
  const tutorialCategories = sidebarData.filter(
    (category) => category.accessType === COURSE_ACCESS_TYPES.TUTORIAL
  );

  const courseCategories = sidebarData.filter(
    (category) => category.accessType !== COURSE_ACCESS_TYPES.TUTORIAL
  );

  return (
    <>
      <CategorySection
        title="Tutoriais"
        categories={tutorialCategories}
        ctaLabel="Comece por aqui"
        isTutorialSection={true}
      />

      <CategorySection
        title="Cursos"
        categories={courseCategories}
        ctaLabel="Saiba mais"
        showFreeBadge={true}
      />
    </>
  );
}