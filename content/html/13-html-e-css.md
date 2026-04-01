---
title: "HTML e CSS"
description: "Como o CSS entra em cena para estilizar páginas HTML"
order: 13
---

# Onde o CSS entra nessa história?

Até aqui usamos HTML para estruturar o conteúdo e até brincamos com alguns estilos inline. Só que, quando a página começa a crescer, colocar visual direto no HTML deixa tudo mais bagunçado.

É aí que entra o **CSS**.

O CSS é a linguagem usada para definir a aparência da página: cores, espaçamentos, tamanhos, bordas, alinhamento e muito mais.

## Exemplo com estilo inline

```html
<p style="color: blue;">Texto azul</p>
```

Funciona, mas não escala muito bem.

## Exemplo com CSS interno

Uma forma mais organizada é colocar o CSS dentro da tag `<style>` no `head`.

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      p {
        color: blue;
      }
    </style>
  </head>
  <body>
    <p>Este texto ficará azul.</p>
  </body>
</html>
```

Agora a regra visual fica separada do conteúdo.

## Exemplo com CSS externo

Também é possível colocar o CSS em outro arquivo e conectá-lo com `<link>`:

```html
<head>
  <link rel="stylesheet" href="styles.css">
</head>
```

E no arquivo `styles.css`:

```css
p {
  color: blue;
}
```

## Qual abordagem usar?

De forma simples:

- **inline**: útil para testes rápidos;
- **interno**: bom para páginas pequenas;
- **externo**: melhor para projetos reais.

## Exemplo prático

HTML:

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      h1 {
        color: darkred;
      }

      p {
        font-size: 18px;
      }
    </style>
  </head>
  <body>
    <h1>Minha página</h1>
    <p>Agora o visual está mais organizado.</p>
  </body>
</html>
```

Perceba a divisão de responsabilidades: o HTML descreve o conteúdo, e o CSS cuida da aparência.
