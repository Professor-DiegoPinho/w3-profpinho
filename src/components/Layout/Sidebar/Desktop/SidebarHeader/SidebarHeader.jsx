import styles from './SidebarHeader.module.css';

function SidebarHeader({ icon, title }) {
  return (
    <div className={styles.sidebarHeader}>
      <img src={icon} alt="" className={styles.sidebarHeaderIcon} />
      <span className={styles.sidebarHeaderTitle}>{title}</span>
    </div>
  );
}

export default SidebarHeader;
