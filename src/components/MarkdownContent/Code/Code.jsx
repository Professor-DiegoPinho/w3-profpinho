import dynamic from 'next/dynamic';
import styles from './Code.module.css';

// Lazy load do syntax highlighter (componente pesado)
const CodeHighlight = dynamic(() => import('@/components/CodeHighlight/CodeHighlight'), {
  ssr: false,
  loading: () => <code className="inline-code loading-placeholder">Carregando...</code>,
});

export function Code({ node, inline, className, children, ...props }) {
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : '';

  if (!inline && language) {
    return (
      <CodeHighlight
        language={language}
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </CodeHighlight>
    );
  }

  return (
    <code className={`${styles.inlineCode} ${className || ''}`.trim()} {...props}>
      {children}
    </code>
  );
}
