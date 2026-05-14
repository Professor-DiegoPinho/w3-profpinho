---
title: "Estruturas de Repetição"
description: "Usar loops para repetir código"
order: 36
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

# for com listas

```python
frutas = ["maçã", "banana", "laranja"]

for fruta in frutas:
    print(fruta)
```

# for com strings

```python
nome = "Python"

for letra in nome:
    print(letra)
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