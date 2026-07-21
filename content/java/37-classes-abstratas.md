---
id: "8a98dce11ef2"
title: "Classes abstratas"
description: "Como criar e usar classes abstratas em Java"
order: 37
---

# Classes abstratas

Uma classe abstrata é uma classe que não pode ser instanciada diretamente. Ela serve como base para outras classes, definindo uma estrutura comum que as subclasses devem seguir.

```java
public abstract class Animal {
  String nome;

  abstract void emitirSom(); // método abstrato, sem corpo

  void dormir() {
    System.out.println(nome + " está dormindo");
  }
}
```

A palavra `abstract` antes da classe indica que ela é abstrata. O método `emitirSom()` também é abstrato, ou seja, não tem implementação na própria classe `Animal`, apenas a assinatura.

## Implementando em uma subclasse

Toda subclasse de uma classe abstrata é obrigada a implementar os métodos abstratos dela.

```java
public class Cachorro extends Animal {
  @Override
  void emitirSom() {
    System.out.println(nome + " faz au au");
  }
}

public class Main {
  public static void main(String[] args) {
    Cachorro cachorro = new Cachorro();
    cachorro.nome = "Rex";

    cachorro.emitirSom();
    cachorro.dormir();
  }
}

// Saída:
// Rex faz au au
// Rex está dormindo
```

`emitirSom()` precisou ser implementado em `Cachorro`. Já `dormir()` foi herdado normalmente, já que tinha implementação na classe `Animal`.

## Tentando instanciar uma classe abstrata

```java
Animal animal = new Animal(); // erro de compilação
```

Não é possível criar um objeto diretamente de uma classe abstrata. Ela serve apenas como base.

## Quando usar uma classe abstrata?

Use quando várias classes compartilham um comportamento comum, mas cada uma precisa implementar parte desse comportamento de forma diferente. A classe abstrata garante que toda subclasse siga a mesma estrutura, sem precisar repetir métodos que já são comuns a todas.
