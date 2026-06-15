import Link from "next/link";
import { Bookmark } from "@/assets/icons/index";
import styles from "./EmptyState.module.css";

export default function EmptyState() {
  return (
    <div className={styles.emptyState}>
      <div className={styles.iconWrapper}>
        <Bookmark size={48} className={styles.icon} />
      </div>
      <h2 className={styles.heading}>Nenhum favorito ainda</h2>
      <p className={styles.description}>
        Salve aulas que você gostou para acessá-las rapidamente depois.
        Basta clicar no ícone de favorito em qualquer aula de curso.
      </p>
      <Link href="/" className={styles.link}>
        Explorar conteúdos
      </Link>
    </div>
  );
}
