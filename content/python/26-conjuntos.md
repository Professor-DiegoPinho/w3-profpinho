---
title: "Conjuntos"
description: "Criar e usar conjuntos sem duplicatas"
order: 26
---

# O que é um conjunto

Coleção **não ordenada** e **sem duplicatas**:

```python
frutas = {"maçã", "banana", "laranja"}
print(frutas)  # Ordem pode variar
```

# Por que conjuntos

- Sem valores repetidos
- Comparar grupos rapidamente
- Operações matemáticas (união, interseção)

# Criar um conjunto

```python
frutas = {"maçã", "banana", "laranja"}
numeros = {1, 2, 3, 2}  # {1, 2, 3}

print(numeros)  # 2 aparece apenas 1 vez
```

# Tipos mistos

```python
mistura = {"texto", 42, True, 3.14}
print(mistura)
```

# Conjunto vazio

```python
vazio = set()  # Não use {} (cria dict)
print(type(vazio))  # <class 'set'>
```

# Verificar item

```python
frutas = {"maçã", "banana"}
print("maçã" in frutas)      # True
print("laranja" in frutas)   # False
```

# Não tem índices

```python
frutas = {"maçã", "banana"}
print(frutas[0])  # ❌ Erro: 'set' object is not subscriptable
```

# Lenght

```python
frutas = {"maçã", "banana", "laranja"}
print(len(frutas))  # 3
```