'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import CopyIcon from '@/assets/icons/CopyIcon';
import CheckmarkIcon from '@/assets/icons/CheckmarkIcon';

export default function CodeHighlight({ language, children, ...props }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const code = String(children).replace(/\n$/, '');
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const codeContent = String(children).replace(/\n$/, '');

  return (
    <div className="code-block-wrapper">
      <button
        onClick={handleCopy}
        className="copy-code-btn"
        title={copied ? 'Copiado!' : 'Copiar código'}
        aria-label={copied ? 'Código copiado para a área de transferência' : 'Copiar código para a área de transferência'}
        disabled={copied}
      >
        {copied ? (
          <CheckmarkIcon />
        ) : (
          <CopyIcon />
        )}
        {copied && <span>Copiado!</span>}
      </button>
      <SyntaxHighlighter
        style={tomorrow}
        language={language}
        PreTag="div"
        className="code-block"
        showLineNumbers={true}
        wrapLines={true}
        {...props}
      >
        {codeContent}
      </SyntaxHighlighter>
    </div>
  );
}
