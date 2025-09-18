import Link from 'next/link';
import Layout from '@/components/Layout';
import { getSidebarData, getCategories } from '@/lib/markdown';

export default function Home() {
  const sidebarData = getSidebarData();
  const categories = getCategories();

  return (
    <Layout sidebarData={sidebarData}>
      <div className="home-page">
        <header className="home-header">
          <h1>Bem-vindo(a) ao Learning Hub!</h1>
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
                    href={`/${category}/${firstPost.slug}`}
                    className="start-learning-btn"
                  >
                    Comece a aprender
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        {/* <section className="features">
          <h2>Why Choose Learning Hub?</h2>
          <div className="features-grid">
            <div className="feature">
              <h3>📚 Comprehensive Content</h3>
              <p>Step-by-step tutorials covering everything from basics to advanced topics</p>
            </div>
            <div className="feature">
              <h3>💻 Code Examples</h3>
              <p>Practical examples with syntax highlighting for better understanding</p>
            </div>
            <div className="feature">
              <h3>🎯 Structured Learning</h3>
              <p>Organized content that builds upon previous concepts</p>
            </div>
            <div className="feature">
              <h3>🚀 Modern Technologies</h3>
              <p>Learn the latest programming languages and frameworks</p>
            </div>
          </div>
        </section> */}
      </div>
    </Layout>
  );
}