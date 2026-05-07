---
title: "Condicionais com match"
description: "Como usar o match para organizar decisões no código"
order: 20
---

# Condicionais com `match`

Nas lições anteriores, você aprendeu sobre estruturas condicionais usando `if`, `elif` e `else`. Agora, vamos explorar uma forma diferente de tomar decisões no código com a estrutura `match`.

Ela foi introduzida no Python 3.10 e permite organizar vários casos possíveis de uma forma mais declarativa e limpa, especialmente quando temos muitos valores a serem comparados.

## Como o `match` funciona

A estrutura `match` funciona de maneira semelhante a um "interruptor" (_switch_ em inglês), que é encontrado em outras linguagens de programação.

A estrutura básica é assim:

```python
match expressao:
    case valor1:
        # bloco de código
    case valor2:
        # outro bloco de código
    case valor3:
        # outro bloco
```

Funciona da seguinte maneira:

- O Python avalia a expressão depois do `match` uma única vez;
- Ele compara esse valor com cada `case`, de cima para baixo;
- Quando encontra o primeiro case compatível, ele executa o bloco e termina a busca.

Para ficar mais intuitivo, vamos ver como o exemplo abaixo funciona no detalhe:

```python
dia = 4

match dia:
    case 1:
        print("Segunda-feira")
    case 2:
        print("Terça-feira")
    case 3:
        print("Quarta-feira")
    case 4:
        print("Quinta-feira")
    case 5:
        print("Sexta-feira")
    case 6:
        print("Sábado")
    case 7:
        print("Domingo")

# Saída:
# Quinta-feira
```

O valor 4 é atribuído à variável `dia`, então quando pedimos para o Python avaliar `match dia`, estamos buscando o `case` que tenha o mesmo valor que essa variável, ou seja, 4.

Ele vai verificar cada `case` de cima pra baixo. Primeiro, ele vai verificar o `case 1`. Se estivéssemos usando a estrutura com `if`, esse caso seria equivalente a `if dia == 1`. Como 4 não é igual a 1, o código não entra nesse bloco e segue para o `case` seguinte. O mesmo processo é repetido com o `case 2` e o `case 3`.

Quando ele chega no `case 4` (`if dia == 4`), ele encontra a correspondência, pois 4 é igual a 4. Ele executa o bloco associado a esse caso, imprimindo "Quinta-feira", e interrompe a busca por outros casos.

Já que o código achou o que buscava, ele não vai testar se 4 é igual a 5, 6 ou 7. Esse comportamento garante que apenas o primeiro caso compatível seja executado, mesmo que os valores seguintes também pudessem corresponder.

## Caso padrão com `_`

Em muitas situações, você vai querer realizar uma ação padrão se nenhum dos valores definidos para os `case` corresponder ao `match`. Para isso, podemos usar o underline (`_`), que funciona como um coringa, pois corresponde a qualquer valor que esteja no `match`.

Pense em um menu de caixa eletrônico com várias opções:

```python
opcao = 6

match opcao:
    case 1:
        print("Saque")
    case 2:
        print("Depósito")
    case 3:
        print("Transferência")
    case _:
        print("Opção inválida! Digite um número de 1 a 3.")

# Saída:
# Opção inválida! Digite um número de 1 a 3.
```

O número 6 não é uma das opções do menu, então ele vai cair no `case _`.

> Atenção: Como qualquer valor corresponde ao `_`, ele deve ser sempre o **último caso** dentro do `match`. Senão, o código entraria nele mesmo quando tivesse um `case` correspondente.

## Combinando valores com `|`

Às vezes, vários valores diferentes devem levar ao **mesmo resultado**. Em vez de repetir o mesmo código em vários `case`, você pode agrupar os valores usando o operador `|`, que funciona como um "ou".

Observe:

```python
comida = "bolo"

match comida:
    case "bolo" | "brigadeiro" | "cajuzinho":
        print("Doce")
    case "pipoca" | "cachorro quente" | "coxinha":
        print("Salgado")

# Saída:
# Doce
```

Acima, se a comida for bolo, brigadeiro ou cajuzinho, o programa imprime que é um "Doce". Já se for pipoca, cachorro quente ou coxinha, ele imprime "Salgado".

## Usando condições extras (_guards_)

Nem sempre o valor da expressão é o suficiente para tomar a decisão. Quando você precisar de mais condições, você pode adicioná-las com um `if` dentro do próprio `case`. Essas condições são chamadas de _guards_.

Imagine um carro autônomo, aqueles que não precisam de um motorista para circular. Quando ele está se movendo pelas ruas, ele verifica se o sinal de trânsito está verde.

Para evitar acidentes, precisamos programar o carro para verificar duas situações quando o sinal está verde:

```python
sinal = "verde"
pedestres_atravessando = True

match sinal:
    case "verde" if pedestres_atravessando:
        print("Freie: pedestres atravessando!")
    case "verde" if not pedestres_atravessando:
        print("Siga em frente.")

# Saída:
# Freie: pedestres atravessando!
```

Dessa forma, se tiver pedestres atravessando, ele freia. Caso contrário, ele segue em frente e passa pelo sinal.

## Quando usar `match` e quando usar `if/elif/else`?

Aprendemos que o Python oferece duas formas de lidar com decisões no código: `if/elif/else` e `match`. Embora os dois resolvam problemas parecidos, cada um brilha em situações diferentes.

### Quando usar `match`:

O `match` funciona melhor quando você está comparando **um único valor** com várias possibilidades. Ele deixa o código mais limpo e fácil de ler, especialmente quando:

- você precisa testar muitas alternativas para o mesmo valor;
- cada caso representa um cenário bem definido;
- sua sequência de `elif` começou a crescer demais e ficou difícil de entender.

Nesses casos, o `match` ajuda a transformar uma "escada" de condições em uma espécie de tabela de casos, que fica mais direta, mais organizada e mais visual.

### Quando usar `if/elif/else`:

Apesar do `match` trazer vantagens em organização, o `if/elif/else` continua sendo a ferramenta mais comum e indicada para situações em que você precisa avaliar **condições complexas**, como comparações numéricas, combinações de expressões ou qualquer lógica que não seja apenas identificar um valor.

Use `if/elif/else` quando:

- as condições dependem de expressões (ex.: `x > 10 and y < 5`);
- você precisa de mais liberdade para escrever regras lógicas;
- existem poucos caminhos possíveis e a estrutura continua simples e clara.

No fim, a escolha não é sobre qual é "melhor", mas sim qual é mais adequada para cada caso. Entender quando cada uma se encaixa melhora a qualidade do seu código.
