---
title: "Variáveis"
description: "Como criar e usar variáveis em Python"
order: 06
---

# Variáveis

Uma variável é um "rótulo" que você dá a um valor para poder usá-lo depois. Em Python, você não precisa declarar o tipo da variável, basta atribuir um valor a ela e o Python irá inferir o tipo automaticamente. 

```python
nome = "Diego"
idade = 30
altura = 1.75

print(nome)
print(idade)
print(altura)

# Saída:
# Diego (string)
# 30 (int)
# 1.75 (float)
```

## Criando variáveis

Você cria uma variável quando a atribui um valor. Python descobre o tipo automaticamente.

```python
x = 10           # inteiro
y = "texto"      # string
z = 3.14         # float
ativo = True     # booleano
```

## Mudando o valor

Você pode reatribuir valores a qualquer momento, inclusive mudando o tipo:

```python
x = 30
x = "Diego"  # agora é texto
x = 3.14     # agora é float
```

## Múltiplas variáveis

Criar várias variáveis ao mesmo tempo:

```python
x, y, z = "Gato", "Cachorro", "Coelho"
print(x, y, z)  # Gato Cachorro Coelho
```

Ou atribuir o mesmo valor a várias:

```python
x = y = z = "Gato"
print(x, y, z)  # Gato Gato Gato
```

## Nomes de variáveis

Use `snake_case` (minúsculas com underscore):

```python
nome_completo = "Diego Pinho"
data_nascimento = 1994
anos_experiencia = 10
```

**Regras:**
- Não comece com número: `nome`, não `1nome`
- Use apenas letras, números e underscore
- Diferenciam maiúsculas de minúsculas: `Nome` ≠ `nome`
