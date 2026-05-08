---
title: "Manipulando dicionários"
description: "Como manipular um dicionário em Python"
order: 31
---

Na lição anterior, você viu o que são dicionários e por que eles são tão úteis. Agora vamos dar o próximo passo: aprender a **mexer neles no dia a dia**.

## Alterando valores

Dicionários são **mutáveis**, então você pode trocar o valor guardado em uma chave a qualquer momento.

### Alterando pela chave

Você deve lembrar que, quando trabalhamos com listas, acessamos e alteramos valores usando índices numéricos, como `lista[0]` ou `lista[1]`.

Nos dicionários, a ideia é parecida, mas em vez de índices, usamos a chave. Basta **acessar a chave** desejada e **atribuir um novo valor** a ela:

```python
professor = {"nome": "Carolina", "anos de experiência": 4}
print(professor)

professor["anos de experiência"] = 2
print(professor)

# Saída:
# {'nome': 'Carolina', 'anos de experiência': 4}
# {'nome': 'Carolina', 'anos de experiência': 2}
```

Repare que não mexemos na estrutura do dicionário, só **substituímos** o valor associado à chave `"anos de experiência"`.

> Lembre-se: Como vimos antes, **chaves são únicas** e sempre haverá no máximo um valor associado a cada chave. Não é possível ter duas chaves com o mesmo nome. Então, se uma chave já existe e atribuímos um valor a ela, o valor anterior que ela guardava é substituído pelo novo.

### `update()`

Às vezes queremos alterar **várias informações de uma vez**. Em vez de ir mudando o que cada chave guarda uma a uma, podemos usar o método `update()`.

Ele pega o dicionário e:

- **atualiza** as chaves que já existem (`"anos de experiência"` virou `2`);
- **adiciona** novas chaves que ainda não existiam (`"formação"` foi criada).

```python
professor = {"nome": "Carolina", "anos de experiência": 4}

professor.update({"anos de experiência": 2, "formação": "Ciência da Computação"})
print(professor)

# Saída:
# {'nome': 'Carolina', 'anos de experiência': 2, 'formação': 'Ciência da Computação'}
```

Também é possível atualizar os dados usando outro iterável com pares chave-valor:

```python
professor = {"nome": "Carolina", "anos de experiência": 4}

novos_dados = [("anos de experiência", 2), ("formação", "Ciência da Computação")]
professor.update(novos_dados)

print(professor)

# Saída:
# {'nome': 'Carolina', 'anos de experiência': 2, 'formação': 'Ciência da Computação'}
```

Aqui, `novos_dados` é uma **lista**, ou seja, um iterável. Dentro dessa lista, existem tuplas que guardam pares chave-valor no formato `("chave", valor)`.

> Se o conceito de iterável ainda não estiver bem claro, é uma boa voltar na lição [Iterabilidade e imutabilidade em conjuntos](./iterabilidade-e-imutabilidade-em-conjuntos). Lá, falamos sobre o que é ser iterável. Vai por mim, vai te ajudar nesta lição e em seus códigos futuros!

## Adicionando itens

Adicionar itens é uma das operações mais comuns que fazemos. Sempre que novos dados surgirem, você vai precisar incluir essas informações no dicionário.

### Atribuição direta pela chave

Como já vimos no tópico sobre alteração de valores, quando atribuímos um valor a uma chave que ainda **não existe**, ela é criada:

```python
professor = {"nome": "Carolina", "anos de experiência": 4}

professor["formação"] = "Ciência da Computação"
print(professor)

# Saída:
# {'nome': 'Carolina', 'anos de experiência': 4, 'formação': 'Ciência da Computação'}
```

Se a chave já existir, essa mesma sintaxe **altera o valor** da chave, substituindo a informação antiga pela nova.

### `update()`

Para reforçar, já vimos também que o `update()` serve para adicionar itens quando as chaves que colocamos nele ainda não existem no dicionário:

```python
professor = {"nome": "Carolina"}

professor.update({"anos de experiência": 4, "formação": "Ciência da Computação"})
print(professor)

# Saída:
# {'nome': 'Carolina', 'anos de experiência': 4, 'formação': 'Ciência da Computação'}
```

## Removendo itens

Assim como as demais coleções, os dicionários oferecem diferentes formas de remover itens, cada uma com um comportamento específico.

### `pop()`

Remove um item **através de sua chave** e **devolve o valor removido**:

```python
tarefa = {"descrição": "Estudar dicionários", "prioridade": "alta"}
prioridade_removida = tarefa.pop("prioridade")

print(tarefa)
print(prioridade_removida)

# Saída:
# {'descrição': 'Estudar dicionários'}
# alta
```

Aqui, a chave `prioridade` e seu valor deixam de existir no dicionário, mas conseguimos ver qual era seu valor: `"alta"`.

> Dica: use essa função quando você precisar do valor que está sendo removido porque ele ainda será usado em outra parte do código. Um exemplo bem comum é quando você retira um produto de um estoque para vendê-lo.

Caso a chave que passamos para o `pop()` não exista, ele gera um erro:

```python
tarefa = {"descrição": "Estudar dicionários", "prioridade": "alta"}

tarefa.pop("prazo")  # "prazo" não existe

# Saída:
# Traceback (most recent call last):
#   File "<stdin>", line 1, in <module>
#     tarefa.pop("prazo")
#     ~~~~~~~~~~^^^^^^^^^
# KeyError: 'prazo'
```

### `popitem()`

Vimos que a partir da versão 3.7 do Python os dicionários são ordenados. Antes dela, os dicionários não garantiam a ordem dos seus itens. Isso é bem importante aqui porque o comportamento do `popitem()` muda se o dicionário mantém ou não a ordem de inserção.

Desde a versão 3.7, essa função remove **o último item inserido** e retorna o par chave-valor no formato de tupla:

```python
tarefa = {
  "descrição": "Estudar dicionários",
  "prioridade": "alta",
  "concluída": False
}

item_removido = tarefa.popitem()

print(item_removido)
print(tarefa)

# Saída:
# ('concluída', False)
# {'descrição': 'Estudar dicionários', 'prioridade': 'alta'}
```

Se a versão utilizada for anterior à 3.7, a ordem não é mantida, então não é possível saber qual item foi o último a ser inserido. Dessa forma, o `popitem()` remove um item aleatório que pode ser diferente a cada execução:

```python
tarefa = {
  "descrição": "Estudar dicionários",
  "prioridade": "alta",
  "concluída": False
}

item_removido = tarefa.popitem()

print(item_removido)
print(tarefa)

# Saída possível:
# ('prioridade', 'alta')
# {'descrição': 'Estudar dicionários', 'concluída': False}
```

### `del`

Remove um item específico através da sua chave:

```python
tarefa = {
  "descrição": "Estudar dicionários",
  "prioridade": "alta",
  "concluída": False
}

del tarefa["concluída"]
print(tarefa)

# Saída:
# {'descrição': 'Estudar dicionários', 'prioridade': 'alta'}
```

Porém, se a chave que queremos deletar não existir, o `del` também gera um erro:

```python
tarefa = {
  "descrição": "Estudar dicionários",
  "prioridade": "alta",
  "concluída": False
}

del tarefa["prazo"]          # "prazo" não existe

# Saída:
# Traceback (most recent call last):
#   File "<stdin>", line 1, in <module>
#     del tarefa["prazo"]
#         ~~~~~~^^^^^^^^^
# KeyError: 'prazo'
```

## Limpando o dicionário

Além de remover itens individualmente, também podemos remover todos de uma só vez.

### `clear()`

Remove **todos os itens**, mas **mantém o dicionário**:

```python
tarefa = {
  "descrição": "Estudar dicionários",
  "prioridade": "alta",
  "concluída": False
}

tarefa.clear()
print(tarefa)

# Saída:
# {}
```

Perceba que o dicionário `tarefa` ainda existe, só está vazio. Você pode adicionar novos pares chave-valor nele quando quiser.

### `del`

Apaga **o dicionário inteiro**, não apenas seus itens. O dicionário como um todo deixa de existir:

```python
tarefa = {
  "descrição": "Estudar dicionários",
  "prioridade": "alta",
  "concluída": False
}

del tarefa
print(tarefa)

# Saída:
# Traceback (most recent call last):
#   File "<stdin>", line 1, in <module>
#     print(tarefa)
#           ^^^^^^
# NameError: name 'tarefa' is not defined
```

Você pode ver que, quando tentamos imprimir `tarefa`, recebemos um erro. Isso acontece porque o dicionário como um todo deixou de existir após o uso do `del`. Nem mesmo a variável que o guardava existe mais, então o Python não consegue encontrá-la.

## Copiando dicionários

Dicionários são mutáveis, então copiá-los exige cuidado, exatamente como acontece com as listas, lembra? Vamos ver quais são as formas mais comuns de copiar dicionários e o que acontece em cada uma delas.

### Atribuição com o `=`

Se você atribuir uma variável que guarda um dicionário a uma nova variável, como quando fazemos `dicionario_novo = dicionario_original`, o novo dicionário não vai guardar uma cópia do original. Ele vai ser apenas uma nova forma de chamar aquele mesmo dicionário que já existia.

Isso acontece porque quando lidamos com valores mutáveis, como os dicionários, a atribuição com o operador `=` cria apenas uma nova referência pro mesmo dicionário em vez de fazer uma cópia dele:

```python
original = {"nome": "Caderno", "preco": 15.99}

copia_errada = original

print(original)
print(copia_errada)

# Saída:
# {'nome': 'Caderno', 'preco': 15.99}   # aponta para o original
# {'nome': 'Caderno', 'preco': 15.99}   # também aponta para o original
```

Nesse caso, se você alterar o valor através de uma das variáveis, ele também vai aparecer alterado na outra, pois ambas retornam o mesmo dicionário. Observe:

```python
original = {"nome": "Caderno", "preco": 15.99}

print(original)

copia_errada = original
print(copia_errada)

copia_errada["preco"] = 17.99

print(original)
print(copia_errada)

# Saída:
# {'nome': 'Caderno', 'preco': 15.99}   # original antes de alterar o "preco"
# {'nome': 'Caderno', 'preco': 15.99}   # copia_errada antes de alterar o "preco"
# {'nome': 'Caderno', 'preco': 17.99}   # original depois de alterar o "preco"
# {'nome': 'Caderno', 'preco': 17.99}   # copia_errada depois de alterar o "preco"
```

> Atenção: Em projetos maiores, a atribuição com o `=` quando nossa intenção era criar uma cópia pode causar bugs difíceis de rastrear. Então, é preciso usar esse operador com cuidado quando nossos dados são mutáveis!

### `copy()`

Agora você já entendeu que duas variáveis podem apontar para o mesmo dicionário.

Para copiar um dicionário de verdade, ou seja criar um novo que é completamente independente do que já existe apesar de começar com os mesmos dados dele, usamos o método `copy()`:

```python
original = {"nome": "Caderno", "preco": 15.99}
print(original)

copia_certa = original.copy()
print(copia_certa)

copia_certa["preco"] = 17.99

print(original)
print(copia_certa)

# Saída:
# {'nome': 'Caderno', 'preco': 15.99}   # original antes de alterar o "preco"
# {'nome': 'Caderno', 'preco': 15.99}   # copia_certa antes de alterar o "preco"
# {'nome': 'Caderno', 'preco': 15.99}   # original depois de alterar o "preco"
# {'nome': 'Caderno', 'preco': 17.99}   # copia_certa depois de alterar o "preco"
```

Agora, `original` e `copia_certa` são dicionários completamente separados. Mudanças feitas em um deles não afetam mais o outro.

### `dict()`

Também podemos usar a função `dict()` para criar uma cópia independente do original:

```python
original = {"nome": "Caderno", "preco": 15.99}
print(original)

copia_certa = dict(original)
print(copia_certa)

copia_certa["preco"] = 17.99

print(original)
print(copia_certa)

# Saída:
# {'nome': 'Caderno', 'preco': 15.99}   # original antes de alterar o "preco"
# {'nome': 'Caderno', 'preco': 15.99}   # copia_certa antes de alterar o "preco"
# {'nome': 'Caderno', 'preco': 15.99}   # original depois de alterar o "preco"
# {'nome': 'Caderno', 'preco': 17.99}   # copia_certa depois de alterar o "preco"
```

## Outras funções úteis

Para fechar, vamos ver duas funções que são específicas dos dicionários e não existem em outras coleções, mas que podem ser muito úteis.

### `dict.fromkeys()`

Cria um novo dicionário a partir de uma coleção de chaves e um valor padrão:

```python
campos = ("nome", "preco", "estoque")
dicionario_sem_valores = dict.fromkeys(campos)

print(dicionario_sem_valores)

# Saída:
# {'nome': None, 'preco': None, 'estoque': None}
```

Se você não informar, o valor padrão será `None`, mas é possível definir um valor padrão específico.

Se você estiver criando um jogo, por exemplo, e os valores de `vida`, `saúde` e `energia` de cada personagem sempre começam como `100`, você pode fazer da seguinte forma:

```python
campos = ("vida", "saúde", "energia")
status_inicial = dict.fromkeys(campos, 100)

print(status_inicial)

# Saída:
# {'vida': 100, 'saúde': 100, 'energia': 100}
```

Assim, `100` é atribuído a todas as chaves que estão sendo criadas. Isso é muito útil para inicializar estruturas de forma rápida, como placares, contadores ou configurações com chaves pré-definidas.

### `setdefault()`

**Acessa um valor com segurança**, pois garante que a chave existe no dicionário. Ele pode agir de duas formas diferentes de acordo com a situação:

- se a chave existir → apenas **devolve o valor guardado nela**;
- se a chave não existir → **cria a chave com o valor passado** para ele e **devolve esse mesmo valor**.

Veja primeiro um exemplo em que a chave já existe:

```python
produto = {"nome": "Caderno", "estoque": 5}

estoque = produto.setdefault("estoque", 0)

print(estoque)
print(produto)

# Saída:
# 5
# {'nome': 'Caderno', 'estoque': 5}
```

Acima, nenhuma mudança foi feita no dicionário, porque `"estoque"` já existia. O valor que já estava guardado, o `5`, foi devolvido.

Agora, um exemplo em que a chave não existia ainda:

```python
produto = {"nome": "Caderno"}

estoque = produto.setdefault("estoque", 0)

print(estoque)
print(produto)

# Saída:
# 0
# {'nome': 'Caderno', 'estoque': 0}
```

Aqui, além de retornar o `0`, o `setdefault()` criou a chave `"estoque"` no dicionário com esse valor.

Isso é muito útil quando você quer garantir que uma chave exista antes de usá-la, evitando erros. Códigos desse tipo também se tornam desnecessários para que o código funcione tanto quando a chave existe quanto quando não existe:

```python
produto = {"nome": "Caderno"}

if "estoque" in produto:
  print(produto["estoque"])
else:
  produto["estoque"] = 0
  print(produto["estoque"])

# Saída:
# 0
```

---

Como você aprendeu nessas últimas duas lições, os dicionários são muito úteis para montar estruturas complexas que representam objetos do mundo real nos nossos códigos.

Daqui para frente, você vai utilizá-los com muita frequência. Pratique bastante e se algo não tiver ficado claro, continue estudando. Acredite, o esforço valerá a pena!
