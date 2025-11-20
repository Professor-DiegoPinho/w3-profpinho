---
title: "Manipulando listas"
description: "Como manipular uma lista em Python"
order: 23
---

Depois de conhecer o que são listas e como elas funcionam, é hora de aprender a **mexer nos valores dentro delas**. Listas são mutáveis, e isso significa que você pode alterar, remover, adicionar ou reorganizar itens quando quiser.

Nesta lição, vamos explorar as operações mais comuns do dia a dia.

## Alterando valores

Para alterar valores, usamos os índices e o operador de atribuição (`=`). No exemplo abaixo, o valor que está no índice `1` ("banana") é substituído por "morango".

```python
frutas = ["maçã", "banana", "uva"]

frutas[1] = "morango"
print(frutas)

# Saída:
# ['maçã', 'morango', 'uva']
```

Também é possível alterar um **intervalo** dentro da nossa lista. Aqui, trocamos o valor nos índices 1 e 2 por "manga" e "melão":

```python
frutas = ["maçã", "banana", "uva", "kiwi"]

frutas[1:3] = ["manga", "melão"]
print(frutas)

# Saída:
# ['maçã', 'manga', 'melão', 'kiwi']
```

> Vale relembrar que o último número usado definir intervalos dentro das nossas listas não são incluídos no resultado. Então ele para antes da posição `3`.

## Adicionando itens

Listas crescem de forma dinâmica, então você pode inserir novos valores em diferentes posições. Aqui estão as formas mais comuns de adicionar itens em uma lista.

### `append()`

Adiciona um novo item ao **final da lista**, mantendo todos os itens já existentes na mesma ordem.

```python
frutas = ["maçã", "banana"]

frutas.append("uva")
print(frutas)

# Saída:
# ['maçã', 'banana', 'uva']
```

### `insert()`

Permite incluir um item em **uma posição exata** da lista usando seu índice. Os itens que já estavam nessa posição são empurrados para a direita.

```python
frutas = ["maçã", "banana", "uva"]

frutas.insert(1, "laranja")
print(frutas)

# Saída:
# ['maçã', 'laranja', 'banana', 'uva']
```

### `extend()`

Adiciona **todos os itens de outra lista** (ou coleção de outro tipo) ao final da lista original.

```python
frutas = ["maçã", "banana"]
outros = ["uva", "manga"]

frutas.extend(outros)
print(frutas)

# Saída:
# ['maçã', 'banana', 'uva', 'manga']
```

## Removendo itens

Assim como podemos adicionar itens a uma lista, também podemos remover valores quando eles não forem mais necessários.

### `remove()`

Remove a primeira ocorrência do valor informado. No exemplo abaixo, o Python procura por "banana" e remove esse item assim que o encontra.

```python
frutas = ["maçã", "banana", "uva"]

frutas.remove("banana")
print(frutas)

# Saída:
# ['maçã', 'uva']
```

Como somente o primeiro valor que é igual ao que passamos pro `remove()` é removido, outras ocorrências dele podem continuar existindo na lista:

```python
frutas = ["maçã", "banana", "maçã", "maçã"]

frutas.remove("maçã")
print(frutas)

# Saída:
# ['banana', 'maçã', 'maçã']
```

Aqui, somente a primeira "maçã" da lista é removida.

### `pop()`

O método `pop()` remove um item da lista **com base no índice** informado. Ele também devolve o item removido.

```python
frutas = ["maçã", "banana", "uva"]

fruta_removida = frutas.pop(1)

print(frutas)
print(fruta_removida)

# Saída:
# ['maçã', 'uva']
# banana
```

Quando o índice não é informado, o último item da lista é removido pelo `pop()`:

```python
frutas = ["maçã", "banana", "uva"]

frutas.pop()
print(frutas)

# Saída:
# ['maçã', 'banana']
```

### `del`

A palavra-chave `del` remove um item pelo índice, semelhante ao `pop()`, mas **sem retornar o valor removido**.

```python
frutas = ["maçã", "banana", "cereja"]

del frutas[0]
print(frutas)

# Saída:
# ['banana', 'cereja']
```

## Limpando a lista

É útil poder remover um item da lista de cada vez, mas em algumas situações, vamos querer limpar a lista inteira.

### `clear()`

O método `clear()` remove **todos os itens da lista**, deixando-a vazia, mas mantendo a variável existente.

```python
frutas = ["maçã", "banana", "uva"]

frutas.clear()
print(frutas)

# Saída:
# []
```

### `del`

Além de remover itens individuais, o `del` também pode apagar a lista inteira. Porém, ele apaga não só a lista, mas também a variável que a guardava:

```python
frutas = ["maçã", "banana", "cereja"]

del frutas
print(frutas)

# Saída:
# Traceback (most recent call last):
#   File "<python-input-2>", line 1, in <module>
#     print(frutas)
#           ^^^^^^
# NameError: name 'frutas' is not defined
```

## Extraindo informações da lista

Em alguns casos, queremos saber alguma informação sobre uma lista, como qual é seu tamanho ou se tem um certo item dentro dela. O Python oferece algumas funções para isso.

### `len()`

A função `len()` retorna **quantos itens existem** dentro da lista.

```python
frutas = ["maçã", "banana", "uva"]
print(len(frutas))

# Saída:
# 3
```

### `count()`

O método `count()` informa **quantas vezes um determinado valor** aparece dentro da lista.

```python
frutas = ["maçã", "banana", "cereja"]
print(frutas.count("cereja"))

# Saída:
# 1
```

Outro exemplo:

```python
pontos = [1, 4, 2, 9, 7, 8, 9, 3, 1]
print(pontos.count(9))

# Saída:
# 2
```

### `index()`

O método `index()` devolve a **posição da primeira ocorrência** do valor informado.

```python
frutas = ["maçã", "banana", "cereja"]
print(frutas.index("cereja"))

# Saída:
# 2
```

Você também pode definir onde começar e terminar a busca. Aqui, o primeiro "cereja" é ignorado porque começamos a busca a partir do índice 4, ou seja, da palavra "manga":

```python
frutas = ["maçã", "banana", "cereja", "kiwi", "manga", "laranja", "cereja"]
print(frutas.index("cereja", 4))

# Saída:
# 6
```

## Ordenando listas

Antes de começar a ordenar listas, vale relembrar um ponto importante visto na lição "Operadores de comparação": quando comparamos _strings_, a ordem segue o valor Unicode de cada caractere.

O exemplo que usamos naquele caso foi o da palavra "Zebra", que era considerada maior que a palavra "abelha" porque o `Z` maiúsculo tem valor _Unicode_ menor que o `a` minúsculo. Essa mesma lógica se aplica quando ordenamos listas que contém textos.

### `sort()`

O método `sort()` organiza os itens da lista em **ordem crescente** por padrão.

```python
numeros = [3, 1, 4, 2]

numeros.sort()
print(numeros)

# Saída:
# [1, 2, 3, 4]
```

Para ordenar a lista em **ordem decrescente**, podemos usar o valor `reverse=True` com o `sort()`:

```python
numeros = [100, 50, 65, 82, 23]

numeros.sort(reverse=True)
print(numeros)

# Saída:
# [100, 82, 65, 50, 23]
```

### `reverse()`

Já o `reverse()` inverte a ordem atual da lista. Ele não coloca a lista em ordem crescente ou decrescente, ele apenas **inverte a posição dos itens**. O último vira o primeiro, e assim por diante.

```python
numeros = [1, 9, 2, 8]

numeros.reverse()
print(numeros)

# Saída:
# [8, 2, 9, 1]
```

## Copiando listas

É importante saber que fazer `lista2 = lista1` **não** cria uma cópia da lista. Vamos entender como isso funciona melhor mais pra frente, mas tanto `lista1` quanto `lista2` seriam **duas formas de chamar a mesma lista**, como se uma fosse o nome e, a outra, o apelido de uma pessoa.

O jeito correto para criar uma nova lista igual a uma que já existe é usar um dos métodos abaixo.

### `copy()`

O método `copy()` cria uma **cópia independente** da lista original:

```python
frutas = ["maçã", "banana", "cereja"]
copia = frutas.copy()
print(copia)

# Saída:
# ['maçã', 'banana', 'cereja']
```

### `list()`

A função `list()` também cria uma nova lista a partir de outra, funcionando como uma alternativa ao método `copy()`.

```python
frutas = ["maçã", "banana", "cereja"]

copia = list(frutas)
print(copia)

# Saída:
# ['maçã', 'banana', 'cereja']
```

### Slice `[:]`

Usar `[:]` cria uma cópia da lista utilizando **fatiamento**. Ele copia todos os itens do início ao fim:

```python
frutas = ["maçã", "banana", "cereja"]
copia = frutas[:]
print(copia)

# Saída:
# ['maçã', 'banana', 'cereja']
```

## Outras operações úteis

### Concatenando listas com `+`

O operador `+` junta duas listas, criando uma **nova lista** com os itens das duas.

```python
lista1 = [1, 2]
lista2 = [3, 4]

print(lista1 + lista2)

# Saída:
# [1, 2, 3, 4]
```

### Repetindo a lista com `*`

O operador `*` repete os itens da lista pelo número de vezes informado.

```python
print(["a"] * 3)

# Saída:
# ['a', 'a', 'a']
```

## Um detalhe importante

Quando você usa algo como `frutas.append()` ou `lista.sort()`, você está usando um **método**.

Talvez você lembre que falamos deles por alto em lições anteriores. Vamos nos aprofundar neles mais pra frente. Por enquanto, basta pensar que funcionam como uma função que cada tipo de dado tem e ir se acostumando com a ideia de usá-los.
