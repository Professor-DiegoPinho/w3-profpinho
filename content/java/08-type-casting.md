---
id: "b02aa6e64c94"
title: "Type Casting"
description: "Como converter entre tipos de dados em Java"
order: 8
---

# Type Casting

Type casting é a conversão de um tipo de dado para outro. Em Java, existem dois tipos de conversão: implícita e explícita.

## Conversão implícita (widening)

Acontece automaticamente quando convertemos um tipo menor para um tipo maior, sem risco de perda de informação.

```java
int numero = 10;
double numeroDecimal = numero; // int para double, automático

System.out.println(numeroDecimal);

// Saída:
// 10.0
```

A ordem de conversão automática segue: `byte` para `short` para `int` para `long` para `float` para `double`.

## Conversão explícita (narrowing)

Quando convertemos de um tipo maior para um menor, é preciso fazer a conversão manualmente, pois pode haver perda de dados.

```java
double preco = 19.99;
int precoInteiro = (int) preco; // perde a parte decimal

System.out.println(precoInteiro);

// Saída:
// 19
```

A sintaxe é colocar o tipo desejado entre parênteses antes do valor.

## Convertendo entre números e String

Para transformar um número em texto:

```java
int idade = 25;
String idadeTexto = String.valueOf(idade);

System.out.println(idadeTexto);
```

Para transformar texto em número:

```java
String numeroTexto = "42";
int numero = Integer.parseInt(numeroTexto);

double valorTexto = Double.parseDouble("3.14");
```

Se o texto não representar um número válido, o programa lança um erro do tipo `NumberFormatException`.
