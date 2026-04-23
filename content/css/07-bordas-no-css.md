---
title: "Bordas no CSS"
description: "Como definir bordas em elementos HTML com CSS: estilo, largura, cor e arredondamento"
order: 7
---

# Propriedades de borda

A propriedade `border` adiciona uma linha ao redor de um elemento. Ela é composta por três partes: **largura**, **estilo** e **cor**.

```css
div {
  border: 2px solid black;
}
```

## Estilo da borda

O estilo é a parte obrigatória. Sem ele, a borda não aparece mesmo que você defina largura e cor.

```css
p { border-style: solid; }   /* linha contínua */
p { border-style: dashed; }  /* tracejada */
p { border-style: dotted; }  /* pontilhada */
p { border-style: double; }  /* linha dupla */
p { border-style: none; }    /* sem borda */
```

## Largura da borda

Define a espessura da linha. Pode ser em pixels ou palavras-chave.

```css
div {
  border-style: solid;
  border-width: 1px;
  border-width: thick; /* thin, medium ou thick */
}
```

## Cor da borda

```css
div {
  border-style: solid;
  border-width: 2px;
  border-color: #cccccc;
}
```

## Lados individuais

Você pode definir bordas diferentes para cada lado do elemento.

```css
div {
  border-top: 2px solid navy;
  border-right: 1px dashed gray;
  border-bottom: 2px solid navy;
  border-left: none;
}
```

## Arredondamento com border-radius

A propriedade `border-radius` arredonda os cantos do elemento.

```css
.card {
  border: 1px solid #ccc;
  border-radius: 8px;
}

.avatar {
  border-radius: 50%; /* transforma o elemento em círculo */
}
```

`border-radius: 50%` só forma um círculo perfeito quando o elemento tem largura e altura iguais.

## Escrita resumida

As três partes principais podem ser escritas juntas na propriedade `border`.

```css
/* Forma separada */
div {
  border-style: solid;
  border-width: 2px;
  border-color: #333;
}

/* Forma resumida */
div {
  border: 2px solid #333;
}
```

A ordem é: `largura estilo cor`. As três podem ser combinadas ou usadas separadamente dependendo do que você precisa.
