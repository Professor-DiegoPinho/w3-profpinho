---
id: "8e31c001765c"
title: "Escopo de variáveis"
description: "Como o escopo determina onde uma variável pode ser acessada em Java"
order: 26
---

# Escopo de variáveis

Escopo determina em quais partes do código uma variável pode ser acessada.

## Escopo de bloco

Variáveis declaradas dentro de um bloco `{}` só existem dentro dele.

```java
if (true) {
  int numero = 10;
  System.out.println(numero);
}

System.out.println(numero); // erro de compilação, numero não existe aqui
```

## Escopo de método

Variáveis declaradas dentro de um método só existem dentro dele.

```java
static void calcular() {
  int resultado = 42;
  System.out.println(resultado);
}

public static void main(String[] args) {
  calcular();
  System.out.println(resultado); // erro de compilação, resultado não existe aqui
}
```

## Escopo de classe (atributos)

Variáveis declaradas diretamente na classe, fora de qualquer método, são chamadas de atributos e podem ser acessadas por qualquer método daquela classe.

```java
public class Contador {
  static int total = 0;

  static void incrementar() {
    total++;
  }

  public static void main(String[] args) {
    incrementar();
    incrementar();
    System.out.println(total);
  }
}

// Saída:
// 2
```

## Variáveis com o mesmo nome em escopos diferentes

```java
static int numero = 100;

static void metodo() {
  int numero = 5; // outra variável, escopo local
  System.out.println(numero);
}

public static void main(String[] args) {
  metodo();
  System.out.println(numero);
}

// Saída:
// 5
// 100
```

A variável local dentro do método não interfere na variável de escopo de classe com o mesmo nome.
