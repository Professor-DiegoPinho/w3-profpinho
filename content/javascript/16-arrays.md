---
id: "aa187caa0bd3"
title: "Arrays"
description: "Como criar e manipular listas de valores com arrays em JavaScript"
order: 16
---

# Arrays

Arrays armazenam múltiplos valores em uma única variável, em ordem. Os itens ficam entre colchetes e separados por vírgula.

```javascript
const frutas = ["maçã", "banana", "laranja"];
const numeros = [10, 20, 30, 40];
const misto = ["Ana", 30, true]; // arrays aceitam tipos diferentes
```

## Acessando itens

Cada item tem um índice, começando em `0`.

```javascript
console.log(frutas[0]); // "maçã"
console.log(frutas[1]); // "banana"
console.log(frutas[2]); // "laranja"
```

## Alterando itens

```javascript
frutas[1] = "uva";
console.log(frutas); // ["maçã", "uva", "laranja"]
```

## Tamanho do array

A propriedade `length` retorna o número de itens.

```javascript
console.log(frutas.length); // 3
```

## Adicionando e removendo itens

```javascript
frutas.push("manga");    // adiciona no final
frutas.pop();            // remove o último item

frutas.unshift("kiwi");  // adiciona no início
frutas.shift();          // remove o primeiro item
```

## Arrays podem conter qualquer tipo

Inclusive outros arrays e objetos:

```javascript
const dados = [
  [1, 2, 3],
  { nome: "Ana" },
  true
];
```

## Verificando se é um array

```javascript
Array.isArray(frutas); // true
Array.isArray("texto"); // false
```
