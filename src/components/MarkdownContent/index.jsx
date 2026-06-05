"use client";

import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';

import { H1, H2, H3, H4 } from './Titles/Titles';
import { Paragraph, Bold, Italic } from './Paragraph/Paragraph';
import { UnorderedList, OrderedList, ListItem } from './Lists/Lists';
import { Blockquote } from './Blockquote/Blockquote';
import { Link } from './Links/Links';
import { Code } from './Code/Code';
import { Table, TableHeader, TableCell } from './Tables/Tables';
import { Image } from './Images/Images';
import { Details, Summary } from './Toggle/Toggle';
import { LinksSection, LinksGrid, LinkCard, CardSpan, LinksHeading } from './LinksBlock/LinksBlock';
import styles from './MarkdownContent.module.css';

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

/* ---------------------------------------------------------------------------
   Wrappers de roteamento
   Verificam className para distinguir elementos de liquid tags de elementos
   comuns do markdown e delegam ao subcomponente adequado.
   --------------------------------------------------------------------------- */

function H1Wrapper({ className, children, ...props }) {
  if (className?.includes('content-links-heading')) {
    return <LinksHeading>{children}</LinksHeading>;
  }
  return <H1>{children}</H1>;
}

function AnchorWrapper({ className, href, children, ...props }) {
  if (className?.includes('content-link-card')) {
    return <LinkCard href={href} {...props}>{children}</LinkCard>;
  }
  return <Link href={href}>{children}</Link>;
}

function DivWrapper({ className, children, ...props }) {
  if (className?.includes('content-links-grid')) {
    return <LinksGrid className={className} {...props}>{children}</LinksGrid>;
  }
  return <div className={className} {...props}>{children}</div>;
}

function SpanWrapper({ className, children, ...props }) {
  if (className?.includes('content-link-card-')) {
    return <CardSpan className={className} {...props}>{children}</CardSpan>;
  }
  return <span className={className} {...props}>{children}</span>;
}

const components = {
  code: Code,
  h1: H1Wrapper,
  h2: H2,
  h3: H3,
  h4: H4,
  p: Paragraph,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  blockquote: Blockquote,
  table: Table,
  th: TableHeader,
  td: TableCell,
  a: AnchorWrapper,
  strong: Bold,
  em: Italic,
  img: Image,
  details: Details,
  summary: Summary,
  section: LinksSection,
  div: DivWrapper,
  span: SpanWrapper,
};

export default function MarkdownContent({ content, title }) {
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
