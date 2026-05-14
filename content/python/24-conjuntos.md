---
title: "Conjuntos"
description: "Criar, manipular e operar com conjuntos"
order: 24
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

# Comprimento

```python
frutas = {"maçã", "banana", "laranja"}
print(len(frutas))  # 3
```

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

print(frutas)  # {'maçã', 'banana', 'laranja', 'limão'}
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

Remove um item **aleatório**:

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
