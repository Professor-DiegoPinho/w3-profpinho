import Link from 'next/link';

export default function PostsList({
  category,
  isExpanded,
  currentCategory,
  currentSlug,
  onPostClick,
}) {
  if (!Array.isArray(category.posts) || category.posts.length === 0) {
    return null;
  }

  return (
    <div className={`sidebar-collapse category-posts-collapse ${isExpanded ? 'open' : ''}`}>
      <div className="sidebar-collapse-inner">
        <ul className="posts-list">
          {category.posts.map((post) => {
            const isActivePost =
              currentCategory === post.category && currentSlug === post.slug;

            return (
              <li key={post.slug} className="post-item">
                <Link
                  href={`/${post.category}/${post.slug}`}
                  className={`post-link ${isActivePost ? 'active' : ''}`}
                  onClick={(event) => onPostClick(event, post)}
                >
                  <span className="post-link-text">{post.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
