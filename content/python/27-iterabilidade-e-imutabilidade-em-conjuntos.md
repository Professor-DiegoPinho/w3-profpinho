---
title: "Iterabilidade e Imutabilidade em Conjuntos"
description: "Criar conjuntos com o construtor set()"
order: 27
---

# Criar com set()

Passar uma coleção para transformar em conjunto:

```python
frutas = ["banana", "laranja", "maçã"]
conjunto = set(frutas)

print(conjunto)  # {'banana', 'laranja', 'maçã'}
```

# Remover duplicatas

```python
notas = [8, 8, 9, 7, 9, 10]
unicas = set(notas)

print(unicas)  # {7, 8, 9, 10}
```

# O que passar para set()

Precisa ser **iterável**:

```python
lista = [1, 2, 3]
tupla = (1, 2, 3)
string = "abc"

print(set(lista))    # {1, 2, 3}
print(set(tupla))    # {1, 2, 3}
print(set(string))   # {'a', 'b', 'c'}
```

# O que guardar em conjunto

Precisa ser **imutável**:

```python
# ✅ Válido
s = {"texto", 42, True, (1, 2, 3)}

# ❌ Inválido
s = {[1, 2], {"x": 1}}  # Listas e dicts não são imutáveis
```

# Tipo de dado

```python
conjunto = {1, 2, 3}
print(type(conjunto))  # <class 'set'>
```