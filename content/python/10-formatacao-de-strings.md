---
id: "56fa9c1ff06d"
title: "Formatação de Strings"
description: "Como deixar seus textos exatamente como quer"
order: 10
---

# Caracteres de escape

Use `\` para caracteres especiais:

```python
print("Ele disse: \"Olá\"")           # aspas duplas
print("Caminho: C:\\Users\\Diego")    # barra invertida
print("Primeira\nSegunda")            # quebra de linha
print("Com\ttab")                     # tabulação
```

# Concatenação com +

```python
x = "Python"
y = "é"
z = "incrível"

print(x + " " + y + " " + z)  # Python é incrível
```

# Múltiplas variáveis com print()

Separe por vírgula:

```python
nome = "Diego"
idade = 30

print(nome, idade)                    # Diego 30
print("Nome:", nome, "Idade:", idade) # Nome: Diego Idade: 30
```

# F-strings (formatação moderna)

Coloque `f` antes da string e use `{}` para variáveis:

```python
nome = "Diego"
idade = 30

print(f"Meu nome é {nome}")          # Meu nome é Diego
print(f"Tenho {idade} anos")         # Tenho 30 anos
print(f"Nascimento: {2025 - idade}")  # Nascimento: 1995
```

# Formatação com .format()

```python
print("Olá, {}!".format("Diego"))
print("{} tem {} anos".format("Diego", 30))

# Saída:
# Olá, Diego!
# Diego tem 30 anos
```

# Repetindo strings com *

```python
print("Python " * 3)

# Saída:
# Python Python Python
```