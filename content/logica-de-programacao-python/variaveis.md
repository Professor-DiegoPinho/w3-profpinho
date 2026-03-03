---
title: "Variáveis"
description: "Aprenda a armazenar entradas em variáveis, reutilizar valores e refatorar códigos para mais clareza em Python."
order: 3
---

- Quando usamos um comando de entrada como o `input()`, temos um problema:
    
    ```python
    input("Digite o seu nome: ")
    ```
    
- **Depois que a pessoa digita, pra onde vai essa informação?**
- A resposta é que essa informação se perde, mesmo se o seu programa ainda estiver em execução. Para guardá-la, precisamos pedir intencionalmente para o nosso programa armazenar essa informação.
- Para salvar uma informação na memória do computador, usamos **variáveis**!
- Variáveis nada mais são do que rótulos que atribuímos à memória do computador que podem guardar informações pra gente. Como neste caso:
    
    ```python
    # o nome digitado na entrada irá para a saída!
    nome = input("Digite o seu nome")
    print(nome)
    ```
    
- Podemos aproveitar e adicionar até mais informações à saída junto com a variável:
    
    ```python
    nome = input("Digite o seu nome")
    print("Seja bem-vindo(a) " + nome) 
    ## ou então: print(f"Seja bem-vindo(a) {nome}")
    ```
    

# 🧩 Exercícios

## Exercício 1: Historinha (Parte 2)

Na última aula você escreveu um programa que cria uma pequena historinha com as informações que o usuário vai inserir. Refatore este código e use variáveis.

- O que é refatorar?
    
    <aside>
    
    **O que é refatorar?**
    
    Refatorar um código significa reescrevê-lo para torná-lo mais claro, eficiente e fácil de manter, sem alterar seu comportamento. Por exemplo:
    
    ```jsx
    print(input("Qual é o seu nome?"))
    ```
    
    Pode ser refatorado para:
    
    ```jsx
    nome = input("Qual é o seu nome?")
    print(nome)
    ```
    
    O comportamento é o mesmo, mas agora está mais legível! 😉
    
    </aside>
    

Use este código como base (ou o que você mesmo fez):

```python
print("Um " + input("Digite um animal: ") + " foi até a " + input("Digite um lugar: ") + " e encontrou um(a) " + input("Digite um objeto: ") + " mágico!")
```

{% toggle "Ver solução" %}

```python
animal = input("Digite um animal: ")
lugar = input("Digite um lugar: ")
objeto = input("Digite um objeto: ")

print(f"Um {animal} foi até a {lugar} e encontrou um(a) {objeto} mágico!")
```

{% endtoggle %}

## Exercício 2: Ficha Completa

Escreva um programa que obtém os dados do usuário e os mostra em um resumo no final da operação. Por exemplo:

```python
Nome: # Edgar
Sobrenome: # Allan Poe
Data de Nascimento: # 19/01/1809

Edgar Allan Poe nascido(a) em 19/01/1809
```

{% toggle "Ver solução" %}

```python
nome = input("Nome: ")
sobrenome = input("Sobrenome: ")
data_nascimento = input("Data de Nascimento: ")

print(f"{nome} {sobrenome} nascido(a) em {data_nascimento}")
```

{% endtoggle %}

## Exercício 3: Gerador de personagens

Escreva um programa que pede ao usuário três informações para criar um personagem mágico para um jogo de RPG:

- Nome do personagem;
- Raça (ex.: elfo, anão, humano, orc…);
- Habilidade especial.

No final, o programa deve gerar um pequeno resumo assim:

```python
Nome do personagem: # Lyria
Raça: # Elfa
Habilidade especial: # Controlar a luz

Lyria, a Elfa, possui a habilidade de Controlar a luz. Uma nova aventura está prestes a começar!
```

{% toggle "Ver solução" %}

```python
nome = input("Nome do personagem: ")
raca = input("Raça: ")
habilidade = input("Habilidade especial: ")

print(f"{nome}, a(o) {raca}, possui a habilidade de {habilidade}. Uma nova aventura está prestes a começar!")
```

{% endtoggle %}

{% links "Links da aula" %}
- [**Programiz - Online Python Compiler**](https://www.programiz.com/python-programming/online-compiler/)
- [**Learning Hub Prof. Diego Pinho: Python - Variáveis**](https://hub.diegopinho.com.br/python/variaveis)
{% endlinks %}