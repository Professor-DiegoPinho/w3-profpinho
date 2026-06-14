import AvatarImage from '@/components/AvatarImage/AvatarImage';
import styles from './Header.module.css';

export function Header({ userImage, userName }) {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <AvatarImage
          src={userImage}
          alt={`Foto de ${userName}`}
          width={72}
          height={72}
          className={styles.avatar}
        />
        <div>
          <h1>Meu perfil</h1>
          <p>Acompanhe seus cursos inscritos e os dados da sua conta.</p>
        </div>
      </div>
    </header>
  );
}