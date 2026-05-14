---
title: "Tipos de Dados"
description: "Os principais tipos de dados primitivos"
order: 5
---

# Números

## Int (inteiro)

```python
idade = 25
print(type(idade))  # <class 'int'>
```

## Float (decimal)

```python
altura = 1.75
print(type(altura))  # <class 'float'>
```

## Complex (complexo)

```python
numero = 2 + 3j
print(type(numero))  # <class 'complex'>
```

# Strings

Textos entre aspas:

```python
nome = "João"
print(type(nome))  # <class 'str'>
```

# Booleanos

Verdadeiro ou falso:

```python
ativo = True
presente = False
print(type(ativo))  # <class 'bool'>
```

# Coleções

```python
# Lista
frutas = ["maçã", "banana"]

# Dicionário
pessoa = {"nome": "Ana", "idade": 30}

# Tupla
coordenadas = (10.0, 20.0)

# Conjunto
unicos = {1, 2, 3}
```

# Verificar tipo

Use `type()`:

```python
print(type(25))        # <class 'int'>
print(type("texto"))   # <class 'str'>
print(type(True))      # <class 'bool'>
print(type([1, 2]))    # <class 'list'>
```

# Conversão de tipos (casting)

## Para int

```python
num = int("42")
print(num)  # 42

num2 = int(3.14)
print(num2)  # 3
```

## Para float

```python
num = float(25)
print(num)  # 25.0

num2 = float("3.14")
print(num2)  # 3.14
```

## Para string

```python
texto = str(42)
print(texto)  # "42"

texto2 = str(True)
print(texto2)  # "True"
```

## Para booleano

```python
resultado = bool(1)
print(resultado)  # True

resultado2 = bool(0)
print(resultado2)  # False
```
