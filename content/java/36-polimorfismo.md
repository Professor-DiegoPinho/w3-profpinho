---
title: "Polimorfismo"
description: "O que é polimorfismo e como ele aparece em Java"
order: 36
---

# Polimorfismo

Polimorfismo significa que objetos de classes diferentes podem responder de formas diferentes ao mesmo método, mesmo compartilhando a mesma superclasse.

```java
public class Animal {
  void emitirSom() {
    System.out.println("O animal faz um som");
  }
}

public class Cachorro extends Animal {
  @Override
  void emitirSom() {
    System.out.println("O cachorro faz au au");
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
    Animal[] animais = {new Cachorro(), new Gato()};

    for (Animal animal : animais) {
      animal.emitirSom();
    }
  }
}

// Saída:
// O cachorro faz au au
// O gato faz miau
```

Mesmo que a variável `animal` seja do tipo `Animal`, o Java identifica em tempo de execução o tipo real do objeto guardado nela, e chama a versão correta do método.

## Por que isso é útil?

O código que percorre o array `animais` não precisa saber se está lidando com um `Cachorro` ou um `Gato`. Ele só chama `emitirSom()`, e cada objeto sabe como se comportar.

Isso permite escrever código mais genérico, que funciona com qualquer subclasse de `Animal`, mesmo que novas subclasses sejam criadas no futuro.

```java
public class Passaro extends Animal {
  @Override
  void emitirSom() {
    System.out.println("O passaro faz piu piu");
  }
}

public class Main {
  public static void main(String[] args) {
    Animal[] animais = {new Cachorro(), new Gato(), new Passaro()};

    for (Animal animal : animais) {
      animal.emitirSom();
    }
  }
}

// Saída:
// O cachorro faz au au
// O gato faz miau
// O passaro faz piu piu
```

O loop que percorre o array não precisou ser alterado para funcionar com a nova classe `Passaro`.
