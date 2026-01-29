---
title: "Operadores de identidade"
description: "Como funcionam os operadores de identidade em Python"
order: 35
---

## O que são os operadores de identidade?

Como vimos na lição anterior, possuir a mesma identidade quer dizer que dois valores **fazem referência ao mesmo objeto na memória**.

Também aprendemos que igualdade, ou seja, possuir o mesmo valor, é diferente de identidade:

- Dois valores podem ser iguais e apontar para o mesmo objeto;
- Dois valores podem ser iguais e apontar para objetos diferentes.

Os operadores de identidade são usados para verificar se os valores **compartilham a mesma identidade**. Em Python, existem dois deles:

| Operador | Descrição                                                 | Exemplo      |
| -------- | --------------------------------------------------------- | ------------ |
| `is`     | Verifica se os valores comparados são o mesmo objeto.     | `x is y`     |
| `is not` | Verifica se os valores comparados são objetos diferentes. | `x is not y` |

Esses operadores sempre retornam valores booleanos, `True` ou `False`.

## Operador `is`

O operador `is` verifica se duas variáveis **apontam exatamente para o mesmo objeto**:

```python
AnaCarolina = {"nascimento": 2010, "gênero": "feminino"}
MariaIsabel = {"nascimento": 2010, "gênero": "feminino"}

Aninha = AnaCarolina

print(Aninha is AnaCarolina)
print(MariaIsabel is AnaCarolina)

# Saída:
# True
# False
```

`Aninha` e `AnaCarolina` apontam para o mesmo objeto. Essas variáveis são duas formas diferentes de chamá-lo, então o resultado é `True`.

Já `MariaIsabel` aponta para outro objeto, que foi criado separadamente. Então, quando perguntamos se `MariaIsabel` e `AnaCarolina` apontam para o mesmo objeto, o resultado é `False`.

Esse tipo de checagem é especialmente útil ao trabalhar com coleções, onde o reaproveitamento de referências é comum.

## Operador `is not`

O operador `is not` faz a verificação oposta: ele retorna `True` quando duas variáveis **não apontam para o mesmo objeto**.

```python
AnaCarolina = {"nascimento": 2010, "gênero": "feminino"}
MariaIsabel = {"nascimento": 2010, "gênero": "feminino"}

Aninha = AnaCarolina

print(Aninha is not AnaCarolina)
print(MariaIsabel is not AnaCarolina)

# Saída:
# False
# True
```

Mesmo com o conteúdo idêntico, `AnaCarolina` e `MariaIsabel` são objetos diferentes na memória, então o resultado é `True`. Já `Aninha` e `AnaCarolina` correspondem ao mesmo objeto e o resultado é `False`.

## Igualdade vs. identidade

Falamos que o operador de comparação `==` verifica se um objeto é igual ao outro, mas não verifica se são o mesmo objeto. Agora que vimos os operadores de identidade, podemos resumir da seguinte forma:

- Igualdade → "Esses dados são iguais?"

  `==` e `!=` verificam se **os objetos são iguais ou diferentes entre si**.

- Identidade → "Esses dados são exatamente o mesmo objeto?"

  `is` e `is not` verificam se **são o mesmo objeto na memória ou objetos diferentes**.

Veja o exemplo:

```python
AnaCarolina = {"nascimento": 2010, "gênero": "feminino"}
MariaIsabel = {"nascimento": 2010, "gênero": "feminino"}

Aninha = AnaCarolina

print(Aninha is AnaCarolina)
print(MariaIsabel is AnaCarolina)

print(Aninha == AnaCarolina)
print(MariaIsabel == AnaCarolina)

# Saída:
# True
# False
# True
# True
```

Vamos interpretar cada saída do código:

- `Aninha is AnaCarolina` → `True`<br>`Aninha` recebe exatamente a mesma referência de `AnaCarolina`, então ambas apontam para o mesmo objeto.
- `MariaIsabel is AnaCarolina` → `False`<br>Apesar de terem o mesmo conteúdo, `MariaIsabel` e `AnaCarolina` são dicionários diferentes, criados separadamente.
- `Aninha == AnaCarolina` → `True`<br>Como ambas apontam para o mesmo objeto, seus conteúdos também são iguais.
- `MariaIsabel == AnaCarolina` → `True`<br>Aqui estamos comparando apenas os conteúdos dos objetos para os quais `MariaIsabel` e `AnaCarolina` apontam, e eles são iguais.

Esses resultados ilustram a diferença entre **identidade** e **igualdade**.

## Identidade ou igualdade com os tipos de dados

Agora entendemos a diferença entre igualdade e identidade, mas pode surgir a seguinte dúvida: **quando a igualdade basta e quando faz sentido verificar a identidade?**

Talvez você tenha percebido que os conceitos relacionados à identidade começaram a ser vistos desde que começamos a trabalhar com **coleções**, principalmente com listas, dicionários e conjuntos, que são objetos mutáveis. Isso não aconteceu por acaso.

Geralmente, verificar apenas a **igualdade com `==` é o suficiente**: se dois números são iguais, se duas strings possuem o mesmo texto, se duas listas têm os mesmos valores...

A verificação de **identidade** faz sentido quando o comportamento do programa depende de **estarmos lidando exatamente com o mesmo objeto**, e não apenas com dados iguais. Isso é muito importante em duas situações:

### 1. Trabalhando com objetos mutáveis

Vimos que listas, dicionários e conjuntos são mutáveis, então podem ser alterados depois de criados. Também aprendemos que atribuir uma coleção a uma nova variável é muito diferente de fazer uma cópia de uma coleção.

Você deve lembrar que quando duas variáveis apontam para o mesmo objeto mutável, qualquer alteração feita através de uma delas afeta a outra:

```python
AnaCarolina = {"nascimento": 2010, "cor favorita": "rosa"}
MariaIsabel = AnaCarolina.copy()

Aninha = AnaCarolina

Aninha["cor favorita"] = "azul"

print(AnaCarolina)
print(Aninha)
print(MariaIsabel)

# Saída:
# {'nascimento': 2010, 'cor favorita': 'azul'}
# {'nascimento': 2010, 'cor favorita': 'azul'}
# {'nascimento': 2010, 'cor favorita': 'rosa'}
```

`AnaCarolina` reflete a alteração porque aponta para o mesmo objeto que `Aninha`. Já `MariaIsabel` não é afetada, pois é um outro objeto, mesmo tendo começado com o mesmo conteúdo.

Nesse tipo de cenário, usar `is` pode ser importante para evitar efeitos colaterais inesperados.

### 2. Comparando com valores especiais

Alguns valores em Python **não representam dados comuns** que vamos criando conforme precisamos na memória. Esses valores especiais existem para indicar situações específicas no código.

Os principais são: `None`, `True` e `False`.

Eles são criados uma única vez pelo Python e são reutilizados sempre que o programa precisa deles. Então, toda vez que você escreve `None`, `True` ou `False` no código, você não está criando um novo valor. Está apenas apontando para o mesmo valor especial que já foi criado.

Quando queremos avaliar esses valores, não faz sentido perguntar se eles são apenas iguais. A pergunta correta é: "Essa variável está apontando exatamente para esse valor especial?"

Por isso, não verificamos esses valores com `==`, mas sim com `is`:

```python
valor = None

print(valor is None)
print(valor == None)

# Saída:
# True
# True
```

Você pode perceber que ambos retornam `True` no exemplo, mas a verificação correta e recomendada para valores especiais é **sempre** feita com o `is` e o `is not`.

## Igualdade é mais comum que identidade

Na prática, você só vai usar o `is` e o `is not` nos dois cenários que vimos acima: com objetos mutáveis e com valores especias.

Para dados que não são desses tipos, a verificação de identidade quase nunca vai ser importante e pode gerar comportamentos inesperados que causam erros difíceis de detectar.

Dependendo da versão, implementação e contexto, o Python pode reaproveitar objetos na memória de maneiras diferentes, então o resultado pode variar entre `True` e `False` de maneira inconsistente. Por isso, para valores comuns, **use sempre o `==` e o `!=`**.

Resumindo:

| Dado        | Use `==` e `!=` para…               | Use `is` e `is not` para…               |
| ----------- | ----------------------------------- | --------------------------------------- |
| Números     | Comparar se seus valores são iguais | Não faz sentido no uso comum            |
| `str`       | Comparar se seus valores são iguais | Não faz sentido no uso comum            |
| `bool`      | Não faz sentido no uso comum        | Saber se é o mesmo objeto na memória    |
| `None`      | Não faz sentido no uso comum        | Saber se é o mesmo objeto na memória    |
| `list`      | Comparar se seus valores são iguais | Saber se é o mesmo objeto na memória    |
| `tuple`     | Comparar se seus valores são iguais | Casos raros em que a identidade importa |
| `set`       | Comparar se seus valores são iguais | Saber se é o mesmo objeto na memória    |
| `frozenset` | Comparar se seus valores são iguais | Casos raros em que a identidade importa |
| `dict`      | Comparar se seus valores são iguais | Saber se é o mesmo objeto na memória    |
| `range`     | Comparar se seus valores são iguais | Casos raros em que a identidade importa |

---

Os operadores de identidade ajudam você a **pensar além do valor dos dados** e a entender melhor como o Python **lida com objetos, referências e mutabilidade**.

Esse conhecimento vai fazer muita diferença conforme seus códigos ficarem maiores e mais complexos, especialmente ao trabalhar com coleções e estruturas mais avançadas.
