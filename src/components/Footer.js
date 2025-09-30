"use client";

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">

        {/* Seção Sobre Diego Pinho */}
        <div className="footer-section footer-about">
          <h3>Sobre Diego Pinho</h3>
          <p className="footer-description">
            Professor especialista em tecnologia com mais de 10 anos de experiência.
            Autor de livros técnicos e criador de cursos que já impactaram milhares de estudantes.
          </p>
          <a
            href="https://diegopinho.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-main-site-btn"
          >
            Visite meu site principal →
          </a>
        </div>

        {/* Seção institucional */}
        <div className="footer-section footer-institutional">
          <h3>Serviços</h3>
          <ul className="footer-links">
            <li><Link href="https://alunos.diegopinho.com.br/" target="_blank">Área do Aluno</Link></li>
            <li><Link href="https://forms.gle/TRCvg1Cm1LSK2xiy8" target='_blank'>Consultoria Personalizada</Link></li>
            <li><Link href="https://www.udemy.com/user/diegomartinsdepinho/" target="_blank">Cursos Completos</Link></li>
            <li><Link href="https://diegopinho.notion.site/Guia-para-a-inscri-o-de-novos-as-instrutores-as-26a5b3c6f6d5809188c2eb2a63574d1c" target='_blank'>Trabalhe Conosco</Link></li>
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
            <li><Link href="https://blog.diegopinho.com.br">Nosso Blog</Link></li>
            <li><Link href="/">Learning Hub</Link></li>
            <li><a href="https://www.udemy.com/user/diegomartinsdepinho/" target="_blank" rel="noopener noreferrer">Cursos Online</a></li>
            <li><a href="https://www.casadocodigo.com.br/search?type=product&q=diego+pinho" target="_blank" rel="noopener noreferrer">Livros Publicados</a></li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>Professor Diego Pinho</p>
        <p>Educação, Tecnologia e IA © {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}