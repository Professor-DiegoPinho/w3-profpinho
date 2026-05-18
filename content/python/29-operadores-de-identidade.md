---
title: "Operadores de Identidade"
description: "Verificar se variáveis apontam para o mesmo objeto"
order: 29
---

# Operador is

Verifica se apontam para o **mesmo objeto**:

```python
ana = {"nascimento": 2010}
maria = {"nascimento": 2010}

aninha = ana

print(aninha is ana)    # True (mesma referência)
print(maria is ana)     # False (objetos diferentes)
```

# Operador is not

Verifica se apontam para **objetos diferentes**:

```python
ana = {"nascimento": 2010}
maria = {"nascimento": 2010}

aninha = ana

print(aninha is not ana)    # False
print(maria is not ana)     # True
```

# Igualdade vs Identidade

| Operador | O que verifica | Exemplo |
|----------|---|---|
| == | Valores iguais? | `[1,2] == [1,2]` - True |
| is | Mesmo objeto? | `[1,2] is [1,2]` - False |

# Com listas

```python
lista1 = [1, 2, 3]
lista2 = lista1
lista3 = [1, 2, 3]

print(lista1 == lista2)  # True (conteúdo igual)
print(lista1 is lista2)  # True (mesma lista)

print(lista1 == lista3)  # True (conteúdo igual)
print(lista1 is lista3)  # False (listas diferentes)
```

# Modificações afetam referências

```python
lista1 = [1, 2, 3]
lista2 = lista1

lista1[0] = 999
print(lista2)  # [999, 2, 3] (ambas mudaram!)
```