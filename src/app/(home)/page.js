import About from '@/app/(home)/_components/About/About';
import Content from '@/app/(home)/_components/Content/Content';
import Features from '@/app/(home)/_components/Features/Features';
import Hero from '@/app/(home)/_components/Hero/Hero';

export default function Home() {
  return (
    <>
      <Hero />
      <Content />
      <About />
      <Features />
    </>
  );
}