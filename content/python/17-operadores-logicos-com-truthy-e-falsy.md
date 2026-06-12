---
id: "ce16d3941a6c"
title: "Truthy e Falsy"
description: "Como valores são interpretados como verdadeiro ou falso"
order: 17
---

# Valores truthy (verdadeiros)

Valores considerados `True` mesmo sem ser booleano:

```python
print(bool(1))              # True
print(bool("texto"))        # True
print(bool([1, 2, 3]))      # True (lista com itens)
print(bool({"a": 1}))       # True (dicionário com itens)
```

# Valores falsy (falsos)

Valores considerados `False`:

```python
print(bool(0))              # False
print(bool(""))             # False (string vazia)
print(bool([]))             # False (lista vazia)
print(bool({}))             # False (dicionário vazio)
print(bool(None))           # False (nenhum valor)
```

# None

Um tipo especial que representa "ausência de valor", parecido com `null` em outras linguagens:

```python
x = None
print(x)            # None
print(type(x))      # <class 'NoneType'>
print(bool(x))      # False
```

# and e or com truthy/falsy

`and` retorna o primeiro valor falsy ou o último se todos forem truthy:

```python
print(0 and 5)              # 0 (primeiro falsy)
print(3 and 7)              # 7 (último é truthy)
```

`or` retorna o primeiro valor truthy ou o último se todos forem falsy:

```python
print("" or "Python")       # Python (primeiro truthy)
print(0 or 5)               # 5 (primeiro truthy)
print(0 or "")              # "" (todos falsy, retorna último)
```

# Usando na prática

```python
nome = input("Seu nome: ")
resultado = nome or "Usuário anônimo"
print(resultado)
```

```python
nome = input("Digite seu nome: ") or "Visitante"
print(f"Olá, {nome}!")
```

Aqui, se o usuário não digitar nada, `input` retorna uma string vazia (_falsy_). O operador `or` então devolve "Visitante". Se o usuário digitar algo, esse valor (_truthy_) é retornado.

### O `not` com valores _truthy_ e _falsy_

Já o `not` continua invertendo o valor booleano do que vem depois dele. Se um valor é _truthy_, ele vira `False`. Se ele é _falsy_, vira `True`:

```python
texto = ""
print(not texto)  # string vazia é falsy

# Saída:
# True
```
