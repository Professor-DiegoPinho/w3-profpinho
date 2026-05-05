---
title: "Arrow Functions"
description: "Como escrever funções de forma mais concisa com a sintaxe de arrow function"
order: 14
---

# Arrow Functions

Arrow functions são uma sintaxe mais curta para escrever funções, introduzida no ES6. São amplamente usadas no JavaScript moderno.

## Sintaxe básica

```javascript
// Função tradicional
function somar(a, b) {
  return a + b;
}

// Arrow function equivalente
const somar = (a, b) => {
  return a + b;
};
```

## Retorno implícito

Quando o corpo da função tem apenas uma expressão, você pode omitir as chaves e o `return`.

```javascript
const somar = (a, b) => a + b;

console.log(somar(3, 7)); // 10
```

## Um único parâmetro

Quando há apenas um parâmetro, os parênteses são opcionais.

```javascript
const dobrar = n => n * 2;

console.log(dobrar(5)); // 10
```

## Sem parâmetros

Quando não há parâmetros, os parênteses são obrigatórios.

```javascript
const saudar = () => console.log("Olá!");

saudar(); // "Olá!"
```

## Uso com métodos de array

Arrow functions ficam muito concisas quando usadas com métodos como `map`, `filter` e `forEach`.

```javascript
const numeros = [1, 2, 3, 4, 5];

const dobrados = numeros.map(n => n * 2);
console.log(dobrados); // [2, 4, 6, 8, 10]

const pares = numeros.filter(n => n % 2 === 0);
console.log(pares); // [2, 4]
```

## Quando usar

Arrow functions são ideais para funções curtas, callbacks e qualquer situação onde a sintaxe compacta melhora a leitura. Para funções mais complexas ou métodos de objetos, a função tradicional ainda é bastante usada.
