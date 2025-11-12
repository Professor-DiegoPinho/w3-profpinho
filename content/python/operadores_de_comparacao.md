---
title: "Operadores de comparação"
description: "Os operadores de comparação em Python"
order: 15
---

# Operadores de comparação

Nas aulas de matemática da escola, você deve ter visto símbolos como `=`, `≠`, `<`, `>`, `≤` e `≥` para comparar números.

Em Python a ideia é a mesma: comparamos valores e obtemos um **resultado booleano** (`True` ou `False`). A diferença é que alguns símbolos aparecem de outra forma aqui.

## Tabela de operadores de comparação

| Operador | Na matemática | Nome             | Exemplo  |
| -------- | ------------- | ---------------- | -------- |
| `==`     | `=`           | Igual a          | `x == y` |
| `!=`     | `≠`           | Diferente de     | `x != y` |
| `>`      | `>`           | Maior que        | `x > y`  |
| `<`      | `<`           | Menor que        | `x < y`  |
| `>=`     | `≥`           | Maior ou igual a | `x >= y` |
| `<=`     | `≤`           | Menor ou igual a | `x <= y` |

Agora, vamos ver como cada operador funciona.

### Igualdade (`==`)

Compara os valores e retorna `True` quando são iguais. Quando não são iguais, retorna `False`.

```python
print(5 == 5)    # 5 é igual a 5? sim!
print(5 == 7)    # 5 é igual a 7? não!

# Saída:
# True
# False
```

> Dica rápida: na matemática usamos `=` para dizer que duas coisas são iguais. Já **em Python, a igualdade é escrita com `==`**. O `=` é o operador de **atribuição**, que guarda um valor numa variável.

### Diferença (`!=`)

Retorna `True` quando os valores **não** são iguais, ou seja, quando são diferentes entre si:

```python
idade = 18
print(idade != 18)   # 18 é diferente de 18? não!
print(idade != 21)   # 18 é diferente de 21? sim!

# Saída:
# False
# True
```

### Maior que (`>`) e Menor que (`<`)

Comparam a **ordem** entre números ao dizer se o que aparece antes do operador é maior ou menor que o que aparece depois dele:

```python
print(7 > 3)    # 7 é maior que 3? sim!
print(2 < 2)    # 2 é menor que 2? não!

# Saída:
# True
# False
```

### Maior ou igual a (`>=`)

Retorna `True` se o primeiro valor for **maior** ou **igual** ao segundo valor comparado.

```python
nota = 7
print(nota >= 7)  # 7 é maior ou igual a 7? sim, é igual!
print(nota >= 8)  # 7 é maior ou igual a 8? não!

# Saída:
# True
# False
```

### Menor ou igual a (`<=`)

Retorna `True` se o primeiro valor for **menor** ou **igual** ao segundo valor comparado.

```python
limite = 100
print(limite <= 100)  # 100 é menor ou igual a 100? é igual!
print(limite <= 99)   # 100 é menor ou igual a 100? não!

# Saída:
# True
# False
```

## Comparações e tipos:

### Comparando valores booleanos (`True` e `False`)

Os valores booleanos se comportam como números inteiros: True equivale a 1 e False equivale a 0. Isso significa que eles também podem ser usados em comparações numéricas.

```python
print(True > False)   # 1 é maior que 0? não!
print(True == 1)      # 1 é igual a 1? sim!

# Saída:
# True
# True
```

Esse comportamento pode ser útil em algumas situações, mas atenção: `True` e `False` ainda são do tipo `bool`, e não `int`.

### Comparando _strings_

As strings também podem ser comparadas, mas não da forma mais intuitiva. Essa comparação é feita com base na **ordem alfabética Unicode**, também chamada de ordem lexicográfica.

Em outras palavras, o Python compara caractere por caractere usando o código interno de cada símbolo.

```python
print('Ana' < 'Bruno')

# Saída:
# True
```

Isso acontece porque a letra A vem antes de B na tabela Unicode, mas é importante saber que as letras maiúsculas e minúsculas têm valores diferentes. Todas as maiúsculas vêm antes das minúsculas no Unicode. Assim:

```python
print('Zebra' < 'abelha')

# Saída:
# True
```

Isso ocorre porque Z (maiúsculo) tem valor Unicode menor que a (minúsculo).

### Comparando tipos diferentes

Nem todos os tipos podem ser comparados entre si. A partir da versão 3 do Python, comparar tipos incompatíveis, como números com strings, gera erro.

```python
print(10 < '10')

# Saída:
# TypeError: '<' not supported between instances of 'int' and 'str'
```

Esse erro existe para evitar resultados ambíguos. Se você precisar comparar tipos diferentes, primeiro converta um deles com funções como `int()`, `float()` ou `str()`, conforme o caso.

## Encadeando comparações

Python permite **encadear** comparações para escrever intervalos de forma natural, exatamente como fazemos em matemática.

Podemos escrever:

```python
x = 5
print(1 < x < 10)   # 5 é maior que 1 E menor que 10? sim!

# Saída:
# True
```

Também vale com igualdade no meio do caminho:

```python
x = 7
y = 7
print(3 <= x == y < 10)  # True é igual a True? sim!

# Saída:
# True
```

---

Com os operadores de comparação, seu código consegue **testar condições** e produzir valores booleanos claros. No próximo passo, vamos combinar esses resultados usando os **operadores lógicos** para criar regras ainda mais poderosas e expressivas.
