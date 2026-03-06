export default function ProfilePageSkeleton() {
  return (
    <section
      className="profile-page lesson-loading-skeleton profile-loading-skeleton"
      aria-busy="true"
      aria-live="polite"
    >
      <header className="profile-header profile-skeleton-header">
        <div className="skeleton-block profile-skeleton-avatar" />
        <div className="profile-skeleton-header-text">
          <div className="skeleton-line profile-skeleton-title" />
          <div className="skeleton-line profile-skeleton-subtitle" />
        </div>
      </header>

      <div className="profile-summary-grid">
        <div className="profile-summary-card profile-skeleton-card">
          <div className="skeleton-line profile-skeleton-label" />
          <div className="skeleton-line profile-skeleton-value" />
        </div>
        <div className="profile-summary-card profile-skeleton-card">
          <div className="skeleton-line profile-skeleton-label" />
          <div className="skeleton-line profile-skeleton-value" />
        </div>
      </div>

      <div className="profile-grid">
        <article className="profile-card">
          <div className="profile-courses-header">
            <div>
              <div className="skeleton-line profile-skeleton-section-title" />
              <div className="skeleton-line profile-skeleton-section-subtitle" />
            </div>
          </div>

          <ul className="profile-course-list">
            {Array.from({ length: 3 }).map((_, index) => (
              <li key={`course-skeleton-${index}`} className="profile-course-item">
                <div className="profile-course-content">
                  <div className="skeleton-line profile-skeleton-course-title" />
                  <div className="skeleton-line profile-skeleton-course-meta" />
                </div>
                <div className="skeleton-line profile-skeleton-course-button" />
              </li>
            ))}
          </ul>
        </article>

        <article className="profile-card">
          <div className="skeleton-line profile-skeleton-section-title short" />
          <div className="skeleton-line profile-skeleton-paragraph" />
        </article>
      </div>
    </section>
  );
}
