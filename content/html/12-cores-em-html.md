---
title: "Cores em HTML"
description: "Como aplicar cores no HTML usando nomes, valores HEX, RGB e HSL"
order: 12
---

# Trabalhando com cores

No HTML, as cores costumam ser aplicadas junto com CSS, normalmente pelo atributo `style`.

Exemplo:

```html
<h1 style="color: blue;">Título azul</h1>
```

Aqui a propriedade `color` altera a cor do texto.

## Cor de fundo

```html
<p style="background-color: yellow;">Parágrafo com fundo amarelo</p>
```

## Formas de definir cores

Você pode escrever uma cor de diferentes maneiras.

### Pelo nome

```html
<p style="color: red;">Texto vermelho</p>
```

### Em HEX

```html
<p style="color: #ff0000;">Texto vermelho</p>
```

### Em RGB

```html
<p style="color: rgb(255, 0, 0);">Texto vermelho</p>
```

### Em HSL

```html
<p style="color: hsl(0, 100%, 50%);">Texto vermelho</p>
```

Todas essas formas podem representar a mesma cor.

## Exemplo prático

```html
<h1 style="color: white; background-color: #333;">
  Bem-vindo
</h1>

<p style="color: rgb(34, 34, 34);">
  Este parágrafo usa RGB.
</p>

<p style="color: hsl(210, 100%, 40%);">
  Este parágrafo usa HSL.
</p>
```

## O que vale entender agora?

Neste momento, o mais importante não é decorar cada formato, e sim saber que:

- cor de texto costuma usar `color`;
- cor de fundo costuma usar `background-color`;
- a mesma cor pode ser escrita de maneiras diferentes.

Com o tempo você vai criando preferência. Tem gente que ama HEX, tem gente que vive de RGB, e tem gente que usa HSL como se tivesse descoberto uma seita secreta do front-end.
