import Link from 'next/link';

export default function CategoriesSection({ categories, sidebarData }) {
  return (
    <div className="categories-grid">
      {categories.map((category) => {
        const categoryData = sidebarData.find((cat) => cat.category === category);

        if (!categoryData) {
          return null;
        }

        const firstPost = categoryData?.posts[0];
        const categoryTitle =
          categoryData?.title ||
          category
            .split('-')
            .filter(Boolean)
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        return (
          <div key={category} className="category-card">
            <h2>{categoryTitle}</h2>
            <p>{categoryData.description || 'Conteudo em desenvolvimento.'}</p>
            <div className="category-stats">
              <span>{categoryData?.posts.length || 0} lições</span>
            </div>
            {firstPost && (
              <Link
                href={`/${category}`}
                className="start-learning-btn"
              >
                Saiba mais
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}