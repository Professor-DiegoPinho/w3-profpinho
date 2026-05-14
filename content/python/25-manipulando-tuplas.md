---
title: "Manipulando Tuplas"
description: "Trabalhar com tuplas imutáveis"
order: 25
---

# Criar com construtor

```python
letras = tuple(["a", "b", "c"])
print(letras)  # ('a', 'b', 'c')
```

# Tuplas são imutáveis

Não pode alterar, adicionar ou remover:

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
