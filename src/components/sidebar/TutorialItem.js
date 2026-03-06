import ChevronIcon from './ChevronIcon';
import PostsList from './PostsList';

export default function TutorialItem({
  category,
  isExpanded,
  isCategoryActive,
  onToggle,
  onPostClick,
  currentCategory,
  currentSlug,
}) {
  return (
    <div className="category-section">
      <button
        type="button"
        className={`category-link-row tutorial-category-row ${isCategoryActive ? 'active' : ''}`}
        onClick={() => onToggle(category.category)}
        aria-label={isExpanded ? 'Fechar aulas do tutorial' : 'Abrir aulas do tutorial'}
      >
        <span className="category-title">{category.title}</span>
        <span className={`category-toggle-icon ${isExpanded ? 'open' : ''}`}>
          <ChevronIcon className="toggle-chevron" />
        </span>
      </button>

      <PostsList
        category={category}
        isExpanded={isExpanded}
        currentCategory={currentCategory}
        currentSlug={currentSlug}
        onPostClick={onPostClick}
      />
    </div>
  );
}
