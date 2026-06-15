---
id: "8c304865513f"
title: "Operadores"
description: "Os tipos de operadores em Python e como usá-los"
order: 12
---

# Operadores

Operadores são símbolos que realizam ações em valores. Python oferece vários tipos.

## Operadores aritméticos

Usados para cálculos matemáticos:

```python
print(10 + 5)      # 15 (adição)
print(10 - 5)      # 5 (subtração)
print(10 * 5)      # 50 (multiplicação)
print(10 / 5)      # 2.0 (divisão)
print(10 // 3)     # 3 (divisão inteira)
print(10 % 3)      # 1 (resto/módulo)
print(2 ** 3)      # 8 (potência)
```

## Operadores de atribuição

Atribuem valores a variáveis:

```python
x = 10
x += 5      # x = x + 5  (15)
x -= 3      # x = x - 3  (12)
x *= 2      # x = x * 2  (24)
x /= 4      # x = x / 4  (6.0)
```

## Operadores de comparação

Comparam valores e retornam `True` ou `False`:

```python
print(10 == 10)    # True (igual)
print(10 != 5)     # True (diferente)
print(10 > 5)      # True (maior)
print(10 < 5)      # False (menor)
print(10 >= 10)    # True (maior ou igual)
print(10 <= 5)     # False (menor ou igual)
```

## Operadores lógicos

Combinam condições:

```python
x = 5
print(x > 3 and x < 10)   # True (ambas verdadeiras)
print(x > 10 or x < 10)   # True (uma é verdadeira)
print(not(x > 10))        # True (nega a condição)
```

## Operadores de identidade

Verificam se são o mesmo objeto na memória:

```python
x = ["maçã", "banana"]
y = ["maçã", "banana"]

print(x is y)      # False (objetos diferentes)
print(x == y)      # True (valores iguais)
print(x is not y)  # True (não é o mesmo objeto)
```

## Operadores de associação

Verificam se um valor está em uma sequência:

```python
x = ["maçã", "banana", "laranja"]
print("maçã" in x)      # True
print("uva" in x)       # False
print("uva" not in x)   # True
```
