import styles from './About.module.css';

export default function About() {
  return (
    <section className={styles.about}>
      <div className={styles.aboutContainer}>
        <div className={styles.aboutContent}>
          <div className={styles.aboutText}>
            <h2 className={styles.aboutText__title}>Sobre o Professor Diego Pinho</h2>
            <p className={styles.aboutText__description}>
              Professor especialista em tecnologia com mais de 10 anos de experiência em desenvolvimento
              e ensino. Autor de livros técnicos e criador de cursos online que já impactaram milhares de estudantes.
            </p>

            <div className={styles.credentials}>
              <div className={styles.credential__item}>
                <span className={styles.credential__icon}>🎓</span>
                <span>Professor e Desenvolvedor</span>
              </div>
              <div className={styles.credential__item}>
                <span className={styles.credential__icon}>📚</span>
                <span>Autor de Livros Técnicos</span>
              </div>
              <div className={styles.credential__item}>
                <span className={styles.credential__icon}>💻</span>
                <span>Especialista Web FullStack</span>
              </div>
              <div className={styles.credential__item}>
                <span className={styles.credential__icon}>👥</span>
                <span>+10.000 alunos impactados</span>
              </div>
            </div>

            <div className={styles.aboutActions}>
              <a
                href="https://diegopinho.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.cta} ${styles['cta--primary']}`}
              >
                Conheça meu trabalho completo
              </a>
              <a
                href="https://forms.gle/TRCvg1Cm1LSK2xiy8"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.cta} ${styles['cta--secondary']}`}
              >
                Solicite uma consultoria
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
