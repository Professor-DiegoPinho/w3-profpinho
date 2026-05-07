---
title: "Manipulando conjuntos"
description: "Como manipular um conjunto em Python"
order: 28
---

Nesta lição, vamos aprender como realizar algumas ações, como adicionar e remover itens dos nossos conjuntos. Também vamos conhecer uma outra versão deles, o `frozenset`.

## Alterando valores

Como conjuntos não têm índices e não mantêm ordem, **não é possível alterar diretamente um valor específico** dentro deles através de operações como fazíamos com listas e tuplas:

```python
lista = ["item1", "item2"]
conjunto = {"item1", "item 2"}

print(lista[0])
print(conjunto[0])

# Saída:
# item1
# Traceback (most recent call last):
#   File "<stdin>", line 1, in <module>
#     print(conjunto[0])
#           ~~~~~~~~^^^
# TypeError: 'set' object is not subscriptable
```

Sempre que falamos em "alterar" um conjunto, estamos na verdade falando sobre **adicionar um novo item** ou **remover um item existente** e não sobre mudar um de seus elementos.

## Adicionando itens

Conjuntos são mutáveis, então é possível acrescentar novos valores depois que eles são criados.

### `add()`

Adiciona **um único valor** ao conjunto.

```python
frutas = {"maçã", "banana"}

frutas.add("laranja")
print(frutas)

# Saída possível:
# {'banana', 'laranja', 'maçã'}
```

Se o valor já existir no conjunto, nada muda, já que os conjuntos não aceitam duplicados.

### `update()`

Adiciona **vários valores de uma vez** ao conjunto. Ele pode receber uma coleção, como o outro conjunto ou uma lista, por exemplo.

```python
frutas = {"maçã", "banana"}

citricas = {"laranja", "limão"}
frutas.update(citricas)

print(frutas)

vermelhas = ["morango", "cereja"]
frutas.update(vermelhas)

print(frutas)

# Saída possível:
# {'banana', 'maçã', 'limão', 'laranja'}
# {'banana', 'maçã', 'limão', 'laranja', 'morango', 'cereja'}
```

## Removendo itens

Cada método de remoção tem um comportamento diferente, principalmente quando o item que queremos remover não existe.

### `remove()`

Remove o item se ele existir. Senão, **um erro é gerado**.

```python
frutas = {"maçã", "banana", "laranja"}
frutas.remove("banana")

print(frutas)

frutas.remove("melão")  # "melão" não existe em frutas, gera erro

# Saída possível:
# {'laranja', 'maçã'}
# Traceback (most recent call last):
#   File "<stdin>", line 1, in <module>
#     frutas.remove("melão")
#     ~~~~~~~~~~~~~^^^^^^^^^
# KeyError: 'melão'
```

### `discard()`

Remove o item **se existir** e o **ignora** se ele não existir:

```python
frutas = {"maçã", "banana", "laranja"}

frutas.discard("uva")      # não gera erro
frutas.discard("banana")

print(frutas)

# Saída possível:
# {'maçã', 'laranja'}
```

### `pop()`

Remove **um item aleatório** e o retorna.

```python
frutas = {"maçã", "banana", "laranja"}
removida = frutas.pop()

print(removida)
print(frutas)

# Saída possível:
# banana
# {'maçã', 'laranja'}
```

Como conjuntos não têm ordem, não há como saber qual item será removido. Mas caso não haja elementos no conjunto, um erro é gerado:

```python
frutas = {}
frutas.pop()

# Saída:
# Traceback (most recent call last):
#   File "<stdin>", line 1, in <module>
#     frutas.pop()
#     ~~~~~~~~~~^^
# TypeError: pop expected at least 1 argument, got 0
```

## Limpando o conjunto

### `clear()`

Remove **todos os itens**, mas a variável continua existindo.

```python
frutas = {"maçã", "banana", "laranja"}

frutas.clear()
print(frutas)

# Saída:
# set()        # ou seja, o conjunto está vazio
```

### `del`

Apaga **a variável e seus elementos**, removendo o conjunto por inteiro da memória. Após usar o `del`, `frutas` deixa de existir completamente:

```python
frutas = {"maçã", "banana"}
del frutas

print(frutas)

# Saída:
# Traceback (most recent call last):
#   File "<stdin>", line 1, in <module>
#     print(frutas)
#           ^^^^^^
# NameError: name 'frutas' is not defined
```

## Extraindo informações do conjunto

### `len()`

Retorna a quantidade de itens do conjunto.

```python
frutas = {"maçã", "banana", "laranja"}
print(len(frutas))

# Saída:
# 3
```

## Copiando conjuntos

### `copy()`

Cria uma **cópia** de um conjunto. Modificações no conjunto copiado não afetam o conjunto original.

```python
original = {1, 2, 3}

copia = original.copy()
print(copia)

# Saída possível:
# {1, 2, 3}
```

## Frozenset

O `frozenset` é a **versão imutável** de um conjunto. Ele funciona quase igual ao `set`, mas com uma diferença essencial: depois de criado, você não pode mais mudá-lo.

Isso significa que você não pode adicionar, remover ou alterar valores dentro dele. É como se fosse um conjunto "congelado", como seu nome diz.

Mesmo sendo imutável, ele mantém todas as características de um conjunto comum:

- não tem ordem;
- não aceita valores repetidos;
- permite realizar operações com seus elementos, exceto as que os alteram.

Observe:

```python
frutas = frozenset({"maçã", "banana", "laranja"})

print(frutas)
print(type(frutas))
print(len(frutas))

# Saída possível:
# frozenset({'banana', 'laranja', 'maçã'})
# <class 'frozenset'>
# 3
```

Como o `frozenset` não muda, ele se torna útil em situações onde você precisa garantir que aquele conjunto não será modificado ao longo do programa.

> Atenção: Sempre que você fizer uma operação entre um `frozenset` e outro conjunto, o resultado será um novo `frozenset`, preservando a característica da imutabilidade e protegendo os seus elementos.

## Conjuntos `frozenset` vs. Conjuntos `set` vs. Tuplas vs. Listas

Antes de avançar, vale recapitular as diferenças entre tuplas e listas, e resumir como os dois tipos de conjuntos diferem delas:

| Característica         | **Listas**                         | **Tuplas**                           | **Conjuntos (`set`)**          | **Conjuntos (`frozenset`)**     |
| ---------------------- | ---------------------------------- | ------------------------------------ | ------------------------------ | ------------------------------- |
| **Mutabilidade**       | Mutáveis.                          | Imutáveis.                           | Mutáveis.                      | Imutáveis.                      |
| **Ordem**              | Mantêm a ordem dos itens.          | Mantêm a ordem dos itens.            | Não têm ordem fixa.            | Não têm ordem fixa.             |
| **Valores duplicados** | Permitidos.                        | Permitidos.                          | Não permitidos.                | Não permitidos.                 |
| **Sintaxe de criação** | Colchetes `[]` ou função `list()`. | Parênteses `()` ou função `tuple()`. | Chaves `{}` ou função `set()`. | Criado apenas com`frozenset()`. |
| **Acesso por índice**  | Sim (`lista[0]`).                  | Sim (`tupla[0]`).                    | Não possuem índices.           | Não possuem índices.            |

---

Na próxima lição, vamos aprender a comparar conjuntos usando operações da matemática, como união e interseção. Elas são ferramentas essenciais para analisar coleções de dados.
