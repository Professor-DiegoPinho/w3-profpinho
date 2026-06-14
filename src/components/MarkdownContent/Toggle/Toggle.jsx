import { ToggleArrow } from '@/assets/icons/index';
import styles from './Toggle.module.css';

/**
 * Intercepta <details> gerado pela liquid tag {% toggle %}.
 * Se a className contiver "content-toggle", aplica CSS module;
 * caso contrário, renderiza normalmente.
 */
export function Details({ className, children, ...props }) {
  if (className?.includes('content-toggle')) {
    return <details className={styles.toggle} {...props}>{children}</details>;
  }
  return <details className={className} {...props}>{children}</details>;
}

/**
 * Intercepta <summary> gerado pela liquid tag {% toggle %}.
 * Insere o ícone ToggleArrow como elemento real no lugar do ::before.
 */
export function Summary({ className, children, ...props }) {
  if (className?.includes('content-toggle-summary')) {
    return (
      <summary className={styles.toggleSummary} {...props}>
        <span className={styles.toggleIcon}>
          <ToggleArrow size={36} />
        </span>
        {children}
      </summary>
    );
  }
  return <summary className={className} {...props}>{children}</summary>;
}
