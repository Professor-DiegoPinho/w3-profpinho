---
id: "b8ab0cccaafc"
title: "Position no CSS"
description: "Como posicionar elementos com CSS usando static, relative, absolute, fixed e sticky"
order: 16
---

# Posicionamento de elementos com CSS

A propriedade `position` controla como um elemento é posicionado na página. Com ela, você pode tirar elementos do fluxo normal e posicioná-los em lugares específicos da tela.

Junto com `position`, as propriedades `top`, `right`, `bottom` e `left` definem as coordenadas do elemento.

## static

É o valor padrão. O elemento segue o fluxo normal da página e as propriedades de coordenadas não têm efeito.

```css
div {
  position: static; /* comportamento padrão */
}
```

## relative

O elemento continua no fluxo normal, mas você pode deslocá-lo a partir da sua posição original. O espaço original é preservado.

```css
div {
  position: relative;
  top: 20px;   /* desce 20px da posição original */
  left: 10px;  /* avança 10px para a direita */
}
```

## absolute

O elemento sai do fluxo normal e é posicionado em relação ao ancestral mais próximo que tenha `position` diferente de `static`. Se não houver nenhum, é posicionado em relação ao documento inteiro.

```css
.container {
  position: relative; /* serve de referência para o filho */
}

.badge {
  position: absolute;
  top: 0;
  right: 0; /* canto superior direito do .container */
}
```

`absolute` é muito usado para elementos que precisam se sobrepor a outros, como badges, tooltips e menus dropdown.

## fixed

O elemento sai do fluxo e fica fixo em relação à **janela do navegador**. Ele não se move quando a página é rolada.

```css
.cabecalho-fixo {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}
```

Muito usado para barras de navegação que ficam visíveis durante o scroll.

## sticky

O elemento se comporta como `relative` até atingir um ponto de rolagem definido, quando passa a se comportar como `fixed`.

```css
nav {
  position: sticky;
  top: 0; /* fica colado no topo quando a página chega até ali */
}
```

É a forma mais moderna de criar cabeçalhos que "grudam" no topo ao rolar.

## Resumo

| Valor | Fica no fluxo? | Referência de posição |
|---|---|---|
| static | Sim | nenhuma |
| relative | Sim | posição original |
| absolute | Não | ancestral posicionado |
| fixed | Não | janela do navegador |
| sticky | Sim/Não | fluxo + ponto de rolagem |
