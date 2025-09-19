"use client";

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">

        {/* Seção institucional */}
        <div className="footer-section footer-institutional">
          <h3>Institucional</h3>
          <ul className="footer-links">
            <li><Link href="/area-do-aluno">Área do Aluno</Link></li>
            <li><Link href="/orcamento">Solicite um orçamento</Link></li>
            <li><Link href="/trabalhe-conosco">Trabalhe Conosco</Link></li>
          </ul>
        </div>

        {/* Seção de redes sociais */}
        <div className="footer-section footer-social">
          <h3>Redes Sociais</h3>
          <ul className="footer-links">
            <li><a href="https://www.youtube.com/@ProfDiegoPinho" target="_blank" rel="noopener noreferrer">Youtube</a></li>
            <li><a href="https://www.tiktok.com/@profdiegopinho" target="_blank" rel="noopener noreferrer">TikTok</a></li>
            <li><a href="https://www.instagram.com/profdiegopinho/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://www.linkedin.com/company/profdiegopinho/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          </ul>
        </div>

        {/* Seção de links */}
        <div className="footer-section footer-links-section">
          <h3>Links</h3>
          <ul className="footer-links">
            <li><Link href="/blog">Nosso Blog</Link></li>
            <li><Link href="/">Learning Hub</Link></li>
            <li><a href="https://www.udemy.com/user/diegomartinsdepinho/" target="_blank" rel="noopener noreferrer">Cursos Online</a></li>
            <li><a href="https://www.casadocodigo.com.br/search?type=product&q=diego+pinho" target="_blank" rel="noopener noreferrer">Livros Publicados</a></li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>Professor Diego Pinho</p>
        <p>Educação,Tecnologia e IA © {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}