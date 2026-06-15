---
id: "80823ca793c4"
title: "Grid"
description: "Como usar o CSS Grid para criar layouts em duas dimensões com linhas e colunas"
order: 21
---

# CSS Grid: Layout em Linhas e Colunas

O CSS Grid é um sistema de layout bidimensional: ele trabalha com **linhas e colunas** ao mesmo tempo. Ele é ideal para criar layouts complexos, como páginas inteiras, onde os elementos precisam se organizar tanto horizontalmente quanto verticalmente.

Para ativá-lo, aplique `display: grid` no elemento pai.

```html
<div class="container">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</div>
```

```css
.container {
  display: grid;
}
```

## Definindo colunas

A propriedade `grid-template-columns` define o número e o tamanho das colunas.

```css
.container {
  display: grid;
  grid-template-columns: 200px 200px 200px; /* três colunas de 200px */
}
```

A unidade `fr` (fração) distribui o espaço disponível proporcionalmente.

```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; /* três colunas de tamanho igual */
}
```

## Definindo linhas

A propriedade `grid-template-rows` funciona da mesma forma para as linhas.

```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 100px 200px;
}
```

## Espaço entre células

A propriedade `gap` define o espaçamento entre as células do grid.

```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;            /* espaço igual entre linhas e colunas */
  column-gap: 24px;     /* só entre colunas */
  row-gap: 12px;        /* só entre linhas */
}
```

## repeat() e auto-fill

A função `repeat()` evita repetição ao definir muitas colunas iguais.

```css
.container {
  grid-template-columns: repeat(3, 1fr); /* equivale a: 1fr 1fr 1fr */
}
```

Combinado com `auto-fill` e `minmax()`, você cria grids que se ajustam automaticamente ao tamanho da tela:

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}
```

Isso cria quantas colunas couberem, com no mínimo 200px cada. É uma das técnicas mais poderosas para layouts responsivos sem media queries.

## Itens que ocupam múltiplas colunas ou linhas

Os itens podem se expandir além de uma célula com `grid-column` e `grid-row`.

```css
.item-destaque {
  grid-column: 1 / 3; /* vai da linha 1 à linha 3, ocupando 2 colunas */
  grid-row: 1 / 2;
}
```

## Flexbox ou Grid?

Uma pergunta bem comum é: quando usar Flexbox e quando usar Grid? A resposta é até simples: use **Flexbox** para layouts de uma dimensão (uma linha ou uma coluna) e **Grid** para layouts de duas dimensões (linhas e colunas simultaneamente). Na prática, os dois costumam ser usados juntos no mesmo projeto. 