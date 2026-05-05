---
title: "Tipos de Dados"
description: "Os tipos de dados primitivos do JavaScript: string, number, boolean, null, undefined"
order: 5
---

# Tipos de Dados

JavaScript tem alguns tipos de dados básicos, chamados de primitivos.

## String

Texto. Pode ser escrito com aspas simples, duplas ou crases.

```javascript
let nome = "Ana";
let cidade = 'Recife';
let mensagem = `Olá, ${nome}!`; // template string com interpolação
```

As crases (template strings) permitem inserir variáveis diretamente no texto com `${}`.

## Number

Números, sejam inteiros ou decimais.

```javascript
let idade = 25;
let preco = 19.90;
let negativo = -8;
```

JavaScript não diferencia inteiro de decimal: tudo é `number`.

## Boolean

Representa verdadeiro ou falso.

```javascript
let ativo = true;
let logado = false;
```

Muito usado em condicionais e comparações.

## null

Representa a ausência intencional de valor. O desenvolvedor define explicitamente que a variável não tem valor.

```javascript
let endereco = null;
```

## undefined

Uma variável declarada mas sem valor atribuído é `undefined`.

```javascript
let telefone;
console.log(telefone); // undefined
```

## Verificando o tipo

O operador `typeof` retorna o tipo de um valor como string.

```javascript
typeof "texto"    // "string"
typeof 42         // "number"
typeof true       // "boolean"
typeof null       // "object" (comportamento histórico da linguagem)
typeof undefined  // "undefined"
```

## Tipagem dinâmica

JavaScript é dinamicamente tipado: uma variável pode trocar de tipo ao longo da execução. Isso é válido, mas pode gerar confusão se não for feito com cuidado.

```javascript
let valor = 10;
valor = "dez"; // válido em JavaScript
```
