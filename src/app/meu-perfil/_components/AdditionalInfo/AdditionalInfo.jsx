import styles from './AdditionalInfo.module.css';

export function AdditionalInfo({ createdAtLabel }) {
  return (
    <aside className={styles.card}>
      <h2>Informações adicionais</h2>
      <dl className={styles.infoList}>
        <div className={styles.infoRow}>
          <dt>Conta criada em</dt>
          <dd>{createdAtLabel || 'Nao disponivel'}</dd>
        </div>
      </dl>
    </aside>
  );
}