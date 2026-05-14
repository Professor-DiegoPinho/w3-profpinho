---
title: "Coleções"
description: "O que são coleções e por que usar"
order: 21
---

# Por que coleções?

Sem coleções, guardar múltiplos valores é tedioso:

```python
nota1 = 8.5
nota2 = 6.0
nota3 = 9.0
nota4 = 7.5
```

Com coleções, fica simples:

```python
notas = [8.5, 6.0, 9.0, 7.5]
```

# Tipos de coleções

| Tipo    | Mutável | Ordenada | Repetidas  | Acesso |
| ------- | ------- | -------- | ---------- | ------ |
| Lista   | Sim     | Sim      | Sim        | Índice |
| Tupla   | Não     | Sim      | Sim        | Índice |
| Conjunto| Sim     | Não      | Não        | -      |
| Dict    | Sim     | Sim      | Não (chave)| Chave  |

# Lista

Mutável, ordenada, permite repetição:

```python
frutas = ["maçã", "banana", "uva"]
```

# Tupla

Imutável, ordenada, permite repetição:

```python
cores = ("azul", "verde", "roxo")
```

# Conjunto

Mutável, sem ordem, sem repetição:

```python
numeros = {1, 2, 3, 2}  # {1, 2, 3}
```

# Dicionário

Chave-valor:

```python
pessoa = {"nome": "Diego", "idade": 30}
```

# Por que usar coleções?

- Organizam dados relacionados
- Permitem operações eficientes
- Facilitam o acesso e manipulação
- São fundamentais para estruturas de dados mais complexas