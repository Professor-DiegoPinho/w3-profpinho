---
title: "Laço de Repetição While"
description: "Use o while para repetições condicionais, validação de entrada, menus e controle de loops com break e contador."
order: 11
---

Aprendemos como usar o laço de repetição `for…in range` para quando sabemos exatamente quantas vezes o número de vezes que vamos repetir algo. **Mas e quando não sabemos?** A vida (e principalmente o usuário) é imprevisível e nem sempre teremos esse dado de antemão. Vamos levar em consideração este pequeno código, por exemplo:

```python
numero = int(input("Insira um número maior que zero"))
if numero <= 0:
	print("Número inválido! Tente novamente")
else:
	print(f"Você escolheu o número {numero}")
```

Do jeito que este programa está agora, o usuário tem apenas uma tentativa de escolher o número correto. Caso ele erre, é necessário reiniciar todo o programa para que ele possa tentar novamente. **Como podemos fazer para que ele possa tentar quantas vezes for preciso sem o programa se interrompido?**

O que queremos fazer é algo do tipo: *"enquanto o número não for maior que zero o usuário precisa inserir novamente”.* Essa palavra enquanto traz consigo uma semântica muito forte na programação, pois podemos criar repetições atreladas a condições usando o `while` (enquanto em inglês).

Então ao invés de atrelar a condição ao `if`, passaremos ela a este novo tipo de repetição:

```python
numero = int(input("Insira um número maior que zero"))

while (numero <= 0):
	print("Número inválido! Tente novamente")
	numero = int(input("Insira um número maior que zero"))

print(f"Você escolheu o número {numero}")
```

Note que aqui podemos repetir a ação de escolher um número entre 1 a N vezes: tudo depende do comportamento do usuário. Esse tipo de repetição pode ser muito útil também, por exemplo, para a construção de menus. Olha só:

```python
while(True):
	print("Selecione 1 para o hello world ou 0 para sair")
	escolha = int(input("Faça sua escolha: "))
	if escolha == 1:
		print("Hello World")
	else:
		print("O programa será encerrado")
		break
```

Note que aqui no `else` usamos uma palavrinha nova, o `break`. Este é o termo que usamos sempre que precisamos abortar um laço de repetição. Quando colocamos o `True` no `while`, dizemos que ele está em um loop infinito. Se não colocamos uma forma de encerrar este loop, ele pode acabar consumindo toda a memória do seu computador. Tenta ai, rs!

```python
while(True):
	print("Estou preso em um loop infinito!")
```

Apesar da nossa brincadeira, tenha sempre em mente que a condição do loop `while` PRECISA de alguma forma ser quebrada. Como neste exemplo aqui:

```python
contador = 5

while contador > 0:
    print(f"Faltam {contador} segundos para o lançamento!")

print("Foguete lançado!")
```

Ao rodar este código vivenciamos toda a intensidade de um loop infinito. Isso acontece porque o contador, atrelado a condição, nunca tem ser valor alterado. Ou seja, estamos mais uma vez em um `while(True)`. Para resolver, basta fazer um decremento na variável:

```python
contador = 5

while contador > 0:
    print(f"Faltam {contador} segundos para o lançamento!")
    contador = contador - 1

print("Foguete lançado!")
```

Agora sim! Sai pra lá loop infinito! 🔁

# 🧩 Exercícios

## Exercício 1: O ego do professor

Faça um programa em que o usuário precisa responder a seguinte pergunta:

```python
Quem é o melhor professor do mundo?
```

O programa deve repetir a pergunta até que o usuário responda com a única resposta possível: “diego pinho”. Por exemplo:

```python
Quem é o melhor professor do mundo? #joãozinho
Quem é o melhor professor do mundo? #luana
Quem é o melhor professor do mundo? #diego pinho
Você é um amorzinho de pessoa <3
```

{% toggle "Ver solução" %}

```python
professor = ""
while (professor != "diego pinho"):
	professor = input("Quem é o melhor professor do mundo? ")
print("Você é um amorzinho de pessoa <3")

```

{% endtoggle %}

## Exercício 2: Mudando de perspectiva

O `for…in` não é a única forma de iterar no Python. Também podemos usar o `while`. Sabendo disso, refatore a repetição abaixo para usar a estrutura do `while` ao invés do `for..in`.

Código:

```python
numeros = [1,2,3,4,5,6,7,8,9,10]
for numero in range(len(numeros)):
    print(numero)
```

{% toggle "Ver solução" %}

```python
numeros = [1,2,3,4,5,6,7,8,9,10]
contador = 0
while(contador < len(numeros)):
    numero = numeros[contador]
    print(numero)
    contador = contador + 1
```

{% endtoggle %}

## Exercício 3: Só pare quando eu avisar

Elabore um programa que faz a soma dos números que o usuário inserir enquanto eles forem positivos. A partir do momento que o usuário inserir um número menor que zero, a conta deve ser encerrada.

Por exemplo:

```python
Digite um número: 5  
Digite um número: 8  
Digite um número: 3  
Digite um número: -1  
A soma dos números é: 16
```

{% toggle "Ver solução" %}

```python
valor = 0
soma = 0
while(valor >= 0):
    soma += valor
    valor = int(input("Digite um número: "))
print(f"A soma dos números é: {soma}")
```

{% endtoggle %}

## Exercício 4: Duvido você acertar

Para ensinar as crianças a aprenderem a tabuada uma professora começou a codar um jogo usando a linguagem de programação Python:

```python
import random

n1 = random.randint(1,10)
n2 = random.randint(1,10)

resultado = n1 * n2

print(f"Qual é o resultado da conta {n1} x {n2}?")
chute = int(input("Resultado: "))

if(resultado == chute):
    print("Parabéns, você acertou!")
else:
    print("Poxa, você errou! Tente novamente!")
```

O código funciona muito bem, mas a professora gostaria que o aluno pudesse tentar até acertar. Com base no que você aprendeu com o laço de repetição while, faça com que esse jogo repita até o aluno acertar. Por exemplo:

```python
Qual é o resultado da conta 5 x 4?
Resultado: 21
Poxa, você errou! Tente novamente!
Qual é o resultado da conta 5 x 4?
Resultado: 22
Poxa, você errou! Tente novamente!
Qual é o resultado da conta 5 x 4?
Resultado: 20
Parabéns, você acertou!
```

{% toggle "Ver solução" %}

```python
import random

n1 = random.randint(1,10)
n2 = random.randint(1,10)

resultado = n1 * n2
chute = 0

while (chute != resultado):
    print(f"Qual é o resultado da conta {n1} x {n2}?")
    chute = int(input("Resultado: "))
    if(resultado == chute):
        print("Parabéns, você acertou!")
    else:
        print("Poxa, você errou! Tente novamente!")
```

{% endtoggle %}

{% links "Links da aula" %}
- [**Programiz - Online Python Compiler**](https://www.programiz.com/python-programming/online-compiler/)
{% endlinks %}