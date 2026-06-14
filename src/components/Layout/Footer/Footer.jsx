'use client';

import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.appFooter}>
      <div className={styles.footerContent}>

        {/* Seção Sobre Diego Pinho */}
        <div className={`${styles.footerSection} ${styles.footerAbout}`}>
          <h3>Sobre Diego Pinho</h3>
          <p className={styles.footerDescription}>
            Professor especialista em tecnologia com mais de 10 anos de experiência.
            Autor de livros técnicos e criador de cursos que já impactaram milhares de estudantes.
          </p>
          <a
            href="https://diegopinho.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerMainSiteBtn}
          >
            Visite meu site principal →
          </a>
        </div>

        {/* Seção institucional */}
        <div className={`${styles.footerSection} ${styles.footerInstitutional}`}>
          <h3>Serviços</h3>
          <ul className={styles.footerLinks}>
            <li><Link href="https://alunos.diegopinho.com.br/" target="_blank">Área do Aluno</Link></li>
            <li><Link href="https://forms.gle/TRCvg1Cm1LSK2xiy8" target='_blank'>Solicite um orçamento</Link></li>
            <li><Link href="https://diegopinho.com.br/vagas" target='_blank'>Trabalhe Conosco</Link></li>
          </ul>
        </div>

        {/* Seção de redes sociais */}
        <div className={`${styles.footerSection} ${styles.footerSocial}`}>
          <h3>Redes Sociais</h3>
          <ul className={styles.footerLinks}>
            <li><a href="https://www.youtube.com/@ProfDiegoPinho" target="_blank" rel="noopener noreferrer">Youtube</a></li>
            <li><a href="https://www.tiktok.com/@profdiegopinho" target="_blank" rel="noopener noreferrer">TikTok</a></li>
            <li><a href="https://www.instagram.com/profdiegopinho/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://www.linkedin.com/company/profdiegopinho/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          </ul>
        </div>

        {/* Seção de links */}
        <div className={`${styles.footerSection} ${styles.footerLinksSection}`}>
          <h3>Links</h3>
          <ul className={styles.footerLinks}>
            <li><Link href="https://diegopinho.com.br" target='_blank'>Site Institucional</Link></li>
            <li><Link target='_blank' href="https://blog.diegopinho.com.br">Nosso Blog</Link></li>
            <li><Link href="https://www.udemy.com/user/diegomartinsdepinho/" target="_blank" rel="noopener noreferrer">Cursos Online</Link></li>
            <li><Link href="https://www.casadocodigo.com.br/search?type=product&q=diego+pinho" target="_blank" rel="noopener noreferrer">Livros Publicados</Link></li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className={styles.footerBottom}>
        <p>Professor Diego Pinho</p>
        <p>Educação, Tecnologia e IA © {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
