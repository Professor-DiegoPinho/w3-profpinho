import { auth } from '@/auth';
import Layout from '@/components/Layout';
import { getEnrolledCourseIds, mapSidebarWithLocks } from '@/lib/enrollment';
import { getCategories, getSidebarData } from '@/lib/markdown';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const session = await auth();
  const userId = session?.user?.id;
  const categories = getCategories();
  const enrolledCourseIds = await getEnrolledCourseIds(userId);

  const sidebarData = mapSidebarWithLocks(getSidebarData(), enrolledCourseIds);

  return (
    <Layout sidebarData={sidebarData}>
      <div className="home-page">
        <header className="home-header">
          <h1>Aprenda Programação com o Prof. Diego Pinho</h1>
          <p>Seu local de referência e confiança para aprender tecnologia.</p>
        </header>

        <div className="categories-grid">
          {categories.map((category) => {
            const categoryData = sidebarData.find(cat => cat.category === category);
            const firstPost = categoryData?.posts[0];

            return (
              <div key={category} className="category-card">
                <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
                <p>Aprenda {category} do básico até conceitos avançados.</p>
                <div className="category-stats">
                  <span>{categoryData?.posts.length || 0} lições</span>
                </div>
                {firstPost && (
                  <Link
                    href={`/${category}`}
                    className="start-learning-btn"
                  >
                    Saiba mais
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        {/* Seção Sobre o Professor */}
        <section className="about-professor">
          <div className="about-container">
            <div className="about-content">
              <div className="about-text">
                <h2>Sobre o Professor Diego Pinho</h2>
                <p className="about-description">
                  Professor especialista em tecnologia com mais de 10 anos de experiência em desenvolvimento
                  e ensino. Autor de livros técnicos e criador de cursos online que já impactaram milhares de estudantes.
                </p>

                <div className="credentials">
                  <div className="credential-item">
                    <span className="credential-icon">🎓</span>
                    <span>Professor e Desenvolvedor</span>
                  </div>
                  <div className="credential-item">
                    <span className="credential-icon">📚</span>
                    <span>Autor de Livros Técnicos</span>
                  </div>
                  <div className="credential-item">
                    <span className="credential-icon">💻</span>
                    <span>Especialista Web FullStack</span>
                  </div>
                  <div className="credential-item">
                    <span className="credential-icon">👥</span>
                    <span>+10.000 alunos impactados</span>
                  </div>
                </div>

                <div className="about-actions">
                  <a
                    href="https://diegopinho.com.br"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="primary-cta"
                  >
                    Conheça meu trabalho completo
                  </a>
                  <a
                    href="https://forms.gle/TRCvg1Cm1LSK2xiy8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="secondary-cta"
                  >
                    Solicite uma consultoria
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seção de Features */}
        <section className="features">
          <h2>Por que escolher o Learning Hub?</h2>
          <div className="features-grid">
            <div className="feature">
              <h3>📚 Conteúdo Abrangente</h3>
              <p>Tutoriais passo a passo cobrindo desde o básico até tópicos avançados</p>
            </div>
            <div className="feature">
              <h3>💻 Exemplos Práticos</h3>
              <p>Códigos de exemplo com destaque de sintaxe para melhor compreensão</p>
            </div>
            <div className="feature">
              <h3>🎯 Aprendizado Estruturado</h3>
              <p>Conteúdo organizado que constrói conhecimento de forma progressiva</p>
            </div>
            <div className="feature">
              <h3>🚀 Tecnologias Modernas</h3>
              <p>Aprenda as linguagens e frameworks mais atuais do mercado</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}