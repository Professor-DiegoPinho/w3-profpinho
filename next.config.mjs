/** @type {import('next').NextConfig} */
const nextConfig = {
  // Habilita build standalone para Docker
  output: 'standalone',

  // Configurações de produção
  experimental: {
    // Otimizações para produção
    optimizeCss: true,
  },

  // Configurações de imagem (se usar next/image)
  images: {
    unoptimized: true, // Para hosting estático ou CDN próprio
  },
};

export default nextConfig;
