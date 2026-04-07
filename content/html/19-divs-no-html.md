---
title: "Divs no HTML"
description: "Como usar a tag div para agrupar partes da página"
order: 19
---

# O papel da div

A tag `<div>` é usada para **agrupar conteúdo**.

Sozinha, ela não tem um significado semântico especial. O trabalho dela é organizar partes da página para facilitar estilização e estrutura.

## Exemplo básico

```html
<div>
  <h2>Produto</h2>
  <p>Mouse sem fio</p>
</div>
```

## Exemplo com mais de um bloco

```html
<div>
  <h1>Minha loja</h1>
</div>

<div>
  <p>Produtos em destaque</p>
</div>
```

Cada `div` funciona como uma caixa que agrupa elementos.

## Exemplo com estilo

```html
<div style="border: 1px solid #ccc; padding: 16px;">
  <h2>Curso de HTML</h2>
  <p>Aprenda a estruturar páginas web.</p>
</div>
```

## Quando usar?

Use `div` quando você precisa agrupar conteúdo sem que exista uma tag semântica mais adequada.

Em outras palavras: ela resolve bastante coisa, mas não deve ser utilizada como substituta de tags semânticas. Quando houver uma tag mais específica, normalmente ela é a melhor escolha.
