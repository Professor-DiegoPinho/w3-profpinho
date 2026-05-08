---
title: "Operadores de atribuição"
description: "Os operadores de atribuição em Python"
order: 14
---

# O que são os operadores de atribuição

Os **operadores de atribuição** são usados para armazenar valores em variáveis, ou seja, para **atribuir** algo a elas. Eles aparecem em praticamente todo código Python, desde um simples `x = 5` até expressões mais complexas.

## O operador básico `=`

O operador de atribuição mais simples é o `=`, que já vimos em todos os exemplos em que armazenamos um valor em uma variável. Aqui, `x` recebe o número `5`, e `y` recebe a string `"Python"`:

```python
x = 5
y = "Python"

print(x)
print(y)

# Saída:
# 5
# Python
```

## Operadores de atribuição compostos

O Python também oferece versões "encurtadas" dos operadores aritméticos. Eles realizam uma operação e **reutilizam o próprio resultado** na mesma variável, deixando o código mais curto e legível.

Em vez de escrever:

```python
x = x + 3
```

podemos simplificar para:

```python
x += 3
```

Vamos ver todos os operadores compostos e o que cada um faz.

| Operador | Exemplo   | Equivalente a | Descrição                                 |
| -------- | --------- | ------------- | ----------------------------------------- |
| `+=`     | `x += 3`  | `x = x + 3`   | Soma e atribui o resultado                |
| `-=`     | `x -= 3`  | `x = x - 3`   | Subtrai e atribui o resultado             |
| `*=`     | `x *= 3`  | `x = x * 3`   | Multiplica e atribui o resultado          |
| `/=`     | `x /= 3`  | `x = x / 3`   | Divide e atribui o resultado              |
| `%=`     | `x %= 3`  | `x = x % 3`   | Atribui o resto da divisão                |
| `//=`    | `x //= 3` | `x = x // 3`  | Faz divisão inteira e atribui o resultado |
| `**=`    | `x **= 3` | `x = x ** 3`  | Eleva à potência e atribui o resultado    |

### Adição (`+=`) e subtração (`-=`)

Esses são os mais usados no dia a dia. Eles consideram o valor que já existem dentro da variável e somam ou subtraem o valor que aparece após o operador:

```python
x = 10
x += 5     # x = 10 + 5
print(x)   # Saída: 15

x -= 3     # x = 15 - 3
print(x)   # Saída: 12
```

Repare que o valor de `x` muda a cada operação. O próprio Python atualiza o valor com base na conta feita.

### Multiplicação (`*=`) e divisão (`/=`)

Assim como a adição e a subtração, esses operadores fazem o cálculo e armazenam o novo valor na própria variável. São úteis quando queremos atualizar o valor com base em uma multiplicação ou divisão sem precisar repetir o nome da variável.

```python
x = 4
x *= 2    # x = 4 * 2
print(x)  # Saída: 8

x /= 4    # x = 8 / 4
print(x)  # Saída: 2.0
```

> Importante: Apesar do valor de `x` ser inteiro no começo, após a divisão, ele se torna um número do tipo `float`, porque o resultado de uma divisão comum em Python é sempre decimal.

### Divisão inteira (`//=`) e módulo (`%=`)

Esses dois operadores lidam com divisões de forma mais específica. O operador `//=` atribui apenas a parte inteira da divisão à variável, enquanto `%=` atribui o **resto** dela.

```python
x = 17
x //= 5   # x = 17 // 5
print(x)  # Saída: 3

x %= 2    # x = 3 % 2
print(x)  # Saída: 1
```

### Exponenciação (`**=`)

Da mesma forma, o operador `**=` calcula o valor inicial de `x` elevado ao número que aparece depois dele. O resultado da exponenciação é atribuído ao próprio `x`:

```python
x = 2
x **= 3     # x = 2 ** 3
print(x)    # Saída: 8
```

## Operadores bit a bit

Além dos operadores numéricos, também é possível combinar operadores de atribuição com operações **bit a bit**, que trabalham com os valores binários. Esses operadores aparecem com menos frequência no dia a dia, então não vamos nos aprofundar neles por enquanto.

## O operador walrus (`:=`)

A partir do **Python 3.8**, surgiu um novo operador de atribuição chamado **operador walrus** (`:=`), que permite **atribuir e usar um valor ao mesmo tempo** dentro de uma expressão.

Veja os exemplos sem e com o operador `:=`:

```python
# sem o operador

frase = "Python é divertido!"
print(frase)

# Saída:
# Python é divertido!


# com o operador

print(frase := "Python é divertido!")

# Saída:
# Python é divertido!
```

```python
# sem o operador

y = 10
x = y + 5

print(x, y)

# Saída:
# 15 10


# com o operador

x = (y := 10) + 5
print(x, y)

# Saída:
# 15 10
```

Perceba que `frase` e `y` são criadas e usadas na mesma linha quando usamos o operador. Nesse caso, pode não parecer tão diferente, mas conforme você for fazendo operações mais complexas, você vai perceber como ele deixa o código bem mais conciso.

Curiosidade: O nome walrus" (morsa, em inglês) vem do formato do símbolo `:=`, que lembra os **dentes de uma morsa**. 🦭
