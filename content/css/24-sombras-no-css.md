---
id: "a7b471099f66"
title: "Sombras no CSS"
description: "Como adicionar sombras em elementos e textos com box-shadow e text-shadow"
order: 24
---

# Como adicionar sombras em elementos e textos com box-shadow e text-shadow

O CSS oferece duas propriedades para adicionar sombras: `box-shadow` para elementos e `text-shadow` para textos.

## box-shadow

A propriedade `box-shadow` adiciona uma sombra ao redor de um elemento. Ela aceita até cinco valores.

```css
div {
  box-shadow: deslocamento-x deslocamento-y desfoque expansão cor;
}
```

Exemplo básico:

```css
.card {
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.15);
}
```

- `2px`: sombra deslocada 2px para a direita;
- `4px`: sombra deslocada 4px para baixo;
- `8px`: nível de desfoque da sombra;
- `rgba(0, 0, 0, 0.15)`: cor preta com 15% de opacidade.

Valores negativos no deslocamento movem a sombra para a esquerda e para cima:

```css
.card {
  box-shadow: -2px -2px 6px rgba(0, 0, 0, 0.1);
}
```

## Sombra interna

Adicionando a palavra `inset`, a sombra aparece por dentro do elemento.

```css
input {
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}
```

## Múltiplas sombras

Você pode empilhar várias sombras separando com vírgula.

```css
.card {
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.1),
    0 4px 12px rgba(0, 0, 0, 0.08);
}
```

Camadas múltiplas criam efeitos de profundidade mais naturais.

## text-shadow

A propriedade `text-shadow` adiciona sombra ao texto. A sintaxe é mais simples: deslocamento-x, deslocamento-y, desfoque e cor.

```css
h1 {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}
```

Também aceita múltiplas sombras separadas por vírgula, o que permite criar efeitos como brilho ou contorno:

```css
h1 {
  text-shadow:
    0 0 8px rgba(255, 200, 0, 0.8),
    0 0 20px rgba(255, 200, 0, 0.4);
}
```
