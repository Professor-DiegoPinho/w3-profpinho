---
id: "a6a1cf6d5458"
title: "Métodos de Objeto"
description: "Como usar Object.keys, Object.values, Object.entries e spread para trabalhar com objetos"
order: 19
---

# Métodos de Objeto

JavaScript oferece métodos utilitários para inspecionar e transformar objetos.

## Object.keys()

Retorna um array com as **chaves** do objeto.

```javascript
const pessoa = { nome: "Ana", idade: 30, cidade: "Recife" };

console.log(Object.keys(pessoa));
// ["nome", "idade", "cidade"]
```

## Object.values()

Retorna um array com os **valores** do objeto.

```javascript
console.log(Object.values(pessoa));
// ["Ana", 30, "Recife"]
```

## Object.entries()

Retorna um array de pares `[chave, valor]`.

```javascript
console.log(Object.entries(pessoa));
// [["nome", "Ana"], ["idade", 30], ["cidade", "Recife"]]
```

Muito útil para percorrer um objeto com `forEach` ou `for...of`:

```javascript
Object.entries(pessoa).forEach(([chave, valor]) => {
  console.log(`${chave}: ${valor}`);
});
```

## Object.assign()

Copia as propriedades de um ou mais objetos para outro.

```javascript
const base = { ativo: true, perfil: "usuario" };
const dados = { nome: "Ana", idade: 30 };

const usuario = Object.assign({}, base, dados);
console.log(usuario);
// { ativo: true, perfil: "usuario", nome: "Ana", idade: 30 }
```

## Spread em objetos

O operador `...` (spread) é uma forma mais moderna de fazer o mesmo que o `Object.assign`.

```javascript
const usuario = { ...base, ...dados };
```

Também serve para copiar um objeto sem modificar o original:

```javascript
const copia = { ...pessoa };
copia.nome = "Pedro";

console.log(pessoa.nome); // "Ana" — original intacto
console.log(copia.nome);  // "Pedro"
```

## Object.freeze()

Impede que um objeto seja modificado.

```javascript
const config = Object.freeze({ tema: "escuro", idioma: "pt-BR" });

config.tema = "claro"; // silenciosamente ignorado
console.log(config.tema); // "escuro"
```
