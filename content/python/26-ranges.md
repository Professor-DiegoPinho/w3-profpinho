---
id: "b37f287fdc3d"
title: "Ranges"
description: "Usar ranges para gerar sequências de números"
order: 26
---

# O que é um range

Uma **sequência imutável de inteiros**:

```python
intervalo = range(0, 5)
print(intervalo)  # range(0, 5)
print(list(intervalo))  # [0, 1, 2, 3, 4]
```

# Sintaxe

```python
range(início, fim, passo)
```

- **início**: onde começa (padrão: 0)
- **fim**: onde para (não incluído)
- **passo**: incremento (padrão: 1)

# Apenas o fim

```python
lista = list(range(5))
print(lista)  # [0, 1, 2, 3, 4]
```

# Início e fim

```python
lista = list(range(2, 7))
print(lista)  # [2, 3, 4, 5, 6]
```

# Com passo

```python
lista = list(range(0, 10, 2))
print(lista)  # [0, 2, 4, 6, 8]
```

# Contagem regressiva

```python
lista = list(range(10, 0, -2))
print(lista)  # [10, 8, 6, 4, 2]
```

# Usar em loop

```python
for i in range(3):
    print(i)  # 0, 1, 2
```

# Vantagens

- Economiza memória
- Rápido para intervalos grandes
- Imutável