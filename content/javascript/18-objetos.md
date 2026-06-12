---
id: "474bdde94a6b"
title: "Objetos"
description: "Como criar e usar objetos em JavaScript para representar entidades com propriedades e métodos"
order: 18
---

# Objetos

Objetos agrupam informações relacionadas em uma única estrutura, usando pares de **chave: valor**.

```javascript
const pessoa = {
  nome: "Ana",
  idade: 30,
  cidade: "Recife"
};
```

## Acessando propriedades

```javascript
console.log(pessoa.nome);      // "Ana" — notação de ponto
console.log(pessoa["idade"]);  // 30    — notação de colchetes
```

A notação de colchetes é útil quando o nome da propriedade está em uma variável:

```javascript
const chave = "cidade";
console.log(pessoa[chave]); // "Recife"
```

## Adicionando e alterando propriedades

```javascript
pessoa.email = "ana@email.com"; // adiciona
pessoa.idade = 31;              // altera
```

## Removendo propriedades

```javascript
delete pessoa.cidade;
```

## Métodos

Objetos podem ter funções como valores. Essas funções são chamadas de **métodos**.

```javascript
const pessoa = {
  nome: "Ana",
  saudar() {
    console.log(`Olá, meu nome é ${this.nome}!`);
  }
};

pessoa.saudar(); // "Olá, meu nome é Ana!"
```

O `this` dentro de um método se refere ao próprio objeto.

## Verificando se uma propriedade existe

```javascript
"nome" in pessoa;             // true
pessoa.hasOwnProperty("email"); // false
```

## Desestruturação

Extrai propriedades do objeto em variáveis separadas.

```javascript
const { nome, idade } = pessoa;

console.log(nome);  // "Ana"
console.log(idade); // 30
```

É equivalente a:

```javascript
const nome = pessoa.nome;
const idade = pessoa.idade;
```
