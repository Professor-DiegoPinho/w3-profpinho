import Link from 'next/link';

export default function ResumeItem({
  category,
  isCategoryActive,
  onPostClick,
}) {
  const firstPost = category?.posts?.[0];

  if (!firstPost) {
    return null;
  }

  return (
    <div className="category-section">
      <div className="category-link-row">
        <Link
          href={`/${category.category}/${firstPost.slug}`}
          className={`category-link ${isCategoryActive ? 'active' : ''}`}
          onClick={(event) => onPostClick(event, firstPost)}
        >
          <span className="category-title">{category.title}</span>
        </Link>
      </div>
    </div>
  );
}
