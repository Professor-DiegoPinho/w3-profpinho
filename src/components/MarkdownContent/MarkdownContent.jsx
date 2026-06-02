"use client";

import { generateId } from '@/lib/generateId';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import styles from './MarkdownContent.module.css';

// Lazy load do syntax highlighter (componente pesado)
const CodeHighlight = dynamic(() => import('@/components/CodeHighlight/CodeHighlight'), {
  ssr: false,
  loading: () => <code className="inline-code loading-placeholder">Carregando...</code>,
});

const sanitizeSchema = {
  ...defaultSchema,
  tagNames: [
    ...(defaultSchema.tagNames || []),
    'iframe',
    'details',
    'summary',
    'section',
  ],
  attributes: {
    ...defaultSchema.attributes,
    '*': [
      ...(defaultSchema.attributes['*'] || []),
      'className',
      'style',
      'ariaHidden',
      'ariaLabel',
    ],
    iframe: ['src', 'title', 'frameBorder', 'allow', 'allowFullScreen', 'className'],
    a: [...(defaultSchema.attributes.a || []), 'target', 'rel', 'className'],
    details: ['className'],
    summary: ['className'],
    section: ['className'],
  },
  protocols: {
    ...defaultSchema.protocols,
    src: ['https'],
  },
};

export default function MarkdownContent({ content, title }) {
  const getTextFromChildren = (children) => {
    if (typeof children === 'string') return children;
    if (Array.isArray(children)) {
      return children.map(getTextFromChildren).join('');
    }
    if (children?.props?.children) {
      return getTextFromChildren(children.props.children);
    }
    return '';
  };

  const components = {
    code({ node, inline, className, children, ...props }) {
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
    },

    h1: ({ children }) => {
      const id = generateId(getTextFromChildren(children));
      return <h1 id={id} className={styles.h1}>{children}</h1>;
    },
    h2: ({ children }) => {
      const id = generateId(getTextFromChildren(children));
      return <h2 id={id} className={styles.h2}>{children}</h2>;
    },
    h3: ({ children }) => {
      const id = generateId(getTextFromChildren(children));
      return <h3 id={id} className={styles.h3}>{children}</h3>;
    },
    h4: ({ children }) => {
      const id = generateId(getTextFromChildren(children));
      return <h4 id={id} className={styles.h4}>{children}</h4>;
    },

    p: ({ children }) => <p className={styles.paragraph}>{children}</p>,

    ul: ({ children }) => <ul className={styles.list}>{children}</ul>,
    ol: ({ children }) => <ol className={styles.orderedList}>{children}</ol>,
    li: ({ children }) => <li className={styles.listItem}>{children}</li>,

    blockquote: ({ children }) => (
      <blockquote className={styles.blockquote}>{children}</blockquote>
    ),

    table: ({ children }) => (
      <div className={styles.tableWrapper}>
        <table className={styles.table}>{children}</table>
      </div>
    ),

    th: ({ children }) => <th className={styles.tableHeader}>{children}</th>,
    td: ({ children }) => <td className={styles.tableCell}>{children}</td>,

    a: ({ href, children }) => (
      <a href={href} className={styles.link} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),

    strong: ({ children }) => <strong className={styles.bold}>{children}</strong>,
    em: ({ children }) => <em className={styles.italic}>{children}</em>,

    img: ({ src, alt, ...props }) => {
      if (!src) {
        return null;
      }
      return <img src={src} alt={alt || ''} {...props} />;
    },
  };

  return (
    <div className={styles.markdown}>
      <ReactMarkdown
        components={components}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, [rehypeSanitize, sanitizeSchema]]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}