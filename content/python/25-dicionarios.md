---
title: "Dicionários"
description: "Usar chave-valor para organizar e manipular dados"
order: 25
---

# O que é um dicionário

Um dicionário armazena dados em pares chave-valor:

```python
professor = {
    "nome": "Maria",
    "formação": "Computação",
    "ensina": "Python",
    "experiência": 4
}

print(professor)
```

# Acessar valores

Use a chave (não o índice):

```python
professor = {"nome": "Maria", "ensina": "Python"}

print(professor["nome"])    # Maria
print(professor["ensina"])  # Python
```

# Adicionar itens

```python
professor = {"nome": "Maria"}
professor["ensina"] = "Python"
print(professor)  # {'nome': 'Maria', 'ensina': 'Python'}
```

# Remover itens

```python
professor = {"nome": "Maria", "ensina": "Python"}
del professor["ensina"]
print(professor)  # {'nome': 'Maria'}
```

# Métodos úteis

```python
professor = {"nome": "Maria", "ensina": "Python"}

# Todas as chaves
print(professor.keys())      # dict_keys(['nome', 'ensina'])

# Todos os valores
print(professor.values())    # dict_values(['Maria', 'Python'])

# Todos os pares
print(professor.items())     # dict_items([('nome', 'Maria'), ('ensina', 'Python')])

# Verificar chave
print("nome" in professor)   # True

# Pegar valor com default
print(professor.get("ensina", "Não informado"))  # Python
print(professor.get("idade", "Não informado"))   # Não informado
```

# Dicionários vazios

```python
vazio = {}
print(vazio)  # {}
```

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

# pop()

Remove e retorna o valor:

```python
pessoa = {"nome": "Diego", "idade": 30}
idade = pessoa.pop("idade")

print(idade)    # 30
print(pessoa)   # {'nome': 'Diego'}
```

# clear()

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
