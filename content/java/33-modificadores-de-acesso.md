---
title: "Modificadores de acesso"
description: "Como controlar a visibilidade de classes, atributos e métodos em Java"
order: 33
---

# Modificadores de acesso

Modificadores de acesso definem onde uma classe, atributo ou método pode ser visto e usado.

## Os quatro níveis

```java
public class Exemplo {
  public int a;      // acessível de qualquer lugar
  protected int b;   // acessível na mesma classe, mesmo pacote e subclasses
  int c;              // (sem modificador) acessível apenas no mesmo pacote
  private int d;     // acessível apenas dentro da própria classe
}
```

| Modificador | Mesma classe | Mesmo pacote | Subclasse | Qualquer lugar |
|---|---|---|---|---|
| `public` | sim | sim | sim | sim |
| `protected` | sim | sim | sim | não |
| (sem modificador) | sim | sim | não | não |
| `private` | sim | não | não | não |

## private: o mais restritivo

```java
public class ContaBancaria {
  private double saldo;

  public void depositar(double valor) {
    saldo += valor;
  }

  public double getSaldo() {
    return saldo;
  }
}
```

O atributo `saldo` não pode ser acessado diretamente fora da classe `ContaBancaria`. Para isso, ela expõe métodos públicos como `depositar()` e `getSaldo()`.

```java
public class Main {
  public static void main(String[] args) {
    ContaBancaria conta = new ContaBancaria();

    conta.saldo = 100; // erro de compilação, saldo é private
    conta.depositar(100); // correto, usando o método público
  }
}
```

## public: o mais permissivo

```java
public class Calculadora {
  public int somar(int a, int b) {
    return a + b;
  }
}
```

Métodos e classes que devem ser usados por outras partes do programa costumam ser `public`.

## Por que usar private?

Restringir o acesso direto aos atributos é a base do encapsulamento, que veremos em detalhe na próxima aula. Ele protege os dados de um objeto contra alterações descontroladas, permitindo que a própria classe decida como seus dados podem ser modificados.
