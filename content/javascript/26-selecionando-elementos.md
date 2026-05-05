---
title: "Selecionando Elementos"
description: "Como selecionar elementos HTML com JavaScript usando getElementById, querySelector e outros métodos"
order: 26
---

# Selecionando Elementos

Para interagir com a página, o primeiro passo é selecionar o elemento desejado. O JavaScript oferece alguns métodos para isso.

## getElementById

Seleciona um elemento pelo `id`. Retorna o elemento ou `null` se não existir.

```html
<h1 id="titulo">Olá!</h1>
```

```javascript
const titulo = document.getElementById("titulo");
console.log(titulo.textContent); // "Olá!"
```

## querySelector

Seleciona o **primeiro** elemento que corresponde a um seletor CSS. Funciona com qualquer seletor: tag, classe, id, atributo.

```javascript
document.querySelector("h1");          // primeira tag <h1>
document.querySelector(".card");       // primeiro elemento com classe "card"
document.querySelector("#titulo");     // elemento com id "titulo"
document.querySelector("input[type='email']"); // input do tipo email
```

## querySelectorAll

Seleciona **todos** os elementos que correspondem ao seletor. Retorna uma NodeList.

```javascript
const itens = document.querySelectorAll(".item");

itens.forEach(item => {
  console.log(item.textContent);
});
```

## getElementsByClassName e getElementsByTagName

Formas mais antigas, mas ainda válidas.

```javascript
document.getElementsByClassName("card");  // HTMLCollection de elementos com a classe
document.getElementsByTagName("p");       // HTMLCollection de todos os <p>
```

A diferença para `querySelectorAll` é que retornam uma `HTMLCollection`, que não tem o método `forEach` diretamente.

## Qual usar?

No dia a dia, `querySelector` e `querySelectorAll` cobrem praticamente tudo. A sintaxe de seletor CSS é familiar e flexível. Use `getElementById` quando precisar de um elemento por `id` com uma sintaxe mais explícita.

## Verificando se o elemento existe

```javascript
const el = document.querySelector(".modal");

if (el) {
  // elemento encontrado, pode manipular
}
```

Sempre verifique se o elemento existe antes de manipulá-lo para evitar erros.
