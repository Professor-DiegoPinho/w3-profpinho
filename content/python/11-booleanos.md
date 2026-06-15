---
id: "7bc9971d430a"
title: "Booleanos"
description: "O tipo Booleano (True/False) em Python"
order: 11
---

# Booleanos

O tipo booleano (`bool`) tem apenas dois valores: `True` (verdadeiro) ou `False` (falso).

```python
ativo = True
inativo = False

print(type(ativo))  # <class 'bool'>
print(ativo)        # True
```

# Valores truthy e falsy

Muitos valores podem ser interpretados como `True` ou `False`:

## Falsy (considerados False)

```python
print(bool(False))      # False
print(bool(0))          # False
print(bool(""))         # False (string vazia)
print(bool([]))         # False (lista vazia)
print(bool({}))         # False (dicionário vazio)
print(bool(None))       # False
```

## Truthy (considerados True)

```python
print(bool("Texto"))    # True
print(bool(123))        # True
print(bool([1, 2]))     # True (lista com itens)
print(bool({"a": 1}))   # True (dicionário com itens)
```

# Usando bool()

A função `bool()` converte qualquer valor para `True` ou `False`:

```python
x = "Diego"
print(bool(x))  # True

y = 0
print(bool(y))  # False

z = ""
print(bool(z))  # False
```
