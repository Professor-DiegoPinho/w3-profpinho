---
id: "e6a47958dfb9"
title: "Display no CSS"
description: "Como a propriedade display controla o comportamento e o fluxo dos elementos na página"
order: 15
---

# O que é a propriedade display?

A propriedade `display` é uma das mais importantes do CSS. Ela controla como um elemento se comporta no fluxo da página: se ocupa a linha inteira, se fica lado a lado com outros, se some da tela e assim por diante.

## Os valores principais

### block

Elementos de bloco ocupam toda a largura disponível e sempre começam em uma nova linha. `div`, `p`, `h1` a `h6`, `section` e `article` são exemplos de elementos que já são `block` por padrão.

```css
span {
  display: block; /* faz o span se comportar como um bloco */
}
```

### inline

Elementos inline ficam na mesma linha que o conteúdo ao redor e ocupam apenas o espaço do seu conteúdo. `span`, `a`, `strong` e `em` já são inline por padrão.

Elementos inline não aceitam `width` e `height`.

```css
div {
  display: inline; /* o div passa a se comportar como texto */
}
```

### inline-block

Une o melhor dos dois mundos: fica na mesma linha que outros elementos, mas aceita `width` e `height`.

```css
.botao {
  display: inline-block;
  width: 120px;
  height: 40px;
  padding: 8px 16px;
}
```

### none

Remove o elemento do fluxo da página. Ele deixa de existir visualmente e não ocupa espaço.

```css
.mensagem-erro {
  display: none; /* invisível e sem ocupar espaço */
}
```

É diferente de `visibility: hidden`, que esconde o elemento mas mantém o espaço que ele ocupava.

### flex e grid

`display: flex` e `display: grid` são os dois sistemas de layout modernos do CSS. Eles merecem aulas próprias, mas a propriedade de ativação é a mesma `display`.

```css
.container {
  display: flex;
}

.grade {
  display: grid;
}
```

## Mudando o comportamento padrão

Qualquer elemento pode ter seu display alterado. Isso é muito útil para ajustar o comportamento de elementos sem mudar o HTML.

```css
/* Links que aparecem empilhados, como itens de menu vertical */
nav a {
  display: block;
  padding: 10px;
}

/* Imagens lado a lado */
img {
  display: inline-block;
}
```
