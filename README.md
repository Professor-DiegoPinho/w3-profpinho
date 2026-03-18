# Learning Hub - Blog de Aprendizado Estilo W3Schools

Um blog de aprendizado interativo inspirado no W3Schools, construído com Next.js e React. O site é gerado dinamicamente a partir de arquivos Markdown organizados por categorias.

## 🚀 Características

- **📚 Conteúdo Dinâmico**: Gerado automaticamente a partir de arquivos Markdown
- **🎯 Navegação Intuitiva**: Sidebar organizada por categorias e tópicos
- **💻 Syntax Highlighting**: Destaque de código para melhor legibilidade
- **📱 Design Responsivo**: Interface adaptável para todos os dispositivos
- **🎨 Visual Profissional**: Design inspirado no W3Schools

## 🛠️ Tecnologias Utilizadas

- **Next.js 15** - Framework React para aplicações web
- **React** - Biblioteca JavaScript para interfaces
- **react-markdown** - Renderização de Markdown
- **react-syntax-highlighter** - Destaque de sintaxe para código
- **gray-matter** - Processamento de metadados YAML
- **remark-gfm** - Suporte ao GitHub Flavored Markdown

## 📁 Estrutura do Projeto

```
w3pinho/
├── content/                    # Arquivos de conteúdo em Markdown
│   ├── javascript/            # Tutoriais de JavaScript
│   ├── python/               # Tutoriais de Python
│   └── html/                 # Tutoriais de HTML
├── src/
│   ├── app/                  # Páginas da aplicação
│   │   ├── [category]/       # Rotas dinâmicas por categoria
│   │   │   └── [slug]/       # Páginas individuais de posts
│   │   ├── globals.css       # Estilos globais
│   │   └── page.js          # Página inicial
│   ├── components/           # Componentes React
│   │   ├── Layout.js        # Layout principal
│   │   ├── Sidebar.js       # Sidebar de navegação
│   │   ├── MarkdownContent.js # Renderizador de Markdown
│   │   └── PostNavigation.js # Navegação entre posts
│   └── lib/
│       └── markdown.js      # Utilitários para Markdown
└── public/                  # Arquivos estáticos
```

## 🚀 Como Executar

### Execução Local

1. **Clone o repositório**:
   ```bash
   git clone <repository-url>
   cd w3pinho
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**:
   ```bash
   cp .env.example .env
   ```

4. **Como obter as variáveis de ambiente**:

   - **Google Cloud OAuth**: Crie um projeto no [Google Cloud Console](https://console.cloud.google.com/), configure uma credencial OAuth e obtenha o `client ID` e `client secret`.
   - **GitHub OAuth**: Crie um aplicativo OAuth no [GitHub Developer Settings](https://github.com/settings/applications/new), configure a URL de callback e obtenha o `client ID` e `client secret`.
   - **Auth Secret**: Gere um segredo seguro para autenticação usando o comando:
     ```bash
     npx auth secret
     ```   
   

5. **Execute o projeto**:
   ```bash
   npm run dev
   ```

6. **Acesse no navegador**:
   ```
   http://localhost:3000
   ```

### 🐳 Execução com Docker

#### Usando Docker Compose (Recomendado)

1. **Build e execute o container**:
   ```bash
   docker-compose up --build
   ```

2. **Acesse no navegador**:
   ```
   http://localhost:3000
   ```

3. **Para parar os containers**:
   ```bash
   docker-compose down
   ```

#### Usando Docker Compose com Nginx (Produção)

Para executar com Nginx como proxy reverso:

```bash
docker-compose --profile with-nginx up --build
```

O site estará disponível em:
- **HTTP**: http://localhost:80
- **HTTPS**: https://localhost:443 (configure os certificados SSL)

#### Usando Docker Diretamente

1. **Build da imagem**:
   ```bash
   docker build -t w3pinho .
   ```

2. **Execute o container**:
   ```bash
   docker run -p 3000:3000 w3pinho
   ```

#### Comandos Docker Úteis

```bash
# Ver logs do container
docker-compose logs -f app

# Executar shell no container
docker-compose exec app sh

# Rebuild sem cache
docker-compose build --no-cache

# Executar em background
docker-compose up -d

# Ver status dos containers
docker-compose ps
```

### 🔧 Configurações de Produção

O projeto inclui otimizações para produção:

- **Multi-stage build**: Reduz o tamanho da imagem final
- **Output standalone**: Apenas arquivos necessários para execução
- **Compressão gzip**: Configurada no Nginx
- **Security headers**: Headers de segurança configurados
- **Health checks**: Endpoint `/api/health` para monitoramento
- **Rate limiting**: Proteção contra spam (via Nginx)

### 📊 Monitoramento

#### Health Check

O endpoint de health check está disponível em:
```
GET /api/health
```

Retorna informações sobre o status da aplicação:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.456,
  "environment": "production",
  "version": "1.0.0"
}
```

## 📝 Adicionando Conteúdo

### Estrutura dos Arquivos Markdown

Cada arquivo Markdown deve conter metadados no formato YAML Front Matter:

```markdown
---
title: "Título do Artigo"
description: "Descrição breve do conteúdo"
order: 1
---

# Conteúdo do Artigo

Seu conteúdo em Markdown aqui...

## Exemplo de Código

```javascript
console.log("Hello, World!");
```
```

### Criando Nova Categoria

1. Crie uma nova pasta em `content/`:
   ```bash
   mkdir content/nova-categoria
   ```

2. Adicione arquivos Markdown numerados:
   ```
   content/nova-categoria/
   ├── 01-introducao.md
   ├── 02-conceitos-basicos.md
   └── 03-exemplos-praticos.md
   ```

3. A categoria aparecerá automaticamente na sidebar e página inicial.

### Metadados Suportados

- `title`: Título do artigo
- `description`: Descrição breve
- `order`: Ordem de exibição (numérico)

## 🎨 Personalização de Estilos

Os estilos estão organizados no arquivo `src/app/globals.css` com seções bem definidas:

- **Layout**: Estrutura geral da aplicação
- **Sidebar**: Navegação lateral
- **Conteúdo**: Área principal de conteúdo
- **Markdown**: Estilos para elementos Markdown
- **Responsivo**: Adaptações para mobile

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera a versão de produção
- `npm run start` - Executa a versão de produção
- `npm run lint` - Executa o linter

## 📦 Dependências Principais

```json
{
  "react-markdown": "^9.x",
  "react-syntax-highlighter": "^15.x", 
  "gray-matter": "^4.x",
  "remark-gfm": "^4.x"
}
```

## 🌟 Funcionalidades

### Página Inicial
- Cards de categorias com estatísticas
- Seção de recursos destacados
- Design atrativo e profissional

### Páginas de Conteúdo
- Breadcrumb de navegação
- Navegação anterior/próximo
- Syntax highlighting automático
- Sidebar sempre visível

### Sidebar Dinâmica
- Gerada automaticamente da estrutura de pastas
- Categorias expansíveis/recolhíveis
- Destaque do artigo atual

## 🎯 Próximos Passos

- [ ] Implementar busca no conteúdo
- [ ] Adicionar modo escuro
- [ ] Sistema de favoritos
- [ ] Breadcrumb melhorado

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

**Desenvolvido com ❤️ usando Next.js e React**
