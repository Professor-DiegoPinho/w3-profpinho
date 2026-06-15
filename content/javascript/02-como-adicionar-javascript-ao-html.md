---
id: "45ae1e4e2083"
title: "Como adicionar JavaScript ao HTML"
description: "As formas de incluir JavaScript em uma página HTML: inline, interno e externo"
order: 2
---

# Como adicionar JavaScript ao HTML

Existem três formas de incluir JavaScript em uma página HTML.

## Script interno

O código fica dentro da tag `<script>` no próprio arquivo HTML.

```html
<!DOCTYPE html>
<html>
  <body>
    <h1>Olá!</h1>

    <script>
      console.log("JavaScript funcionando!");
    </script>
  </body>
</html>
```

## Script externo (recomendado)

O código fica em um arquivo `.js` separado e é referenciado com o atributo `src`.

```html
<script src="script.js"></script>
```

É a forma mais recomendada. Mantém o HTML limpo e permite reutilizar o mesmo arquivo em várias páginas.

## Inline

O JavaScript fica diretamente em um atributo HTML como `onclick`.

```html
<button onclick="alert('Olá!')">Clique</button>
```

Funciona, mas mistura comportamento com estrutura. Evite no dia a dia.

## Onde colocar a tag `<script>`?

O lugar mais comum é antes do `</body>`, no final do HTML. Isso garante que os elementos da página já existam quando o JavaScript tentar acessá-los.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Minha página</title>
  </head>
  <body>
    <h1 id="titulo">Olá!</h1>

    <script src="script.js"></script>
  </body>
</html>
```

Colocar o `<script>` no `<head>` também é válido, mas nesse caso o atributo `defer` garante que o script só execute depois que o HTML terminar de carregar:

```html
<head>
  <script src="script.js" defer></script>
</head>
```
