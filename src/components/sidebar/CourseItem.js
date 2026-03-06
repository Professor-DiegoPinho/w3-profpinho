import Link from 'next/link';
import ChevronIcon from './ChevronIcon';
import PostsList from './PostsList';

export default function CourseItem({
  category,
  enrolled,
  isExpanded,
  isCategoryActive,
  onToggle,
  onCategoryClick,
  onPostClick,
  currentCategory,
  currentSlug,
}) {
  return (
    <div className="category-section">
      <div className="category-link-row">
        <Link
          href={`/${category.category}`}
          className={`category-link ${isCategoryActive ? 'active' : ''}`}
          onClick={(event) => onCategoryClick(event, category.category)}
        >
          <span className="category-title">{category.title}</span>
        </Link>

        {enrolled && (
          <button
            type="button"
            className="category-toggle-btn"
            aria-label={isExpanded ? 'Fechar aulas' : 'Abrir aulas'}
            onClick={() => onToggle(category.category)}
          >
            <span className={`category-toggle-icon ${isExpanded ? 'open' : ''}`}>
              <ChevronIcon className="toggle-chevron" />
            </span>
          </button>
        )}
      </div>

      {enrolled && (
        <PostsList
          category={category}
          isExpanded={isExpanded}
          currentCategory={currentCategory}
          currentSlug={currentSlug}
          onPostClick={onPostClick}
        />
      )}
    </div>
  );
}
