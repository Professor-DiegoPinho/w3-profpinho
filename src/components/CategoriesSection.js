import Link from 'next/link';

export default function CategoriesSection({ categories, sidebarData }) {
  return (
    <div className="categories-grid">
      {categories.map((category) => {
        const categoryData = sidebarData.find((cat) => cat.category === category);
        const firstPost = categoryData?.posts[0];

        return (
          <div key={category} className="category-card">
            <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
            <p>Aprenda {category} do básico até conceitos avançados.</p>
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