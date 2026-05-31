import ProfileConnectButton from '@/components/ProfileConnectButton/ProfileConnectButton';
import styles from './Connections.module.css';

function ProfileConnectionItem({ providerItem }) {
  return (
    <li
      className={styles.connectionItem}
    >
      <div className={styles.connectionMain}>
        <h3 className={styles.connectionTitle}>
          <span
            className={`${styles.connectionIcon} ${
              providerItem.key === 'google' ? styles.googleIcon : styles.githubIcon
            }`}
            aria-hidden="true"
          />
          {providerItem.label}
        </h3>
      </div>

      <div className={styles.connectionStatus}>
        <span className={`${styles.connectionBadge} ${providerItem.isConnected ? styles.connected : styles.disconnected}`}>
          {providerItem.isConnected ? 'Conectada' : 'Não conectada'}
        </span>
        {!providerItem.isConnected && providerItem.isAvailable && (
          <ProfileConnectButton
            provider={providerItem.key}
            providerLabel={providerItem.label}
            className={styles.connectButton}
          />
        )}
        {!providerItem.isConnected && !providerItem.isAvailable && (
          <p>Provider indisponível no ambiente atual</p>
        )}
        {providerItem.isConnected && (
          <p>
            {providerItem.connectedAtLabel ? `Conectada em ${providerItem.connectedAtLabel}` : 'Conectada'}
          </p>
        )}
      </div>
    </li>
  );
}

export function Connections({ connectedAccounts }) {
  return (
    <article className={styles.card}>
      <h2>Contas conectadas</h2>
      <p className={styles.subtitle}>Visualize as opções de login vinculadas ao seu perfil.</p>

      <ul className={styles.connectionsList} aria-label="Lista de contas conectadas">
        {connectedAccounts.map((providerItem) => (
          <ProfileConnectionItem key={providerItem.key} providerItem={providerItem} />
        ))}
      </ul>
    </article>
  );
}