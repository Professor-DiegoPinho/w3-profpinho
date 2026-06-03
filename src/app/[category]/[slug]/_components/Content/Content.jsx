import MarkdownContent from '@/app/[category]/[slug]/_components/MarkdownContent/MarkdownContent';
import TableOfContents from '@/app/[category]/[slug]/_components/TableOfContents/TableOfContents';
import styles from './Content.module.css';

export default function Content({ content, title, hasLessonAccess, category }) {
  return (
    <div className={styles.body}>
      <TableOfContents content={content} title={title} />
      {hasLessonAccess ? (
        <MarkdownContent content={content} title={title} />
      ) : (
        <div className={styles.lockedNotice}>
          <p>Esta aula está disponível apenas para alunos inscritos no curso.</p>
          <p>
            <a href={`/${category}`} className={styles.lockedLink}>
              Volte para a página do curso para se inscrever
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
