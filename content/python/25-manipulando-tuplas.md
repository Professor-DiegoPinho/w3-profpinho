---
title: "Manipulando tuplas"
description: "Como manipular uma tupla em Python"
order: 25
---

## Criando tuplas com o construtor `tuple()`

Além dos parênteses, também podemos criar uma tupla usando o construtor `tuple()`:

```python
letras = tuple(["a", "b", "c"])
print(letras)

# Saída:
# ('a', 'b', 'c')
```

Esse formato costuma aparecer quando estamos convertendo dados, como no exemplo acima, em que convertemos do formato lista para tupla.

## Lidando com a imutabilidade

Vimos que as **tuplas são imutáveis**, então você _não pode mudar_, _adicionar_ ou _remover_ itens diretamente dela.

Mas, na prática, existem formas indiretas de lidar com essas situações, sempre partindo da mesma ideia: **converter a tupla em lista**, modificar a lista e então transformá-la novamente em tupla.

### Alterando valores

```python
tupla_de_frutas = ("maçã", "banana", "cereja")
lista_de_frutas = list(tupla_de_frutas)

lista_de_frutas[1] = "kiwi"
tupla_de_frutas = tuple(lista_de_frutas)

print(tupla_de_frutas)

# Saída:
# ('maçã', 'kiwi', 'cereja')
```

### Adicionando itens

#### Convertendo para lista

```python
tupla_de_frutas = ("maçã", "banana", "cereja")
lista_de_frutas = list(tupla_de_frutas)

lista_de_frutas.append("laranja")
tupla_de_frutas = tuple(lista_de_frutas)

print(tupla_de_frutas)

# Saída:
# ('maçã', 'banana', 'cereja', 'laranja')
```

#### Criando uma nova tupla e somando

```python
primeira_tupla = ("maçã", "banana", "cereja")
segunda_tupla = ("laranja",)

primeira_tupla += segunda_tupla
print(primeira_tupla)

# Saída:
# ('maçã', 'banana', 'cereja', 'laranja')
```

Lembre-se: tuplas de um único item precisam de vírgula no final para diferenciá-las de _strings_.

### Removendo itens

Não é possível remover itens diretamente, mas podemos usar o mesmo truque de conversão para lista:

```python
tupla_de_frutas = ("maçã", "banana", "cereja")
lista_de_frutas = list(tupla_de_frutas)

lista_de_frutas.remove("maçã")
tupla_de_frutas = tuple(lista_de_frutas)

print(tupla_de_frutas)

# Saída:
# ('banana', 'cereja')
```

## Limpando a tupla

```python
tupla = ("maçã", "banana", "cereja")
del tupla

print(tupla)  # erro: a tupla não existe mais

# Saída
# Traceback (most recent call last):
#   File "<python-input-16>", line 4, in <module>
#     print(tupla)  # erro: a tupla não existe mais
#           ^^^^^
# NameError: name 'tupla' is not defined. Did you mean: 'tuple'?
```

## Extraindo informações da tupla

### `len()`

Assim como nas listas, para saber quantos itens existem na tupla, usamos a função `len()`:

```python
numeros = (10, 20, 30)
print(len(numeros))

# Saída:
# 3
```

### `count()`

O método `count()` retorna quantas vezes um valor aparece na tupla.

```python
tupla = (1, 3, 7, 8, 7, 5, 4, 6, 8, 5)

vezes = tupla.count(5)
print(vezes)

# Saída:
# 2
```

### `index()`

O método `index()` retorna a **posição da primeira ocorrência** de um valor dentro da tupla.

```python
tupla = (1, 3, 7, 8, 7, 5, 4, 6, 8, 5)

posicao = tupla.index(8)
print(posicao)

# Saída:
# 3
```

Se o valor não existir na tupla, o Python gera um erro.

```python
tupla = (1, 3, 7, 8, 7, 5, 4, 6, 8, 5)

posicao = tupla.index(10)
print(posicao)

# Saída:
# Traceback (most recent call last):
#   File "<python-input-2>", line 3, in <module>
#     posicao = tupla.index(10)
#               ^^^^^^^^^^^^^
# ValueError: tuple.index(x): x not in tuple
```

## Copiando tuplas

Copiar uma tupla é muito fácil, porque tuplas nunca mudam. Pense assim:

- Uma lista é como uma caixa de brinquedos que você pode abrir e trocar os brinquedos lá dentro.
- Uma tupla é como uma caixa fechada com um visor: você olha o que tem dentro, mas nunca consegue mudar o conteúdo.

### Por que isso importa?

Quando estudamos listas, vimos que copiar uma lista podia dar problema se você fizesse da seguinte forma:

```python
nova_lista = lista_original
```

Caso isso seja feito, as duas variáveis ficam apontando para a mesma caixa de brinquedos. Ou seja: se a gente mudar um brinquedo em `lista_original`, o mesmo item seria alterado em nova_lista porque as duas são formas diferentes de chamar a mesma caixa. Isso é perigoso porque você pode mudar sem querer algo que não queria mudar.

Com tuplas, isso não acontece porque a caixa está fechada. Se você usa o igual, as duas variáveis também apontam para a mesma caixa:

```python
nova_tupla = tupla_original
```

Mas não existe problema nenhum nisso, porque:

- Ninguém consegue abrir a caixa colada.
- Ninguém consegue trocar o que tem dentro.
- Nada pode ser alterado, nem por acidente.

Então usar a mesma caixa é totalmente seguro.

### Por que é seguro?

Podemos imaginar variáveis como etiquetas coladas em caixas. No computador, essas caixas são lugares na memória. Com listas, essa caixa pode mudar por dentro (porque a lista é mutável). Com tuplas, ela nunca muda (porque a tupla é imutável).

Por isso, copiar listas exige cuidado. Mas copiar tuplas é tranquilo, já que você nunca vai alterar nada sem querer.

```python
primeira_tupla = ("a", "b", "c")
segunda_tupla = primeira_tupla

print(segunda_tupla)

# Saída:
# ('a', 'b', 'c')
```

Se quiser garantir que está criando uma nova tupla explicitamente, também pode usar a função `tuple()`:

```python
tupla_original = (10, 20, 30)
nova_tupla = tuple(tupla_original)

print(nova_tupla)

# Saída:
# (10, 20, 30)
```

Por serem imutáveis, essas duas formas são equivalentes na prática.

## Outras operações úteis

### Combinando tuplas

Tuplas também podem ser unidas usando o operador `+` e criando uma nova tupla com todos os itens.

```python
primeira_tupla = ("a", "b", "c")
segunda_tupla = (1, 2, 3)

tupla_final = primeira_tupla + segunda_tupla
print(tupla_final)

# Saída:
# ('a', 'b', 'c', 1, 2, 3)
```

### Repetindo tuplas

Quando você usa o operador `*`, o Python cria uma nova tupla, colocando o conteúdo repetido várias vezes:

```python
frutas = ("maçã", "banana", "cereja")

resultado = frutas * 2
print(resultado)

# Saída:
# ('maçã', 'banana', 'cereja', 'maçã', 'banana', 'cereja')
```

---

Agora que você já entende como as tuplas funciona, fica bem mais claro por que elas são tão úteis.

No próximo artigo, vamos conhecer outro tipo de coleção que também tem suas próprias regras e vantagens: os conjuntos.
