---
title: "Listas e Iterações"
description: "Aprenda a criar listas, acessar elementos por índice, usar append/pop e iterar coleções com for..in no Python."
order: 9
---

Listas são estruturas que nos permitem armazenar múltiplas informações em um único lugar. Isso facilita muito a nossa vida, pois assim podemos lidar com apenas uma única variável ao invés de várias delas.

Podemos iniciar uma lista desta forma:

```python
lista = [] # inicia uma lista vazia
lista = [1,2,3,4] # inicia uma lista já com valores
```

Podemos adicionar e remover valores do final da lista usando as funções `.append()` e `.pop()`, respectivamente:

```python
lista = []
lista.append(1) # lista agora é [1]
lista.append(2) # lista agora é [2]
lista.pop() # [1]
```

Os valores inseridos são indexados. Isso significa que podemos acessá-los e modificá-los através do seu índice. No entanto, na programação, os valores são indexados a partir do número zero. Ou seja, o primeiro valor tem o índice zero:

![image.png](attachment:91776e6e-21d0-44ac-b4cd-9bf0c0cdb3d3:image.png)

```python
lista = ["diego", "marcelo", "luiza"]
print(lista[0]) # diego
print(lista[1]) # marcelo
print(lista[2]) # luiza

```

E assim como nas strings, podemos saber o seu tamanho através da função `len()`:

```python
lista = [1,2,3,4]
len(lista) # 4
```

Em Python uma lista pode conter elementos de tipos diferentes. Isso significa que você pode ter uma lista com inteiros, strings, floats, e outros tipos de dados, tudo na mesma lista:

```python
lista = [10, "Python", 3.14, True]
```

**E se quisermos passar por todos os valores de uma lista?**

Chamamos este processo de **iteração**. Para iterar uma lista, ou seja, passar por cada um dos itens que pertencem à ela, podemos usar um laço de repetição `for…in`:

```python
lista_nomes = ["diego", "marcelo", "luiza"]
for nome in lista_nomes:
	print(nome)
```

![image.png](attachment:a7d0d5d1-f4a3-499d-a53f-410663b7180e:image.png)

# 🧩 Exercícios

## Exercício 1: Quem são os participantes?

Escreva um programa capaz de cadastrar o nome de 5 participantes em um evento. Para cada participante, basta cadastrar seu primeiro nome. Ao final, seu programa deve exibir o nome de todos os integrantes. Utilize uma lista para administrar os nomes do participantes.

Exemplo:

```python
Qual é o nome do participante? # diego
Qual é o nome do participante? # julia
Qual é o nome do participante? # marcos
Qual é o nome do participante? # rafaela
Qual é o nome do participante? # alessandra

Os participantes são:
diego
julia
marcos
rafaela
alessandra
```

{% toggle "Ver solução" %}

```sql
participantes = []
participantes.append(input("Qual é o nome do participante? "))
participantes.append(input("Qual é o nome do participante? "))
participantes.append(input("Qual é o nome do participante? "))
participantes.append(input("Qual é o nome do participante? "))
participantes.append(input("Qual é o nome do participante? "))
	
print("Os participantes são: ")
for participante in participantes:
	print(participante)	
```

{% endtoggle %}

## Exercício 2: E o n-ésimo participante? Quem é?

Abaixo há uma lista com 10 nomes cadastrados. Escreva um programa que pergunta a um usuário pela posição e você precisa dizer quem é o usuário que a ocupa. Mas tem um porém, a posição que o usuário te dará é de 1 até um número qualquer.

Se o número for menor do que 1 ou maior do que 10, entregue uma mensagem dizendo: posição inválida. Caso contrário, mostre quem ocupa a posição.

```sql
nomes = [
	"Ana", "João", "Maria", 
	"Pedro", "Lucas", "Paula", 
	"Rafael", "Clara", "Marcos", "Sofia"
]
```

Por exemplo:

```python
# exemplo 1: posição válida
Qual posição você procura? # 2
Quem ocupa a posição 2 é o(a)... João!

# exemplo 2: posição inválida
Qual posição você procura? # 0
Opa, essa posição é inválida!
```

{% toggle "Ver solução" %}

```python
nomes = [
  "Ana", "João", "Maria", 
  "Pedro", "Lucas", "Paula", 
  "Rafael", "Clara", "Marcos", "Sofia"
]

posicao = int(input("Qual posição você procura? "))

if posicao < 1 or posicao > len(nomes):
  print("Opa, essa posição é inválida!")
else:
  participante = nomes[posicao - 1]
  print(f"Quem ocupa a posição {posicao} é o(a)... {participante}!")
```

{% endtoggle %}

## Exercício 3: E o n-ésimo participante? Quem é? - Parte 2

Agora para cada nome também temos um sobrenome cadastrado. Mas temos um PROBLEMÃO. A lista de nomes foi escrita ao contrário. Por exemplo, o nome completo do João é João Gomes e não João Souza! Faça o mesmo que exercício anterior mas agora apresente o nome inteiro.

```sql
nomes = [
	"Ana", "João", "Maria", 
	"Pedro", "Lucas", "Paula", 
	"Rafael", "Clara", "Marcos", "Sofia"
]

sobrenomes = [
	"Silva", "Souza", "Oliveira", 
  "Santos", "Pereira", "Costa", 
  "Almeida", "Ferreira", "Gomes", "Barbosa"
]
```

Por exemplo:

```python
# exemplo 1: posição válida
Qual posição você procura? # 2
Quem ocupa a posição 2 é o(a)... João Gomes!

# exemplo 2: posição inválida
Qual posição você procura? # 0
Opa, essa posição é inválida!
```

{% toggle "Ver solução" %}

```python
nomes = [
  "Ana", "João", "Maria", 
  "Pedro", "Lucas", "Paula", 
  "Rafael", "Clara", "Marcos", "Sofia"
]

sobrenomes = [
  "Silva", "Souza", "Oliveira", 
  "Santos", "Pereira", "Costa", 
  "Almeida", "Ferreira", "Gomes", "Barbosa"
]

posicao = int(input("Qual posição você procura? "))

if posicao < 1 or posicao > len(nomes):
  print("Opa, essa posição é inválida!")
else:
  sobrenome = sobrenomes[len(sobrenomes) - posicao]
  nome_completo = f"{nomes[posicao - 1]} {sobrenome}"
  print(f"Quem ocupa a posição {posicao} é o(a)... {nome_completo}!")

```

{% endtoggle %}

{% links "Links da aula" %}
- [**Programiz - Online Python Compiler**](https://www.programiz.com/python-programming/online-compiler/)
- [**Learning Hub - Prof. Diego Pinho: Python - Listas**](https://hub.diegopinho.com.br/python/listas)
- [**Learning Hub - Prof. Diego Pinho: Python - Manipulando Listas**](https://hub.diegopinho.com.br/python/manipulando-listas)
{% endlinks %}