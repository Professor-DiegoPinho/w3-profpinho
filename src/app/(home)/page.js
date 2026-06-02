import About from '@/app/(home)/_components/About/About';
import Content from '@/app/(home)/_components/Content/Content';
import Features from '@/app/(home)/_components/Features/Features';
import Hero from '@/app/(home)/_components/Hero/Hero';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <Hero />
      <Content />
      <About />
      <Features />
    </div>
  );
}