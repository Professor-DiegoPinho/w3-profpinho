---
id: "aad5bb47a969"
title: "Variáveis"
description: "Como declarar e usar variáveis em Java"
order: 6
---

# Variáveis em Java

Diferente de linguagens como Python ou JavaScript, Java é uma linguagem de **tipagem estática**. Isso significa que você precisa declarar o tipo da variável no momento da criação.

```java
int idade = 25;
double altura = 1.75;
String nome = "Ana";
boolean ativo = true;
```

## Declarando sem inicializar

É possível declarar uma variável e atribuir o valor depois.

```java
int idade;
idade = 25;

System.out.println(idade);
```

## Alterando o valor

O valor pode ser alterado, mas o tipo precisa continuar o mesmo.

```java
int idade = 25;
idade = 30; // válido

idade = "trinta"; // erro de compilação, tipos incompatíveis
```

## Várias variáveis na mesma linha

```java
int x = 1, y = 2, z = 3;
System.out.println(x + y + z);

// Saída:
// 6
```

## var: inferência de tipo

A partir do Java 10, é possível usar `var` para deixar o compilador inferir o tipo automaticamente, com base no valor atribuído.

```java
var idade = 25;       // int
var nome = "Ana";     // String
var ativo = true;     // boolean
```

O tipo ainda é fixo internamente, o `var` só evita que você precise escrevê-lo manualmente. Por isso, ele só pode ser usado quando a variável é inicializada na mesma linha em que é declarada.

## Constantes

Para criar uma variável cujo valor não pode mudar, use a palavra `final`.

```java
final double PI = 3.14159;

PI = 3; // erro de compilação
```

Por convenção, constantes são escritas em letras maiúsculas com underline entre as palavras.
