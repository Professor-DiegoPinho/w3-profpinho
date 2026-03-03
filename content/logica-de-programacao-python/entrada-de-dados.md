---
title: "Entrada de Dados"
description: "Aprenda a capturar dados do usuário com input(), montar mensagens dinâmicas e tornar seus programas interativos."
order: 2
---

- Aprendemos o comando `print()` do Python para exibir informações no console.
- Mas e quisermos enviar informações para um programa?
- Uma das formas de fazer isso é usando o comando `input()`.
- Ao inserir este comando no seu programa, o Python irá aguardar que o usuário insira alguma informação e então trará ela para dentro do programa.
- Como neste exemplo:
    
    ```jsx
    print("Seu nome é " + input("Digite o seu nome: ")
    ```
    
- Note que o comando `input()` recebe como parâmetro um texto que será exibido para o usuário para que ele saiba o que digitar (caso contrário, ficaria muito difícil dele adivinhar, né? rs) 😅
- E tanto no comando `input()` quanto `print()`, os espaços são respeitados. Utilize isso ao seu favor para evitar que ostextosfiquemtodos juntos, como eu acabei de fazer ai, rs.

# 🧩 Exercícios

## Exercício 1: Saudação personalizada

Escreva um programa que faz uma saudação personalizada ao usuário. Para fazer esta saudação, seu programa precisa saber o nome do usuário antes. A mensagem deve seguir o formato abaixo:

```python
Olá, <**nome>**! Seja bem-vindo(a)!
```

Exemplo:

```python
Qual é o seu nome? # diego
Olá, **diego**! Seja bem-vindo(a)!
```

{% toggle "Ver solução" %}

```python
print("Olá, "+ input("Qual é o seu nome? ") + "! Seja bem-vindo(a)!")
```

{% endtoggle %}

## Exercício 2: Historinha

Escreva um programa que cria uma pequena historinha com as informações que o usuário vai inserir. O usuário precisa inserir: um animal, um lugar e um objeto. A história tem o seguinte formato:

```python
Um **<animal>** foi até a **<lugar>** e encontrou um **<objeto>** mágico!
```

Exemplo:

```python
Digite um animal: # coelho
Digite um lugar: # floresta
Digite um objeto: # computador

Um **coelho** foi até a **floresta** e encontrou um **computador** mágico!
```

{% toggle "Ver solução" %}

```python
print("Um " + input("Digite um animal: ") + " foi até a " + input("Digite um lugar: ") + " e encontrou um(a) " + input("Digite um objeto: ") + " mágico!")
```

{% endtoggle %}

## Exercício 3: Receita Maluca

Escreva um programa que cria uma receita maluca com as informações fornecidas pelo usuário. O usuário deve inserir: um ingrediente, um utensílio de cozinha e um adjetivo. A receita deve seguir este formato:

```python
Com apenas **<ingrediente>**, um(a) **<utensilio>** e um toque **<adjetivo>**, 
você criou a receita mais inesperada do mundo!
```

Exemplo:

```python
Digite um ingrediente: # chocolate
Digite um utensílio de cozinha: # colher
Digite um adjetivo: # brilhante

Com apenas **chocolate**, um(a) **colher** e um toque **brilhante**, 
você criou a receita mais inesperada do mundo!
```

{% toggle "Ver solução" %}

```python
print("Com apenas " + input("Digite um ingrediente: ") + ", um " + input("Digite um utensílio: ") + " e um toque " + input("Digite um adjetivo: ") + ", você criou a receita mais inesperada do mundo!")
```

{% endtoggle %}

{% links "Links da aula" %}
- [**Programiz - Online Python Compiler**](https://www.programiz.com/python-programming/online-compiler/)
- [**Learning Hub Prof Diego: Python - Primeiras Impressões**](https://hub.diegopinho.com.br/python/primeiras-impressoes)
{% endlinks %}