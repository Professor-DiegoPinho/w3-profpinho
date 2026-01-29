---
title: "Aprofundando no loop for"
description: "Como usar o loop for de forma mais completa em Python"
order: 38
---

Na lição anterior, vimos como o `for` funciona, para que ele serve e como percorrer diferentes tipos de iteráveis. Agora é hora de dar um passo além. Vamos nos aprofundar no seu uso, explorando situações mais próximas do código real.

Você vai ver como combinar repetições com diversos outros conceitos. Alguns deles serão novos e outros já são conhecidos.

A ideia é mostrar como o `for` se encaixa em problemas práticos, oferecendo uma visão mais completa de como essa estrutura aparece no dia a dia em Python.

## Estruturas condicionais com o `for`

Na prática, raramente usamos estruturas de repetição sozinhas. O mais comum é **combinar o `for` com outros recursos, como com as estruturas condicionais** `if`, `elif` e `else`.

Essa combinação permite tomar decisões diferentes **a cada repetição** do _loop_, dependendo do valor que está sendo analisado naquele momento.

### Condicionais dentro do `for`

O padrão mais comum é usar um `if` dentro da repetição para lidar com os cenários possíveis:

```python
numeros = [1, 2, 3]

for numero in numeros:
  if numero % 2 == 0:
    print(numero, "é par")
  else:
    print(numero, "é ímpar")

# Saída:
# 1 é ímpar
# 2 é par
# 3 é ímpar
```

Aqui, o que acontece é:

- O `for` percorre a lista `numeros` de 1 em 1 elemento.
- A cada repetição, o `if` avalia uma condição diferente.
- Dependendo do resultado, um bloco ou outro é executado.

### Filtrando valores durante a repetição

Outra situação muito comum é usar o `if` para **filtrar** valores que nos interessam:

```python
frutas = ["banana", "amora", "laranja", "maçã", "abacate"]

for fruta in frutas:
  if fruta.startswith("a"):
    print(fruta)

# Saída:
# amora
# abacate
```

Nesse caso:

- O _loop_ percorre toda a lista `frutas`.
- Apenas as que atendem à condição de começar com a letra "a" são impressas.
- As demais são simplesmente ignoradas.

Esses exemplos mostram como condições e repetições trabalham juntas. **A repetição fica responsável pelo fluxo**, enquanto **a condição decide o que fazer em cada passo**. Em Python, praticamente todo código real combina essas duas ideias: repetir e decidir.

## Controlando o fluxo do loop

Até agora, vimos como usar o `for` para percorrer todos os elementos de iteráveis, mas nem sempre queremos que ele faça isso.

### `break`

Às vezes, queremos parar o _loop_ antes de percorrer todos os itens. Para isso, usamos o `break`:

```python
frutas = ["banana", "laranja", "maçã"]

for fruta in frutas:
  if fruta == "laranja":
    break
  print(fruta)

# Saída:
# banana
```

Quando o Python encontra a fruta `"laranja"` na lista, o `break` interrompe a repetição e sai do _loop_ imediatamente, mesmo que ainda existam elementos para percorrer.

### `continue`

O `continue` funciona de forma diferente. Ele **interrompe apenas a iteração atual**, pulando tudo que resta nela e indo para a próxima:

```python
frutas = ["banana", "laranja", "maçã"]

for fruta in frutas:
  if fruta == "laranja":
    continue
  print(fruta)

# Saída:
# banana
# maçã
```

Nesse caso, o _loop_ continua existindo, mas ignora apenas o item `"laranja"`, que não é impresso. O elemento `"maçã"`, que vem na repetição seguinte, é impresso normalmente.

### `pass`

Em Python, um `for` não pode ficar vazio. Se, por algum motivo, você ainda não souber ou não quer implementar a lógica do loop, pode usar `pass`:

```python
for numero in range(3):
  pass
```

Ele não faz nada por si só, mas evita erros ao rodar o código quando o bloco ainda está vazio durante o desenvolvimento.

## O `else` no `for`

O `for` em Python pode ter um bloco `else` no fim dele. Esse bloco é executado **quando o loop termina normalmente**, sem ser interrompido por um `break`:

```python
for numero in range(3):
  print(numero)
else:
  print("Loop finalizado")

# Saída:
# 0
# 1
# 2
# Loop finalizado
```

Agora, veja o efeito do `break`:

```python
for numero in range(3):
  if numero == 1:
    break
  print(numero)
else:
  print("Loop finalizado")

# Saída:
# 0
```

O `else` **não é executado** quando o _loop_ é interrompido.

## Loops aninhados

Um _loop_ pode existir dentro de outro _loop_. Chamamos isso de **loops aninhados**:

```python
adjetivos = ["vermelha", "grande"]
frutas = ["maçã", "limão"]

for adjetivo in adjetivos:
  for fruta in frutas:
    print(fruta, adjetivo)

# Saída:
# vermelha maçã
# vermelha limão
# grande maçã
# grande limão
```

O loop interno é executado **para cada iteração do loop externo**. Entenda o que acontece:

- O `for` externo percorre cada `adjetivo`.
- Para cada `adjetivo`, o `for` interno percorre todas as `frutas`.
- Cada combinação de `adjetivo` e `fruta` é impressa.

Outra situação em que usamos _loops_ aninhados é quando temos coleções dentro de coleções:

```python
loop_externo = [
  [1, 2, 3],
  [4, 5, 6]
]

for loop_interno in loop_externo:
  for numero in loop_interno:
    print(numero)

# Saída:
# 1
# 2
# 3
# 4
# 5
# 6
```

Acima:

- No _loop_ externo, o `for` percorre cada linha: `[1, 2, 3]` e `[4, 5, 6]`.
- Para cada linha, o `for` do _loop_ interno percorre seus elementos:
  - Em `[1, 2, 3]`, ele passa por `1`, `2` e depois `3`.
  - Em `[4, 5, 6]`, ele passa por `4`, `5` e depois `6`.

Esse padrão aparece muito quando trabalhamos com tabelas, matrizes ou dados estruturados.

### O `break` em _loops_ aninhados

Com _loops_ aninhados, o uso do break merece atenção especial. Isso porque **o `break` interrompe apenas o _loop_ em que ele está inserido**, e não todos os _loops_ ao mesmo tempo.

Observe:

```python
loop_externo = [
  [1, 2, 3],
  [4, 5, 6]
]

for loop_interno in loop_externo:
  for numero in loop_interno:
    if numero == 2:
      break
    print(numero)

# Saída:
# 1
# 4
# 5
# 6
```

O que acontece nesse código:

- O `for` externo percorre cada linha do `loop_externo`.
- O `for` interno percorre os números de cada item do `loop_interno`.
- Quando o valor `2` é encontrado, o `break` **interrompe apenas o _loop_ interno** onde ele está. Os números `2` e `3` não são impressos.
- O _loop_ externo continua normalmente para a próxima linha. Como nela não existe o número `2`, todos os itens são impressos: `4`, `5` e `6`.

### O `continue` em _loops_ aninhados

O comportamento do `continue` em _loops_ aninhados segue a mesma lógica: ele afeta apenas a repetição atual:

```python
loop_externo = [
  [1, 2, 3],
  [4, 5, 6]
]

for loop_interno in loop_externo:
  for numero in loop_interno:
    if numero == 2:
      continue
    print(numero)

# Saída:
# 1
# 3
# 4
# 5
# 6
```

Aqui:

- Quando o número `2` é encontrado, o `continue` **pula apenas essa repetição**.
- O restante desse loop continua sendo percorrido, então `3` é impresso.
- O loop externo segue normalmente para a próxima linha. Como nela não existe o número `2`, todos os itens são impressos: `4`, `5` e `6`.

## Desempacotamento com o `for`

Em algumas situações você pode encontrar algo como `for chave, valor in pessoa.items()` e se assustar. Mas mantenha a calma! Por mais que possa parecer estranho ter duas variáveis antes do `for`, isso é mais simples do que parece.

### Como funciona o desempacotamento?

Em Python, o for consegue ir além de percorrer valores simples. Quando os itens da sequência possuem mais de um valor agrupado e têm estruturas semelhantes, podemos desempacotar esses valores diretamente na primeira linha do _loop_.

Na prática, isso significa **"abrir" cada item em partes menores e atribuir cada parte a uma variável diferente, tudo de uma vez**. Veja um exemplo com uma lista de tuplas:

```python
pessoas = [
  ("Ana", 25),
  ("Bruno", 30),
  ("Carla", 22)
]

for nome, idade in pessoas:
  print(nome, idade)

# Saída:
# Ana 25
# Bruno 30
# Carla 22
```

Cada item da lista é uma tupla com dois valores. Em vez de receber a tupla inteira e acessá-la por índice (pessoas[0], pessoas[1]), o `for` já faz o trabalho de separar automaticamente esses valores nas variáveis `nome` e `idade`.

Isso deixa o código mais limpo, mais legível e muito mais expressivo.

Mas é preciso ter um cuidado: o número de variáveis precisa ser exatamente igual ao número de valores. Se tentarmos desempacotar mais ou menos valores do que existem, o Python gera um erro para evitar confusões silenciosas no código.

### Por que isso é tão útil?

Frequentemente, dados que aparecem juntos têm significados relacionados, como vimos com as tuplas aqui em cima. Outro caso em que os dados agrupados que estão vinculados são as chaves e valores de um dicionário.

Você deve se lembrar que para acessar chaves e valores juntos, usamos o método `.items()`. Podemos combiná-lo com o `for` para trabalhar essas duas informações ao mesmo tempo:

```python
pessoa = {"nome": "Felipe", "jogo favorito": "xadrez"}

for chave, valor in pessoa.items():
    print(f"Seu {chave} é {valor}.")

# Saída:
# Seu nome é Felipe.
# Seu jogo favorito é xadrez.
```

Podemos concluir que o desempacotamento no `for` nos ajuda a:

- Evitar acessos por índice, que deixam o código mais verboso;
- Dar nomes claros aos valores que estamos usando;
- Tornar o _loop_ mais próximo da forma como pensamos o problema.

Esse recurso é simples, poderoso e que aparece com frequência quando lidamos com coleções mais ricas em dados.

## O `for` na prática

Os exemplos que vimos acima são apenas alguns casos em que as estruturas de repetição podem ser usadas. Há muitas outras formas de usá-las, já que elas são muito comuns.

Veja abaixo mais alguma situações em que o `for` pode ser usado.

### 1. Somar valores e calcular média

Aqui, combinamos os conceitos de estrutura de repetição `for` com o operador aritmético `/`, o operador de atribuição `+=`, a função `len()` e a formação de _strings_:

```python
notas = [7.5, 8.0, 6.5, 9.0]
soma = 0

for nota in notas:
  soma += nota

media = soma / len(notas)
print(f"Média: {media:.2f}")

# Saída:
# Média: 7.75
```

Aqui, o `for` percorre todas as notas. Cada uma delas é somada à variável `soma`. Ao final do loop, usamos o valor acumulado e a quantidade de valores lidos para calcular a média.

### 2. Validar e-mails de forma simples

Uma validação real de e-mail é muito mais complexa, mas podemos simplificar conferindo se ele possui os caracteres `@` e `.`, que sempre precisam existir em qualquer endereço de e-mail:

```python
emails = ["ana@gmail.com", "joao#email.com", "maria@site"]

for email in emails:
  email_parece_valido = "@" in email and "." in email
  print(f"{email} -> Tem @ e ponto? {email_parece_valido}")

# Saída:
# ana@gmail.com -> Tem @ e ponto? True
# joao#email.com -> Tem @ e ponto? False
# maria@site -> Tem @ e ponto? False
```

Acima, combinamos o `for` com listas, operador de pertencimento `in`, operador lógico `and`, valores booleanos `True` e `False` e formatação de _strings_.

### 3. Transformar lista de tuplas em dicionário

Às vezes, precisamos transformar dados de um formato para outro. Um caso comum é converter uma lista de tuplas (onde cada tupla representa um par chave-valor) em um dicionário.

```python
pares_chave_valor = [("nome", "Ana"), ("idade", 30), ("cidade", "SP")]

perfil = {}

for chave, valor in pares_chave_valor:
    perfil[chave] = valor

print(perfil)

# Saída:
# {'nome': 'Ana', 'idade': 30, 'cidade': 'SP'}
```

---

O `for` é uma das estruturas mais importantes do Python, sendo muito mais do que apenas uma simples repetição.

Ele é uma forma clara e poderosa de percorrer dados, trabalhar com sequências, aplicar regras e controlar o fluxo de execução dos nossos programas.

Dominar o `for` é essencial para escrever um código mais legível, organizado e fácil de manter.
