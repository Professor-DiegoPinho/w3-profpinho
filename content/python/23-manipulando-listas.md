---
title: "Manipulando Listas"
description: "Adicionar, remover e modificar itens em listas"
order: 23
---

# Alterar valores

Use o índice:

```python
frutas = ["maçã", "banana", "uva"]
frutas[1] = "morango"
print(frutas)  # ['maçã', 'morango', 'uva']
```

# Adicionar itens

## append() - no final

```python
frutas = ["maçã", "banana"]
frutas.append("uva")
print(frutas)  # ['maçã', 'banana', 'uva']
```

## insert() - em posição específica

```python
frutas = ["maçã", "banana", "uva"]
frutas.insert(1, "laranja")
print(frutas)  # ['maçã', 'laranja', 'banana', 'uva']
```

## extend() - adicionar vários

```python
frutas = ["maçã", "banana"]
frutas.extend(["uva", "manga"])
print(frutas)  # ['maçã', 'banana', 'uva', 'manga']
```

# Remover itens

## remove() - por valor

```python
frutas = ["maçã", "banana", "uva"]
frutas.remove("banana")
print(frutas)  # ['maçã', 'uva']
```

## pop() - por índice

```python
frutas = ["maçã", "banana", "uva"]
frutas.pop(1)
print(frutas)  # ['maçã', 'uva']

# Sem índice, remove o último
frutas.pop()
```

## clear() - limpar tudo

```python
frutas = ["maçã", "banana"]
frutas.clear()
print(frutas)  # []
```