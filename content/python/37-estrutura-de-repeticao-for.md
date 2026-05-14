---
title: "Estrutura de Repetição For"
description: "Usar for para percorrer sequências"
order: 37
---

# Sintaxe

```python
for item in iteravel:
    # código a executar
```

# Com range

```python
for numero in range(1, 4):
    print(numero)

# 1
# 2
# 3
```

# Com strings

Percorrer caractere por caractere:

```python
palavra = "Python"

for letra in palavra:
    print(letra)

# P
# y
# t
# h
# o
# n
```

# Com listas

```python
nomes = ["Ana", "Bruno", "Carlos"]

for nome in nomes:
    print(nome)
```

# Com dicionários

```python
pessoa = {"nome": "Diego", "idade": 30}

for chave in pessoa:
    print(chave, pessoa[chave])

# nome Diego
# idade 30
```

# Com tuplas

```python
cores = ("azul", "verde", "roxo")

for cor in cores:
    print(cor)
```

# Indentação

Tudo indentado é repetido:

```python
for numero in range(2):
    print(numero)
    print("Ok")

print("Fim")

# 0
# Ok
# 1
# Ok
# Fim
```