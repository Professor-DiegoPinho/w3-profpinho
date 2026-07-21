---
id: "fbf5f515bf2b"
title: "Métodos"
description: "Como criar e usar métodos em Java"
order: 24
---

# Métodos em Java

Métodos são blocos de código com um nome, que podem ser executados quantas vezes forem necessárias. Ajudam a organizar o código e evitar repetição.

## Declarando um método

```java
public class Main {
  static void saudar() {
    System.out.println("Olá!");
  }

  public static void main(String[] args) {
    saudar();
    saudar();
  }
}

// Saída:
// Olá!
// Olá!
```

## Tipo de retorno

Todo método precisa declarar o tipo do valor que retorna. Quando não retorna nada, usa `void`.

```java
static int somar(int a, int b) {
  return a + b;
}

public static void main(String[] args) {
  int resultado = somar(3, 7);
  System.out.println(resultado);
}

// Saída:
// 10
```

## Parâmetros

Os parâmetros são as informações que o método recebe, sempre com tipo declarado.

```java
static void saudar(String nome) {
  System.out.println("Olá, " + nome + "!");
}

public static void main(String[] args) {
  saudar("Ana");
  saudar("Pedro");
}

// Saída:
// Olá, Ana!
// Olá, Pedro!
```

## Vários parâmetros

```java
static double calcularMedia(double nota1, double nota2, double nota3) {
  return (nota1 + nota2 + nota3) / 3;
}

public static void main(String[] args) {
  double media = calcularMedia(7.5, 8.0, 6.5);
  System.out.println(media);
}

// Saída:
// 7.333333333333333
```
