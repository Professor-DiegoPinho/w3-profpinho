---
id: "c99ec9a07bc6"
title: "Loop: for"
description: "Como usar o loop for para repetir blocos de código em JavaScript"
order: 10
---

# Loop: for

O `for` repete um bloco de código um número determinado de vezes.

```javascript
for (let i = 0; i < 5; i++) {
  console.log(i);
}
// 0, 1, 2, 3, 4
```

A estrutura tem três partes separadas por `;`:

- **inicialização**: `let i = 0` — cria e define o valor inicial do contador;
- **condição**: `i < 5` — enquanto for verdadeira, o loop continua;
- **incremento**: `i++` — executado ao final de cada repetição.

## Percorrendo um array

O uso mais comum do `for` é percorrer os itens de um array.

```javascript
const frutas = ["maçã", "banana", "laranja"];

for (let i = 0; i < frutas.length; i++) {
  console.log(frutas[i]);
}
// "maçã", "banana", "laranja"
```

`frutas.length` retorna o número de itens do array, garantindo que o loop percorra tudo sem ultrapassar o limite.

## for...of

Uma forma mais simples de percorrer arrays quando você não precisa do índice.

```javascript
for (const fruta of frutas) {
  console.log(fruta);
}
// "maçã", "banana", "laranja"
```

## for...in

Percorre as chaves de um objeto.

```javascript
const pessoa = { nome: "Ana", idade: 30, cidade: "Recife" };

for (const chave in pessoa) {
  console.log(chave, pessoa[chave]);
}
// nome Ana
// idade 30
// cidade Recife
```

## Qual usar?

- `for` clássico: quando precisa do índice ou de controle preciso da iteração;
- `for...of`: para percorrer arrays de forma simples;
- `for...in`: para percorrer as chaves de um objeto.
