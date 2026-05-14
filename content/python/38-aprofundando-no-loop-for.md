---
title: "Aprofundando no Loop For"
description: "Técnicas avançadas com for: condicionais, break, continue"
order: 38
---

# For com if

Tomar decisões em cada repetição:

```python
numeros = [1, 2, 3, 4]

for numero in numeros:
    if numero % 2 == 0:
        print(numero, "é par")
    else:
        print(numero, "é ímpar")

# 1 é ímpar
# 2 é par
# 3 é ímpar
# 4 é par
```

# Filtrar valores

```python
frutas = ["banana", "amora", "laranja", "maçã"]

for fruta in frutas:
    if fruta.startswith("a"):
        print(fruta)

# amora
```

# break - interromper loop

Para o loop imediatamente:

```python
frutas = ["banana", "laranja", "maçã"]

for fruta in frutas:
    if fruta == "laranja":
        break
    print(fruta)

# banana
```

# continue - pular iteração

Pula apenas a iteração atual:

```python
frutas = ["banana", "laranja", "maçã"]

for fruta in frutas:
    if fruta == "laranja":
        continue
    print(fruta)

# banana
# maçã
```

# pass - não fazer nada

```python
for numero in range(3):
    pass  # Implementar depois
```

# else com for

Executa quando loop termina **normalmente** (sem break):

```python
for numero in range(3):
    print(numero)
else:
    print("Fim!")

# 0
# 1
# 2
# Fim!
```

Com break, não executa else:

```python
for numero in range(3):
    if numero == 1:
        break
    print(numero)
else:
    print("Fim!")

# 0
# (else não executa)
```