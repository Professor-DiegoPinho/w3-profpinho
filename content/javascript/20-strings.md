---
title: "Strings"
description: "Como trabalhar com texto em JavaScript: criação, acesso a caracteres e template strings"
order: 20
---

# Strings

Strings representam texto. Podem ser criadas com aspas simples, duplas ou crases.

```javascript
let a = "Olá";
let b = 'Mundo';
let c = `Olá, Mundo!`;
```

## Template strings

Crases permitem interpolação de variáveis e expressões diretamente no texto.

```javascript
const nome = "Ana";
const idade = 30;

console.log(`${nome} tem ${idade} anos.`);
// "Ana tem 30 anos."

console.log(`O dobro é ${idade * 2}.`);
// "O dobro é 60."
```

Template strings também suportam múltiplas linhas sem precisar de `\n`.

```javascript
const mensagem = `Linha 1
Linha 2
Linha 3`;
```

## Acessando caracteres

Strings se comportam como arrays de caracteres. O índice começa em `0`.

```javascript
const palavra = "JavaScript";

console.log(palavra[0]); // "J"
console.log(palavra[4]); // "S"
```

## Tamanho da string

```javascript
console.log(palavra.length); // 10
```

## Strings são imutáveis

Você não pode alterar um caractere individual de uma string. Para modificar, é preciso criar uma nova string.

```javascript
let texto = "olá";
texto[0] = "O"; // não funciona
texto = "Olá";  // reatribuição funciona
```

## Comparação de strings

Strings podem ser comparadas com `===`.

```javascript
"abc" === "abc" // true
"abc" === "ABC" // false — case-sensitive
```
