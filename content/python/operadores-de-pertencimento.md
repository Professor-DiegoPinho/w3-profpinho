---
title: "Operadores de pertencimento"
description: "Os operadores de pertencimento em Python"
order: 33
---

Você deve ter percebido que, apesar de termos falado sobre vários operadores, ainda não nos aprofundamos em todos eles. Alguns, como os operadores de pertencimento, fazem mais sentido agora que você aprendeu sobre coleções.

Em vários momentos, você já viu o Python respondendo a verificações como:

- `"b" in "abc"`
- `"chave" in dicionario`
- `3 in lista_numeros`

Esse tipo de verificação é feito com os **operadores de pertencimento**, também chamados de operadores de _membership_.

Vamos recapitular onde você já viu esses operadores e entender com calma como eles funcionam em cada tipo de dado.

## O que são operadores de pertencimento?

Operadores de pertencimento são usados para **testar se um valor está presente** dentro de um objeto, como uma _string_, uma lista ou um dicionário.

Em Python, temos dois operadores desse tipo:

| Operador | Descrição                               | Exemplo               |
| -------- | --------------------------------------- | --------------------- |
| `in`     | Verifica se o valor está presente.      | `valor in objeto`     |
| `not in` | Verifica se um valor não está presente. | `valor not in objeto` |

Você pode ler como:

- `valor in objeto` → "O valor está dentro do objeto?"
- `valor not in objeto` → "O valor NÃO está dentro do objeto?"

Eles sempre retornam um booleano, ou seja, `True` ou `False`, como resposta.

## Operador `in`

O operador `in` retorna `True` quando encontra o valor dentro do objeto e `False` quando não encontra:

```python
frutas = ["maçã", "banana", "cereja"]

print("banana" in frutas)
print("laranja" in frutas)

# Saída:
# True
# False
```

A impressão de `"banana" in frutas` é `True` porque "banana" está na lista. Já a de `"laranja" in frutas` é `False` porque "laranja" não está nela.

Você pode usar isso em estruturas condicionais:

```python
frutas = ["maçã", "banana", "cereja"]

if "banana" in frutas:
  print("Tem banana na lista!")

# Saída:
# Tem banana na lista!
```

## Operador `not in`

O operador `not in` é o oposto do `in`: ele retorna `True` quando o valor não está presente e `False` quando está presente.

```python
frutas = ["maçã", "banana", "cereja"]

print("abacaxi" not in frutas)
print("maçã" not in frutas)

# Saída:
# True
# False
```

A impressão de `"abacaxi" not in frutas` é `True` porque realmente não tem `"abacaxi"` na lista. Já `"maçã" not in frutas` é `False` porque tem `"maçã"`, ou seja, a frase "maçã não está na lista" é falsa.

Isso é útil, por exemplo, para validar dados:

```python
alternativas_validas = ["sim", "não"]

resposta = "talvez"

if resposta not in alternativas_validas:
  print("Resposta inválida!")

# Saída:
# Resposta inválida!
```

Aqui, só os valores dentro de `alternativas_validas`, `"sim"` e `"não"`, são aceitos como resposta. Se o usuário digitar qualquer coisa que não seja um desses dois valores, ele vai receber a mensagem de que a resposta é inválida.

## Operadores de pertencimento em diferentes coleções

Agora vamos ver como o `in` e o `not in` se comportam com os diversos tipos de dados que você já estudou.

### Listas e tuplas

Com listas e tuplas, os operadores de pertencimento verificam se um elemento é **igual (`in`) a algum item** da lista/tupla ou **diferente (`not in`) de todos os elementos** da lista/tupla.

Veja um exemplo:

```python
tupla = ("verde", "vermelho", "azul escuro")

print("azul escuro" in tupla)
print("azul" in tupla)
print("azul" not in tupla)
print("azul escuro" not in tupla)

# Saída:
# True
# False
# True
# False
```

Nelas, é necessário que o valor conferido **equivalha por inteiro** a algum dos elementos presentes nelas.

Mesmo `azul` fazendo parte da palavra `azul escuro`, ele não é considerado como parte da tupla do exemplo. Precisamos procurar por `azul escuro` para receber um `True` com o `in` e um `False` com o `not in`.

### Conjuntos

Os operadores de pertencimento são muito comuns nesse caso, porque **conjuntos foram feitos justamente para trabalhar com pertencimento**. Frequentemente será importante saber se algo pertence ou não ao conjunto.

```python
conjunto = {2, 4, 6, 8, 10}

print(10 in conjunto)
print(1 in conjunto)
print(1 not in conjunto)
print(10 not in conjunto)

# Saída:
# True
# False
# True
# False
```

Assim como acontece com listas e tuplas, o valor precisa **equivaler por inteiro a algum que existe dentro do conjunto**. O dígito `1` faz parte do número `10`, que está presente no conjunto, mas o número `1` não é considerado como parte dele.

> Vale relembrar que, como os conjuntos não têm índices nem chaves, os operadores de pertencimento são o que usamos para acessar seus valores.

### _Ranges_

Você lembra que, diferente das coleções, o `range` **não guarda valores de forma explícita**? Ele representa um intervalo numérico definido por regras: onde começa, onde termina e de quanto em quanto os números avançam.

Por causa disso, o uso de `in` funciona de um jeito especial com ele. Em vez de percorrer todos os valores do intervalo, o Python apenas confere se o valor está dentro do início e do fim e se respeita o passo definido:

```python
intervalo = range(0, 10, 2)

print(4 in intervalo)
print(7 in intervalo)
print(7 not in intervalo)
print(4 not in intervalo)

# Saída:
# True
# False
# True
# False
```

Essa verificação é feita de forma muito eficiente, já que ela não precisa percorrer todos os valores. Isso faz com que o `range` seja uma excelente opção quando você precisa testar pertencimento em sequências numéricas.

Em relação ao processo de verificação, mais uma vez é necessário que o elemento exista exatamente da forma que é buscado dentro das regras do intervalo.

### Dicionários

Aqui vem um ponto importante e que costuma gerar confusão: quando você usa `in` e `not in` em um dicionário, o Python **verifica apenas as chaves**, e não os valores.

Observe:

```python
pessoa = {
  "nome": "Ana",
  "idade": 30,
  "cidade": "São Paulo"
}

print("nome" in pessoa)
print("Ana" in pessoa)

# Saída:
# True
# False
```

O que acontece acima é:

- `"nome" in pessoa` é `True` → `"nome"` é uma chave do dicionário.
- `"Ana" in pessoa` é `False` → `"Ana"` é um valor, não uma chave.

Se você quiser verificar se algo está presente como valor, pode usar o método `values()` que vimos quando estudamos os dicionários:

```python
pessoa = {
  "nome": "Ana",
  "idade": 30,
  "cidade": "São Paulo"
}

print("Ana" in pessoa.values())
print("idade" in pessoa.keys())

# Saída:
# True
# True
```

Apesar de não ser necessário, pois o `in` e o `not in` já procuram nas chaves por padrão, você também pode conferir se uma chave existe com a função `keys()`, como fizemos no exemplo acima.

Novamente, só receberemos `True` caso o valor buscado seja exatamente igual a uma chave ou, quando usamos `values()`, a um valor, que está presente no dicionário.

### Iteráveis com dados aninhados

Não são só as chaves de dicionários que não são analisadas por padrão pelos operadores de pertencimento. Em Python, eles também **não "entram" em iteráveis aninhados**. Eles avaliam apenas os **elementos do nível mais externo** da coleção:

```python
listas_aninhadas = [[1, 2, 3], [4, 5, 6]]

print(1 in listas_aninhadas)
print([1, 2, 3] in listas_aninhadas)

# Saída:
# False
# True
```

O que acontece aqui:

- `1 in listas_aninhadas` → `False`<br>Porque `listas_aninhadas` contém 2 **listas**, `[1, 2, 3]` e `[4, 5, 6]`, não números.
- `[1, 2, 3] in listas_aninhadas` → `True`<br>Porque essa lista existe como um elemento de `listas_aninhadas`.

### _Strings_

Você também já viu os operadores `in` e `not in` sendo usados com _strings_. Aqui, eles verificam se a _string_ buscada está contida dentro da outra:

```python
texto = "Hello World"

print("H" in texto)
print("hello" in texto)
print("World" in texto)
print("z" not in texto)

# Saída:
# True
# False
# True
# True
```

Alguns pontos importantes:

- A verificação é sensível a maiúsculas e minúsculas, o que chamamos de _case sensitive_ :

  - `"H" in texto` é `True`, pois existe uma letra "H" maiúscula em `"Hello World"`
  - `"h" in texto` é `False`, pois não existe uma letra "h" minúscula em `"Hello World"`

- O Python procura o que chamamos de _substrings_, não palavras inteiras:

  ```python
  mensagem = "Python é incrível"

  print("thon" in mensagem)
  print("Py" in mensagem)
  print("Python " in mensagem)

  # Saída:
  # True
  # True
  # True
  ```

> Diferente das coleções e do `range`, os operadores de pertencimento não funcionam buscando 100% de equivalência nas _strings_. Mesmo que `"thon"` e `"Py"` não sejam palavras nem correspondam exatamente à _string_ em que fazemos a verificação, `"Python é incrível"`, o resultado é `True`.

## Pertencimento na prática

Vamos ver alguns cenários reais em que `in` e `not in` aparecem com frequência.

### 1. Confirmando se o tema de um app foi definido

Antes de acessar um valor no dicionário, você pode verificar se a chave existe:

```python
configuracoes = {
  "tema": "claro",
  "idioma": "pt-BR"
}

if "tema" in configuracoes:
  print("Tema atual:", configuracoes["tema"])

# Saída:
# Tema atual: claro
```

Isso ajuda a evitar erros quando você tenta acessar uma chave que não existe.

### 2. Checando se uma letra já foi chutada em um jogo da forca

Lista as letras já tentadas e vê se o palpite é repetido:

```python
letras_tentadas = ["a", "e", "s"]
palpite = "a"

if palpite in letras_tentadas:
  print("Você já tentou essa letra. Escolha outra.")
else:
  letras_tentadas.append(palpite)
  print("Letra registrada.")

# Saída:
# Você já tentou essa letra. Escolha outra.
```

### 3. Avaliando se é possível agendar uma consulta

Cada horário é uma tupla com duas informações fixas: o dia da semana e o período do dia.

```python
horarios = (
  ("segunda", "manhã"),
  ("quarta", "tarde")
)

consulta = ("quarta", "tarde")

if consulta in horarios:
  print("Horário disponível para agendamento.")
else:
  print("Esse horário não está disponível.")

# Saída:
# Horário disponível para agendamento.
```

O `in` vai comparando cada tupla dentro de `horarios` com a tupla `consulta`. Como ele avalia de tupla em tupla, as duas informações precisam ser válidas.

Se o usuário escolher um dia com disponibilidade, mas o turno não estiver disponível nesse dia, a consulta não poderá ser agendada:

```python
horarios = (
  ("segunda", "manhã"),
  ("quarta", "tarde")
)
consulta = ("quarta", "manhã")

if consulta in horarios:
  print("Horário disponível para agendamento.")
else:
  print("Esse horário não está disponível.")

# Saída:
# Esse horário não está disponível.
```

---

Você viu como usar os operadores de pertencimento `in` e `not in` para testar se um valor está presente em diferentes tipos de coleções. No próximo passo, vamos conhecer o último tipo de operadores que veremos aqui, os de identidade.
