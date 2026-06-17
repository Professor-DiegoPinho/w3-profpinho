---
title: "Herança"
description: "Como usar herança para reaproveitar código entre classes em Java"
order: 35
---

# Herança

Herança permite que uma classe reaproveite atributos e métodos de outra. A classe que herda é chamada de **subclasse**, e a classe original é chamada de **superclasse**.

```java
public class Animal {
  String nome;

  void comer() {
    System.out.println(nome + " está comendo");
  }
}

public class Cachorro extends Animal {
  void latir() {
    System.out.println(nome + " está latindo");
  }
}

public class Main {
  public static void main(String[] args) {
    Cachorro cachorro = new Cachorro();
    cachorro.nome = "Rex";

    cachorro.comer(); // herdado de Animal
    cachorro.latir(); // próprio de Cachorro
  }
}

// Saída:
// Rex está comendo
// Rex está latindo
```

A palavra `extends` indica que `Cachorro` herda de `Animal`. Com isso, `Cachorro` ganha automaticamente o atributo `nome` e o método `comer()`, sem precisar reescrevê-los.

## super: acessando a superclasse

A palavra `super` permite acessar atributos, métodos e o construtor da superclasse.

```java
public class Animal {
  String nome;

  Animal(String nome) {
    this.nome = nome;
  }

  void comer() {
    System.out.println(nome + " está comendo");
  }
}

public class Cachorro extends Animal {
  Cachorro(String nome) {
    super(nome); // chama o construtor de Animal
  }

  void latir() {
    System.out.println(nome + " está latindo");
  }
}

public class Main {
  public static void main(String[] args) {
    Cachorro cachorro = new Cachorro("Rex");
    cachorro.comer();
    cachorro.latir();
  }
}
```

## Sobrescrevendo métodos (override)

Uma subclasse pode redefinir o comportamento de um método herdado, usando a mesma assinatura.

```java
public class Animal {
  void emitirSom() {
    System.out.println("O animal faz um som");
  }
}

public class Gato extends Animal {
  @Override
  void emitirSom() {
    System.out.println("O gato faz miau");
  }
}

public class Main {
  public static void main(String[] args) {
    Gato gato = new Gato();
    gato.emitirSom();
  }
}

// Saída:
// O gato faz miau
```

A anotação `@Override` não é obrigatória, mas é uma boa prática, pois deixa claro que aquele método está substituindo um da superclasse, e ajuda o compilador a apontar erros caso a assinatura não corresponda corretamente.
