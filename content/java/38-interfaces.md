---
title: "Interfaces"
description: "Como criar e usar interfaces em Java"
order: 38
---

# Interfaces

Uma interface define um contrato: um conjunto de métodos que qualquer classe que a implemente precisa fornecer. Diferente de uma classe abstrata, uma interface não guarda estado e, tradicionalmente, não implementa nenhum método.

```java
public interface Voador {
  void voar();
}
```

## Implementando uma interface

Uma classe usa a palavra `implements` para se comprometer com o contrato da interface.

```java
public class Passaro implements Voador {
  @Override
  public void voar() {
    System.out.println("O passaro está voando");
  }
}

public class Main {
  public static void main(String[] args) {
    Passaro passaro = new Passaro();
    passaro.voar();
  }
}

// Saída:
// O passaro está voando
```

## Uma classe pode implementar várias interfaces

Diferente da herança, em que uma classe só pode estender uma única superclasse, uma classe pode implementar quantas interfaces forem necessárias.

```java
public interface Voador {
  void voar();
}

public interface Nadador {
  void nadar();
}

public class Pato implements Voador, Nadador {
  @Override
  public void voar() {
    System.out.println("O pato está voando");
  }

  @Override
  public void nadar() {
    System.out.println("O pato está nadando");
  }
}
```

## Interface ou classe abstrata?

Use interface quando classes não relacionadas entre si precisam compartilhar um comportamento, como `voar` ou `nadar`, sem terem uma relação direta de "é um tipo de". Use classe abstrata quando as subclasses já compartilham uma base comum e uma relação de herança real, como `Cachorro` e `Gato` sendo tipos de `Animal`.

## Métodos padrão (default)

A partir do Java 8, interfaces também podem ter métodos com implementação padrão, usando a palavra `default`.

```java
public interface Voador {
  void voar();

  default void pousar() {
    System.out.println("Pousando...");
  }
}
```

Classes que implementam `Voador` ganham `pousar()` automaticamente, mas ainda podem sobrescrevê-lo se quiserem um comportamento diferente.
