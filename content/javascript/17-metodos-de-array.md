---
title: "Métodos de Array"
description: "Os principais métodos de array do JavaScript: map, filter, find, reduce, forEach e outros"
order: 17
---

# Métodos de Array

JavaScript oferece métodos poderosos para percorrer e transformar arrays. Os mais usados no dia a dia são listados abaixo.

## forEach

Percorre todos os itens e executa uma função para cada um. Não retorna nada.

```javascript
const frutas = ["maçã", "banana", "laranja"];

frutas.forEach(fruta => {
  console.log(fruta);
});
```

## map

Transforma cada item e retorna um **novo array** com os resultados.

```javascript
const numeros = [1, 2, 3, 4];
const dobrados = numeros.map(n => n * 2);

console.log(dobrados); // [2, 4, 6, 8]
```

## filter

Retorna um **novo array** com apenas os itens que passam em uma condição.

```javascript
const numeros = [1, 2, 3, 4, 5, 6];
const pares = numeros.filter(n => n % 2 === 0);

console.log(pares); // [2, 4, 6]
```

## find

Retorna o **primeiro item** que atende à condição, ou `undefined` se não encontrar.

```javascript
const usuarios = [
  { nome: "Ana", idade: 25 },
  { nome: "Pedro", idade: 17 },
  { nome: "Maria", idade: 30 },
];

const menor = usuarios.find(u => u.idade < 18);
console.log(menor); // { nome: "Pedro", idade: 17 }
```

## some e every

- `some`: retorna `true` se **pelo menos um** item atender à condição;
- `every`: retorna `true` se **todos** os itens atenderem à condição.

```javascript
const idades = [22, 17, 30, 15];

idades.some(n => n < 18);   // true — tem algum menor
idades.every(n => n >= 18); // false — nem todos são maiores
```

## reduce

Reduz o array a um único valor, acumulando os resultados.

```javascript
const numeros = [10, 20, 30, 40];

const total = numeros.reduce((acumulador, atual) => acumulador + atual, 0);
console.log(total); // 100
```

## includes

Verifica se um valor existe no array.

```javascript
const frutas = ["maçã", "banana", "laranja"];

frutas.includes("banana"); // true
frutas.includes("uva");    // false
```

## indexOf

Retorna o índice de um item, ou `-1` se não existir.

```javascript
frutas.indexOf("laranja"); // 2
frutas.indexOf("uva");     // -1
```

## join

Une os itens do array em uma string.

```javascript
const palavras = ["JavaScript", "é", "incrível"];
console.log(palavras.join(" ")); // "JavaScript é incrível"
```

## slice e splice

`slice` retorna uma cópia de uma parte do array sem modificar o original.

```javascript
const nums = [1, 2, 3, 4, 5];
console.log(nums.slice(1, 3)); // [2, 3]
```

`splice` remove ou insere itens no array original.

```javascript
nums.splice(2, 1);       // remove 1 item a partir do índice 2
nums.splice(1, 0, 99);   // insere 99 no índice 1 sem remover nada
```
