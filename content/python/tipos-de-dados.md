---
title: "Tipos de dados"
description: "Os principais tipos de dados em Python e como usá-los"
order: 4
---

# Tipos de dados
Apesar de ser uma linguagem de tipagem dinâmica, ou seja, você não precisa declarar o tipo de uma variável ao criá-la (como vimos na lição anterior), o Python oferece uma variedade de tipos de dados embutidos (chamados de tipos primitivos) que permitem armazenar e manipular diferentes tipos de informações.

Estão alguns dos tipos de dados mais comuns (que inclusive também estão presentes em outras linguagens de programação):

## Números

O Python suporta vários tipos numéricos, incluindo inteiros (`int`), números de ponto flutuante (`float`) e números complexos (`complex`).

Por exemplo:

```python
idade = 25  # Tipo int
altura = 1.75  # Tipo float
numero_complexo = 2 + 3j  # Tipo complex
```

## Strings

As strings são sequências de caracteres (ou seja, textos) e podem ser definidas usando aspas simples (`'`) ou duplas (`"`). O Python oferece vários métodos para manipulação de strings, como concatenação, fatiamento e formatação.

Por exemplo:

```python
nome = "João"
print('Olá, ' + nome + '!')  # Saída: Olá, João!
print(f"Olá, {nome}!")  # Usando f-strings
```

## Booleanos

O tipo booleano (`bool`) representa valores verdadeiros ou falsos. Em Python, os valores booleanos são `True` e `False` (repare na letra maiúscula).

```python
is_estudante = True
is_empregado = False
```

## Outros tipos de dados
Além dos números e strings, o Python possui outros tipos de dados embutidos, como:
- **Listas (`list`)**: Coleções ordenadas e mutáveis de itens;
- **Dicionários (`dict`)**: Coleções não ordenadas de pares chave-valor;
- **Tuplas (`tuple`)**: Coleções ordenadas e imutáveis de itens;
- **Conjuntos (`set`)**: Coleções não ordenadas de itens únicos.

Por exemplo:

```python
# Lista
frutas = ["maçã", "banana", "laranja"]
# Dicionário
pessoa = {"nome": "Ana", "idade": 30}
# Tupla
coordenadas = (10.0, 20.0)
# Conjunto
numeros_unicos = {1, 2, 3, 4, 5}
```

## Como verificar o tipo de uma variável
Como a tipagem no Python é dinâmica, muitas vezes não vamos ter certeza do tipo de uma variável. Podemos usar a função `type()` para verificar isso. Por exemplo:

```python
print(type(idade))  # Saída: <class 'int'>
print(type(nome))  # Saída: <class 'str'>
```

## Casting (conversão de tipos)
Na maior parte das vezes a tipagem dinâmica vai dar conta do recado, no entanto, as vezes precisaremos converter explicitamente entre tipos. Conseguimos fazer isso entre diferentes tipos de dados usando *funções de casting*, como `int()`, `float()`, `str()`, entre outras.

Olha só como é fácil:

```python
# Convertendo float para int -> ou seja, queremos só a parte inteira
altura = 1.75
altura_inteira = int(altura)  # 1

# Convertendo int para float
idade = 25
idade_float = float(idade)  # 25.0

# Convertendo int para str
numero = 42
numero_str = str(numero)  # "42"
```
