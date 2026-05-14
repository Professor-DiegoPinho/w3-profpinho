---
title: "Listas"
description: "Criar e usar listas em Python"
order: 22
---

# O que é uma lista

Uma coleção ordenada, mutável de valores:

```python
frutas = ["maçã", "banana", "uva"]
print(frutas)  # ['maçã', 'banana', 'uva']
```

# Listas vazias

```python
lista_vazia = []
print(lista_vazia)  # []
```

# Acessar elementos

Use o **índice** (começa em 0):

```python
cores = ["azul", "verde", "roxo"]

print(cores[0])    # azul
print(cores[1])    # verde
print(cores[2])    # roxo
```

# Índices negativos

Contar de trás para frente:

```python
cores = ["azul", "verde", "roxo"]

print(cores[-1])   # roxo (último)
print(cores[-2])   # verde (penúltimo)
print(cores[-3])   # azul (antepenúltimo)
```

# Tipos mistos

Listas podem conter qualquer tipo:

```python
mistura = ["texto", 42, 3.14, True, None]
print(mistura)
```

# Comprimento

```python
frutas = ["maçã", "banana", "uva"]
print(len(frutas))  # 3
```

# Verificar se item existe

```python
frutas = ["maçã", "banana"]
print("maçã" in frutas)     # True
print("laranja" in frutas)  # False
```