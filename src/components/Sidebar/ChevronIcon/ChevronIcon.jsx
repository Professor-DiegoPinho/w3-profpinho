export default function ChevronIcon({ className }) {
  return (
    <span className={className} aria-hidden="true">
      <span className="toggle-chevron-line toggle-chevron-line-left" />
      <span className="toggle-chevron-line toggle-chevron-line-right" />
    </span>
  );
}
