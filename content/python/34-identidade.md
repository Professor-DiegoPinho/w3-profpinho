---
title: "Identidade"
description: "Entender a diferença entre identidade e igualdade"
order: 34
---

# Variáveis apontam para objetos

Variáveis **não guardam valores**. Elas **apontam para objetos** na memória:

```python
x = 42
# x aponta para um objeto 42 na memória
```

# Igualdade vs Identidade

- **Igualdade**: os valores são iguais?
- **Identidade**: apontam para o **mesmo objeto**?

# Exemplo

```python
ana = {"nascimento": 2010}
maria = {"nascimento": 2010}

aninha = ana

print(aninha == ana)    # True (conteúdo igual)
print(aninha is ana)    # True (mesmo objeto)

print(maria == ana)     # True (conteúdo igual)
print(maria is ana)     # False (objetos diferentes)
```

# Múltiplas referências

Múltiplas variáveis podem apontar para o **mesmo objeto**:

```python
lista1 = [1, 2, 3]
lista2 = lista1  # Mesmo objeto

lista1[0] = 999
print(lista2)  # [999, 2, 3] - Ambas mudaram!
```

# Objetos diferentes

Objetos criados separadamente são **sempre diferentes**:

```python
lista1 = [1, 2, 3]
lista2 = [1, 2, 3]

print(lista1 == lista2)  # True (conteúdo igual)
print(lista1 is lista2)  # False (objetos diferentes)
```
