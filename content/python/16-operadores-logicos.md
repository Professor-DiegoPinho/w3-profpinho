---
id: "93135d268824"
title: "Operadores Lógicos"
description: "Combinar múltiplas condições com and, or, not"
order: 16
---

# Operadores lógicos

Combinam várias condições em uma expressão:

| Operador | Descrição                           | Exemplo           |
| -------- | ----------------------------------- | ----------------- |
| `and`    | True se **todas** forem verdadeiras | `x > 0 and x < 10`|
| `or`     | True se **uma** for verdadeira      | `x < 5 or x > 10` |
| `not`    | Inverte o resultado                 | `not(x > 3)`      |

# and (E lógico)

Retorna `True` quando **todas** as condições são verdadeiras:

```python
x = 5
y = 8

print(x > 0 and y > 0)     # True (ambas verdadeiras)
print(x > 0 and y > 10)    # False (uma é falsa)
```

Exemplo da vida real:

```python
email_correto = True
senha_correta = True
print(email_correto and senha_correta)  # True (acesso permitido)
```

# or (OU lógico)

Retorna `True` quando **pelo menos uma** condição é verdadeira:

```python
x = 4
print(x < 5 or x > 10)      # True (primeira é verdadeira)

x = 6
print(x < 5 or x > 10)      # False (nenhuma é verdadeira)
```

Exemplo da vida real:

```python
estudante = False
tem_cupom = True
print(estudante or tem_cupom)  # True (uma condição ok para desconto)
```

# not (Negação)

Inverte `True` para `False` e vice-versa:

```python
x = 5
print(not(x > 3))           # False (x > 3 é True, not inverte)
print(not(x > 10))          # True (x > 10 é False, not inverte)
```

Exemplo da vida real:

```python
esta_claro = False
print(not esta_claro)       # True (acenda a luz!)
```

# Combinando operadores

```python
x = 7
print((x > 0 and x < 10) or x == 100)   # True
print(not(x > 10 and x < 20))            # True
```