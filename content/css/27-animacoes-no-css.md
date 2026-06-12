---
id: "4b889c0a9731"
title: "Animações no CSS"
description: "Como criar animações mais complexas com @keyframes e a propriedade animation"
order: 27
---

# Como criar animações mais complexas?

Enquanto as transições animam a mudança entre dois estados, as animações CSS permitem criar sequências com múltiplos passos, repetições e controle mais detalhado do movimento.

Elas funcionam em duas partes: a definição da animação com `@keyframes` e a aplicação com a propriedade `animation`.

## Definindo com @keyframes

O `@keyframes` define os passos da animação. Você dá um nome a ela e descreve o estado do elemento em cada ponto.

```css
@keyframes aparecer {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```

`from` equivale a `0%` e `to` equivale a `100%`. Você pode adicionar quantos passos intermediários quiser:

```css
@keyframes pular {
  0%   { transform: translateY(0); }
  50%  { transform: translateY(-30px); }
  100% { transform: translateY(0); }
}
```

## Aplicando com animation

A propriedade `animation` conecta o elemento a um `@keyframes`.

```css
.elemento {
  animation: nome duração timing-function delay repetições direção;
}
```

Exemplo:

```css
.card {
  animation: aparecer 0.5s ease-in-out;
}
```

## As propriedades principais

```css
.elemento {
  animation-name: aparecer;          /* nome do @keyframes */
  animation-duration: 0.5s;         /* duração */
  animation-timing-function: ease;  /* ritmo */
  animation-delay: 0.2s;            /* atraso */
  animation-iteration-count: 3;     /* quantas vezes repete */
  animation-iteration-count: infinite; /* loop infinito */
  animation-direction: alternate;   /* vai e volta alternando direção */
  animation-fill-mode: forwards;    /* mantém o estado final após terminar */
}
```

## Exemplo prático: loading spinner

```css
@keyframes girar {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #ccc;
  border-top-color: #333;
  border-radius: 50%;
  animation: girar 0.8s linear infinite;
}
```

## Animações vs Transições

Use **transições** para mudanças simples entre dois estados, geralmente disparadas por interação do usuário (hover, focus, click). Use **animações** quando precisar de múltiplos passos, repetição, ou quando a animação deve rodar sem interação do usuário.
