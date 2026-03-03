---
title: "Laço de Repetição for..in range"
description: "Domine o for com range para repetir ações por quantidade, contar intervalos e gerar padrões como tabuada."
order: 10
---

Vimos que o `for…in` é muito útil para iterar uma lista. Ou seja, passar por cada um dos itens da lista e fazer alguma ação com isso.

Mas a verdade é que o `for…in` nada mais é do que um laço de repetição já configurado pelo Python para nós. Conseguimos reaproveitar essa estrutura, por exemplo:

```python
n_repeticoes = 10
for index in range(n_repeticoes):
	print(index)
```

Neste código, vemos que ação do `print` é executada 10x, de modo que, para cada uma, temos acesso ao índice (representada pela variável `index`).

Isso é tão poderoso que podemos reescrever o processo de iteração de lista usando essa estrutura. Veja:

```python
lista = ["diego", "lucas", "maria", "fernanda"]
for index in range(len(lista)): # tamanho da lista
	nome = lista[index]
	print(nome)
```

# 🧩 Exercícios

## Exercício 1: De castigo na escola

Há muitos anos atrás, uma prática pedagógica muito usada nas escolas para repreender os alunos e alunas mais travessos(as) era fazer com que eles copiassem uma mesma frase inúmeras vezes na lousa.

É como o Bart Simpson no início de cada episódio da série:

![image.png](attachment:1c25ff6e-ba73-446c-8d04-384c78549e23:image.png)

Elabore um algoritmo que faça com que o Bart escreva 100x no console a frase *“Nunca mais vou fazer piada com o Python”*.

Por exemplo:

```python
Nunca mais vou fazer piada com o Python
Nunca mais vou fazer piada com o Python
Nunca mais vou fazer piada com o Python
Nunca mais vou fazer piada com o Python
Nunca mais vou fazer piada com o Python
...
Nunca mais vou fazer piada com o Python # 100x
```

{% toggle "Ver solução" %}

```python
for _ in range(100):
	print("Nunca mais vou fazer piada com o Python")
```

{% endtoggle %}

## Exercício 2: De castigo na escola - Parte 2

O Bart Simpson não aprendeu a lição e aprontou novamente. Crie um programa que:

- Recebe, como um inteiro, a quantidade de vezes que o Bart terá que escrever na lousa.
- Recebe, como string, a frase que ele terá que repetir na lousa.

Por exemplo:

```python
Qual é a frase? # Python não é chato
Quantas vezes ele deve repetir a frase?  # 10

Python não é chato
Python não é chato
...
Python não é chato #10x
```

{% toggle "Ver solução" %}

```python
frase = input("Qual é a frase? ")
n_repeticoes = int(input("Quantas vezes ele deve repetir a frase? "))

for _ in range(n_repeticoes):
	print(frase)
```

{% endtoggle %}

## Exercício 3: Contagem de esconde-esconde

Crie um programa para simular a contagem dos números para que as pessoas possam se esconder em um jogo de esconde-esconde. Peça ao usuário até quanto ele deve contar e então faça a contagem. Faça a contagem SEMPRE começar do 1 e não do 0! Por exemplo:

```python
Contar até quanto? #10
1
2
3
4
5
6
7
8
9
10
```

{% toggle "Ver solução" %}

```python
limite = int(input("Contar até quanto? "))

for i in range(limite):
	print(i + 1)
```

{% endtoggle %}

## Exercício 4:  A tabuada da programação

Crie um programa que peça ao usuário para digitar um número inteiro entre 1 e 10. Em seguida, o programa deve imprimir a tabuada desse número, do 1 ao 10, utilizando o laço de repetição `for` `in… range`.

Por exemplo:

```python
Digite um número de 1 a 10:
7

Tabuada do 7:
7 x 1 = 7  
7 x 2 = 14  
7 x 3 = 21  
7 x 4 = 28  
7 x 5 = 35  
7 x 6 = 42  
7 x 7 = 49  
7 x 8 = 56  
7 x 9 = 63  
7 x 10 = 70  
```

{% toggle "Ver solução" %}

```python
numero = int(input("Digite um número de 1 a 10: "))

print(f"Tabuada do {numero}")
for i in range(10):
	print(f"{numero} x {i + 1} = {numero * (i + 1)}")
```

{% endtoggle %}

{% links "Links da aula" %}
- [**Programiz - Online Python Compiler**](https://www.programiz.com/python-programming/online-compiler/)
- [**Learning Hub - Prof. Diego Pinho: Python - Listas**](https://hub.diegopinho.com.br/python/listas)
- [**Learning Hub - Prof. Diego Pinho: Python - Manipulando Listas**](https://hub.diegopinho.com.br/python/manipulando-listas)
{% endlinks %}