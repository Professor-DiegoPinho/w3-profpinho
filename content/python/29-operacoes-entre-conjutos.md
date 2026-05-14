---
title: "Operações entre Conjuntos"
description: "União, interseção e diferença entre conjuntos"
order: 29
---

# União

Junta **todos os elementos** dos conjuntos:

```python
a = {1, 2, 3}
b = {3, 4, 5}

print(a | b)           # {1, 2, 3, 4, 5}
print(a.union(b))      # {1, 2, 3, 4, 5}
```

# Interseção

**Somente elementos comuns**:

```python
a = {1, 2, 3}
b = {3, 4, 5}

print(a & b)               # {3}
print(a.intersection(b))   # {3}
```

# Diferença

Elementos em `a` que **não estão em `b`**:

```python
a = {1, 2, 3}
b = {3, 4, 5}

print(a - b)           # {1, 2}
print(a.difference(b)) # {1, 2}

print(b - a)           # {4, 5}
```

# Diferença simétrica

Tudo em `a` OU `b`, **mas não nos dois**:

```python
a = {1, 2, 3}
b = {3, 4, 5}

print(a ^ b)                      # {1, 2, 4, 5}
print(a.symmetric_difference(b))  # {1, 2, 4, 5}
```