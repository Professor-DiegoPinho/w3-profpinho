---
title: "JSON"
description: "O que é JSON, como converter entre JSON e objetos JavaScript e como usá-lo na prática"
order: 33
---

# JSON

JSON (JavaScript Object Notation) é um formato de texto para representar dados estruturados. É o formato mais usado para troca de dados entre o front-end e APIs.

## Como JSON se parece

```json
{
  "nome": "Ana",
  "idade": 30,
  "ativo": true,
  "enderecos": ["Recife", "São Paulo"],
  "contato": {
    "email": "ana@email.com"
  }
}
```

A sintaxe é parecida com objetos JavaScript, com algumas diferenças: as chaves são sempre strings entre aspas duplas, e os valores só podem ser string, number, boolean, array, objeto ou `null`.

## JSON.parse() — de texto para objeto

Converte uma string JSON em um objeto JavaScript.

```javascript
const texto = '{"nome": "Ana", "idade": 30}';
const objeto = JSON.parse(texto);

console.log(objeto.nome); // "Ana"
console.log(objeto.idade); // 30
```

## JSON.stringify() — de objeto para texto

Converte um objeto JavaScript em uma string JSON.

```javascript
const usuario = { nome: "Ana", idade: 30 };
const json = JSON.stringify(usuario);

console.log(json); // '{"nome":"Ana","idade":30}'
```

Com formatação legível:

```javascript
console.log(JSON.stringify(usuario, null, 2));
// {
//   "nome": "Ana",
//   "idade": 30
// }
```

## Uso com a Fetch API

Na prática, você converte os dados ao enviar e ao receber.

```javascript
// Recebendo: response.json() já faz o parse
const dados = await response.json();

// Enviando: stringify antes de colocar no body
await fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ nome: "Ana" })
});
```

## Clonando objetos com JSON

Um truque simples para clonar um objeto sem referência ao original.

```javascript
const original = { nome: "Ana", enderecos: ["Recife"] };
const clone = JSON.parse(JSON.stringify(original));

clone.nome = "Pedro";
console.log(original.nome); // "Ana" — intacto
```

> Atenção: essa técnica não funciona com `undefined`, funções, `Date` e outros valores não suportados pelo JSON.
