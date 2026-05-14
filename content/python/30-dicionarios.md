---
title: "Dicionários"
description: "Usar chave-valor para organizar dados"
order: 30
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

# Saída:
# {'nome': 'Maria', 'formação': 'Computação', 'ensina': 'Python', 'experiência': 4}
```

# Acessar valores

Use a chave (não o índice):

```python
professor = {"nome": "Maria", "ensina": "Python"}

print(professor["nome"])    # Maria
print(professor["ensina"])  # Python
print(professor.nome)       # ERRO! Dicionários não suportam acesso por atributo
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
