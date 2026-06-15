---
id: "3f139eb930ea"
title: "Overflow no CSS"
description: "Como controlar o que acontece quando o conteúdo é maior do que o elemento que o contém"
order: 18
---

# Para que serve a propriedade overflow?

Quando o conteúdo de um elemento é maior do que o espaço definido para ele, o CSS precisa saber o que fazer com o excesso. A propriedade `overflow` controla esse comportamento.

```css
div {
  width: 200px;
  height: 100px;
  overflow: scroll;
}
```

## Os valores principais

### visible

É o valor padrão. O conteúdo que ultrapassa o limite do elemento continua visível, vazando para fora.

```css
div {
  overflow: visible;
}
```

### hidden

O conteúdo que ultrapassa o limite é cortado e fica invisível. Sem barra de rolagem.

```css
div {
  overflow: hidden;
}
```

Muito usado para cortar imagens ou textos que ultrapassam a área de um card, por exemplo.

### scroll

Adiciona barras de rolagem ao elemento, independente de o conteúdo precisar ou não delas.

```css
div {
  overflow: scroll;
}
```

### auto

Parecido com `scroll`, mas as barras de rolagem só aparecem quando o conteúdo realmente precisa delas. É o valor mais recomendado quando você quer rolagem.

```css
div {
  overflow: auto;
}
```

## Controlando os eixos separadamente

As propriedades `overflow-x` e `overflow-y` permitem controlar o comportamento horizontal e vertical de forma independente.

```css
div {
  overflow-x: hidden; /* corta o excesso horizontal */
  overflow-y: auto;   /* rola no vertical se necessário */
}
```

## Uso comum: ocultar texto longo

Uma técnica bastante usada é cortar texto longo em uma linha só com reticências, combinando três propriedades:

```css
.titulo-card {
  white-space: nowrap;     /* impede a quebra de linha */
  overflow: hidden;        /* corta o excesso */
  text-overflow: ellipsis; /* adiciona "..." no final */
  width: 200px;
}
```

O resultado: textos longos aparecem como "Título muito longo que não..." em vez de vazar para fora do elemento.
