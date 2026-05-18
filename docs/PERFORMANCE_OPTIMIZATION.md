# Otimização de Performance - Navegação Entre Aulas

## Resumo das Mudanças

### 1. **ISR (Incremental Static Regeneration)**
- **O que mudou**: Removido `force-dynamic` das rotas de conteúdo
- **Como funciona**: Páginas são pré-renderizadas em build-time e cacheadas em disco
- **Resultado**: 254 páginas estáticas geradas automaticamente

### 2. **Sidebar SSR (Server-Side Rendering)**
- **O que mudou**: Sidebar buscada no servidor, não mais no cliente
- **Como funciona**: Dados renderizados no HTML inicial, sem requisições assíncronas
- **Resultado**: Sidebar visível imediatamente ao carregar página

### 3. **Search Index Build-time + Fuzzy Search**
- **O que mudou**: Índice de busca gerado no build, não em runtime
- **Como funciona**: Script `generate-search-index.js` processa 216 markdown files → `public/search-index.json`. Fuse.js fornece fuzzy search com tolerância a typos
- **Resultado**: Busca aceita erros de digitação ("htmal" encontra "HTML"), resposta <20ms, 186 KB de índice pré-processado


## Resultado Prático

✅ **Navegação entre aulas** mais fluida e rápida

✅ **Sem requisições extra** ao mudar de página  

✅ **Cache aproveitado** em produção via ISR  

✅ **Busca agora é fuzzy** (typo-tolerant) e relevante  

✅ **Índice gerado em build** — pronto para deploy
