---
id: "a6642c6300c8"
title: "Condicionais"
description: "Como usar if, else if e else para tomar decisões em Java"
order: 17
---

# Condicionais em Java

## if

```java
int temperatura = 35;

if (temperatura > 30) {
  System.out.println("Está calor!");
}
```

## if e else

```java
int idade = 16;

if (idade >= 18) {
  System.out.println("Maior de idade");
} else {
  System.out.println("Menor de idade");
}
```

## if, else if e else

```java
int nota = 75;

if (nota >= 90) {
  System.out.println("Nota A");
} else if (nota >= 60) {
  System.out.println("Nota B");
} else {
  System.out.println("Nota C ou menor");
}

// Saída:
// Nota B
```

Apenas o primeiro bloco com condição verdadeira é executado. Os demais são ignorados, mesmo que também sejam verdadeiros.

## Condicionais aninhadas

```java
int idade = 20;
boolean temCarteira = true;

if (idade >= 18) {
  if (temCarteira) {
    System.out.println("Pode dirigir");
  } else {
    System.out.println("Precisa tirar a carteira");
  }
} else {
  System.out.println("Ainda não tem idade para dirigir");
}
```

## Operador ternário

Uma forma compacta de escrever um if/else simples, retornando um valor diretamente.

```java
int idade = 20;
String status = idade >= 18 ? "adulto" : "menor de idade";

System.out.println(status);

// Saída:
// adulto
```
