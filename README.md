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

1. **Clone o repositório**:
   ```bash
   git clone <repository-url>
   cd w3pinho
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Execute o projeto**:
   ```bash
   npm run dev
   ```

4. **Acesse no navegador**:
   ```
   http://localhost:3000
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
- [ ] Comentários nos artigos
- [ ] Menu mobile hamburger
- [ ] Breadcrumb melhorado

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

**Desenvolvido com ❤️ usando Next.js e React**
