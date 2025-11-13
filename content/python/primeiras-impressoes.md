---
title: "Primeiras impressões"
description: "O interpretador interativo do Python e a impressão de suas primeiras linhas de código."
order: 3
---

Se você já instalou o Python, agora é hora de vê-lo em ação! Nada melhor do que colocar a mão no teclado e usar seu primeiro comando.

## Acessando o interpretador do Python

O jeito mais rápido de começar a usar o Python é através da linha de comando (CLI — *Command Line Interface*). A CLI permite que você interaja com o Python diretamente do terminal.

No **Windows**, abra o **Prompt de Comando** e digite:

```bash
python
```

Se esse comando não funcionar, tente com este:

```bash
py
```

No **macOS** ou **Linux**, o comando padrão geralmente é:

```bash
python3
```

Assim que o interpretador do Python abrir no seu terminal, você verá algo parecido com isto:

```bash
Python 3.13.8 (main, Oct  8 2025, 08:53:24) [GCC 11.4.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>>
```

Esses três sinais de `>>>` indicam que o Python está pronto para receber seus comandos. E é aqui que a mágica começa!


## Como o print() funciona

A função `print()` serve para **exibir informações na tela**, seja um texto, número ou até o resultado de uma conta. Tudo que estiver dentro dos parênteses será mostrado no terminal.

Tradicionalmente, o primeiro programa que escrevemos em qualquer linguagem costuma ser o **Hello, World!**.

Ele é uma forma simples (e simbólica) de testar se tudo está funcionando corretamente. É como se fosse o primeiro "olá" entre você e a linguagem, marcando o início da sua jornada como programador(a) nela.

Digite no terminal:

```python
print('Hello, world!')

# Saída:
# Hello, world!
```

Parabéns! 🎉 Você acabou de rodar seu primeiro código Python!


## Imprimindo em uma ou múltiplas linhas

Você pode usar a função `print()` quantas vezes quiser para imprimir várias linhas. Cada vez que você usar essa função, uma nova linha será criada na saída.

Por exemplo:

```python
print('Acabei de dar meu primeiro "Hello, world!" em Python!')
print('Estou muito feliz!')

# Saída:
# Acabei de dar meu primeiro "Hello, world!" em Python!
# Estou muito feliz!
```

Se você quiser mudar esse comportamento padrão do `print()`, você pode usar o parâmetro `end` para manter as impressões na mesma linha. Veja só:

```python
print('Olá,', end=' ')
print('mundo!')

# Saída:
# Olá, mundo!
```

O espaço dentro de `end=' '` garante que as palavras não fiquem grudadas.

## Aspas simples ou duplas?

Em Python, textos precisam estar entre aspas simples `' '` ou duplas `" "`. Ambas funcionam:

```python
print("Assim funciona!")
print('Assim também funciona!')

# Saída:
# Assim funciona!
# Assim também funciona!
```

Agora, repare de novo nesse exemplo que usamos acima:

```python
print('Acabei de dar meu primeiro "Hello, world!" em Python!')

# Saída:
# Acabei de dar meu primeiro "Hello, world!" em Python!
```

Usar aspas simples para começar e finalizar o texto que você vai imprimir permite que esse texto contenha aspas duplas dentro dele, e vice-versa.

Se você colocar as aspas duplas por fora, pode usar as aspas simples dentro dele.

```python
print("Acabei de dar meu primeiro 'Hello, world!' em Python!")

# Saída:
# Acabei de dar meu primeiro 'Hello, world!' em Python!
```

Isso é bem útil quando você quer exibir frases que já possuem citações ou expressões entre aspas.

Mas se você esquecer de colocar as aspas, o Python vai reclamar:

```python
print(Hello world)

# Saída:
# SyntaxError: invalid syntax
```

Nesse caso, o Python não consegue detectar que você quer imprimir um texto. Ele vai dizer que a sintaxe usada é inválida, ou seja, ele não entendeu o que você quis dizer.

## Trabalhando com números

Você também pode imprimir números diretamente:

```python
print(11)
print(2025)

# Saída:
# 11
# 2025
```

E pode misturar texto com números separando por vírgulas:

```python
print("Eu tenho", 31, "anos.")

# Saída:
# Eu tenho 31 anos.
```

## Saindo do modo interativo

Quando quiser sair do interpretador, basta digitar:

```python
exit()
```

ou usar o atalho **Ctrl + Z** (no Windows) ou **Ctrl + D** (no macOS/Linux).

## Para além do terminal

Por enquanto, todos os nossos testes estão sendo feitos diretamente no terminal, mas logo veremos como criar **arquivos Python (.py)** para guardar e executar os programas de forma mais organizada.
