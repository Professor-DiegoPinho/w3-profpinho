---
title: "Gradientes no CSS"
description: "Como criar gradientes lineares e radiais como plano de fundo com CSS"
order: 25
---

# Gradientes no CSS

Gradientes são transições suaves entre duas ou mais cores. No CSS, eles são usados como valor da propriedade `background-image` e existem em dois tipos principais: linear e radial.

## Gradiente linear

A função `linear-gradient()` cria uma transição de cores em linha reta.

```css
div {
  background-image: linear-gradient(vermelho, azul);
}
```

Por padrão, a transição vai de cima para baixo. Você pode mudar a direção:

```css
div {
  background-image: linear-gradient(to right, #f00, #00f);
  background-image: linear-gradient(to bottom right, #f00, #00f);
  background-image: linear-gradient(45deg, #f00, #00f); /* ângulo em graus */
}
```

## Múltiplas cores

Um gradiente pode ter quantas cores quiser:

```css
div {
  background-image: linear-gradient(to right, #f00, #ff0, #0f0, #00f);
}
```

Você também pode controlar onde cada cor começa, definindo a posição em porcentagem:

```css
div {
  background-image: linear-gradient(to right, #f00 0%, #ff0 50%, #0f0 100%);
}
```

## Gradiente radial

A função `radial-gradient()` cria uma transição que parte de um ponto central em direção às bordas.

```css
div {
  background-image: radial-gradient(circle, #ff0, #f00);
}
```

- `circle`: forma circular;
- `ellipse`: forma elíptica (padrão).

```css
div {
  background-image: radial-gradient(ellipse at top left, #ff0, #f00);
}
```

## Gradiente como sobreposição em imagens

Uma técnica muito comum é combinar gradiente e imagem para criar efeitos de texto legível sobre foto:

```css
.hero {
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("foto.jpg");
  background-size: cover;
}
```

O gradiente semitransparente cria um escurecimento sobre a imagem, facilitando a leitura do texto por cima.
