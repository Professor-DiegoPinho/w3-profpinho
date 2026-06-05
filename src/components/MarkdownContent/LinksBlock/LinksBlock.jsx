import { Redirect } from '@/assets/icons/index';
import styles from './LinksBlock.module.css';

/**
 * Mapa de classes globais → CSS module para os <span> internos dos link cards.
 */
const spanClassMap = {
  'content-link-card-header': styles.linkCardHeader,
  'content-link-card-icon': styles.linkCardIcon,
  'content-link-card-title': styles.linkCardTitle,
  'content-link-card-domain': styles.linkCardDomain,
};

/**
 * Intercepta <section> gerado pela liquid tag {% links %}.
 */
export function LinksSection({ className, children, ...props }) {
  if (className?.includes('content-links-block')) {
    return <section className={styles.linksBlock} {...props}>{children}</section>;
  }
  return <section className={className} {...props}>{children}</section>;
}

/**
 * Intercepta o heading dentro da seção de links.
 * A liquid tag gera <h1 class="content-links-heading">.
 */
export function LinksHeading({ children }) {
  return <h2 className={styles.linksHeading}>{children}</h2>;
}

/**
 * Intercepta <div> que serve de grid para os link cards.
 */
export function LinksGrid({ className, children, ...props }) {
  if (className?.includes('content-links-grid')) {
    return <div className={styles.linksGrid} {...props}>{children}</div>;
  }
  return <div className={className} {...props}>{children}</div>;
}

/**
 * Intercepta <a> gerado como card de link pela liquid tag {% links %}.
 */
export function LinkCard({ href, children, ...props }) {
  return (
    <a
      href={href}
      className={styles.linkCard}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  );
}

/**
 * Intercepta <span> internos dos link cards, mapeando classes
 * globais para CSS modules.
 */
export function CardSpan({ className, children, ...props }) {
  if (className?.includes('content-link-card-icon')) {
    return (
      <span className={styles.linkCardIcon} {...props}>
        <Redirect size={20} />
      </span>
    );
  }
  const entry = Object.entries(spanClassMap).find(([key]) => className?.includes(key));
  if (entry) {
    return <span className={entry[1]} {...props}>{children}</span>;
  }
  return <span className={className} {...props}>{children}</span>;
}
