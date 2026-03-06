import Image from 'next/image';
import ChevronIcon from './ChevronIcon';

export default function SectionHeader({ title, iconSrc, isOpen, onToggle }) {
  return (
    <button
      type="button"
      className="sidebar-group-title"
      onClick={onToggle}
    >
      <span className="sidebar-group-title-text">
        <Image
          src={iconSrc}
          alt=""
          className="sidebar-group-icon"
          width={18}
          height={18}
          aria-hidden="true"
        />
        <span>{title}</span>
      </span>
      <span className={`sidebar-group-toggle ${isOpen ? 'open' : ''}`}>
        <ChevronIcon className="toggle-chevron" />
      </span>
    </button>
  );
}
