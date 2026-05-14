---
title: "Sintaxe Básica"
description: "Os principais pontos sobre a sintaxe do Python"
order: 04
---

# Indentação

Python usa **indentação** (espaços no início da linha) para definir blocos de código. Diferente de outras linguagens que usam chaves `{}`, aqui a indentação é obrigatória.

```python
if True:
  print("Dentro do bloco")
  print("Também dentro")
print("Fora do bloco")
```

Se você não identar corretamente, Python gera um erro:

```python
if True:
print("Erro! Falta indentação")
# IndentationError
```

Então sempre fique alerta em relação a organização do seu código pois aqui não é opcional.


## Variáveis

As variáveis são criadas quando recebem um valor. Não precisa declarar o tipo, pois o Python infere automaticamente.

```python
nome = "Diego"      # string
idade = 30          # inteiro
altura = 1.75       # float
ativo = True        # booleano
```

Use o padrão `snake_case` (minúsculas e underscore) para nomes de variáveis compostos por mais de uma palavra:

```python
nome_completo = "Diego Pinho"
data_nascimento = "1994-05-14"
```

## Comentários

Use `#` para comentários de uma linha:

```python
# Este é um comentário
print("Olá")  # Comentário aqui também
```

Para múltiplas linhas, use aspas triplas:

```python
"""
Este é um comentário
que ocupa várias linhas
"""
```
