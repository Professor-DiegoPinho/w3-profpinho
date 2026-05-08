---
title: "Estrutura de repetição for"
description: "Como usar a estrutura de repetição for em Python"
order: 37
---

Na lição anterior, entendemos **por que estruturas de repetição existem** e vimos que o Python possui dois tipos diferentes delas: o `for` e o `while`.

Agora, chegou a hora de conhecer o `for`. Ele é a ferramenta ideal quando sabemos **quantas vezes queremos repetir algo** ou quando queremos **percorrer uma sequência de valores**. Essas são ações constantemente realizadas na programação, então ele é muito útil e aparece o tempo todo nos nossos códigos.

Vamos recapitular conceitos importantes que você já viu sobre o `for` e, a partir deles, explorar o funcionamento básico dessa estrutura de repetição.

## Relembrando: o que o `for` faz

Como já vimos, estruturas de repetição nos permitem executar o mesmo bloco de código várias vezes, seguindo alguma regra.

A regra do `for` é repetir o código uma quantidade fixa de vezes, seja **contando com um `range`** ou **percorrendo todos os itens de um iterável**, como coleções e _strings_.

Independente do tipo de dado, a leitura dele é sempre a mesma: **para cada item do iterável, execute este bloco de código**. Podemos representar isso em Python como:

```python
for item in iteravel:
  # bloco de código
```

## Repetindo código com o `for`

Para entender como usamos essa estrutura, vamos começar com um exemplo clássico com o `range`, que você já conhece. Ele é o parceiro mais comum do `for` quando queremos repetir algo um número específico de vezes.

```python
for numero in range(1, 4):
  print(numero)

# Saída:
# 1
# 2
# 3
```

Vamos entender com calma o que está acontecendo:

- O `range(1, 4)` cria uma sequência com os números `1`, `2` e `3`;
- O `for` começa pelo primeiro item da sequência, o `1`;
- A cada repetição, um item da sequência é colocado na variável `numero`, do primeiro ao último:
  - Na primeira repetição, `numero` é igual a `1`.
  - Na segunda ele é igual a `2`.
  - Na terceira, igual a `3`.
- A cada repetição, o bloco indentado é executado uma vez e o item atual da sequência percorrida, que está na variável `numero`, é impresso com a função `print()`;
- Quando passamos por todos os itens da sequência e imprimimos todos os 3 números, o loop acaba e não há mais repetições.

> Lembra que o valor final do range (`4`) **não é incluído nele**? Por isso, `range(1, 4)` conta só até o número `3`. Para ir até `4`, precisaríamos usar `range(1, 5)`.
>
> Se você ainda tiver dúvidas sobre esse funcionamento, não deixe de revisar a lição [Ranges](./ranges)!

Além de imprimir o próprio número do intervalo que o `range` cria, também podemos usá-lo só para contar quantas vezes algo vai se repetir:

```python
for numero in range(1, 6):
  print("Executando...")

# Saída:
# Executando...
# Executando...
# Executando...
# Executando...
# Executando...
```

O bloco de código do `for` é executado 5 vezes, contando de 1 a 5. A cada repetição, a _string_ "Executando..." é impressa.

### Blocos de código e indentação

Falamos algumas vezes sobre o bloco de código que o `for` executa. Assim como em outras estruturas do Python, ele depende da indentação para definir qual é seu bloco.

Tudo que estiver indentado abaixo do `for` faz parte da repetição:

```python
for numero in range(1, 4):
  print(numero)

print("Fim")

# Saída:
# 1
# 2
# 3
# Fim
```

O `print("Fim")` só é executado após o término do loop. Como ele não está indentado dentro do `for`, ele não faz parte da repetição.

Se estivesse dentro, `print("Fim")` também seria executado junto com a impressão dos números:

```python
for numero in range(1, 4):
  print(numero)
  print("Fim")

# Saída:
# 1
# Fim
# 2
# Fim
# 3
# Fim
```

> A indentação pode parecer um detalhe pequeno, mas ela faz toda a diferença! Fique sempre de olho para evitar erros no seu código.

## Percorrendo strings

_Strings_ são objetos iteráveis, o que significa que o `for` consegue percorrê-las **caractere por caractere**:

```python
palavra = "Python"

for letra in palavra:
  print(letra)

# Saída:
# P
# y
# t
# h
# o
# n
```

O que acontece aqui:

- A _string_ é tratada como uma sequência de caracteres.
- A cada repetição, `letra` recebe um caractere diferente: `P`, `y`, `t`, `h`, `o` e `n`.
- Para cada letra, o bloco de código `print(letra)` é executado.
- O _loop_ continua até todos os caracteres serem percorridos.

## Percorrendo coleções

O `for` funciona com todas as coleções que já vimos em Python. A ideia é sempre a mesma: **percorrê-las elemento por elemento**.

### Listas

Uma das aplicações mais comuns do `for` é percorrer listas.

```python
nomes = ["Ana", "Bruno", "Carlos"]

for nome in nomes:
  print(nome)

# Saída:
# Ana
# Bruno
# Carlos
```

A cada repetição:

- Um item da lista é atribuído à variável `nome`.
- O código dentro do `for`, `print(nome)`, é executado.

Repare que não precisamos saber o tamanho da lista nem usar índices. O `for` faz esse controle por trás dos panos, deixando o código mais limpo e legível.

### Tuplas

Com tuplas, o comportamento é exatamente o mesmo das listas. A diferença está no tipo da coleção, não na forma de percorrê-la.

Observe:

```python
cores = ("vermelho", "verde", "azul")

for cor in cores:
  print(cor)

# Saída:
# vermelho
# verde
# azul
```

### Conjuntos

Como conjuntos não possuem ordem garantida, **a ordem em que o bloco é executado pode variar a cada execução**. Ainda assim, o `for` percorre todos os seus elementos e executa o bloco de código para cada um deles:

```python
frutas = {"maçã", "pera", "amora"}

for fruta in frutas:
  print(fruta)

# Saída possível:
# amora
# pera
# maçã
```

Você pode perceber que incluímos os itens na ordem: maçã, pera e amora. Porém, eles foram impressos na ordem: amora, pera e maçã.

### Dicionários

Em dicionários, o `for` **percorre as chaves por padrão**:

```python
pessoa = {"nome": "Ana", "idade": 30}

for chave in pessoa:
  print(chave)

# Saída:
# nome
# idade
```

Se quisermos acessar os valores associados às chaves, podemos usar o método `values()`, que aprendemos quando estudamos dicionários:

```python
pessoa = {"nome": "Ana", "idade": 30}

for valor in pessoa.values():
  print(valor)

# Saída:
# Ana
# 30
```

Nesse caso, o `for` não percorre mais as chaves, mas sim os valores armazenados nelas.

Resumindo:

- `for chave in dicionario` → percorre as chaves
- `for valor in dicionario.values()` → percorre os valores

## A variável de controle

Quando você começa a usar esta estrutura de repetição, é comum surgir uma dúvida: **de onde vem a variável que aparece logo após a palavra `for`?**

Como você pode ver, não existe nenhuma linha anterior ao `for` definindo `numero = ...`. Ainda assim, se você tentar rodar o código, você verá que ele funciona perfeitamente.

```python
for numero in range(1, 4):
  print(numero)

# Saída:
# 1
# 2
# 3
```

Isso acontece porque essa variável é criada pelo próprio `for`. Ela é chamada de **variável de controle**.

Como já vimos, ela é responsável por armazenar, a cada repetição, o valor atual do iterável em que o _loop_ está. Dessa forma, ela não precisa ser criada antes de iniciar o `for`.

Usando o exemplo do `range(1, 4)`, o que acontece é mais ou menos assim:

- Na primeira repetição, `numero` vale `1`;
- Na segunda, `numero` vale `2`;
- Na terceira, `numero` vale `3`.

A cada volta do _loop_, um novo valor é automaticamente atribuído à variável de controle. Você não precisa incrementá-la manualmente nem se preocupar em quando ela deve parar.

Isso é uma das grandes vantagens do for em Python. Diferente de muitas linguagens, ele abstrai todo esse controle para você.

Não precisa decorar esse nome, mas a título de curiosidade, o `for` é chamado de **estrutura de repetição com variável de controle** exatamente por conta dessa variável.

### Variável de controle ou índice?

Em muitas linguagens, o `for` está diretamente ligado a um índice numérico. Em Python, não funciona dessa forma.

Em iteráveis que mantêm a ordem dos itens, começam do `0` e aumentam de 1 em 1, o valor guardado na variável de controle pode coincidir com o índice do item atual. Porém, o que ela realmente recebe é exatamente o valor que está sendo percorrido, e não apenas sua posição.

Veja este exemplo:

```python
for nome in ["Ana", "Bruno", "Camila"]:
  print(nome)

# Saída:
# Ana
# Bruno
# Camila
```

Aqui, `nome` não representa um número. A cada repetição, ele recebe diretamente uma _string_ da lista. A lógica é bem próxima da forma como pensamos: "para cada nome da lista, faça algo".

### Nomes para a variável de controle

Como a variável de controle representa o valor atual da repetição, o nome dela faz muita diferença. Nomes genéricos, como `i`, `x` ou `item`, funcionam, mas nem sempre comunicam bem a intenção do código. Sempre que possível, prefira nomes que descrevem o que está sendo percorrido.

Vamos imaginar que o dicionário `dados` aparece muito antes do `for` no nosso programa:

```python
for i in dados:
  print(i.email)
```

Agora, veja a diferença:

```python
for usuario in dados:
  print(usuario.email)
```

Nesse caso, fica claro que cada valor do `loop` representa um usuário mesmo que não estejamos olhando o dicionário naquele momento.

Um bom nome reduz a necessidade de comentários e facilita a manutenção do código, principalmente quando ele cresce ou precisa ser lido por outra pessoa. Quanto mais claro o nome, mais fácil é entender o papel daquela repetição.

### O ciclo de vida da variável de controle

Diferente de muitas linguagens, em Python a variável de controle não existe apenas dentro do `for`. Quando o loop termina, ela continua disponível e pode ser acessada no restante do código. Nesse caso, ela mantém o último valor atribuído durante a repetição.

Apesar de ser possível, é muito importante ter cuidado com o uso dela fora do `for`. Seu principal papel é representar, a cada iteração, o valor atual da sequência.

O ideal é usá-la apenas dessa forma e não no restante do seu código. Assim, você deixa claro qual é a sua função e evita comportamentos inesperados.

## Alterações no iterável

Quando você percorre uma sequência com o `for`, o Python cria internamente um caminho de iteração baseado no estado atual dessa estrutura.

Se, durante o loop, você remove, adiciona ou reorganiza elementos, ele pode "se perder", fazendo com que itens sejam pulados, processados duas vezes ou simplesmente ignorados.

Veja um exemplo:

```python
numeros = [2, 4, 6, 8, 10]

for numero in numeros:
  numeros.remove(numero)

print(numeros)

# Saída:
# [4, 8]
```

A intenção do código acima é simples: remover todos os elementos da lista. Se o código estivesse correto, a saída deveria ser `[]`. Mas isso não é o que acontece.

### O que realmente acontece?

Vamos acompanhar rapidamente:

- A lista `numeros` começa a ser percorrida com: `[2, 4, 6, 8, 10]`
- Na primeira repetição o `2` é removido → lista vira `[4, 6, 8, 10]`
- O `for` entende que já lidou com o primeiro item da lista e pula o `4`
- Na segunda repetição, o `6` é removido → lista vira `[4, 8, 10]`
- O `for` entende que já lidou com o segundo item da lista e pula o `8`
- Na terceira repetição, o `10` é removido → lista vira `[4, 8]`

Ou seja, metade dos elementos simplesmente não foi processada.

Esse tipo de erro é muito comum em código iniciante justamente porque o `for` não acompanha as mudanças na estrutura da sequência enquanto itera sobre ela. Cada remoção muda os índices dos elementos seguintes, e o for não "volta" para conferir o que mudou.

### Como evitar esse problema?

A regra geral é simples: **não modifique diretamente a sequência que está sendo iterada**. Em vez disso, existem abordagens mais seguras.

Uma opção é criar uma nova lista apenas com os valores desejados:

```python
numeros = [1, 2, 3, 4, 5]
numeros_impares = []

for numero in numeros:
  if numero % 2 != 0:
    numeros_impares.append(numero)

print(numeros_impares)

# Saída:
# [1, 3, 5]
```

Aqui, percorremos a lista original, mas deixamos outra pronta para receber os números ímpares, que são os que queremos filtrar com o `for`.

Outra alternativa é fazer o contrário, ou seja, percorrer uma cópia enquanto alteramos a lista original:

```python
numeros = [1, 2, 3, 4, 5]

for numero in numeros[:]:
  if numero % 2 == 0:
    numeros.remove(numero)

print(numeros)

# Saída:
# [1, 3, 5]
```

Aqui, `numeros[:]` cria uma cópia da lista, garantindo que o loop percorra uma estrutura estável, mesmo que a original seja modificada.

Entender esse detalhe ajuda a evitar bugs difíceis de perceber no início e reforça uma ideia importante: o `for` funciona melhor quando seu papel é percorrer e analisar dados, não alterar a estrutura que está sendo percorrida.

---

Aprendemos sobre o funcionamento do `for` em Python: como ele opera, o que ele percorre e o papel do iterável e da variável de controle nessa estrutura.

Na próxima lição, vamos nos aprofundar ainda mais em como usá-lo no dia a dia. Mas antes de avançar, estude bem tudo o que vimos aqui!

Muitos alunos começam a sentir mais dificuldade na programação quando chegam neste conteúdo, então não desanime se esse for o seu caso. Com estudo e persistência, logo você estará dominando este conceito.
