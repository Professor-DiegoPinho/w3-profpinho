import { generateId } from '@/lib/generateId';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';

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
          <SyntaxHighlighter
            style={tomorrow}
            language={language}
            PreTag="div"
            className="code-block"
            showLineNumbers={true}
            wrapLines={true}
            {...props}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        );
      }

      return (
        <code className={`inline-code ${className || ''}`.trim()} {...props}>
          {children}
        </code>
      );
    },

    h1: ({ children }) => {
      const id = generateId(getTextFromChildren(children));
      return <h1 id={id} className="content-h1">{children}</h1>;
    },
    h2: ({ children }) => {
      const id = generateId(getTextFromChildren(children));
      return <h2 id={id} className="content-h2">{children}</h2>;
    },
    h3: ({ children }) => {
      const id = generateId(getTextFromChildren(children));
      return <h3 id={id} className="content-h3">{children}</h3>;
    },
    h4: ({ children }) => {
      const id = generateId(getTextFromChildren(children));
      return <h4 id={id} className="content-h4">{children}</h4>;
    },

    p: ({ children }) => <p className="content-paragraph">{children}</p>,

    ul: ({ children }) => <ul className="content-list">{children}</ul>,
    ol: ({ children }) => <ol className="content-ordered-list">{children}</ol>,
    li: ({ children }) => <li className="content-list-item">{children}</li>,

    blockquote: ({ children }) => (
      <blockquote className="content-blockquote">{children}</blockquote>
    ),

    table: ({ children }) => (
      <div className="table-wrapper">
        <table className="content-table">{children}</table>
      </div>
    ),

    th: ({ children }) => <th className="table-header">{children}</th>,
    td: ({ children }) => <td className="table-cell">{children}</td>,

    a: ({ href, children }) => (
      <a href={href} className="content-link" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),

    strong: ({ children }) => <strong className="content-bold">{children}</strong>,
    em: ({ children }) => <em className="content-italic">{children}</em>,

    img: ({ src, alt, ...props }) => {
      if (!src) {
        return null;
      }
      return <img src={src} alt={alt || ''} {...props} />;
    },
  };

  return (
    <div className="markdown-content">
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