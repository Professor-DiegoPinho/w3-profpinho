---
id: "a06f27d6cb29"
title: "Introdução ao CSS"
description: "O que é CSS, para que serve e como ele se conecta ao HTML"
order: 1
---

# O que é CSS?

CSS (**Cascading Style Sheets**) é a linguagem usada para **estilizar** páginas web.

Enquanto o HTML define a estrutura, o CSS cuida da aparência: cores, fontes, tamanhos, espaçamentos e o posicionamento dos elementos na tela.

De forma simples:

- **HTML** estrutura o conteúdo;
- **CSS** estiliza;
- **JavaScript** adiciona comportamento.

## Por que usar CSS?

Sem CSS, todas as páginas da web seriam texto puro sem nenhuma formatação visual. Nada de cores, nada de layout, nada de fontes diferentes.

Com CSS você consegue:

- mudar a cor e o tamanho de textos;
- definir planos de fundo e bordas;
- organizar elementos em colunas e linhas;
- adaptar a página para diferentes tamanhos de tela.

## Como o CSS se conecta ao HTML?

Existem três formas de aplicar CSS em uma página HTML.

### 1. CSS externo (recomendado)

Você cria um arquivo `.css` separado e conecta ao HTML com a tag `<link>` dentro do `<head>`.

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="estilo.css">
  </head>
  <body>
    <h1>Olá!</h1>
  </body>
</html>
```

No arquivo `estilo.css`:

```css
h1 {
  color: tomato;
}
```

Essa é a forma mais recomendada. O HTML cuida do conteúdo, o CSS cuida da apresentação, e cada um vive no seu arquivo. Além disso, o mesmo arquivo CSS pode ser usado em várias páginas ao mesmo tempo.

### 2. CSS interno

O CSS fica dentro do próprio arquivo HTML, na tag `<style>` dentro do `<head>`.

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      h1 {
        color: tomato;
      }
    </style>
  </head>
  <body>
    <h1>Olá!</h1>
  </body>
</html>
```

Funciona bem para páginas únicas ou testes rápidos, mas mistura estrutura e estilo no mesmo arquivo.

### 3. CSS inline

O estilo é aplicado diretamente no elemento HTML com o atributo `style`.

```html
<h1 style="color: tomato;">Olá!</h1>
```

Evite essa forma no dia a dia. Ela sobrescreve outros estilos, é difícil de manter e vai contra a ideia de separar conteúdo de apresentação.

## CSS na prática

Assim como o HTML está em todo lugar, o CSS também está. Qualquer página com um visual agradável tem CSS por baixo dos panos, seja em blogs, lojas, redes sociais ou sistemas internos.

Mesmo em projetos que usam frameworks modernos como React ou Vue, o CSS continua presente, seja diretamente, seja em bibliotecas de estilo construídas em cima dele.

{% links "Links da aula" %}
- [**MDN Web Docs - CSS**](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
- [**W3Schools - CSS Introduction**](https://www.w3schools.com/css/css_intro.asp)
{% endlinks %}