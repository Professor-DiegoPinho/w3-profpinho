---
id: "283c8f5742bc"
title: "Alterando HTML e CSS com JavaScript"
description: "Como modificar conteúdo, atributos, classes e estilos de elementos com JavaScript"
order: 27
---

# Alterando HTML e CSS com JavaScript

Depois de selecionar um elemento, você pode modificar seu conteúdo, atributos, classes e estilos.

## Alterando o conteúdo

```javascript
const titulo = document.querySelector("h1");

titulo.textContent = "Novo título";         // texto puro
titulo.innerHTML = "Título em <strong>negrito</strong>"; // HTML completo
```

Prefira `textContent` quando quiser inserir texto simples. Use `innerHTML` apenas quando precisar inserir HTML de fato, com atenção ao conteúdo inserido para evitar vulnerabilidades.

## Alterando atributos

```javascript
const img = document.querySelector("img");

img.src = "nova-imagem.jpg";
img.alt = "Nova descrição";

const link = document.querySelector("a");
link.href = "https://exemplo.com";
link.setAttribute("target", "_blank");
link.getAttribute("href"); // lê o atributo
link.removeAttribute("target");
```

## Alterando estilos diretamente

```javascript
const caixa = document.querySelector(".caixa");

caixa.style.backgroundColor = "tomato";
caixa.style.fontSize = "20px";
caixa.style.display = "none"; // esconde o elemento
```

Propriedades com hífen viram camelCase no JavaScript: `background-color` vira `backgroundColor`.

## Trabalhando com classes

Manipular classes CSS é mais recomendado do que alterar estilos diretamente, pois mantém a separação entre JS e CSS.

```javascript
const card = document.querySelector(".card");

card.classList.add("ativo");        // adiciona a classe
card.classList.remove("ativo");     // remove a classe
card.classList.toggle("ativo");     // adiciona se não tem, remove se tem
card.classList.contains("ativo");   // verifica se a classe existe (true/false)
```

## Criando e inserindo elementos

```javascript
const lista = document.querySelector("ul");

const novoItem = document.createElement("li");
novoItem.textContent = "Novo item";

lista.appendChild(novoItem);      // insere no final
lista.prepend(novoItem);          // insere no início
lista.removeChild(novoItem);      // remove o elemento
novoItem.remove();                // forma mais curta de remover
```
