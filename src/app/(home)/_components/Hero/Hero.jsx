import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <h1 className={styles.hero__title}>Aprenda programação com quem ensina de verdade.</h1>
      <p className={styles.hero__subtitle}>Seu local de referência e confiança para aprender tecnologia.</p>
    </section>
  );
}
