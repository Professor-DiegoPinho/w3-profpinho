---
title: "Iterabilidade e imutabilidade em conjuntos"
description: "Entendendo como conjuntos devem ser criados com valores iteráveis e imutáveis ao mesmo tempo"
order: 27
---

Nesta lição, vamos entender por que conjuntos precisam lidar com duas ideias ao mesmo tempo: imutabilidade e iterabilidade. Também vamos ver como elas afetam tanto a criação quanto o conteúdo de um conjunto.

## Criando conjuntos com o `set()`

Até agora, vimos que podemos criar conjuntos usando chaves (`{}`). Mas o Python também permite criar um conjunto usando a função `set()`.

No exemplo abaixo, passamos a lista `frutas_lista` para a função e ela transforma a lista em conjunto:

```python
frutas_lista = ["banana", "laranja", "maçã"]
frutas_conjunto = set(frutas_lista)

print(frutas_conjunto)

# Saída possível:
# {'banana', 'laranja', 'maçã'}
```

Esse padrão é muito comum quando queremos remover valores duplicados de uma lista e manter apenas os itens únicos de forma simples.

## Iterabilidade e imutabilidade

Antes de continuarmos nos aprofundando, existe um ponto muito importante que costuma gerar confusão. Quando trabalhamos com a criação de conjuntos, temos duas regras diferentes que devem ser seguidas:

1. O que pode ser **passado para a função `set()`** transformar em conjunto **precisa ser um valor iterável**, ou seja, deve ser possível passar pelos seus itens de um a um.

2. O que pode **existir dentro de um conjunto** como seu elemento **precisa ser um valor imutável**, ou seja, não pode ser algo que se altera ao longo do tempo.

Vamos olhar cada uma delas separadamente e depois unir os dois conceitos para tudo fazer sentido, ok?

### O que pode ser passado para `set()` transformar em conjunto?

Como vimos acima, o `set()` aceita qualquer valor que seja **iterável**. Esse conceito vai ficar mais claro daqui a algumas lições, mas você pode pensar nele como sendo algo que tem vários subitens e que permite que você trabalhe com esses subitens individualmente.

Em uma lista, por exemplo, você pode selecionar um valor dentro dela ou contar quantos valores ela tem. Para fazer essas e outras operações, o Python vai passando pelos itens, um a um. Isso também inclui tuplas, outros conjuntos e até mesmo as _strings_, já que podemos passar através dos seus caracteres.

```python
frutas_tupla = ("maçã", "melão", "maçã", "laranja")
frutas_conjunto = {"uva", "abacaxi", "melancia"}
fruta_string = ("banana")

print(set(frutas_tupla))
print(set(frutas_conjunto))
print(set(fruta_string))

# Saídas possíveis:
# {'melão', 'laranja', 'maçã'}
# {'melancia', 'uva', 'abacaxi'}
# {'b', 'n', 'a'}
```

Repare em como as características dos conjuntos aparecem acima:

- A tupla tinha valores repetidos, "maçã" aparecia duas vezes. O conjunto guardou apenas uma ocorrência de cada valor, restando só uma "maçã";
- A ordem dos itens mudou. O Python reorganizou da melhor forma para trabalhá-los.

Por outro lado, você não pode passar um valor que não seja iterável, como números, valores booleanos (`True` e `False`) e o None. Esses valores causam erro porque o Python não tem como percorrê-los item por item para criar o conjunto.

```python
numero = 23
booleano = True
nada = None

print(set(numero))
print(set(booleano))
print(set(nada))

# Saída:
# Traceback (most recent call last):
#   File "<stdin>", line 1, in <module>
#     print(set(numero))
#           ~~~^^^^^^^^
# TypeError: 'int' object is not iterable

# Traceback (most recent call last):
#   File "<stdin>", line 1, in <module>
#     print(set(booleano))
#           ~~~^^^^^^^^^^
# TypeError: 'bool' object is not iterable

# Traceback (most recent call last):
#   File "<stdin>", line 1, in <module>
#     print(set(nada))
#           ~~~^^^^^^
# TypeError: 'NoneType' object is not iterable
```

### O que posso colocar dentro de um conjunto criado com `set()`?

Como vimos acima, os conjuntos trabalham garantindo unicidade dos seus itens e os organizando internamente da melhor forma pro Python usá-los.

Para isso dar certo, o Python precisa ter certeza de que cada item **não vai mudar** ao longo do tempo. Por isso, só é permitido guardar elementos **imutáveis** dentro de conjuntos.

#### Elementos imutáveis

Mas o que são elementos imutáveis no Python?

Para entendermos bem, precisamos separar o conceito de variável do valor que é guardado dentro dela. Pense que quando você cria `a = 10`, o que você realmente está criando é o valor `10`. O nome `a` é apenas uma etiqueta para identificar o valor `10` na memória do computador.

Se depois de declarar que o valor de `a` é `10`, você diz que `a` é igual a `20`, pode parecer que estamos trabalhando com algo mutável. Afinal, `a` mudou de `10` para `20`, certo? Mas na verdade, não é assim que funciona!

O número `10` continua existindo na memória do computador, ele não pode ser alterado. O que nós estamos fazendo é trocar a "etiqueta" `a` de lugar. Ela passa a apontar para outro valor na memória que também é imutável, o `20`.

Isso fica mais claro no exemplo abaixo:

```python
a = 10      # "a" aponta para o valor 10
print(a)

b = a      # "b" aponta para o valor que "a" está apontando, 10
a = 20    # "a" passa a apontar para 20

print(a)
print(b)

# Saída:
# 10
# 20
# 10
```

Aqui, `b` continua apontando para o valor `10`, mesmo depois de `a` ter mudado para `20`. O que acontece é que a variável `a` simplesmente passa a apontar para outro valor, enquanto `b` continua ligada ao `10` original.

Em Python, os seguintes valores são **imutáveis**:

- números (`int`, `float` e `complex`)
- _strings_
- booleanos
- tuplas
- None

#### Elementos mutáveis

Agora, vamos pensar em outro cenário. Lembra quando aprendemos sobre listas e vimos a diferença entre criar uma nova forma de chamar a mesma lista e fazer uma nova cópia de uma lista que já existe? Essa ideia vai ser bem útil aqui.

Observe:

```python
lista_original = [1, 2, 3]
lista_nova = lista_original

print(lista_nova)
print(lista original)

lista_original.append(4)

print(lista_nova)
print(lista original)

#Saída
# [1, 2, 3]
# [1, 2, 3]
# [1, 2, 3, 4]
# [1, 2, 3, 4]
```

Aqui, `lista_nova` não é uma cópia da `lista_original`, ela é apenas outro nome para a mesma lista na memória. Quando alteramos a `lista_original`, a `lista_nova` também muda, porque ambas apontam para o mesmo valor. Dessa forma, o dado original pode ser alterado.

Os seguintes valores são **mutáveis**:

- listas
- dicionários
- outros conjuntos (`set`)

Esses valores são mutáveis e, por isso, não podem ser elementos de um conjunto.

## Iteráveis **E** imutáveis ao mesmo tempo

Agora que entendemos as duas regras conseguimos juntar tudo!

A função `set()` aceita qualquer valor iterável. Isso significa que você pode enviar listas, tuplas, conjuntos e até strings. Mas, depois que o Python percorre esse iterável, ele só consegue colocar dentro do conjunto os itens que forem imutáveis.

Ou seja:

- O valor passado para `set()` precisa ser **iterável**.
- Cada item dentro desse valor precisa ser **imutável** para entrar no conjunto.

Uma lista em si é mutável, mas isso não importa porque o Python não vai guardá-la dentro do conjunto. Ele só vai usar a lista como fonte dos itens e colocar no conjunto apenas os valores imutáveis encontrados dentro dela.

Veja como isso funciona na prática:

```python
lista = [1, 2, 3, (4, 5), "texto"]
conjunto = set(lista)

print(conjunto)

# Saída possível:
# {1, 2, 3, (4, 5), 'texto'}
```

Dentro dela, temos:

- os números 1, 2 e 3 → ✔️ imutáveis
- a tupla (4, 5) → ✔️ imutável
- a string "texto" → ✔️ imutável

Todos os itens são aceitos pelo conjunto.

Se algum dos itens fosse mutável, como uma lista interna, o Python geraria um erro ao tentar colocá-lo dentro do conjunto. Veja o que aconteceria:

```python
lista_interna = [3, 4]
lista_externa = [1, 2, lista_interna]  # a lista interna [3, 4] é mutável

print(set(lista_externa))

# Saída:
# Traceback (most recent call last):
#   File "<stdin>", line 1, in <module>
#     print(set(lista_externa))
#           ~~~^^^^^^^^^^^^^^^
# TypeError: unhashable type: 'list'
```

Aqui, o problema não está na `lista_externa`, ela é apenas a fonte dos itens que o Python vai copiar para dentro do nosso conjunto. O erro acontece porque um dos elementos dela, a `lista_interna`, é mutável, e portanto não pode ser armazenada dentro do conjunto.

> Não se preocupe com o termo "_unhashable_" por enquanto. Esse é um conceito mais avançado que não precisamos entender a fundo agora. Basta saber que o "_hash_" é a forma como o Python guarda os itens dentro dos conjuntos. Ele não consegue guardar quando o item é mutável, ou seja, não é possível usar o "_hash_", não é "hashável" (_unhashable_).
