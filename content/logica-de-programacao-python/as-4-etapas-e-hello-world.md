---
title: "As 4 etapas e Hello World"
description: "Conheça as quatro etapas de um algoritmo (entrada, armazenamento, processamento e saída) e crie seu primeiro Hello World em Python."
order: 1
---

## 4 etapas de funcionamento de um computador/programa

- Todos os programas de computador são escritos em **linguagens de programação**, ou seja, uma linguagem intermediária entre a linguagem humana e a linguagem de máquina.
- Todo programa de computador executa um ou mais **algoritmos**, ou seja, um conjunto finitos de etapas para um fim específico.
- Basicamente todos os programas de computador podem ser divididos em quatro etapas:
    1. **Entrada:** o programa recebe informações externas, como números, textos, imagens, sinais de sensores, etc.
    2. **Armazenamento:** o programa guarda essas informações em sua memória;
    3. **Processamento:** o programa faz uma série de cálculos com essas informações;
    4. **Saída:** o programa gera saída, como uma imagem, um texto e assim por diante.
- As etapas de armazenamento podem ocorrer inúmeras vezes dependendo do algoritmo.
    
    ![representação do funcionamento do algoritmo](https://prod-files-secure.s3.us-west-2.amazonaws.com/ce5f4b7d-f4c4-4917-a5c4-34763d262b94/1bfd845e-8584-4a08-acec-e787f569fa30/image.png)
    
    representação do funcionamento do algoritmo
    

## O Python

- O **Python** é uma excelente linguagem de programação, assim como o JavaScript, pois se trata de uma **linguagem alto nível**, ou seja, mais próxima da linguagem falada pelos humanos do que pela máquinas (binário).
- Podemos usar o Python basicamente de duas formas:
    1. Instalando na máquina;
    2. Usando alguma plataforma.
- Iremos pela segunda opção. Para isso, usaremos o [**Programiz](https://www.programiz.com/python-programming/online-compiler/).**
- A linguagem Python tem inúmeros comandos diferentes, mas começaremos com um em especial:
    
    ```python
    print("Olá mundo!") # gera uma mensagem de saída no console
    ```
    

# 🧩 Exercícios

## Exercício 1: Olá, mundo!

Escreva o seu primeiro programa em Python! Seu programa deve exibir a mensagem: “Olá, mundo!”. Exemplo:

```python
Olá, mundo!
```

{% toggle "Ver solução" %}

```python
print("Olá, mundo!")
```

{% endtoggle %}

## Exercício 2: Conversinha no terminal

Escreva um programa que simule o diálogo entre dois (ou mais) personagens. Exemplo: 

```python
Olá, Maria! Tudo bem?
Oi, Lucas! Estou bem, e você?
Estou ótimo! Como foi seu dia?
```

{% toggle "Ver solução" %}

```python
print("Ana: Oi, Bruno! Você viu meu livro por aí?")
print("Bruno: Oi, Ana! Acho que ele está na mesa da sala.")
print("Ana: Ah, verdade! Obrigada 😊")
print("Bruno: De nada! Precisa de mais alguma coisa?")
print("Ana: Não, só isso mesmo.")
```

{% endtoggle %}

## Exercício 3: Cartão de Visitas

Escreva um programa que represente o seu cartão de visitas pessoal virtual. O cartão de visita deve ter pelo menos 3 informações:

- Nome;
- Profissão;
- E-mail.

Exemplo:

```python
************************
Nome: João Silva  
Profissão: Dev
Cidade: São Paulo
************************
```

{% toggle "Ver solução" %}

```python
print("************************")
print("Nome: João Silva")
print("Profissão: Dev")
print("Cidade: São Paulo")
print("************************")
```

{% endtoggle %}

## Exercício 4: Sou um artista! *(desafio)*

Já ouviu falar em arte ASCII? É basicamente arte feita somente com caracteres que existem no seu teclado. Faça um programa que exiba uma arte feita em ASCII, como por exemplo, uma casinha.

Exemplo:

```python
   /\   
  /  \  
 /____\ 
 | [] | 
 |____|
```

{% toggle "Ver solução" %}

```python
print("   /\\   ")
print("  /  \\  ")
print(" /____\\ ")
print(" | [] | ")
print(" |____| ")
```

{% endtoggle %}

{% links "Links da aula" %}
- [**Programiz - Online Python Compiler**](https://www.programiz.com/python-programming/online-compiler/)
- [**Learning Hub Prof Diego: Python - Primeiras Impressões**](https://hub.diegopinho.com.br/python/primeiras-impressoes)
{% endlinks %}