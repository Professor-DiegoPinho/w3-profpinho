---
title: "Operadores de Atribuição"
description: "Atribuição simples e composta em Python"
order: 14
---

# Atribuição básica

O operador `=` armazena um valor em uma variável:

```python
x = 5
nome = "Diego"
print(x, nome)  # 5 Diego
```

Este é o operador que mais usamos para criar e atualizar variáveis. Ele atribui o valor da direita à variável da esquerda.

# Operadores compostos

Realizam uma operação e atribuem o resultado à mesma variável:

| Operador | Exemplo  | Equivalente |
| -------- | -------- | ----------- |
| `+=`     | `x += 3` | `x = x + 3` |
| `-=`     | `x -= 3` | `x = x - 3` |
| `*=`     | `x *= 3` | `x = x * 3` |
| `/=`     | `x /= 3` | `x = x / 3` |
| `//=`    | `x //= 3`| `x = x // 3`|
| `%=`     | `x %= 3` | `x = x % 3` |
| `**=`    | `x **= 3`| `x = x ** 3`|

# Exemplos

```python
x = 10
x += 5      # x = 15
x -= 3      # x = 12
x *= 2      # x = 24
x /= 4      # x = 6.0
```

```python
y = 17
y //= 5     # y = 3 (parte inteira)
y %= 2      # y = 1 (resto)
```

# Atribuição de walrus (Python 3.8+)
Permite atribuir e usar o valor em uma expressão:

```python
  if (n := len("Python") > 5):
    print(f"String longa com {n} caracteres")
```
Isso atribui o comprimento da string à variável `n` e verifica se é maior que 5 ao mesmo tempo. Se for, imprime a mensagem.