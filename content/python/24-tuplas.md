---
title: "Tuplas"
description: "Criar e usar tuplas imutáveis"
order: 24
---

# O que é uma tupla

Coleção ordenada e **imutável**:

```python
cores = ("azul", "verde", "roxo")
print(cores)  # ('azul', 'verde', 'roxo')
```

# Tuplas vs Listas

| Aspecto | Tupla | Lista |
|--------|-------|-------|
| Sintaxe | () | [] |
| Mutável | Não | Sim |
| Performance | Mais rápida | Mais lenta |

# Acessar elementos

Igual às listas:

```python
cores = ("azul", "verde", "roxo")
print(cores[0])   # azul
print(cores[-1])  # roxo
```

# Tupla com um item

**Precisa de vírgula**:

```python
uma = ("Python",)
print(type(uma))  # <class 'tuple'>

sem_virgula = ("Python")
print(type(sem_virgula))  # <class 'str'>
```

# Tipos mistos

```python
tupla = ("texto", 42, True, 3.14)
print(tupla) # ('texto', 42, True, 3.14)
```

# Tupla vazia

```python
vazia = ()
print(vazia)  # ()
```

# Não é mutável

```python
cores = ("azul", "verde")
cores[0] = "roxo"  # ❌ Erro: 'tuple' object does not support item assignment
```