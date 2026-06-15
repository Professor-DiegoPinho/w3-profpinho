---
id: "46ca698fa0e4"
title: "Boas práticas com variáveis"
description: "Como receber dados do usuário e nomear variáveis de forma clara"
order: 07
---

# Recebendo dados do usuário

A função `input()` pausa o programa e aguarda o usuário digitar:

```python
nome = input("Qual é o seu nome? ")
print("Olá,", nome)
```

**Importante:** `input()` sempre retorna uma string, mesmo se o usuário digitar um número:

```python
idade = input("Quantos anos você tem? ")
print(type(idade))  # <class 'str'>

# Para converter:
idade = int(input("Quantos anos? "))  # agora é inteiro
```

# Imprimindo variáveis

Sem aspas, Python entende que é uma variável:

```python
nome = "Diego"
print(nome)    # Diego
```

Com aspas, é um texto literal:

```python
print("nome")  # nome (texto)
print(nome)    # Diego (valor da variável)
```

# Regras para nomes

- Começar com letra ou `_`
- Conter apenas letras, números e `_`
- Case-sensitive: `nome` ≠ `Nome`
- Não usar palavras reservadas: `class`, `True`, `False`, etc.

```python
# Válidos:
nome_completo = "Diego"
_variavel = 123
idadeUsuario = 30

# Inválidos:
2nome = "teste"
meu-nome = "teste"
class = 5
```

# Evite sobrescrever funções nativas

Não use como nome de variável: `print`, `input`, `str`, `int`, `float`, `len`, `type`

Isso as desativa:

```python
print = "Olá"  # print() deixa de funcionar
print(5)       # Erro!
```
# Uma mensagem de erro aparecerá quando você tentar usá-lo:

print(print)

# Saída:
# Traceback (most recent call last):
#   File "<python-input-1>", line 1, in <module>
#     print(print)
#     ~~~~~^^^^^^^
# TypeError: 'str' object is not callable
```

Portanto, evite usar esses nomes nas suas variáveis. Mas se for muito importante que o nome contenha alguma dessas palavras, adicione um prefixo ou sufixo descritivo:

```python
meu_print = "Olá, mundo!"
texto_str = "Mensagem exemplo"
```

## Boas práticas para nomear variáveis

Por convenção, usamos o padrão **snake_case** para nomear variáveis com mais de uma palavra. Isso significa que as palavras são escritas em minúsculas e separadas por underscores (`_`):

```python
meu_nome_completo = "Diego Pinho"

# Saída:
# Diego Pinho
```

Além dessa convenção, também vale adotar algumas boas práticas ao nomear variáveis. 

- Use nomes que façam sentido para o que a variável representa;
- Evite abreviações confusas, é melhor ter um nome maior mas mais descritivo;
- Siga um padrão consistente. Se você começou a nomear as variáveis de uma forma, não mude a forma como você as nomeia ao criar novas variáveis.

Assim, mesmo quem nunca viu seu código vai conseguir entender rapidamente o que cada parte faz.

Veja alguns exemplos de bons e maus nomes de variáveis:

```python
# Bons nomes:
idade_usuario = 25
quantidade_produtos = 10
preco_total = 199.90

# Nomes ruins:
id = 25
qtd = 10
pt = 199.90
```

Estes nomes ruins não dizem nada sobre o que a variável representa, enquanto os bons nomes deixam claro o significado de cada variável.
