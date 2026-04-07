---
title: "HTML Semântico"
description: "Como usar tags com significado mais claro para organizar melhor a página"
order: 30
---

# Não basta funcionar. Precisa fazer sentido.

HTML semântico é, basicamente, usar tags que descrevem melhor o papel do conteúdo.

Em vez de sair empilhando `div` para tudo, você usa elementos que contam ao navegador e a outras ferramentas o que cada parte da página representa.

## Exemplo

```html
<header>
  <h1>Blog da empresa</h1>
</header>

<main>
  <article>
<h2>Como organizar arquivos HTML</h2>
<p>...</p>
  </article>
</main>

<footer>
  <p>Publicado em 2026</p>
</footer>
```

## Tags semânticas comuns

- `<header>` para cabeçalho;
- `<nav>` para navegação;
- `<main>` para conteúdo principal;
- `<section>` para uma seção;
- `<article>` para conteúdo independente;
- `<footer>` para rodapé.

## Por que isso é melhor?

Porque o código fica mais fácil de entender, manter e navegar.

Uma pessoa olhando o HTML entende mais rápido a estrutura. Ferramentas assistivas também ganham contexto.

Em resumo: semântica não é perfumaria. É clareza.
