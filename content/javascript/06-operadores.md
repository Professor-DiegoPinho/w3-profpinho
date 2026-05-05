---
title: "Operadores"
description: "Operadores aritméticos, de atribuição e de string no JavaScript"
order: 6
---

# Operadores

## Aritméticos

Usados para operações matemáticas.

```javascript
let a = 10;
let b = 3;

a + b   // 13 — soma
a - b   // 7  — subtração
a * b   // 30 — multiplicação
a / b   // 3.33... — divisão
a % b   // 1  — resto da divisão (módulo)
a ** b  // 1000 — potência (10³)
```

## De atribuição

Atribuem um valor a uma variável, com ou sem operação.

```javascript
let x = 10;

x += 5;  // x = x + 5  → 15
x -= 3;  // x = x - 3  → 12
x *= 2;  // x = x * 2  → 24
x /= 4;  // x = x / 4  → 6
x **= 2; // x = x ** 2 → 36
```

## Incremento e decremento

```javascript
let n = 5;

n++;  // n = n + 1 → 6
n--;  // n = n - 1 → 5
```

## Concatenação de strings

O operador `+` também une strings.

```javascript
let nome = "Ana";
let sobrenome = "Lima";

let nomeCompleto = nome + " " + sobrenome;
console.log(nomeCompleto); // "Ana Lima"
```

Com template strings, a concatenação fica mais legível:

```javascript
let mensagem = `Olá, ${nome} ${sobrenome}!`;
console.log(mensagem); // "Olá, Ana Lima!"
```

## Mistura de tipos

Quando você usa `+` com um número e uma string, o JavaScript converte o número para string e concatena.

```javascript
"5" + 2   // "52" — não soma, concatena
"5" - 2   // 3    — aqui subtrai normalmente
```

Esse comportamento pode gerar bugs. Garanta que os tipos estejam corretos antes de operar.
