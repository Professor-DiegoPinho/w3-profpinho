---
title: "Tuplas"
description: "Criar, acessar e manipular tuplas imutáveis"
order: 23
---

# O que é uma tupla

Coleção ordenada e **imutável**:

```python
cores = ("azul", "verde", "roxo")
print(cores)  # ('azul', 'verde', 'roxo')
```

# Tuplas vs Listas

| Aspecto | Tupla | Lista |
|--------|-------|-------|
| Sintaxe | () | [] |
| Mutável | Não | Sim |
| Performance | Mais rápida | Mais lenta |

# Acessar elementos

Igual às listas:

```python
cores = ("azul", "verde", "roxo")
print(cores[0])   # azul
print(cores[-1])  # roxo
```

# Tupla com um item

**Precisa de vírgula**:

```python
uma = ("Python",)
print(type(uma))  # <class 'tuple'>

sem_virgula = ("Python")
print(type(sem_virgula))  # <class 'str'>
```

# Tipos mistos

```python
tupla = ("texto", 42, True, 3.14)
print(tupla)  # ('texto', 42, True, 3.14)
```

# Tupla vazia

```python
vazia = ()
print(vazia)  # ()
```

# Não é mutável

```python
cores = ("azul", "verde")
cores[0] = "roxo"  # ❌ Erro: 'tuple' object does not support item assignment
```

---

# Criar com construtor

```python
letras = tuple(["a", "b", "c"])
print(letras)  # ('a', 'b', 'c')
```

# Tuplas são imutáveis

Não pode alterar, adicionar ou remover diretamente:

```python
tupla = ("a", "b", "c")
tupla[0] = "x"  # ❌ Erro
```

# Alterar indiretamente

Converter → modificar → converter de volta:

```python
tupla = ("maçã", "banana", "cereja")
lista = list(tupla)

lista[1] = "kiwi"
tupla = tuple(lista)

print(tupla)  # ('maçã', 'kiwi', 'cereja')
```

# Adicionar itens

```python
tupla = ("maçã", "banana", "cereja")
tupla += ("laranja",)

print(tupla)  # ('maçã', 'banana', 'cereja', 'laranja')
```

# Remover itens

```python
tupla = ("maçã", "banana", "cereja")
lista = list(tupla)

lista.remove("banana")
tupla = tuple(lista)

print(tupla)  # ('maçã', 'cereja')
```

# Deletar tupla

```python
tupla = ("maçã", "banana")
del tupla

print(tupla)  # ❌ Erro: name 'tupla' is not defined
```
