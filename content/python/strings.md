---
title: "Strings"
description: "O que são as strings e como o Python as utiliza"
order: 8
---

# Strings

Depois de conhecer a sintaxe básica, os principais tipos de dados e o funcionamento das variáveis, chegou a hora de entender melhor como lidar com textos no Python.

Vimos que as strings são um dos tipos de dados mais comuns da linguagem e que são usadas para representar textos, ou seja, qualquer sequência de caracteres entre aspas simples (`'`) ou duplas (`"`):

```python
print('Olá, mundo!')
print("Olá, mundo!")

# Saída:
# Olá, mundo!
# Olá, mundo!
```

## Atribuindo _strings_ a variáveis

Assim como acontece com outros tipos de dados, você já sabe que podemos guardar uma _string_ em uma variável:

```python
nome = "Diego"
print(nome)

# Saída:
# Diego
```

Também é possível criar _strings_ vazias, que são representadas por `''` ou `""`, sem nada dentro das aspas. Um dos casos em que uma _string_ vazia pode ser útil é quando você quer declarar uma variável de texto sem conteúdo ainda, e preenchê-la depois no seu programa.

Observe:

```python
nome_e_sobrenome = ''
print(type(nome_e_sobrenome))

nome = input('Qual é seu nome?')   # o usuário digita "Diego" e aperta Enter
sobrenome = input('Qual é seu sobrenome?')    # o usuário digita "Pinho" e aperta Enter

nome_e_sobrenome = nome + ' ' + sobrenome

print('Olá,', nome_e_sobrenome)

# Saída:
# <class 'str'>
# 'Olá, Diego Pinho'
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

Isso acontece porque para o Python, as aspas do mesmo tipo indicam onde uma _string_ começa e termina. Ele entende que existe a _string_ `Ele disse: `, um texto solto sem significado (`Python é incrível!`) e uma _string_ vazia (`""`).

Como vimos nos artigos "Primeiras impressões" e "Boas práticas com variáveis", o Python só entende o que uma palavra fora das aspas dentro do comando print quer dizer se essa palavra for o nome de uma variável.

Ele considera que `Python é incrível!` não é uma _string_ por não estar dentro das aspas no exemplo acima, então ele não entende o que esse texto significa e retorna a mensagem de erro para você.

## Caracteres de escape _em strings_

Se você quiser usar o mesmo tipo de aspas tanto em volta quanto dentro da sua string, apesar de termos visto que isso normalmente causa erros, existe uma alternativa!

Vimos que o problema de usar o mesmo tipo de aspas é que o Python não consegue entender que uma está dentro da outra — ele interpreta que o primeiro par de aspas se fecha e o segundo se abre depois, deixando uma ou mais palavras soltas fora das _strings_, no espaço entre os dois pares de aspas.

Mas olha só: existe uma forma simples de avisar o interpretador que ele não deve ler dessa forma. Isso pode ser feito com o que chamamos de caractere de escape (`\`).

Funciona assim:

```python
print("Ele disse: \"Python é incrível!\"")

# Saída:
# Ele disse: "Python é incrível!"
```

Ele indica pro interpretador que o caractere que vem depois dele não deve ser interpretado como um comando da linguagem, mas sim exibido literalmente como escrevemos.

Com isso, no exemplo acima, as aspas, que normalmente indicariam para o Python que uma _string_ começou e terminou, passam a ser lidas só como aspas dentro do texto da string.

Para além do uso com as aspas, seja como (`\"`) ou (`\'`), há outros casos em que o caractere de escape pode ser muito útil em nossas strings. Ele pode servir para quebrar linhas dentro do texto (`\n`), acrescentar um espaço de tabulação (`\t`) como quando usamos o Tab do nosso teclado e para termos a própria barra invertida, também chamada de contrabarra (`\\`), dentro da nossa string.

Veja alguns exemplos:

```python
print('Primeira linha\nSegunda linha')
print('Texto com\ttabulação')
print('Caminho: C:\\Users\\Diego')

# Saída:
# Primeira linha
# Segunda linha
# Texto com    tabulação
# Caminho: C:\Users\Diego
```

## _Strings_ em várias linhas

Além do uso do caractere de escape para quebrar linhas dentro de sua string através do (`\n`), há outro recurso que podemos usar quando precisamos armazenar um texto longo que ocupa várias linhas.

Basta usar um par de três aspas simples (`'''`) ou duplas (`"""`) em volta do seu texto. Dentro do par de três aspas, você pode pular linhas normalmente que o Python vai entender que seu texto continua na linha de baixo.

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
print("C++" not in texto)

# Saída:
# True
```

---

As _strings_ são essenciais para nos comunicarmos com o usuário dos nossos programas, seja através do interpretador no terminal, com as funções print() e input(), seja no futuro, quando criarmos aplicações mais complexas com outras funções e ferramentas.

Até aqui, você viu as bases fundamentais para continuar explorando tudo que dá pra fazer com textos no Python. Nos próximos artigos, você vai ir mais a fundo e aprender formas mais avançadas de trabalhar com elas.
