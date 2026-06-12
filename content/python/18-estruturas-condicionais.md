---
id: "a05369dfa785"
title: "Estruturas Condicionais"
description: "Como tomar decisões no código com if, elif e else"
order: 18
---

# Estruturas condicionais

Estruturas condicionais permitem que seu código tome **decisões** baseadas em condições.

## if

Executa um bloco se a condição for verdadeira:

```python
idade = 18

if idade >= 18:
    print("Maior de idade")
```

## if e else

Executa um bloco se verdadeira, outro se falsa:

```python
idade = 15

if idade >= 18:
    print("Maior de idade")
else:
    print("Menor de idade")
```

## if, elif e else

Testa múltiplas condições:

```python
nota = 7

if nota >= 9:
    print("A")
elif nota >= 7:
    print("B")
elif nota >= 5:
    print("C")
else:
    print("Reprovado")
```
Pode ser criado um número ilimitado de `elif` para testar quantas condições forem necessárias.

## Indentação

O código indentado (com espaços) pertence ao bloco do `if`:

```python
x = 5

if x > 3:
    print("Dentro do if")      # indentado
    print("Também dentro")     # indentado
print("Fora do if")             # sem indentação
```

## Operadores úteis

Use com as condições:

```python
idade = 25
nome = "Ana"

if idade >= 18 and nome == "Ana":
    print("Ana é maior de idade")

if idade < 18 or idade > 60:
    print("Especial")

if not(idade > 100):
    print("Idade normal")
```

