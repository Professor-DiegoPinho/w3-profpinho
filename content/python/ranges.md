---
title: "Ranges"
description: "O que são e como funcionam os ranges em Python."
order: 32
---

Aprendemos nas últimas lições sobre as coleções do Python, que são muito úteis para guardar múltiplos valores.

Além delas, existe o tipo range. Ele tem um funcionamento parecido com o das coleções, mas possui algumas características que o tornam único.

## O que é um `range`

Um `range` representa uma **sequência imutável de números inteiros**. Ele define um intervalo numérico que tem uma estrutura bem clara: **início, fim e passo em que seus itens aumentam ou diminuem**.

Quando ele é criado, o Python não gera todos os números de uma vez. Em vez disso, ele cria um objeto que guarda apenas as regras do nosso intervalo:

```python
intervalo = range(0, 5, 1)

print(intervalo)

# Saída:
# range(0, 5)
```

Esse funcionamento é seu principal diferencial, fazendo com que ele seja muito eficiente, econômico em memória e ideal para representar sequências numéricas previsíveis quando não precisamos visualizar cada um de seus itens.

Outra característica importante é que ele é **imutável**, ou seja, ele não pode ser alterado depois de criado. Dessa forma, não conseguimos adicionar, remover ou modificar valores dentro dele. Então, se você precisar de algo diferente, será necessário criar um novo intervalo com novas regras.

Se quiser confirmar se um valor é do tipo `range`, você pode fazer da seguinte forma:

```python
intervalo = range(0, 5, 1)

print(type(intervalo))

# Saída:
# <class 'range'>
```

## Criando um `range`

Para funcionar, o `range` precisa ter as informações que vimos lá no início dessa lição: **início, fim e passo em que seus itens aumentam ou diminuem**.

Eles aparecem sempre nessa ordem:

```python
range(inicio, fim, passo)
```

Apesar dessas três informações serem necessárias, você não precisa sempre fornecer todas elas. Quando alguma não é fornecida, o valor padrão dela é utilizado para criar o intervalo.

Na prática, você pode usar a função passando uma, duas ou três informações:

1. `range(fim)`
2. `range(inicio, fim)`
3. `range(inicio, fim, passo)`

Agora, vamos nos aprofundar em como cada uma dessas alternativas funciona.

### Definindo apenas o fim

Quando passamos apenas um valor, ele representa o **fim** da sequência: `range(fim)`. Nesse caso, o início assume automaticamente o valor `0` e o passo, o valor `1`.

Dessa forma, o intervalo gerado vai do `0` até o número anterior ao fim, o `4`:

```python
intervalo = range(5)     # equivale a range(0, 5, 1)

print(intervalo)
print(list(intervalo))

# Saída:
# range(0, 5)
# [0, 1, 2, 3, 4]
```

Repare que o valor final, o `5`, **não é incluído**. Um `range` sempre para antes do valor final, então ele parou antes de `5`, indo até o número `4`. Para ir até o número `5`, devemos usar a função `range(6)`.

### Definindo o início e fim

Também podemos definir explicitamente onde a sequência começa e onde termina. Nesse caso, informamos `range(inicio, fim)`:

```python
intervalo = range(2, 6)     # equivale a range(2, 6, 1)

print(intervalo)
print(list(intervalo))

# Saída:
# range(2, 6)
# [2, 3, 4, 5]
```

Assim como quando passamos só uma das informações, aqui o passo automaticamente recebe o valor `1` também.

### Definindo início, fim e passo

O terceiro valor que podemos passar para o `range()` define o **passo**, ou seja, de quanto em quanto os valores avançam. O formato a ser informado é: `range(inicio, fim, passo)`.

Observe:

```python
intervalo = range(1, 10, 2)

print(intervalo)
print(list(intervalo))

# Saída:
# range(1, 10, 2)
# [1, 3, 5, 7, 9]
```

Acima, o passo definido foi `2`. Então os números vão aumentando de 2 em 2.

Também é possível usar passos negativos, como `-1`, para criar sequências decrescentes:

```python
intervalo = range(5, 0, -1)

print(intervalo)
print(list(intervalo))

# Saída:
# range(5, 0, -1)
# [5, 4, 3, 2, 1]
```

Repare que, com o passo negativo, o início guarda o número maior e fim guarda o número menor.

## Relação entre `range` e `list`

Você deve ter percebido nos exemplos acima que, para visualizar todos os itens de cada `range`, nós o **convertemos para o tipo `list`**, dessa forma:

```python
intervalo = range(3, 8)

print(list(intervalo))

# Saída:
# [3, 4, 5, 6, 7]
```

Essa conversão cria uma lista na memória contendo todos os valores do `range`. Porém, é importante ressaltar que ele **não precisa ser convertido para outro formato** para ser útil e que ele **não é nem uma lista nem uma coleção tradicional**. Ele é um objeto iterável.

Como já vimos, seu principal diferencial é exatamente representar uma sequência de números inteiros **sem armazenar cada um dos números** diretamente na memória, como a lista faz. Abaixo, você vai vê-lo sendo utilizado sem a conversão.

## Acessando valores por índice

O `range` é uma sequência, então podemos acessar seus valores usando índices, assim como em listas:

```python
intervalo = range(10)
print(intervalo[2])

# Saída:
# 2
```

Também é possível usar fatiamento (_slicing_):

```python
intervalo = range(10)
print(intervalo[:4])

# Saída:
# range(0, 4)
```

Note que o resultado do fatiamento ainda é um `range`, não uma lista.

## Descobrindo o tamanho de um `range`

Podemos descobrir quantos elementos existem em um `range` usando a função `len()`:

```python
intervalo = range(0, 10, 2)
print(len(intervalo))

# Saída:
# 5
```

Aqui, não é necessário gerar a lista `[0, 2, 4, 6, 8]` para saber que o `range(0, 10, 2)` possui 5 números ao total. O Python calcula esse valor com base nas regras do intervalo, sem precisar gerar a sequência inteira.

---

Vimos como o `range` é ideal sempre que precisamos representar **intervalos numéricos previsíveis**. Em breve, vamos explorar como ele se conecta com estruturas que executam ações repetidas nos nossos códigos.
