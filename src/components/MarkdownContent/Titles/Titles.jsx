import { generateId } from '@/lib/generateId';
import styles from './Titles.module.css';

function getTextFromChildren(children) {
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) {
    return children.map(getTextFromChildren).join('');
  }
  if (children?.props?.children) {
    return getTextFromChildren(children.props.children);
  }
  return '';
}

export function H1({ children }) {
  const id = generateId(getTextFromChildren(children));
  return <h1 id={id} className={styles.h1}>{children}</h1>;
}

export function H2({ children }) {
  const id = generateId(getTextFromChildren(children));
  return <h2 id={id} className={styles.h2}>{children}</h2>;
}

export function H3({ children }) {
  const id = generateId(getTextFromChildren(children));
  return <h3 id={id} className={styles.h3}>{children}</h3>;
}

export function H4({ children }) {
  const id = generateId(getTextFromChildren(children));
  return <h4 id={id} className={styles.h4}>{children}</h4>;
}
