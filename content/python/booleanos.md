---
title: "Booleanos"
description: "O tipo Booleano em Python"
order: 11
---

# O que são os booleanos

O tipo booleano (`bool`) representa apenas dois valores possíveis: **verdadeiro** ou **falso**. Em Python, eles são escritos como `True` e `False` (com a primeira letra maiúscula):

```python
is_estudante = True
is_empregado = False
```

Esses valores podem parecer simples, mas são fundamentais para o funcionamento de praticamente todos os programas. Eles são muito usados para tomar decisões e controlar fluxos.

A partir deles, podemos decidir o que fazer se algo é verdadeiro e o que fazer se algo é falso. Mas, por enquanto, vamos apenas entender o que faz um valor ser considerado **verdadeiro** ou **falso** em Python.

## `True` ou `False`

Podemos **atribuir diretamente** os valores `True` e `False` às variáveis, como vimos acima. Mas é importante saber que **muitos outros valores já têm um comportamento lógico pré-definido** pela linguagem.

```python
print(bool("Hello"))
print(bool(0))

# Saída:
# True
# False
```

### A função `bool()`

Para podermos consultar qualquer valor ou variável, existe a função `bool()`. Ela testa o que passamos entre seus parênteses e verifica se o conteúdo é interpretado como verdadeiro (`True`) ou falso (`False`).

Porém, na prática, quase todos os valores em Python são considerados verdadeiros. Números diferentes de zero, strings com algum conteúdo e coleções preenchidas (listas, dicionários, tuplas e conjuntos), que veremos no detalhe mais adiante, são interpretados como `True`:

```python
print(bool("abc"))
print(bool(123))
print(bool(["maçã", "banana", "cereja"]))

# Saída:
# True
# True
# True
```

Existem poucos valores que são considerados falsos em Python. Os principais são:

```python
bool(False)     # o próprio False
bool(None)      # o tipo de dado None
bool(0)         # o número zero
bool("")        # string vazia
bool([])        # lista vazia
bool({})        # dicionário vazio
bool(())        # tupla vazia
bool(set())     # conjunto vazio
```

Todos os valores acima retornam `False` ao serem avaliados com a função `bool()`.
