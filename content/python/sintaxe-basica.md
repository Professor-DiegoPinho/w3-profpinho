---
title: "Sintaxe Básica"
description: "Os principais pontos sobre a sintaxe do Python"
order: 3
---

# Sintaxe do Python

Ao começar a programar em Python - assim como em qualquer linguagem de programação, é essencial entender sua sintaxe, ou seja, o conjunto de regras que definem como o código deve ser escrito. O Python é mundialmente conhecido por ter uma sintaxe simples, legível e muito próxima da linguagem natural, o que facilita o aprendizado. Abaixo veremos alguns pontos importantes sobre a sua sintaxe.

## Indentação

Diferente da maioria das linguagens de programação que temos por aí e que utilizam chaves `{}` ou palavras-chave como `begin`/`end` para determinar onde determinado bloco de código se inicia e finaliza, o Python usa a indentação (espaços ou tabulações no início da linha) para definir blocos de código.

Eu sei, pode parecer meio estranho no começo - principalmente se você já trabalhou com linguagens que usam as chaves - mas vai por mim, é fácil de se acostumar, principalmente porque o código fica rigorosamente organizado e mais limpo, pois não exige o uso de símbolos como as próprias chaves, ponto e vírgula e afins.

Por exemplo:

```python
if True:
  print("Este bloco está indentado corretamente")
  print("Portanto, será executado sem erros")
```

Se a indentação não for consistente dentro do seu arquivo, o Python gera um erro e seu código não será executado.

```python
if True:
print("Erro! Esta linha não está indentada")
```

Então sempre fique alerta em relação a organização do seu código pois aqui não é opcional.


## Variáveis
Em Python, as variáveis são criadas no momento em que recebem um valor. Não é necessário declarar o tipo explicitamente, pois o Python faz isso de forma automática (tipagem dinâmica). Abaixo seguem alguns exemplo de variáveis:

```python
nome = "Diego"     # string
idade = 30         # inteiro
altura = 1.75      # float
programador = True # booleano
```

Você pode reatribuir valores a uma variável a qualquer momento:

```python
idade = 30
idade = "trinta"  # agora é uma string
```

No Python usamos o padrão `snake_case` (minúsculas e separadas por underscore) para o nome das variáveis e funções. Então variáveis compostas ficam assim:

```python
nome_completo = "Diego Pinho"
```

## Comentários
Comentários são trechos de texto que não são executados pelo programa. Servem para documentar o código e deixá-lo mais fácil de entender. É um ótimo recurso se usado sem exagerdos.

```python
# Este é um comentário
print("Olá, mundo!")  # Também posso comentar ao lado de um comando
```

O Python não tem um símbolo específico para comentários multilinha, mas é comum usar aspas triplas (''' ou """) para esse propósito, olha só:

```python
"""
Este é um comentário
em várias linhas
usando aspas triplas
"""
```

Desde que não seja atribuído a uma variável, o Python vai simplesmente ignorar o código demarcado desta maneira.