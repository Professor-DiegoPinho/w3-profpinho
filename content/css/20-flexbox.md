---
id: "ab9238d2859d"
title: "Flexbox"
description: "Como usar o Flexbox para criar layouts flexíveis e alinhamentos com facilidade"
order: 20
---

# Flexbox: Layout Flexível no CSS

O Flexbox é um sistema de layout do CSS criado para distribuir e alinhar elementos de forma eficiente, mesmo quando o tamanho deles não é conhecido de antemão.

Para ativá-lo, basta aplicar `display: flex` no elemento pai, chamado de **contêiner**. Os filhos diretos passam a ser chamados de **itens**.

```html
<div class="container">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

```css
.container {
  display: flex;
}
```

Com isso, os três itens já ficam lado a lado.

## Direção dos itens

A propriedade `flex-direction` define o eixo principal.

```css
.container {
  display: flex;
  flex-direction: row;            /* padrão: horizontal, da esquerda para direita */
  flex-direction: row-reverse;    /* horizontal, invertido */
  flex-direction: column;         /* vertical, de cima para baixo */
  flex-direction: column-reverse; /* vertical, invertido */
}
```

## Alinhamento no eixo principal

A propriedade `justify-content` distribui os itens ao longo do eixo principal.

```css
.container {
  display: flex;
  justify-content: flex-start;    /* padrão: agrupados no início */
  justify-content: flex-end;      /* agrupados no final */
  justify-content: center;        /* centralizados */
  justify-content: space-between; /* primeiro e último nas extremidades, espaço igual entre os demais */
  justify-content: space-around;  /* espaço igual ao redor de cada item */
  justify-content: space-evenly;  /* espaço absolutamente igual entre todos */
}
```

## Alinhamento no eixo cruzado

A propriedade `align-items` alinha os itens no eixo perpendicular ao principal.

```css
.container {
  display: flex;
  align-items: stretch;     /* padrão: itens esticam para preencher a altura */
  align-items: flex-start;  /* alinhados no topo */
  align-items: flex-end;    /* alinhados na base */
  align-items: center;      /* centralizados verticalmente */
}
```

## Quebra de linha

Por padrão, os itens ficam todos em uma linha, comprimindo se necessário. `flex-wrap` permite que eles quebrem para a linha seguinte.

```css
.container {
  display: flex;
  flex-wrap: wrap; /* itens quebram para a próxima linha quando não cabem */
}
```

## Crescimento e encolhimento dos itens

A propriedade `flex` nos itens controla como eles crescem e encolhem para preencher o espaço disponível.

```css
.item {
  flex: 1; /* todos os itens dividem o espaço igualmente */
}

.item-destaque {
  flex: 2; /* ocupa o dobro do espaço dos outros */
}
```

## Centralizar vertical e horizontalmente

Uma das tarefas mais pedidas no front-end é centralizar um elemento na tela. Com Flexbox, são três linhas:

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
```
