---
id: "f00a0077d5d1"
title: "Primeiras Impressões"
description: "Usar Python pela primeira vez"
order: 03
---

# Abrir o interpretador

**Windows**:

Abra o Prompt de Comando ou o PowerShell e digite:

```bash
python
```

ou

```bash
py
```

**macOS/Linux**:

```bash
python3
```

Você verá:

```
Python 3.x.x (...)
>>>
```
Esses símbolos `>>>` indicam que você está no interpretador interativo do Python, onde pode digitar comandos e ver os resultados imediatamente.

# Seu primeiro programa

Digite:

```python
print("Hello, world!")
```

**Saída**:

```
Hello, world!
```

# Imprimir várias linhas

```python
print("Linha 1")
print("Linha 2")

# Linha 1
# Linha 2
```

# Manter na mesma linha

Use `end`:

```python
print("Olá,", end=" ")
print("mundo!")

# Olá, mundo!
```

# Aspas simples vs duplas

Ambas funcionam:

```python
print("Texto com duplas")
print('Texto com simples')

# Texto com duplas
# Texto com simples
```

# Sair do interpretador

Digite:

```python
exit()
```

ou pressione `Ctrl+D` (Linux/macOS) / `Ctrl+Z + Enter` (Windows)

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