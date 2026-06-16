---
title: "Tipos de dados"
description: "Os principais tipos de dados em Java"
order: 7
---

# Tipos de dados em Java

Java divide os tipos de dados em dois grupos: **primitivos** e **referência**.

## Tipos primitivos numéricos

```java
byte idade = 25;          // -128 a 127
short ano = 2025;         // -32768 a 32767
int populacao = 215000000; // o tipo inteiro mais usado
long distancia = 9460730472580800L; // números muito grandes, precisa do sufixo L

float preco = 19.90f;     // ponto flutuante, precisa do sufixo f
double pi = 3.14159265;   // ponto flutuante com mais precisão, o mais usado
```

`int` e `double` são os tipos numéricos mais usados no dia a dia. Os demais aparecem quando há necessidade específica de economia de memória ou maior precisão.

## char

Armazena um único caractere, sempre entre aspas simples.

```java
char letra = 'A';
```

## boolean

Representa verdadeiro ou falso.

```java
boolean ativo = true;
boolean pausado = false;
```

## String

Representa texto. Tecnicamente não é um tipo primitivo, é uma classe, mas é usada com tanta frequência que costuma ser tratada como se fosse um tipo básico.

```java
String nome = "Ana Silva";
```

## Verificando o tamanho de cada tipo

Os tipos numéricos têm limites de tamanho fixos. Se você tentar guardar um valor maior do que o tipo suporta, o resultado pode ficar incorreto sem gerar erro.

```java
byte numero = 200; // erro de compilação, 200 está fora do limite do byte (-128 a 127)
```

## Resumo

| Tipo | Armazena | Exemplo |
|---|---|---|
| `int` | números inteiros | `25` |
| `double` | números decimais | `3.14` |
| `char` | um caractere | `'A'` |
| `boolean` | verdadeiro ou falso | `true` |
| `String` | texto | `"Ana"` |
