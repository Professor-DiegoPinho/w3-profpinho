---
title: "Condições Aninhadas"
description: "Aprenda a lidar com múltiplos caminhos de decisão usando if aninhado e elif em classificações e regras de negócio."
order: 6
---

- Aprendemos que as condicionais nos permitem criar diferentes fluxos dentro do código. Como neste exemplo:
    
    ```python
    idade = int(input("Idade: "))
    if(idade>= 18):
    	print("Carteira de motorista habilitada!")
    else:
    	print("Carteira de motorista desabilitada!")
    ```
    
- Neste cenário, se a idade for maior ou igual a 18, o código acionado é o que está dentro do `if`. Caso contrário, será o código do `else`.
- **Mas o que fazer quando for necessário lidar com mais do que dois caminhos?**
- Por exemplo, vamos imaginar que desejamos implementar um algoritmo que classifica a pessoa de acordo com a sua idade:
    
    
    | criança | < 12 anos |
    | --- | --- |
    | adolescente | ≥ 18 anos |
    | adulto | ≥ 25 anos |
- Perceba que nesta situação temos 3 caminhos possíveis. Para conseguir implementar isso, precisamos fazer um **if aninhado**. Veja:
    
    ```python
    idade = int(input("Idade: "))
    if idade >= 25:
    	print("Adulto")
    else:
    	if idade >= 18:
    		print("Adolescente")
    	else:
    		print("Criança")
    ```
    
- Assim como tivemos que fazer agora, em alguns casos é necessário inserir um if dentro do outro para conseguir fazer o número de fluxos necessários para o código.
- Mas o código não precisa ficar desse jeito feio não. Assim como em outras linguagens de programação, o Python tem uma estrutura que permite unir o if e o else: no Python, ele é o `elif`.
- Vamos refatorar o código para usar essa nova estrutura:
    
    ```python
    idade = int(input("Idade: "))
    if idade >= 25:
    	print("Adulto")
    elif idade >= 18:
    	print("Adolescente")
    else:
    	print("Criança")
    ```
    
- Você pode usar quantos `elif` quiser, lembrando que o else sempre será o caminho acionado caso nenhum dos anteriores tenha sido.

# 🧩 Exercícios

## Exercício 1: Eu sou maior do que você!

Escreva um programa que determina, entre dois números, qual é o maior entre eles. Se os números forem iguais, deve mostrar que eles são iguais.

Exemplo:

```python
#exemplo 1
Insira o primeiro número: # 20
Insira o segundo número: # 40

O número 40 é maior

#exemplo 2
Insira o primeiro número: # 20
Insira o segundo número: # 20

Os números são iguais
```

{% toggle "Ver solução" %}

```python
n1 = int(input("Insira o primeiro número: "))
n2 = int(input("Insira o segundo número: "))

if n1 > n2:
  print(f"O maior número é: {n1}")
elif n2 > n1:
  print(f"O maior número é: {n2}")
else:
  print("Os números são iguais.")
```

{% endtoggle %}

## Exercício 2: Ainda dá pra recuperar?

Uma determinada escola tem o seguinte critério para definir se um(a) aluno(a) passou na matéria:

- Se média ≥ 7: Passou.
- Se média entre 5 e 7: Recuperação.
- Se média < 5: Reprovação.

Crie um programa que pede pela nota e determina o resultado com base nas regras acima:

```python
Média: 6.5
Resultado: Recuperação
```

{% toggle "Ver solução" %}

```python
media = float(input("Média: "))

if media >= 7:
	print("Resultado: Passou")
elif media >= 5:
	print("Resultado: Recuperação")
else:
	print("Resultado: Reprovação")
```

{% endtoggle %}

## Exercício 3: Estou gordinho ou é só impressão minha?

Crie um programa que calcula o IMC (Índice de Massa Corporal) de uma pessoa. O IMC é calculado pela fórmula:

```python
IMC = peso / (altura * altura)
```

O resultado varia de acordo com a classificação abaixo:

| **IMC** | **Classificação** |
| --- | --- |
| menor que 18.5 | Abaixo do peso |
| entre 18.5 e 24.9 | Peso normal |
| entre 25.0 e 29.9 | Sobrepeso |
| maior ou igual a 30 | Obesidade |

Por exemplo:

```python
Peso: # 72
Altura: # 1.75

Seu IMC é 23.51
Classificação: Peso normal
```

{% toggle "Ver solução" %}

```python
peso = float(input("Peso (kg): "))
altura = float(input("Altura (m): "))

imc = peso / (altura * altura)

print(f"\nSeu IMC é {imc:.2f}")

if imc < 18.5:
    print("Classificação: Abaixo do peso")
elif imc < 25:
    print("Classificação: Peso normal")
elif imc < 30:
    print("Classificação: Sobrepeso")
else:
    print("Classificação: Obesidade")
```

{% endtoggle %}

{% links "Links da aula" %}
- [**Programiz - Online Python Compiler**](https://www.programiz.com/python-programming/online-compiler/)
- [**Learning Hub - Prof. Diego Pinho: Python - Estruturas Condicionais**](https://hub.diegopinho.com.br/python/estruturas-condicionais)
{% endlinks %}