---
title: "Operadores lógicos com truthy e falsy"
description: "Como os operadores lógicos em Python interagem com valores truthy e falsy"
order: 17
---

## Valores _truthy_ e _falsy_

No artigo anterior, aprendemos sobre os operadores lógicos. Mas você se lembra que no artigo sobre Booleanos, vimos que alguns valores são considerados como verdadeiros ou falsos para o Python, mesmo sem serem do tipo `bool`?

Agora vamos retomar essa ideia com mais clareza:

### O que é valor _truthy_?

Os valores que vimos que são considerados como `True` são chamados de _truthy_. Lembre-se de alguns deles:

- Números diferentes de zero: 1, 2.5, -3
- Strings não vazias: "Python", "0"
- Coleções com pelo menos um elemento: [1], { "a": 1 }

### O que é _falsy_?

Já os valores que são considerados como `False` são chamados de _falsy_. Reveja quais são:

- O número zero: 0
- String vazia: ""
- Coleções vazias ([], {}, ())

#### None

Existe um valor especial que ainda não vimos, o `None`. Ele representa a falta de um valor e é do tipo `NoneType`. Da mesma forma que podemos criar variáveis com _strings_ vazias, também podemos criar variáveis sem valor nenhum atribuído com o `None`:

```python
x = None

print(x)
print(type(x))

# Saída:
# None
# <class 'NoneType'>
```

Não precisa se preocupar com ele agora, basta saber que ele também é considerado como _falsy_.

```python
x = None

print(bool(x))

# Saída:
# False
```

## Operadores lógicos com _truthy_ e _falsy_

Agora que você já sabe que vários valores podem se comportar como `True` ou `False`, é importante entender como os operadores lógicos lidam com eles. O Python não converte automaticamente tudo para booleano. Na verdade, ele usa os valores _truthy_ e _falsy_ diretamente.

### `and` com valores _truthy_ e _falsy_

O operador and retorna o primeiro valor _falsy_ encontrado. Se todos forem _truthy_, retorna o último valor.

```python
print(0 and 5)       # 0 é falsy
print(3 and 7)       # ambos são truthy

# Saída:
# 0
# 7

```

Uma aplicação do `and` com valores _truthy_ e _falsy_ é quando queremos garantir que um arquivo existe E possui conteúdo antes de usá‑lo. Imagine que você está recebendo o nome de um arquivo e também o conteúdo dele. Só faz sentido processar o arquivo se ambos existirem:

```python
nome_arquivo = "relatorio.txt"   # truthy
conteudo_arquivo = "Dados do relatório"   # truthy

resultado = nome_arquivo and conteudo_arquivo
print(resultado)

# Saída:
# Dados do relatório
```

Se qualquer dos valores for _falsy_ (nome vazio e/ou conteúdo vazio), o `and` devolve esse valor, indicando que falta algo. Se ambos forem _truthy_, o `and` devolve o último valor: o conteúdo.

### `or` com valores _truthy_ e _falsy_

O operador or retorna o primeiro valor _truthy_ encontrado. Se todos forem _falsy_, retorna o último.

```python
print("" or "Python")   # string vazia é falsy
print(0 or 5)            # 0 é falsy, 5 é truthy

# Saída:
# Python
# 5
```

Esses comportamentos tornam expressões como esta muito naturais em Python:

```python
nome = input("Digite seu nome: ") or "Visitante"
print(nome)
```

Aqui, se o usuário não digitar nada, `input` retorna uma string vazia (_falsy_). O operador `or` então devolve "Visitante". Se o usuário digitar algo, esse valor (_truthy_) é retornado.

### `not` com valores _truthy_ e _falsy_

Já o `not` continua invertendo o valor booleano do que vem depois dele. Se um valor é _truthy_, ele vira `False`. Se ele é _falsy_, vira `True`:

```python
texto = ""
print(not texto)  # string vazia é falsy

# Saída:
# True
```
