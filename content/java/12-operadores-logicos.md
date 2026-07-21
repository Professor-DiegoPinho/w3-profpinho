---
id: "e5f1a84044d5"
title: "Operadores lógicos"
description: "Os operadores lógicos em Java"
order: 12
---

# Operadores lógicos

Combinam expressões booleanas e retornam `true` ou `false`.

```java
boolean a = true;
boolean b = false;

System.out.println(a && b); // false, AND: as duas precisam ser true
System.out.println(a || b); // true, OR: pelo menos uma precisa ser true
System.out.println(!a);     // false, NOT: inverte o valor
```

## Combinando com comparações

```java
int idade = 20;
boolean temCarteira = true;

if (idade >= 18 && temCarteira) {
  System.out.println("Pode dirigir");
}
```

```java
int nota = 45;

if (nota < 0 || nota > 100) {
  System.out.println("Nota inválida");
}
```

## Curto-circuito

Os operadores `&&` e `||` avaliam da esquerda para a direita e param assim que o resultado já é certo, sem avaliar o restante da expressão.

```java
int idade = 15;

if (idade >= 18 && verificarCarteira()) {
  System.out.println("Pode dirigir");
}
```

Como `idade >= 18` já é `false`, o Java nem chega a chamar o método `verificarCarteira()`. Isso é útil para evitar chamadas desnecessárias ou erros, como acessar algo que pode não existir.
