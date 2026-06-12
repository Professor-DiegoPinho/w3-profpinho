---
id: "623283f25caf"
title: "Operadores de Pertencimento"
description: "Verificar se um item está em uma coleção"
order: 27
---

# Operador in

Verifica se um valor **está** dentro de um objeto:

```python
frutas = ["maçã", "banana", "cereja"]

print("banana" in frutas)   # True
print("laranja" in frutas)  # False
```

# Com strings

```python
texto = "Python"
print("P" in texto)      # True
print("x" in texto)      # False
```

# Com dicionários

Verifica as **chaves**:

```python
pessoa = {"nome": "Diego", "idade": 30}

print("nome" in pessoa)   # True
print("Diego" in pessoa)  # False (valor, não chave)
```

# Operador not in

Verifica se um valor **não está** dentro:

```python
frutas = ["maçã", "banana"]

print("abacaxi" not in frutas)  # True
print("maçã" not in frutas)     # False
```

# Em condicionais

```python
frutas = ["maçã", "banana"]

if "banana" in frutas:
    print("Tem banana!")

if "laranja" not in frutas:
    print("Não tem laranja")
```