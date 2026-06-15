---
id: "f1134fb69f5d"
title: "Layout no HTML"
description: "Como organizar a estrutura geral de uma página com regiões principais"
order: 27
---

# Organizando a página em partes

Quando uma página cresce, não basta ir jogando elementos sem critério. Em algum momento, você precisa pensar em **layout**.

Ou seja: como a página vai ser dividida em áreas principais.

## Exemplo de estrutura

```html
<body>
  <header>
<h1>Minha loja</h1>
  </header>

  <nav>
<a href="#">Início</a>
<a href="#">Produtos</a>
  </nav>

  <main>
<section>
  <h2>Destaques</h2>
  <p>Confira os produtos em promoção.</p>
</section>
  </main>

  <footer>
<p>Todos os direitos reservados.</p>
  </footer>
</body>
```

## O que cada parte representa?

- `<header>` cabeçalho;
- `<nav>` navegação;
- `<main>` conteúdo principal;
- `<section>` seção de conteúdo;
- `<footer>` rodapé.

## E o visual?

O HTML organiza a estrutura. O posicionamento mais bonito normalmente vem com CSS.

Mas já deixar a página separada em regiões corretas ajuda muito. Sem isso, o layout vira um monte de blocos sem conversa entre si.
