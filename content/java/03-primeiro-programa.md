---
id: "ac385f9a6631"
title: "Primeiro programa"
description: "Como criar e executar seu primeiro programa em Java"
order: 3
---

# Criando seu primeiro programa

Todo programa Java começa com uma classe e um método especial chamado `main`, que é o ponto de entrada da execução.

Crie um arquivo chamado `Main.java`:

```java
public class Main {
  public static void main(String[] args) {
    System.out.println("Hello, world!");
  }
}
```

## Entendendo o código

- `public class Main`: declara uma classe chamada `Main`. O nome do arquivo precisa ser igual ao nome da classe pública;
- `public static void main(String[] args)`: o método principal, que é executado quando o programa roda;
- `System.out.println()`: imprime um texto no terminal, seguido de uma quebra de linha.

## Compilando e executando

Java é uma linguagem compilada. Antes de rodar, o código precisa ser transformado em bytecode pelo compilador.

```bash
javac Main.java
java Main
```

O comando `javac` gera um arquivo `Main.class`, que é executado pelo comando `java`.

## println vs print

```java
System.out.println("Linha 1");
System.out.println("Linha 2");

// Saída:
// Linha 1
// Linha 2
```

```java
System.out.print("Sem quebra de linha. ");
System.out.print("Continua na mesma linha.");

// Saída:
// Sem quebra de linha. Continua na mesma linha.
```

`println` adiciona uma quebra de linha ao final, `print` não.
