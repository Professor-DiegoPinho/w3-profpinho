import { auth } from '@/auth';
import CategoriesSection from '@/components/CategoriesSection/CategoriesSection';
import { getEnrolledCourseIds, mapSidebarWithAccess } from '@/lib/enrollment';
import { getSidebarData } from '@/lib/markdown';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const session = await auth();
  const userId = session?.user?.id;
  const enrolledCourseIds = Array.isArray(session?.user?.enrolledCourseIds)
    ? session.user.enrolledCourseIds
    : await getEnrolledCourseIds(userId);

  const sidebarData = mapSidebarWithAccess(getSidebarData(), enrolledCourseIds);

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <h1 className={styles.hero__title}>Aprenda programação com quem ensina de verdade.</h1>
        <p className={styles.hero__subtitle}>Seu local de referência e confiança para aprender tecnologia.</p>
      </header>

      <CategoriesSection sidebarData={sidebarData} />

      {/* Seção Sobre o Professor */}
      <section className={styles.aboutProfessor}>
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

      {/* Seção de Features */}
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
    </div>
  );
}