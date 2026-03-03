---
title: "Tipos Booleanos e Condicionais"
description: "Descubra como comparações geram True e False e use if/else para tomar decisões com base em condições no Python."
order: 5
---

## Valores booleanos

- Além dos inteiros e dos textos (strings), há um outro tipo muito comum no Python, o booleano (`bool`). Junto com os demais, eles são chamados de **tipos primitivos**.
- Uma variável do tipo booleano só pode assumir dois valores: `True` ou `False`.
- Esse valores são especialmente úteis quando pedimos para o computador fazer comparações:
    
    ```python
    # Igualdade ==
    1 == 1  # => True
    2 == 1  # => False
    
    # Não Igualdade !=
    1 != 1  # => False
    2 != 1  # => True
    
    # Mais comparações
    1 < 10  # => True
    1 > 10  # => False
    2 <= 2  # => True
    ```
    
- **Mas porque fazer comparações e usar valores booleanos pode ser útil?**
- Eles são extremamente úteis porque conseguimos tomar decisões no nosso código e mudar o seu funcionamento com base nessas comparações. Por exemplo:
    
    ```python
    SE (IDADE >= 18): # idade maior ou igual a 18
    	# Está permitido
    SE NÃO
    	# Não está permitido
    ```
    
- Em Python fazemos isso usando **condicionais**!

## Condicionais

- As condicionais são provavelmente a ferramenta mais poderosa que você aprenderá dentro do mundo da programação (ou pelo menos por enquanto).
- Com este mecanismo, você consegue fazer com que seu código execute coisas diferentes dependendo do resultado de uma (ou mais) comparação(ões).
- Como neste exemplo:
    
    ```python
    idade = int(input("Qual é a sua idade?"))
    if (idade >= 18):
    	print("Você é maior de idade!")
    else
    	print("Você é menor de idade!")
    ```
    
- Note que a estrutura que usamos é o `if-else`.
- O `if` é um tipo de estrutura que “ativa” o código aninhado à ele se, e somente se, a comparação inserida nele for verdadeira. Neste caso, se inserirmos qualquer valor de idade que seja maior ou igual a dezoito, recebemos a mensagem `Você é maior de idade`.
- Caso uma condição não seja verdadeira, podemos também atribuir um comportamento a ela. Para isso, unimos um `else` ao `if`.

# 🧩 Exercícios

## Exercício 1: Esse brinquedo é para crianças

Escreva um programa que recebe a idade do usuário e indica se ele está apto ou não a entrar no brinquedo. O brinquedo é para crianças menores de **12 anos**.

Exemplo:

```python
# exemplo 1 -> permitido
Qual é a sua idade? # 10
Você pode brincar!

# exemplo 2 -> não permitido
Qual é a sua idade? # 14
Você não pode brincar!
```

{% toggle "Ver solução" %}

```python
idade = int(input("Digite sua idade: "))
idade_limite = 12

if idade <= idade_limite:
  print("Você pode brincar!")
else:
  print("Você não pode brincar!")
```

{% endtoggle %}

## Exercício 2: Só para os marombas altos

Uma academia só permite que pessoas com altura igual ou superior a 1.60 usem um determinado aparelho. Peça a altura do usuário e se ele pode usar o equipamento.

Exemplo:

```python
Qual a sua altura? # 1.50
Você não pode usar este aparelho.
```

{% toggle "Ver solução" %}

```python
altura = float(input("Qual é a sua altura? "))
if altura >= 1.60:
	print("Bom exercício!")
else:
	print("Você não pode usar este aparelho.")
```

{% endtoggle %}

## Exercício 3: Aplicando o cupom

Uma determinada loja está oferecendo 10% de desconto para quem usar o cupom `LINDODEMAIS` na compra dos produtos. Complete o código abaixo para liberar o desconto caso o usuário tenha o cupom e o insira corretamente.

Exemplo:

```python
Qual o valor total da compra # 100.00
Tem cupom (sim/não)? # sim
Qual é o cupom? # LINDODEMAIS

Preço final: R$ 90.00
```

{% toggle "Ver solução" %}

```python
valor = float(input("Digite o valor total da compra: "))
valor_final = valor
tem_cupom = input("Você possui cupom de desconto? (sim/não): ")
if tem_cupom == "sim":
  cupom = input("Digite o código do cupom: ")
  if cupom == "LINDODEMAIS":
    desconto = valor * 0.10
    valor_final = valor - desconto
  else:
    print("Cupom inválido. Nenhum desconto aplicado.")

print("Preço final: R$", valor_final)
```

{% endtoggle %}

{% links "Links da aula" %}
- [**Programiz - Online Python Compiler**](https://www.programiz.com/python-programming/online-compiler/)
- [**Learning Hub Prof. Diego Pinho: Python - Booleanos**](https://hub.diegopinho.com.br/python/booleanos)
- [**Learning Hub Prof. Diego Pinho: Python - Estruturas Condicionais**](https://hub.diegopinho.com.br/python/estruturas-condicionais)
{% endlinks %}