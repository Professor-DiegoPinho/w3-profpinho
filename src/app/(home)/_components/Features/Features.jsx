import styles from './Features.module.css';

export default function Features() {
  return (
    <section className={styles.features}>
      <h2 className={styles.features__title}>Por que escolher o Learning Hub?</h2>
      <div className={styles.featuresGrid}>
        <div className={styles.feature}>
          <h3 className={styles.feature__title}>📚 Conteúdo Abrangente</h3>
          <p className={styles.feature__description}>Tutoriais passo a passo cobrindo desde o básico até tópicos avançados</p>
        </div>
        <div className={styles.feature}>
          <h3 className={styles.feature__title}>💻 Exemplos Práticos</h3>
          <p className={styles.feature__description}>Códigos de exemplo com destaque de sintaxe para melhor compreensão</p>
        </div>
        <div className={styles.feature}>
          <h3 className={styles.feature__title}>🎯 Aprendizado Estruturado</h3>
          <p className={styles.feature__description}>Conteúdo organizado que constrói conhecimento de forma progressiva</p>
        </div>
        <div className={styles.feature}>
          <h3 className={styles.feature__title}>🚀 Tecnologias Modernas</h3>
          <p className={styles.feature__description}>Aprenda as linguagens e frameworks mais atuais do mercado</p>
        </div>
      </div>
    </section>
  );
}
