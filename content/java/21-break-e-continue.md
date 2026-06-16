---
title: "Break e Continue"
description: "Como interromper ou pular iterações em loops com break e continue"
order: 21
---

# Break e Continue

## break

Interrompe o loop imediatamente, independente da condição.

```java
for (int i = 0; i < 10; i++) {
  if (i == 5) {
    break;
  }
  System.out.println(i);
}

// Saída:
// 0
// 1
// 2
// 3
// 4
```

## continue

Pula a iteração atual e vai para a próxima, sem encerrar o loop.

```java
for (int i = 0; i < 6; i++) {
  if (i == 3) {
    continue;
  }
  System.out.println(i);
}

// Saída:
// 0
// 1
// 2
// 4
// 5
```

## Exemplo prático

```java
int[] numeros = {1, -2, 5, -8, 3, -1};

for (int numero : numeros) {
  if (numero < 0) {
    continue;
  }
  System.out.println(numero);
}

// Saída:
// 1
// 5
// 3
```

## Labels em loops aninhados

Quando há loops dentro de loops, `break` e `continue` afetam apenas o loop mais interno. Para controlar o loop externo, é possível usar uma label.

```java
externo:
for (int i = 0; i < 3; i++) {
  for (int j = 0; j < 3; j++) {
    if (j == 1) {
      break externo;
    }
    System.out.println(i + ", " + j);
  }
}

// Saída:
// 0, 0
```

A label `externo` permite que o `break` interrompa o loop de fora, não apenas o de dentro.
