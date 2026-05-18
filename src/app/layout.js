import { auth } from "@/auth";
import Layout from "@/components/Layout/Layout";
import Providers from "@/components/Providers/Providers";
import { getEnrolledCourseIds, mapSidebarWithAccess } from "@/lib/enrollment";
import { getSidebarData } from "@/lib/markdown";
import { JetBrains_Mono, Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Aprenda Programação Online com Prof. Diego Pinho | Learning Hub",
  description: "Learning Hub do Prof. Diego Pinho: cursos gratuitos de Python, JavaScript e HTML. Aprenda programação do zero com um professor especialista em tecnologia. Visite diegopinho.com.br para conhecer todos os cursos completos.",
  keywords: "Diego Pinho, Professor, Python, JavaScript, HTML, Programação, Cursos Online, Tutorial, Aprender Programação",
  author: "Prof. Diego Pinho",
  robots: "index, follow",
  openGraph: {
    title: "Learning Hub - Prof. Diego Pinho",
    description: "Aprenda programação gratuitamente com tutoriais do Prof. Diego Pinho. Conteúdo de qualidade em Python, JavaScript e HTML.",
    url: "https://hub.diegopinho.com.br",
    siteName: "Diego Pinho Learning Hub",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    site: "@profdiegopinho",
    creator: "@profdiegopinho",
    title: "Learning Hub - Prof. Diego Pinho",
    description: "Aprenda programação gratuitamente com tutoriais do Prof. Diego Pinho",
  },
  alternates: {
    canonical: "https://hub.diegopinho.com.br",
  },
};

export default async function RootLayout({ children }) {
  // Buscar sessão do usuário
  const session = await auth();
  const userId = session?.user?.id;
  
  // Pegar cursos inscritos
  const enrolledCourseIds = Array.isArray(session?.user?.enrolledCourseIds)
    ? session.user.enrolledCourseIds
    : await getEnrolledCourseIds(userId);
  
  // Mapear sidebar com controle de acesso
  const sidebarData = mapSidebarWithAccess(getSidebarData(), enrolledCourseIds);
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Diego Pinho Learning Hub",
    "description": "Centro de aprendizado online do Prof. Diego Pinho com cursos gratuitos de programação",
    "url": "https://hub.diegopinho.com.br",
    "founder": {
      "@type": "Person",
      "name": "Diego Pinho",
      "url": "https://diegopinho.com.br",
      "jobTitle": "Professor de Tecnologia",
      "knowsAbout": ["Python", "JavaScript", "HTML", "Programação", "Inteligência Artificial"]
    },
    "sameAs": [
      "https://diegopinho.com.br",
      "https://www.youtube.com/@ProfDiegoPinho",
      "https://www.instagram.com/profdiegopinho/",
      "https://www.linkedin.com/company/profdiegopinho/"
    ],
    "educationalCredentialAwarded": "Certificado de Conclusão",
    "teaches": ["Python", "JavaScript", "HTML", "Programação Web", "Desenvolvimento de Software"]
  };

  return (
    <html lang="pt-BR">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <link rel="canonical" href="https://hub.diegopinho.com.br" />
      </head>
      <body className={`${poppins.variable} ${jetbrainsMono.variable}`}>
        <Providers>
          <Layout sidebarData={sidebarData}>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
