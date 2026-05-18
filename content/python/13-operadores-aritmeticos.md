---
title: "Operadores aritméticos"
description: "Operações matemáticas com Python"
order: 13
---

# Operadores aritméticos

Use esses operadores para cálculos matemáticos:

| Operador | Operação      | Exemplo    |
| -------- | ------------- | ---------- |
| `+`      | Adição        | `5 + 3`    |
| `-`      | Subtração     | `5 - 3`    |
| `*`      | Multiplicação | `5 * 3`    |
| `/`      | Divisão       | `10 / 2`   |
| `//`     | Divisão int   | `7 // 2`   |
| `%`      | Módulo (resto)| `7 % 2`    |
| `**`     | Potência      | `2 ** 3`   |

# Exemplos

```python
print(10 + 5)      # 15
print(10 - 5)      # 5
print(10 * 5)      # 50
print(10 / 5)      # 2.0
print(10 // 3)     # 3 (descarta decimal)
print(10 % 3)      # 1 (resto)
print(2 ** 3)      # 8
```

# Strings também usam + e *

Cuide para não confundir com números:

```python
print("Olá" + " " + "mundo")    # Olá mundo
print("Olá" * 3)                # OláOláOlá
```
Isso pode ser útil para criar mensagens ou repetir textos, mas não tem relação com operações matemáticas.

# Arredondamento

```python
x = 10 / 3
print(x)            # 3.333...
print(round(x, 2))  # 3.33
```

# Precisão com floats

Cuidado: alguns valores decimais não são precisos:

```python
print(0.1 + 0.2)           # 0.30000000000000004
print(0.1 + 0.2 == 0.3)    # False
print(round(0.1 + 0.2, 1)) # 0.3
```
