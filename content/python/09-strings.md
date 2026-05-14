---
title: "Strings"
description: "Como trabalhar com textos em Python"
order: 09
---

# O que é uma string

String é um texto entre aspas simples ou duplas:

```python
print("Olá, mundo!")
print('Olá, mundo!')

# Olá, mundo!
# Olá, mundo!
# Ambas as formas funcionam, escolha a que preferir.
```

# Armazenando em variáveis

```python
nome = "Diego"
print(nome)  # Diego

mensagem = 'Bem-vindo!'
print(mensagem)
```

# String vazia

Uma string sem conteúdo:

```python
texto = ""
print(type(texto))  # <class 'str'>
```

# Aspas dentro de aspas

Alterne os tipos para usar aspas dentro:

```python
print("Ele disse: 'Olá!'")
print('Ela respondeu: "Oi!"')
```

Se precisar do mesmo tipo, use a barra invertida `\`:

```python
print("Ele disse: \"Olá\"")
print('Ela respondeu: \'Oi\'')
```

# Strings em múltiplas linhas

Use três aspas:

```python
texto = """Este é um texto
que ocupa várias
linhas."""

print(texto)

# Saída:
# Este é um texto
# que ocupa várias
# linhas.
```

# Verificando conteúdo

Use `in` para verificar se algo está em uma string:

```python
texto = "Python é divertido!"
print("Python" in texto)       # True
print("Java" in texto)         # False
print("C++" not in texto)      # True
```

# Concatenação

Use strings com `+`:

```python
nome = "Diego"
sobrenome = "Pinho"
completo = nome + " " + sobrenome
print(completo)  # Diego Pinho
```

Também funciona com vírgulas no print:

```python
print(nome, sobrenome)  # Diego Pinho
```
