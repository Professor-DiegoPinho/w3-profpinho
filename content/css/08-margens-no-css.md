---
title: "Margens no CSS"
description: "Como usar margin para controlar o espaço externo entre elementos"
order: 8
---

# O que são margens?

A propriedade `margin` define o **espaço externo** ao redor de um elemento, separando-o dos elementos vizinhos.

```css
p {
  margin: 20px;
}
```

## Lados individuais

Você pode definir margens diferentes para cada lado.

```css
div {
  margin-top: 10px;
  margin-right: 20px;
  margin-bottom: 10px;
  margin-left: 20px;
}
```

## Escrita resumida

A propriedade `margin` aceita de um a quatro valores. A ordem segue o sentido horário: **cima, direita, baixo, esquerda**.

```css
/* Um valor: aplica o mesmo em todos os lados */
margin: 20px;

/* Dois valores: cima/baixo e direita/esquerda */
margin: 10px 20px;

/* Três valores: cima, direita/esquerda, baixo */
margin: 10px 20px 30px;

/* Quatro valores: cima, direita, baixo, esquerda */
margin: 10px 20px 30px 40px;
```

## Centralizando um elemento horizontalmente

Uma das utilizações mais comuns de margin é centralizar um elemento com largura definida dentro do seu contêiner.

```css
.container {
  width: 800px;
  margin: 0 auto;
}
```

O valor `auto` faz o navegador calcular margens iguais nos dois lados horizontais, centralizando o elemento.

## Margens negativas

O CSS aceita valores negativos de margin. Isso move o elemento para fora da sua posição normal, sobrepondo elementos vizinhos.

```css
div {
  margin-top: -10px;
}
```

Use com cuidado: margens negativas podem quebrar o layout se aplicadas sem atenção.

## Colapso de margens

Quando dois elementos com margens verticais ficam um ao lado do outro no fluxo da página, as margens não somam: a maior prevalece.

```css
.elemento-a { margin-bottom: 30px; }
.elemento-b { margin-top: 20px; }
```

O espaço entre os dois será `30px`, não `50px`. Esse comportamento se chama **colapso de margens** e é específico do eixo vertical.
