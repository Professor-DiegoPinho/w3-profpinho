---
title: "Listas"
description: "A principal coleção do Python"
order: 22
---

Depois de conhecer o que são coleções no Python, é hora de mergulhar na mais utilizada delas: a **lista**. Ela aparece em praticamente todo tipo de programa porque é simples, flexível e fácil de trabalhar.

## O que é uma lista?

Uma lista permite guardar **vários valores dentro de uma única variável**. Ela é uma coleção:

- **ordenada**, que mantém a ordem dos itens dentro dela;
- **mutável**, permitindo alterações a qualquer momento;
- que pode armazenar **tipos variados**, como números, strings e até outras listas.

Veja como funciona:

```python
frutas = ["maçã", "banana", "uva"]
print(frutas)

# Saída:
# ['maçã', 'banana', 'uva']
```

Você também pode criar listas vazias:

```python
lista_vazia = []
print(lista_vazia)

# Saída:
# []
```

<!-- ## Tipos diferentes dentro da tupla

Assim como as listas, tuplas podem guardar qualquer tipo de dado e até misturar tipos diferentes:

```python
t1 = ("texto", 42, True)
print(t1)

# Saída:
# ('texto', 42, True)
``` -->

## O que é um índice?

Algumas coleções guardam valores em sequência, e cada valor ocupa uma posição chamada **índice**.

No dia a dia, costumamos contar a partir do 1 (primeiro item, primeira cadeira, primeiro capítulo). Mas em Python, e na maior parte das linguagens, a contagem começa no **0**.

Isso significa que:

- o **primeiro** item está na posição `0`
- o **segundo** está na posição `1`
- o **terceiro** está na posição `2`

Pense no índice como o **número de uma casa em uma rua**: ele diz onde cada item está. Para acessar um item, usamos o número da posição dele na lista, ou seja, seu índice, dentro dos colchetes (`[]`):

```python
cores = ["azul", "verde", "roxo"]

print(cores)
print(cores[0])
print(cores[1])
print(cores[2])

# Saída:
# ['azul', 'verde', 'roxo']
# azul
# verde
# roxo
```

Essa forma de contagem pode parecer estranha no começo, mas logo se torna natural.

### Índices negativos

Python também permite contar de trás para frente usando índices negativos:

- `-1` → último item
- `-2` → penúltimo item
- e assim em diante...

```python
cores = ["azul", "verde", "roxo"]

print(cores[-1])
print(cores[-2])
print(cores[-3])

# Saída:
# roxo
# verde
# azul
```

### Fatiamento (_slicing_)

Podemos também acessar **intervalos** da lista. Para isso, usamos o índice do início do intervalo e o índice do fim dentro dos colchetes, separados por dois pontos: `lista[início:fim]`.

Mas tem um detalhe importante: o item de _início_ é incluído no intervalo e o de _fim_ **não** é. Observe como funciona:

```python
frutas = ["maçã", "banana", "uva", "laranja", "kiwi"]
print(frutas[1:4])

# Saída:
# ['banana', 'uva', 'laranja']
```

Apenas os dados nas posições 1 ("banana"), 2 ("uva") e 3 ("laranja) são impressos. O que está na posição 4 ("kiwi") não é incluído.

Também é possível usar índices negativos para selecionar itens. O intervalo `[-4:-1]` começa em "laranja" e vai até antes de "manga":

```python
frutas = ["maçã", "banana", "cereja", "laranja", "kiwi", "melão", "manga"]
print(frutas[-4:-1])


# Saída:
# ['laranja', 'kiwi', 'melão']
```

Algumas variações úteis:

```python
frutas = ["maçã", "banana", "uva", "laranja", "kiwi"]

print(frutas[:3])   # do início até antes do índice 3
print(frutas[2:])   # do índice 2 até o final
print(frutas[::2])  # pulando de 2 em 2 (índices 0, 2 e 4)

# Saída:
# ['maçã', 'banana', 'uva']
# ['uva', 'laranja', 'kiwi']
# ['maçã', 'uva', 'kiwi']
```

---

Percebeu o poder das listas como ferramenta do nosso código?

Na próxima lição, vamos explorar como manipulá-las: adicionar, remover, reorganizar e modificar seus valores. Vamos usar os principais recursos que o Python oferece para trabalhar com esse tipo de estrutura.
