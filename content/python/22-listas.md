---
id: "001ff9254152"
title: "Listas"
description: "Criar, acessar e manipular listas"
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
