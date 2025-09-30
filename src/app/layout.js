import { Poppins, JetBrains_Mono } from "next/font/google";
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
  description: "Learning Hub do Prof. Diego Pinho: cursos gratuitos de Python, JavaScript e HTML. Aprenda programação do zero com um professor especialista em tecnologia.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={`${poppins.variable} ${jetbrainsMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
