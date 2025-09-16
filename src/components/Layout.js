import Sidebar from './Sidebar';

export default function Layout({ children, sidebarData, currentCategory, currentSlug }) {
  return (
    <div className="app-layout">
      <Sidebar
        sidebarData={sidebarData}
        currentCategory={currentCategory}
        currentSlug={currentSlug}
      />

      <main className="main-content">
        <div className="content-wrapper">
          {children}
        </div>
      </main>
    </div>
  );
}