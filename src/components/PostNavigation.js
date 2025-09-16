import Link from 'next/link';

export default function PostNavigation({ previous, next, category }) {
  if (!previous && !next) {
    return null;
  }

  return (
    <div className="post-navigation">
      <div className="nav-buttons">
        {previous && (
          <Link 
            href={`/${category}/${previous.slug}`} 
            className="nav-button nav-previous"
          >
            <span className="nav-direction">← Previous</span>
            <span className="nav-title">{previous.title}</span>
          </Link>
        )}
        
        {next && (
          <Link 
            href={`/${category}/${next.slug}`} 
            className="nav-button nav-next"
          >
            <span className="nav-direction">Next →</span>
            <span className="nav-title">{next.title}</span>
          </Link>
        )}
      </div>
    </div>
  );
}