---
id: "f73c30d693a1"
title: "Box Model"
description: "Como o CSS enxerga cada elemento: conteúdo, padding, border e margin"
order: 14
---

# O que é o Box Model?

No CSS, todo elemento HTML é tratado como uma caixa retangular. Essa caixa é composta por quatro camadas, de dentro para fora: **conteúdo**, **padding**, **borda** e **margem**.

```bash
+----------------------------+
|          margin            |
|  +----------------------+  |
|  |       border         |  |
|  |  +----------------+  |  |
|  |  |    padding     |  |  |
|  |  |  +----------+  |  |  |
|  |  |  | conteúdo |  |  |  |
|  |  |  +----------+  |  |  |
|  |  +----------------+  |  |
|  +----------------------+  |
+----------------------------+
```

Entender o Box Model é fundamental para controlar o tamanho e o espaçamento dos elementos na tela.

## As quatro camadas

**Conteúdo:** é onde o texto ou a imagem aparece. As propriedades `width` e `height` controlam essa área.

**Padding:** o espaço interno entre o conteúdo e a borda. O plano de fundo do elemento cobre o padding.

**Border:** a linha ao redor do elemento, entre o padding e a margin.

**Margin:** o espaço externo ao redor do elemento, separando-o dos vizinhos. É sempre transparente.

## O problema do tamanho padrão

Por padrão, quando você define `width: 300px`, está definindo apenas a largura do **conteúdo**. O padding e a borda são somados por cima:

```css
div {
  width: 300px;
  padding: 20px;
  border: 5px solid black;
}
/* largura real no navegador: 300 + 20 + 20 + 5 + 5 = 350px */
```

Isso causa confusão e quebra layouts com frequência.

## A solução: box-sizing

A propriedade `box-sizing: border-box` muda esse comportamento. Com ela, o `width` passa a incluir padding e borda, e o conteúdo encolhe para caber.

```css
div {
  box-sizing: border-box;
  width: 300px;
  padding: 20px;
  border: 5px solid black;
}
/* largura real no navegador: 300px (como definido) */
```

A prática mais comum é aplicar isso em todos os elementos do projeto logo no início:

```css
* {
  box-sizing: border-box;
}
```

A grande maioria dos projetos modernos começa com esse reset. É considerado uma boa prática e elimina boa parte dos problemas de dimensionamento.
