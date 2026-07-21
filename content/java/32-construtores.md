---
id: "08bbe86e8834"
title: "Construtores"
description: "Como usar construtores para inicializar objetos em Java"
order: 32
---

# Construtores

Um construtor é um método especial, chamado automaticamente quando um objeto é criado com `new`. Ele serve para inicializar os atributos do objeto.

```java
public class Pessoa {
  String nome;
  int idade;

  Pessoa(String nome, int idade) {
    this.nome = nome;
    this.idade = idade;
  }
}

public class Main {
  public static void main(String[] args) {
    Pessoa pessoa = new Pessoa("Ana", 30);

    System.out.println(pessoa.nome);
    System.out.println(pessoa.idade);
  }
}

// Saída:
// Ana
// 30
```

O construtor tem o mesmo nome da classe e não declara tipo de retorno, nem mesmo `void`.

## Construtor padrão

Se você não criar nenhum construtor, o Java fornece um construtor padrão, sem parâmetros, que apenas cria o objeto com os valores padrão de cada atributo.

```java
public class Produto {
  String nome;
  double preco;
}

Produto produto = new Produto(); // usa o construtor padrão
```

Esse construtor automático deixa de existir assim que você cria qualquer construtor próprio na classe.

## Sobrecarga de construtores

Assim como métodos, construtores também podem ser sobrecarregados, oferecendo formas diferentes de criar um objeto.

```java
public class Produto {
  String nome;
  double preco;

  Produto(String nome) {
    this.nome = nome;
    this.preco = 0;
  }

  Produto(String nome, double preco) {
    this.nome = nome;
    this.preco = preco;
  }
}

public class Main {
  public static void main(String[] args) {
    Produto p1 = new Produto("Caderno");
    Produto p2 = new Produto("Caderno", 15.90);

    System.out.println(p1.preco);
    System.out.println(p2.preco);
  }
}

// Saída:
// 0.0
// 15.9
```

## Chamando um construtor de dentro de outro

A palavra `this()` permite que um construtor chame outro da mesma classe, evitando repetir código.

```java
public class Produto {
  String nome;
  double preco;

  Produto(String nome) {
    this(nome, 0);
  }

  Produto(String nome, double preco) {
    this.nome = nome;
    this.preco = preco;
  }
}
```
