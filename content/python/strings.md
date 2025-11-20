---
title: "Strings"
description: "O que são as strings e como o Python as utiliza"
order: 9
---

# O que já vimos sobre as _strings_

Depois de conhecer a sintaxe básica, os principais tipos de dados e o funcionamento das variáveis, chegou a hora de entender melhor como lidar com textos no Python.

Já vimos que as strings são um dos tipos de dados mais comuns da linguagem e que são usadas para representar textos, ou seja, qualquer sequência de caracteres entre aspas simples (`'`) ou duplas (`"`):

```python
print('Olá, mundo!')
print("Olá, mundo!")

# Saída:
# Olá, mundo!
# Olá, mundo!
```

## Atribuindo _strings_ a variáveis

Assim como acontece com outros tipos de dados, você sabe que podemos guardar uma _string_ em uma variável:

```python
nome = "Diego"
print(nome)

# Saída:
# Diego
```

Também é possível criar _strings_ vazias, que são representadas por `''` ou `""`, sem nada dentro das aspas. Um dos casos em que uma _string_ vazia pode ser útil é quando você quer declarar uma variável de texto sem conteúdo ainda, e preenchê-la depois no seu programa.

Observe:

```python
nome_e_sobrenome = ""
print(type(nome_e_sobrenome))

nome = input("Qual é seu nome?")   # o usuário digita "Diego"
sobrenome = input("Qual é seu sobrenome?")    # o usuário digita "Pinho"

nome_e_sobrenome = nome + " " + sobrenome

print("Olá,", nome_e_sobrenome)

# Saída:
# <class 'str'>
# Olá, Diego Pinho
```

## Aspas dentro de aspas

Por último, já falamos sobre como usamos aspas dentro de uma _string_, o que pode ser útil, por exemplo, para incluir citações ou diálogos em sua _string_.

Podemos fazer o uso de aspas dentro de aspas alternando o tipo que usamos. Se as externas são aspas duplas (`"`), as internas devem ser aspas simples (`'`) e vice-versa:

```python
print("Ele disse: 'Python é incrível!'")
print('Ela respondeu: "Com certeza!"')

# Saída:
# Ele disse: 'Python é incrível!'
# Ela respondeu: "Com certeza!"
```

Se você testou usar o mesmo tipo de aspas dentro e em volta da _string_, você viu que seu código não funcionou e recebeu uma mensagem de erro como essa:

```python
print("Ele disse: "Python é incrível!"")

# Saída:
# File "<python-input-0>", line 1
#     print("Ele disse: "Python é incrível!"")
#           ^^^^^^^^^^^^^^^^^^^
# SyntaxError: invalid syntax. Perhaps you forgot a comma?
```

Isso acontece porque para o Python, as aspas do mesmo tipo indicam onde uma _string_ começa e termina. Ele entende que existe a _string_ `"Ele disse: "`, um texto solto sem significado (`Python é incrível!`) e uma _string_ vazia (`""`).

Como vimos nas lições "Primeiras impressões" e "Boas práticas com variáveis", o Python só entende o que uma palavra fora das aspas dentro do comando `print()` quer dizer se essa palavra for o nome de uma variável, o que não é o caso aqui.

Ele considera que `Python é incrível!` não é uma _string_ por não estar dentro das aspas no exemplo acima, então ele não entende o que esse texto significa e retorna a mensagem de erro para você.

## _Strings_ em várias linhas

Quando precisamos armazenar um texto longo que ocupa várias linhas,basta usar um par de três aspas simples (`'''`) ou duplas (`"""`) em volta do seu texto. Dentro do par de três aspas, você pode pular linhas normalmente que o Python vai entender que seu texto continua na linha de baixo.

```python
mensagem = """Olá!
Este é um texto
em várias linhas."""

print(mensagem)

# Saída:
# Olá!
# Este é um texto
# em várias linhas.
```

## Verificando se algo está dentro de uma _string_

Você pode verificar se uma palavra ou trecho aparece dentro de uma _string_ usando o operador `in`.

```python
texto = "Python é divertido!"
print("Python" in texto)
print("Java" in texto)

# Saída:
# True
# False
```

E o contrário com `not in`:

```python
texto = "Python é divertido!"
print("C++" not in texto)

# Saída:
# True
```

---

As _strings_ são essenciais para nos comunicarmos com o usuário dos nossos programas, seja através do interpretador no terminal, com as funções `print()` e `input()`, seja no futuro, quando criarmos aplicações mais complexas com outras funções e ferramentas.

Até aqui, você viu as bases fundamentais para continuar explorando tudo que dá pra fazer com textos no Python. Na próxima lição, você vai ir mais a fundo e aprender formas mais avançadas de trabalhar com eles.
