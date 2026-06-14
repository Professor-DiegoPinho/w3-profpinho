import Link from 'next/link';
import styles from './SidebarList.module.css';

function SidebarList({ context, items, currentSlug, currentCategory, onPostClick }) {
  return (
    <div className={styles.sidebarItems}>
      <div className={styles.sidebarItemsInner}>
        {context === 'resume' ? (
          // For resumes, show list of resume categories (other resumes) - direto para content.md
          <ul className={styles.dynamicSidebarList}>
            {items.map((resume) => {
              const isActive = currentCategory === resume.category && currentSlug === 'content';

              return (
                <li key={resume.category}>
                  <Link
                    href={`/${resume.category}/content`}
                    className={`${styles.dynamicSidebarLink} ${isActive ? styles.active : ''}`}
                    onClick={(event) =>
                      onPostClick(event, {
                        slug: 'content',
                        category: resume.category,
                      })
                    }
                  >
                    {resume.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          // For courses and tutorials, show list of posts/lessons
          <ul className={styles.dynamicSidebarList}>
            {items.map((post) => {
              const isActive = currentSlug === post.slug;

              return (
                <li key={post.slug}>
                  <Link
                    href={`/${post.category}/${post.slug}`}
                    className={`${styles.dynamicSidebarLink} ${isActive ? styles.active : ''}`}
                    onClick={(event) => onPostClick(event, post)}
                  >
                    <span className={styles.lessonTitle}>{post.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SidebarList;
