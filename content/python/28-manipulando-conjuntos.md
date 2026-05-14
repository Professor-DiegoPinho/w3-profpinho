---
title: "Manipulando Conjuntos"
description: "Adicionar, remover e operar com conjuntos"
order: 28
---

# Adicionar um item

## add()

```python
frutas = {"maçã", "banana"}
frutas.add("laranja")

print(frutas)  # {'maçã', 'banana', 'laranja'}
```

Se item já existe, nada acontece (sem duplicatas).

## update()

Adicionar vários itens:

```python
frutas = {"maçã", "banana"}
frutas.update(["laranja", "limão"])

print(frutas) # {'maçã', 'banana', 'laranja', 'limão'}
```

# Remover itens

## remove()

Remove o item. **Gera erro se não existir**:

```python
frutas = {"maçã", "banana"}
frutas.remove("banana")

print(frutas)  # {'maçã'}

# frutas.remove("melão")  # ❌ KeyError
```

## discard()

Remove se existir. **Ignora se não existir**:

```python
frutas = {"maçã", "banana"}
frutas.discard("banana")
frutas.discard("melão")  # Sem erro

print(frutas)  # {'maçã'}
```

## pop()

Remove um item **aleatório**. Não tem como escolher qual item será removido, pois conjuntos não têm ordem:

```python
frutas = {"maçã", "banana", "laranja"}
removido = frutas.pop()

print(removido)  # Um dos itens
print(frutas)    # Dois itens restantes
```

## clear()

Remove tudo:

```python
frutas = {"maçã", "banana"}
frutas.clear()

print(frutas)  # set()
```

# Operações matemáticas

```python
a = {1, 2, 3}
b = {3, 4, 5}

print(a | b)      # União: {1, 2, 3, 4, 5}
print(a & b)      # Interseção: {3}
print(a - b)      # Diferença: {1, 2}
print(a ^ b)      # Diferença simétrica: {1, 2, 4, 5}
```