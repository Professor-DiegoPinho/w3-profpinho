---
id: "57a732ae47e8"
title: "Booleanos"
description: "O tipo boolean em Java"
order: 16
---

# Booleanos em Java

O tipo `boolean` representa apenas dois valores possíveis: `true` ou `false`.

```java
boolean ativo = true;
boolean pausado = false;
```

## Resultado de comparações

A maioria dos valores booleanos surge a partir de comparações.

```java
int idade = 20;
boolean maiorDeIdade = idade >= 18;

System.out.println(maiorDeIdade);

// Saída:
// true
```

## Usando em condicionais

```java
boolean chovendo = true;

if (chovendo) {
  System.out.println("Leve um guarda-chuva");
}
```

## Diferente de outras linguagens

Em Java, diferente de Python ou JavaScript, não existem valores "truthy" ou "falsy". Um `int` igual a `0`, uma `String` vazia ou `null` não são automaticamente tratados como `false`. A condição de um `if` precisa ser, obrigatoriamente, do tipo `boolean`.

```java
int numero = 0;

if (numero) {
  // erro de compilação: int não pode ser usado como boolean
}
```

Para verificar isso corretamente, é preciso fazer uma comparação explícita:

```java
int numero = 0;

if (numero == 0) {
  System.out.println("O número é zero");
}
```
