import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export default function MarkdownContent({ content }) {
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
        <code className={`inline-code ${className || ''}`} {...props}>
          {children}
        </code>
      );
    },

    h1: ({ children }) => <h1 className="content-h1">{children}</h1>,
    h2: ({ children }) => <h2 className="content-h2">{children}</h2>,
    h3: ({ children }) => <h3 className="content-h3">{children}</h3>,
    h4: ({ children }) => <h4 className="content-h4">{children}</h4>,

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
  };

  return (
    <div className="markdown-content">
      <ReactMarkdown
        components={components}
        remarkPlugins={[remarkGfm]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}