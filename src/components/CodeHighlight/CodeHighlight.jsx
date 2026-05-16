import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export default function CodeHighlight({ language, children, ...props }) {
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
