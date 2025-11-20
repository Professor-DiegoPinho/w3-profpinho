---
title: "Tuplas"
description: "O que são e como funcionam as tuplas em Python"
order: 24
---

# O que é uma tupla?

Depois de trabalhar com listas e aprender como elas funcionam, é hora de conhecer outra coleção importante do Python: a **tupla**.

À primeira vista, ela lembra bastante uma lista, já que ambas são sequências **ordenadas acessadas por índices**. Mas existe uma diferença fundamental que muda completamente a forma como você usa esse tipo de dado: tuplas são **imutáveis**.

Isso significa que, depois de criada, a tupla fica "congelada": você **não pode alterar**, **adicionar** ou **remover** itens de dentro dela. Essa imutabilidade torna as tuplas úteis quando você precisa garantir que uma sequência de valores não será modificada ao longo do programa.

Elas são criadas usando **parênteses**, dessa forma:

```python
tons = ("amarelo", "azul", "verde")
print(tons)

# Saída:
# ('amarelo', 'azul', 'verde')
```

## Tuplas vs. Listas

Antes de avançar, vale reforçar as diferenças mais importantes:

| Característica     | Listas                                                 | Tuplas                                              |
| ------------------ | ------------------------------------------------------ | --------------------------------------------------- |
| Mutabilidade       | Mutáveis: permitem alterar, adicionar e remover itens. | Imutáveis: após criadas, não podem ser modificadas. |
| Ordem              | Mantêm a ordem dos itens.                              | Mantêm a ordem dos itens.                           |
| Valores duplicados | Permitidos.                                            | Permitidos.                                         |
| Sintaxe            | Usam colchetes `[]`.                                   | Usam parênteses `()`.                               |

Essa comparação ajuda bastante a entender quando escolher cada uma.

## Itens e ordem

Agora que você já sabe o que são tuplas, vamos observar como os valores se organizam dentro delas.

Os itens dentro da tupla seguem uma ordem fixa e possuem índices, assim como as listas. O primeiro item tem índice `0`:

```python
frutas = ("maçã", "banana", "uva")
print(frutas[0])

# Saída:
# maçã
```

Tuplas também permitem valores repetidos:

```python
dados = ("A", "B", "A", "C")
print(dados)

# Saída:
# ('A', 'B', 'A', 'C')
```

## Tuplas com um único item

Se você quiser criar uma tupla com apenas **um único elemento**, precisa colocar uma vírgula ao final. Caso contrário, o Python interpreta como uma string normal, um número normal, etc.

```python
item = ("Python",)
print(type(item))

# Saída:
# <class 'tuple'>

nao_eh_tupla = ("Python")
print(type(nao_eh_tupla))

# Saída:
# <class 'str'>
```

## Tipos diferentes dentro da tupla

Assim como as listas, tuplas podem guardar vários tipo de dado e até misturar tipos diferentes:

```python
t1 = ("texto", 42, True)
print(t1)

# Saída:
# ('texto', 42, True)
```

## Acessando valores

O acesso funciona da mesma maneira que fazemos com as listas:

### Índices positivos

```python
cores = ("vermelho", "verde", "azul")
print(cores[2])

# Saída:
# azul
```

### Índices negativos

```python
print(cores[-1])

# Saída:
# azul
```

### Intervalos (_slicing_)

Assim como nas listas, podemos fatiar uma tupla:

```python
frutas = ("maçã", "banana", "cereja", "kiwi", "manga")
print(frutas[1:4])

# Saída:
# ('banana', 'cereja', 'kiwi')
```

E podemos omitir o início ou o fim:

```python
print(frutas[:3])  # do início até o índice 2
print(frutas[2:])  # do índice 2 até o final

# Saída:
# ('maçã', 'banana', 'cereja')
# ('cereja', 'kiwi', 'manga')
```

Também funciona com índices negativos:

```python
print(frutas[-4:-1])

# Saída:
# ('banana', 'cereja', 'kiwi')
```

## Unpacking: desempacotando tuplas

Quando criamos uma tupla, estamos "empacotando" valores dentro dela. O Python também permite fazer o caminho inverso: **atribuir cada valor da tupla a uma variável correspondente**.

```python
frutas = ("maçã", "banana", "cereja")

(a, b, c) = frutas

print(a)
print(b)
print(c)

# Saída:
# maçã
# banana
# cereja
```

O número de variáveis precisa bater com o número de itens — a não ser que você use um asterisco.

### Usando o asterisco `*`

O asterisco permite capturar vários itens em forma de lista:

```python
frutas = ("maçã", "banana", "cereja", "morango", "kiwi")

(a, b, *resto) = frutas

print(a)
print(b)
print(resto)

# Saída:
# maçã
# banana
# ['cereja', 'morango', 'kiwi']
```

Você também pode usar o asterisco no meio:

```python
(a, *meio, ultimo) = ("uva", "manga", "pera", "ameixa", "figo")

print(a)
print(meio)
print(ultimo)

# Saída:
# uva
# ['manga', 'pera', 'ameixa']
# figo
```

---

Aprendemos que as tuplas são uma forma simples e segura de representar coleções que não devem ser modificadas ao longo do programa. Elas funcionam de maneira parecida com as listas em vários aspectos, mas trazem a vantagem da imutabilidade, que **evita mudanças acidentais nos dados**.

Agora que você já entende o que são tuplas, como criá-las e como acessar seus valores, podemos avançar para a parte prática: como combinar tuplas, copiar, transformar e até contornar a imutabilidade quando necessário.
