import { CONTENT_TYPE } from '@/data';
import Link from 'next/link';
import './CategoriesSection.css';

function CategoryCard({ categoryData, ctaLabel, href, showFreeBadge = false }) {
  const isFreeCourse = categoryData.accessType === CONTENT_TYPE.FREE_COURSE;

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
        <span>{categoryData?.posts.length || 0} lições</span>
      </div>
      <Link href={href} className="start-learning-btn">
        {ctaLabel}
      </Link>
    </div>
  );
}

function CategorySection({ title, categories, ctaLabel, isDirectPostSection = false, showFreeBadge = false }) {
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

          const href = isDirectPostSection
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
    (category) => category.accessType === CONTENT_TYPE.TUTORIAL
  );

  const courseCategories = sidebarData.filter(
    (category) =>
      category.accessType === CONTENT_TYPE.FREE_COURSE ||
      category.accessType === CONTENT_TYPE.PAID_COURSE
  );

  const resumeCategories = sidebarData.filter(
    (category) => category.accessType === CONTENT_TYPE.RESUME
  );

  return (
    <>
      <CategorySection
        title="Tutoriais"
        categories={tutorialCategories}
        ctaLabel="Comece por aqui"
        isDirectPostSection={true}
      />

      <CategorySection
        title="Cursos"
        categories={courseCategories}
        ctaLabel="Saiba mais"
        showFreeBadge={true}
      />

      <CategorySection
        title="Resumos"
        categories={resumeCategories}
        ctaLabel="Ver resumo"
        isDirectPostSection={true}
      />
    </>
  );
}