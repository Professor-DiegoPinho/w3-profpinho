import Link from 'next/link';
import styles from './MobilePostsView.module.css';

function MobilePostsView({
  selectedCategory,
  selectedSubCategoryData,
  isEnrollmentScreen,
  currentSlug,
  onBack,
  onPostClick,
}) {
  return (
    <nav className={`${styles.mobileSidebarNav} ${styles.mobileSidebarPage}`}>
      <div className={styles.mobileSidebarHeader}>
        <button className={styles.mobileBackBtn} onClick={onBack}>
          <span className={styles.mobileBackArrow}>←</span>
          <span>Voltar</span>
        </button>
        {selectedSubCategoryData && (
          <h2 className={styles.mobileContentTitle}>{selectedSubCategoryData.title}</h2>
        )}
      </div>

      {selectedCategory === 'course' && selectedSubCategoryData ? (
        // Para cursos: mostrar lista de aulas apenas se não precisa de inscrição
        !isEnrollmentScreen ? (
          <ul className={styles.mobileContentList}>
            {selectedSubCategoryData?.posts?.map((post) => {
              const isActive = currentSlug === post.slug;

              return (
                <li key={post.slug}>
                  <Link
                    href={`/${post.category}/${post.slug}`}
                    className={`${styles.mobileContentLink} ${isActive ? styles.active : ''}`}
                    onClick={(event) => onPostClick(event, post)}
                  >
                    {post.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : null
      ) : (
        // Para tutoriais: mostrar lista de aulas normalmente
        <ul className={styles.mobileContentList}>
          {selectedSubCategoryData?.posts?.map((post) => {
            const isActive = currentSlug === post.slug;

            return (
              <li key={post.slug}>
                <Link
                  href={`/${post.category}/${post.slug}`}
                  className={`${styles.mobileContentLink} ${isActive ? styles.active : ''}`}
                  onClick={(event) => onPostClick(event, post)}
                >
                  {post.title}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </nav>
  );
}

export default MobilePostsView;
