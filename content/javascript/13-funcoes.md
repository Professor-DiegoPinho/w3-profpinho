---
id: "3632aca8e771"
title: "Funções"
description: "Como criar e usar funções em JavaScript para organizar e reutilizar código"
order: 13
---

# Funções

Funções são blocos de código que recebem um nome e podem ser executados quantas vezes forem necessárias. Elas ajudam a organizar o código e evitar repetição.

## Declarando uma função

```javascript
function saudar() {
  console.log("Olá!");
}
```

## Chamando uma função

```javascript
saudar(); // "Olá!"
saudar(); // "Olá!" — pode chamar quantas vezes quiser
```

## Parâmetros e argumentos

Funções podem receber valores para trabalhar.

```javascript
function saudar(nome) {
  console.log(`Olá, ${nome}!`);
}

saudar("Ana");   // "Olá, Ana!"
saudar("Pedro"); // "Olá, Pedro!"
```

Você pode ter quantos parâmetros precisar:

```javascript
function somar(a, b) {
  console.log(a + b);
}

somar(3, 7); // 10
```

## Retorno de valores

A palavra `return` faz a função devolver um valor para quem a chamou.

```javascript
function somar(a, b) {
  return a + b;
}

const resultado = somar(3, 7);
console.log(resultado); // 10
```

Após o `return`, o código dentro da função para de executar.

## Parâmetros com valor padrão

```javascript
function saudar(nome = "visitante") {
  console.log(`Olá, ${nome}!`);
}

saudar();       // "Olá, visitante!"
saudar("Ana");  // "Olá, Ana!"
```

## Funções são valores

Em JavaScript, funções podem ser armazenadas em variáveis.

```javascript
const somar = function(a, b) {
  return a + b;
};

console.log(somar(4, 6)); // 10
```

Essa forma é chamada de **função anônima** ou **function expression**.
