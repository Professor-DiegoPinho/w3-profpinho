---
title: "Comentários em HTML"
description: "Como usar comentários em HTML para anotações e testes no código"
order: 11
---

# O que são comentários?

Comentários são trechos de código que o navegador ignora na renderização da página.

Eles servem para deixar anotações, organizar o arquivo ou até esconder temporariamente uma parte do HTML durante um teste.

## Sintaxe

```html
<!-- Isto é um comentário -->
```

Tudo o que estiver entre `<!--` e `-->` será tratado como comentário.

## Exemplo simples

```html
<h1>Minha página</h1>

<!-- Este parágrafo explica o objetivo da página -->
<p>Bem-vindo ao site.</p>
```

O comentário aparece no código, mas não aparece visivelmente na página.

## Comentando uma parte do HTML

Você também pode comentar um bloco inteiro:

```html
<!--
<p>Este texto foi desativado temporariamente.</p>
<img src="banner.jpg" alt="Banner principal">
-->
```

Isso é útil quando você quer testar algo sem apagar o código de vez.

## Quando comentários ajudam?

Comentários costumam ser úteis para:

- explicar partes importantes do código;
- marcar seções do documento;
- desativar temporariamente um trecho durante testes.

## Mas não exagere

Comentário demais também atrapalha. Se o código precisa de explicação o tempo inteiro, às vezes o problema não é falta de comentário, e sim o código estar confuso. Use comentários para esclarecer, não para esconder a complexidade.

## Exemplo prático

```html
<body>
  <!-- Cabeçalho -->
  <h1>Loja Online</h1>

  <!-- Texto principal -->
  <p>Confira nossos produtos em destaque.</p>

  <!-- Banner promocional temporariamente removido -->
  <!-- <img src="promo.jpg" alt="Promoção da semana"> -->
</body>
```

Esse tipo de comentário já ajuda bastante sem transformar o arquivo em um mural de recados.
