import styles from './SidebarHeader.module.css';

function SidebarHeader({ Icon, title }) {
  return (
    <div className={styles.sidebarHeader}>
      <Icon size={20} className={styles.sidebarHeaderIcon} />
      <span className={styles.sidebarHeaderTitle}>{title}</span>
    </div>
  );
}

export default SidebarHeader;
