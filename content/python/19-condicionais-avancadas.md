---
id: "d5b22d1bb4ef"
title: "Condicionais Avançadas"
description: "if aninhado, if em uma linha, expressão condicional"
order: 19
---

# Condicionais aninhadas

Um `if` dentro de outro para verificar múltiplas condições:

```python
idade = 25
tem_carteira = True

if idade >= 18:
    if tem_carteira:
        print("Pode dirigir")
    else:
        print("Precisa tirar carteira")
else:
    print("Muito jovem para dirigir")
```

# if em uma linha

```python
idade = 18
if idade >= 18: print("Pode entrar") # Saída: Pode entrar
```

Use com cuidado - prefira múltiplas linhas para legibilidade.

# Expressão condicional (ternário)

Escolher um valor baseado em condição:

```python
valor_se_verdadeiro if condicao else valor_se_falso
```

Exemplo:

```python
idade = 20
status = "adulto" if idade >= 18 else "menor"
print(status)       # adulto
```

# Atribuição condicional

```python
a = 10
b = 20
maior = a if a > b else b
print(maior)        # 20
```