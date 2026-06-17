---
title: "Expressões Lambda"
description: "Introdução às expressões lambda em Java"
order: 45
---

# Expressões Lambda

Uma expressão lambda é uma forma compacta de representar um método sem precisar declará-lo formalmente com nome, tipo de retorno e corpo completo. Foram introduzidas no Java 8.

## Sintaxe básica

```java
(parametros) -> expressao
```

## Comparando com uma interface funcional

Lambdas funcionam com interfaces que têm apenas um método, chamadas de interfaces funcionais.

```java
interface Operacao {
  int aplicar(int a, int b);
}

public class Main {
  public static void main(String[] args) {
    Operacao soma = (a, b) -> a + b;
    Operacao multiplicacao = (a, b) -> a * b;

    System.out.println(soma.aplicar(3, 4));
    System.out.println(multiplicacao.aplicar(3, 4));
  }
}

// Saída:
// 7
// 12
```

Em vez de criar uma classe que implementa `Operacao` com um método `aplicar()`, a lambda define o comportamento diretamente, de forma resumida.

## Lambdas com Runnable

```java
Runnable tarefa = () -> System.out.println("Executando tarefa");
tarefa.run();

// Saída:
// Executando tarefa
```

## Lambdas com listas

Lambdas aparecem com frequência ao trabalhar com coleções, principalmente com o método `forEach`.

```java
import java.util.ArrayList;

ArrayList<String> nomes = new ArrayList<>();
nomes.add("Ana");
nomes.add("Pedro");
nomes.add("Maria");

nomes.forEach(nome -> System.out.println(nome));

// Saída:
// Ana
// Pedro
// Maria
```

## Bloco de código em uma lambda

Quando a lógica precisa de mais de uma linha, é possível usar chaves.

```java
Operacao calcular = (a, b) -> {
  int resultado = a + b;
  resultado = resultado * 2;
  return resultado;
};

System.out.println(calcular.aplicar(3, 4));

// Saída:
// 14
```

## Por que usar lambdas?

Elas tornam o código mais curto quando o objetivo é passar um comportamento simples como argumento, evitando a criação de classes inteiras só para implementar um único método.
