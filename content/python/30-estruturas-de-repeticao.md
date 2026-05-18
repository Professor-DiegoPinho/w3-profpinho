---
title: "Estruturas de Repetição e Loops"
description: "Usar for e while para repetir código"
order: 30
---

# Por que repetir?

Problema: mostrar números de 0 a 5:

```python
# ❌ Ruim
print(0)
print(1)
print(2)
print(3)
print(4)
print(5)
```

# Loop for

Percorrer uma sequência:

```python
# ✅ Bom
for i in range(6):
    print(i)
```

# Loop while

Repetir **enquanto uma condição for verdadeira**:

```python
i = 0

while i < 6:
    print(i)
    i += 1
```

# Quando usar cada um

- **for**: sabe quantas vezes vai repetir (percorre algo)
- **while**: não sabe quantas vezes (depende de uma condição)

# Importância

Loops estão em **todo programa real**:

- Processar listas
- Automatizar tarefas
- Validar informações
- Repetir até uma condição
- Buscar por valores

---

# For - Sintaxe

```python
for item in iteravel:
    # código a executar
```

# For com range

```python
for numero in range(1, 4):
    print(numero)

# 1
# 2
# 3
```

# For com strings

Percorrer caractere por caractere:

```python
palavra = "Python"

for letra in palavra:
    print(letra)

# P
# y
# t
# h
# o
# n
```

# For com listas

```python
nomes = ["Ana", "Bruno", "Carlos"]

for nome in nomes:
    print(nome)
```

# For com dicionários

```python
pessoa = {"nome": "Diego", "idade": 30}

for chave in pessoa:
    print(chave, pessoa[chave])

# nome Diego
# idade 30
```

# For com tuplas

```python
cores = ("azul", "verde", "roxo")

for cor in cores:
    print(cor)
```

# Indentação

Tudo indentado é repetido:

```python
for numero in range(2):
    print(numero)
    print("Ok")

print("Fim")

# 0
# Ok
# 1
# Ok
# Fim
```

---

# For com if

Tomar decisões em cada repetição:

```python
numeros = [1, 2, 3, 4]

for numero in numeros:
    if numero % 2 == 0:
        print(numero, "é par")
    else:
        print(numero, "é ímpar")

# 1 é ímpar
# 2 é par
# 3 é ímpar
# 4 é par
```

# Filtrar valores

```python
frutas = ["banana", "amora", "laranja", "maçã"]

for fruta in frutas:
    if fruta.startswith("a"):
        print(fruta)

# amora
```

# break - interromper loop

Para o loop imediatamente:

```python
frutas = ["banana", "laranja", "maçã"]

for fruta in frutas:
    if fruta == "laranja":
        break
    print(fruta)

# banana
```

# continue - pular iteração

Pula apenas a iteração atual:

```python
frutas = ["banana", "laranja", "maçã"]

for fruta in frutas:
    if fruta == "laranja":
        continue
    print(fruta)

# banana
# maçã
```

# pass - não fazer nada

```python
for numero in range(3):
    pass  # Implementar depois
```

# else com for

Executa quando loop termina **normalmente** (sem break):

```python
for numero in range(3):
    print(numero)
else:
    print("Fim!")

# 0
# 1
# 2
# Fim!
```

Com break, não executa else:

```python
for numero in range(3):
    if numero == 1:
        break
    print(numero)
else:
    print("Fim!")

# 0
# (else não executa)
```
