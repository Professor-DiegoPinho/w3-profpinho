---
id: "670c08680be2"
title: "Float e Clear no CSS"
description: "Como usar float para posicionar elementos e clear para encerrar o fluxo flutuante"
order: 19
---

# As propriedades float e clear

A propriedade `float` foi criada originalmente para fazer imagens ficarem ao lado de texto, como em revistas e jornais. O conteúdo ao redor "flui" em volta do elemento flutuante.

```css
img {
  float: left;
  margin: 0 16px 16px 0;
}
```

Com esse código, a imagem fica à esquerda e o texto se organiza ao lado direito dela.

## Os valores do float

```css
img { float: left; }   /* flutua para a esquerda */
img { float: right; }  /* flutua para a direita */
img { float: none; }   /* padrão: sem flutuação */
```

## O problema: o pai não enxerga o filho flutuante

Quando todos os filhos de um elemento têm `float`, o elemento pai perde a altura e colapsa.

```css
.container {
  border: 1px solid black;
  /* altura colapsa para zero porque os filhos estão flutuando */
}

.coluna {
  float: left;
  width: 50%;
}
```

## A solução: clearfix

A técnica mais comum para corrigir isso é adicionar um elemento invisível após os elementos flutuantes, usando o pseudo-elemento `::after`.

```css
.container::after {
  content: "";
  display: block;
  clear: both;
}
```

Essa técnica se chama **clearfix** e é encontrada em muitos projetos que usam float para layout.

## A propriedade clear

A propriedade `clear` impede que um elemento fique ao lado de elementos flutuantes.

```css
.rodape {
  clear: both; /* o rodapé sempre aparece abaixo de qualquer float */
}
```

Os valores são `left`, `right` e `both`.

## Float hoje em dia

Com a chegada do Flexbox e do Grid, o `float` perdeu espaço como ferramenta de layout. Hoje ele é usado principalmente para o caso original: imagens ao lado de texto. 

Para construir colunas e estruturas de layout, os métodos modernos são bem mais adequados.
