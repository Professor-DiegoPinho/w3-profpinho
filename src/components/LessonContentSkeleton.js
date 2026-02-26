export default function LessonContentSkeleton() {
  return (
    <article className="post-content lesson-loading-skeleton" aria-busy="true" aria-live="polite">
      <header className="post-header">
        <div className="skeleton-line skeleton-breadcrumb"></div>
        <div className="skeleton-line skeleton-title"></div>
        <div className="skeleton-line skeleton-subtitle"></div>
      </header>

      <div className="post-body">
        <div className="skeleton-line skeleton-section-title"></div>

        <div className="skeleton-line skeleton-paragraph"></div>
        <div className="skeleton-line skeleton-paragraph"></div>
        <div className="skeleton-line skeleton-paragraph medium"></div>

        <div className="skeleton-quote">
          <div className="skeleton-line skeleton-quote-line"></div>
          <div className="skeleton-line skeleton-quote-line short"></div>
        </div>

        <div className="skeleton-line skeleton-section-subtitle"></div>
        <div className="skeleton-line skeleton-paragraph"></div>

        <div className="skeleton-list">
          <div className="skeleton-list-item">
            <span className="skeleton-line skeleton-list-index"></span>
            <span className="skeleton-line skeleton-list-line"></span>
          </div>
          <div className="skeleton-list-item">
            <span className="skeleton-line skeleton-list-index"></span>
            <span className="skeleton-line skeleton-list-line"></span>
          </div>
          <div className="skeleton-list-item">
            <span className="skeleton-line skeleton-list-index"></span>
            <span className="skeleton-line skeleton-list-line long"></span>
          </div>
          <div className="skeleton-list-item">
            <span className="skeleton-line skeleton-list-index"></span>
            <span className="skeleton-line skeleton-list-line medium"></span>
          </div>
          <div className="skeleton-list-item">
            <span className="skeleton-line skeleton-list-index"></span>
            <span className="skeleton-line skeleton-list-line"></span>
          </div>
          <div className="skeleton-list-item">
            <span className="skeleton-line skeleton-list-index"></span>
            <span className="skeleton-line skeleton-list-line short"></span>
          </div>
        </div>
      </div>
    </article>
  );
}
