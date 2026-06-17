---
title: "Parâmetros e sobrecarga de métodos"
description: "Como trabalhar com parâmetros opcionais e sobrecarregar métodos em Java"
order: 25
---

# Parâmetros e sobrecarga de métodos

## Sobrecarga de métodos (overloading)

Java permite criar vários métodos com o mesmo nome, desde que os parâmetros sejam diferentes em quantidade ou tipo. Isso se chama sobrecarga, ou overloading.

```java
static int somar(int a, int b) {
  return a + b;
}

static double somar(double a, double b) {
  return a + b;
}

static int somar(int a, int b, int c) {
  return a + b + c;
}

public static void main(String[] args) {
  System.out.println(somar(2, 3));       // 5
  System.out.println(somar(2.5, 3.5));   // 6.0
  System.out.println(somar(1, 2, 3));    // 6
}
```

O Java identifica qual versão do método chamar com base nos tipos e na quantidade de argumentos passados.

## Varargs: número variável de argumentos

Quando não se sabe quantos valores serão passados, é possível usar `...` para aceitar uma quantidade variável de argumentos.

```java
static int somarTodos(int... numeros) {
  int total = 0;
  for (int numero : numeros) {
    total += numero;
  }
  return total;
}

public static void main(String[] args) {
  System.out.println(somarTodos(1, 2));       // 3
  System.out.println(somarTodos(1, 2, 3, 4)); // 10
  System.out.println(somarTodos());           // 0
}
```

Dentro do método, `numeros` se comporta como um array normal.

## Passagem de valores

Em Java, tipos primitivos são passados por valor: o método recebe uma cópia, e alterações dentro dele não afetam a variável original.

```java
static void dobrar(int numero) {
  numero = numero * 2;
}

public static void main(String[] args) {
  int valor = 10;
  dobrar(valor);
  System.out.println(valor);
}

// Saída:
// 10
```

Já objetos, como arrays, são passados por referência: o método recebe acesso ao mesmo objeto na memória, então alterações dentro dele afetam o original.

```java
static void dobrarPrimeiro(int[] numeros) {
  numeros[0] = numeros[0] * 2;
}

public static void main(String[] args) {
  int[] valores = {10, 20, 30};
  dobrarPrimeiro(valores);
  System.out.println(valores[0]);
}

// Saída:
// 20
```
