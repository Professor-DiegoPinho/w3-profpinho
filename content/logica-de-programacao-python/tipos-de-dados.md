---
title: "Tipos de Dados"
description: "Entenda tipagem no Python, diferenças entre str, int, float e bool, e como converter valores para evitar erros em cálculos."
order: 4
---

- As variáveis são capazes de guardar qualquer coisa, no entanto, as coisas ocupam espaços diferentes na memória do computador.
- Um texto, um número inteiro, um “número quebrado”… todos eles exigem espaços diferentes na memória da computador e por conta disso são administrados de forma distinta pelo Python, mesmo que você não indique isso explicitamente.
- Chamamos isso de **tipagem fraca**, ou seja, você não precisa discriminar o tipo de dado de forma explícita. Você encarrega esse trabalho para o programa.
- Mas mesmo que não seja necessário dizer ao Python que tipo de informação estamos inserindo, isso eventualmente pode gerar confusões e erros. Como neste caso:
    
    ```python
    n1 = input("Primeiro valor: ")
    n2 = input("Segundo valor: ")
    soma = n1 + n2
    print("O valor da soma é... " + soma)
    ```
    
- A lógica do programa está certa, mas ao tentarmos executar…
    
    ```python
    Primeiro valor: 8
    Segundo valor: 8
    O valor da soma é... 88
    ```
    
- **Por que o programa juntou os números ao invés de somá-los?**
- Isso aconteceu porque o programa interpretou os números como textos!
- Uma situação semelhante de erro acontece quando tentamos, por exemplo, subtrair textos:
    
    ```python
    print("abacate" - "cate")
    ```
    
- Ao tentar fazer isso, obtemos o erro:
    
    ```python
    ERROR!
    Traceback (most recent call last):
      File "<main.py>", line 1, in <module>
    TypeError: unsupported operand type(s) for -: 'str' and 'str'
    ```
    
- Este erro basicamente nos diz: *“Ei, não posso fazer uma operação de - entre duas strings”*.
- É por isso que em algumas situações precisaremos fazer a conversão de tipos manualmente:
    
    ```bash
    n1 = int(input("Primeiro valor\n"))
    n2 = int(input("Segundo valor\n"))
    soma = n1 + n2
    print(f"O valor da soma é... {soma}") # 3
    ```
    
- Os principais tipos, chamados de **tipos primitivos**, por ora, são:
    - Textos: `str` (string);
    - Numéricos: `int` (números inteiros), `float` (números quebrados);
    - Booleanos: `bool` (verdadeiro/falso).

# 🧩 Exercícios

## Exercício 1: Você não me parece velho(a)

Escreva um programa que receba o ano de nascimento do usuário e descubra quantos anos ele tem. Exemplo:

```python
Insira o seu ano de nascimento: # 1992
Você tem 33 anos!
```

{% toggle "Ver solução" %}

```python
ano_nascimento = int(input("Digite o ano de nascimento: "))
ano_atual = 2025
idade = ano_atual - ano_nascimento

print(f"Você tem {idade} anos!")
```

{% endtoggle %}

## Exercício 2: Posso dar o troco em bala?

Escreva um programa que receba o valor de uma compra, o pagamento feito pelo cliente e diga quanto precisa retornar de troco:

```python
Qual é o valor da compra? # 37.50
Quanto o cliente pagou? # 40.00
O valor do troco é: 2.50
```

{% toggle "Ver solução" %}

```python
valor_compra = float(input("Qual é o valor da compra? "))
valor_pago = float(input("Quanto o cliente pagou? "))

troco = valor_pago - valor_compra

# usamos o .2f para formatar o valor com duas casas decimais
# mas não é obrigatório usar
print(f"O valor do troco é: {troco:.2f}")
```

{% endtoggle %}

## Exercício 3: Eu te juro que o código está certo!

Uma pessoa estudante de programação fez um código de soma bastante trivial mas que para a sua surpresa não dá o resultado correto. Ao tentar somar os números 20 e 25 o resultado sai 2025 ao invés de 45. 

Avalie o código abaixo e o conserte fazendo as alterações que julgar necessário:

```python
n1 = input("Primeiro número: ")
n2 = input("Segundo número: ")
soma = n1 + n2
print(f"O resultado da soma é: {soma}")
```

{% toggle "Ver solução" %}

```python
n1 = int(input("Primeiro número: "))
n2 = int(input("Segundo número: "))
soma = n1 + n2
print(f"O resultado da soma é: {soma}")
```

{% endtoggle %}

{% links "Links da aula" %}
- [**Programiz - Online Python Compiler**](https://www.programiz.com/python-programming/online-compiler/)
- [**Learning Hub Prof. Diego Pinho: Python - Tipos de dados**](https://hub.diegopinho.com.br/python/tipos-de-dados)
{% endlinks %}