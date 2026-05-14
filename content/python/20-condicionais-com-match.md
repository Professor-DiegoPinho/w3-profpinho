---
title: "Condicionais com Match"
description: "Usar match para organizar múltiplas condições"
order: 20
---

# O que é match

Introduzido no Python 3.10, permite organizar vários casos de forma limpa:

```python
dia = 4

match dia:
    case 1:
        print("Segunda")
    case 2:
        print("Terça")
    case 3:
        print("Quarta")
    case 4:
        print("Quinta")
    case 5:
        print("Sexta")
    case _:
        print("Outro dia")

# Quinta
```

# Como funciona

1. Avalia a expressão após `match` uma vez
2. Compara com cada `case` de cima para baixo
3. Executa o primeiro `case` compatível
4. Para a busca

# Caso padrão com _

Use `_` para qualquer outro valor:

```python
opcao = 5

match opcao:
    case 1:
        print("Saque")
    case 2:
        print("Depósito")
    case _:
        print("Inválido! Tente novamente.")

# Inválido! Tente novamente.
```

# Múltiplos valores com |

Agrupar valores que levam ao mesmo resultado:

```python
dia = 5

match dia:
    case 1 | 2 | 3 | 4 | 5:
        print("Dia útil")
    case 6 | 7:
        print("Fim de semana")

# Dia útil
```

# Com strings

```python
cor = "azul"

match cor:
    case "vermelho" | "roxo":
        print("Cor quente")
    case "azul" | "verde":
        print("Cor fria")
    case _:
        print("Outra cor")

# Cor fria
```