---
title: "Manipulando Dicionários"
description: "Alterar, adicionar e remover itens em dicionários"
order: 31
---

# Alterar valores

Use a chave:

```python
pessoa = {"nome": "Diego", "idade": 30}
pessoa["idade"] = 31

print(pessoa)  # {'nome': 'Diego', 'idade': 31}
```

# update()

Alterar e adicionar vários itens:

```python
pessoa = {"nome": "Diego"}
pessoa.update({"idade": 30, "cidade": "São Paulo"})

print(pessoa)  # {'nome': 'Diego', 'idade': 30, 'cidade': 'São Paulo'}
```

# Adicionar itens

```python
pessoa = {"nome": "Diego"}
pessoa["idade"] = 30
pessoa["cidade"] = "São Paulo"

print(pessoa)
```

# Remover itens

## del

```python
pessoa = {"nome": "Diego", "idade": 30}
del pessoa["idade"]

print(pessoa)  # {'nome': 'Diego'}
```

## pop()

Remove e retorna o valor:

```python
pessoa = {"nome": "Diego", "idade": 30}
idade = pessoa.pop("idade")

print(idade)    # 30
print(pessoa)   # {'nome': 'Diego'}
```

## clear()

Remove tudo:

```python
pessoa = {"nome": "Diego", "idade": 30}
pessoa.clear()

print(pessoa)  # {}
```

# Iterar

```python
pessoa = {"nome": "Diego", "idade": 30}

for chave in pessoa:
    print(chave, pessoa[chave])

# nome Diego
# idade 30
```