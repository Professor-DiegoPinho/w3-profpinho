---
title: "Métodos de classe"
description: "Como funcionam métodos de instância e métodos estáticos em Java"
order: 31
---

# Métodos de classe

## Métodos de instância

São métodos que operam sobre um objeto específico e podem acessar os atributos dele através da palavra `this`.

```java
public class ContaBancaria {
  double saldo = 0;

  void depositar(double valor) {
    this.saldo += valor;
  }

  void exibirSaldo() {
    System.out.println("Saldo: " + this.saldo);
  }
}

public class Main {
  public static void main(String[] args) {
    ContaBancaria conta = new ContaBancaria();
    conta.depositar(100);
    conta.depositar(50);
    conta.exibirSaldo();
  }
}

// Saída:
// Saldo: 150.0
```

`this` se refere ao próprio objeto que está executando o método. Ele costuma ser usado quando o nome do parâmetro é igual ao nome do atributo.

```java
void depositar(double saldo) {
  this.saldo += saldo; // this.saldo é o atributo, saldo é o parâmetro
}
```

## Métodos estáticos

Métodos estáticos pertencem à classe, e não a um objeto específico. Por isso, não podem acessar atributos de instância diretamente.

```java
public class Calculadora {
  static int somar(int a, int b) {
    return a + b;
  }
}

public class Main {
  public static void main(String[] args) {
    int resultado = Calculadora.somar(5, 3);
    System.out.println(resultado);
  }
}

// Saída:
// 8
```

Métodos estáticos são chamados pelo nome da classe, sem precisar criar um objeto. É exatamente assim que `Math.sqrt()` e `Math.max()`, vistos antes, funcionam.

## Quando usar cada um

Use métodos de instância quando a ação depende dos dados específicos daquele objeto, como o saldo de uma conta. Use métodos estáticos quando a ação é genérica e não depende do estado de nenhum objeto, como uma operação matemática.
