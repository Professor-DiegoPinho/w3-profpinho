---
title: "Operadores de Comparação"
description: "Comparar valores e obter True ou False"
order: 15
---

# Operadores de comparação

Comparam valores e retornam `True` ou `False`:

| Operador | Significado    | Exemplo    |
| -------- | -------------- | ---------- |
| `==`     | Igual          | `5 == 5`   |
| `!=`     | Diferente      | `5 != 3`   |
| `>`      | Maior que      | `5 > 3`    |
| `<`      | Menor que      | `3 < 5`    |
| `>=`     | Maior ou igual | `5 >= 5`   |
| `<=`     | Menor ou igual | `3 <= 5`   |

# Exemplos

```python
print(5 == 5)       # True
print(5 != 3)       # True
print(5 > 3)        # True
print(3 < 5)        # True
print(5 >= 5)       # True
print(3 <= 5)       # True
```

# Com variáveis

```python
idade = 18
nota = 7

print(idade == 18)      # True
print(nota >= 7)        # True
print(idade < 21)       # True
```

# Comparações de strings

Compara pela ordem alfabética:

```python
print("Ana" < "Bruno")     # True (A vem antes de B)
print("Python" == "Python") # True
```

# Booleanos em comparações

`True` equivale a 1, `False` a 0:

```python
print(True > False)     # True
print(True == 1)        # True
print(False == 0)       # True
```

# Encadear comparações

```python
x = 5
print(1 < x < 10)       # True (5 é maior que 1 E menor que 10)
print(1 < x < 3)        # False (5 é maior que 1, mas não é menor que 3)
```

# Comparando tipos diferentes
Comparar tipos incompatíveis gera erro:

```python
  print(10 < "10")       # Erro: não é possível comparar int com str
```

# Dica: use `type()` para verificar o tipo de uma variável:

```python
  print(type(10))         # <class 'int'>
  print(type("10"))       # <class 'str'>
```