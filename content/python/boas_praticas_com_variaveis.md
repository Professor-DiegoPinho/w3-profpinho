---
title: "Boas práticas com variáveis"
description: "Como usar as variáveis para dar significado aos dados do seu código"
order: 7
---

Depois de aprender o que são variáveis e como guardar valores nelas, chegou a hora de entender como nomeá-las bem, organizá-las e interagir com elas no terminal.

## Recebendo dados do usuário

Além de atribuir valores diretamente, também podemos pedir que o usuário insira informações no terminal durante a execução do programa. Isso é feito com a função `input()`, que pausa o programa e espera o usuário digitar algo.

```python
nome = input('Qual é o seu nome? ')
# Usuário digita 'Diego' no terminal e aperta a tecla "Enter" no teclado
# O valor guardado na variável nome passa a ser 'Diego'

print('Olá,', nome)

# Saída:
# Olá, Diego
```

Um ponto de atenção é que tudo que é recebido através do `input()` chega como texto (ou seja, com o tipo `str`), mas nem sempre queremos manter o valor com esse tipo de dado. Podemos querer transformá-lo em outro tipo, o que é possível com o _casting_, que vimos no artigo anterior.

## Exibindo variáveis com print()

Lembra que no artigo 'Primeiras Impressões' falamos que não dá para imprimir uma palavra solta, sem aspas, porque o Python não entende o que é aquilo? Pois bem, agora você já pode fazer isso, desde que essa palavra seja o nome de uma variável!

Veja o exemplo:

```python
nome = 'Diego'
print(nome)

# Saída:
# Diego
```

O `print()` entende que "nome" é uma variável e mostra o valor guardado dentro dela.

Porém, se você colocar o nome da variável entre aspas, o Python vai entender que se trata de uma _string_ literal e vai imprimir exatamente o texto que está dentro das aspas em vez do valor da variável com aquele nome:

```python
nome = 'Diego'
print('nome')    # com as aspas, imprime o texto 'nome'
print(nome)      # sem as aspas, imprime o valor guardado na variável nome

# Saída:
# nome
# Diego
```

## Regras para nomes de variáveis

Como vimos acima, podemos escolher o nome das nossas variáveis de acordo com o dado que ela guarda. Porém, você deve seguir algumas regras importantes para garantir que ela funcione conforme esperado.

Essas regras existem para que o Python consiga entender o que é uma variável dentro do código. Se usássemos símbolos no começo do nome de uma variável, por exemplo, ele poderia achar que estamos tentando fazer uma operação matemática em vez de criar uma variável para guardar um valor.

Essas são as regras para nomear sua variável corretamente:

- O nome só pode começar com uma letra ou com o símbolo underline(\_);
- Pode conter apenas letras, números e underlines;
- Não pode começar com números ou símbolos que não sejam o underline;
- É _case sensitive_, ou seja, são **sensíveis à diferença entre letras maiúsculas e minúsculas**: `nome`, `Nome` e `NOME` são 3 variáveis diferentes para o Python;
- Não pode ter o mesmo nome que alguma das palavras reservadas do Python, como `class`, `True` ou `False`, que você já conhece, e várias outras que você aprenderá mais pra frente. Essas palavras já têm um significado próprio na linguagem, então não podemos mudar o significado delas para guardar um valor com outro significado.

Alguns exemplos de nomes válidos e inválidos:

```python
# Nomes válidos:
nome = 'Diego'
_nome = 'Pinho'
MEUNOME = 'Diego'
nome_completo = 'Diego Pinho'
meus2nomes = 'Diego Pinho'

# Nomes inválidos:
2nome = 'Diego Pinho'
meu-nome = 'Diego'
nome&sobrenome = 'Diego Pinho'
class = 'Turma 1'
&classe = 1
```

## Evite sobrescrever funções nativas

O Python vem com várias funções e tipos prontos, vamos aprender muitos deles mais pra frente.

Essas funções e tipos têm nomes que podem ser usados como variáveis, mas fazer isso substitui temporariamente o comportamento original e pode causar erros difíceis de entender.

Algumas dessas palavras que você já conhece são: `str`, `int`, `float`, `print` e `input`. Se você criar variáveis com o nome delas, o comportamento dessas funções deixará de funcionar até que o programa seja reiniciado.

Por exemplo:

```python
print = 'Olá, mundo!'

# Agora, se você tentar usar o print() como função, não vai mais dar certo.
# Uma mensagem de erro aparecerá quando você tentar usá-lo:

print(print)

# Saída:
# Traceback (most recent call last):
#   File "<python-input-1>", line 1, in <module>
#     print(print)
#     ~~~~~^^^^^^^
# TypeError: 'str' object is not callable
```

Portanto, evite usar esses nomes nas suas variáveis. Mas se for muito importante que o nome contenha alguma dessas palavras, adicione um prefixo ou sufixo descritivo:

```python
meu_print = 'Olá, mundo!'
texto_str = 'Mensagem exemplo'
```

## Boas práticas para nomear variáveis

Por convenção, usamos o que é chamado de **snake_case** para nomear variáveis com mais de uma palavra.

No **snake_case,** todas as letras de todas as palavras usadas no nome da variável devem ser minúsculas e as palavras devem ser separadas por um underline entre cada uma delas:

```python
meu_nome_completo = 'Diego Pinho'

# Saída:
# Diego Pinho
```

Além dessa convenção, também vale adotar algumas boas práticas ao nomear variáveis. Elas não são obrigatórias, mas ajudam a deixar o código mais limpo e fácil de entender:

- Use nomes que façam sentido para o que a variável representa;
- Evite abreviações confusas, é melhor ter um nome maior mas mais descritivo;
- Siga um padrão consistente. Se você começou a nomear as variáveis de uma forma, não mude a forma como você as nomeia ao criar novas variáveis.

Assim, mesmo quem nunca viu seu código vai conseguir entender rapidamente o que cada parte faz.

Veja alguns exemplos de bons e maus nomes de variáveis:

```python
# Bons nomes:
idade_usuario = 25
quantidade_produtos = 10
preco_total = 199.90

# Nomes ruins:
id = 25
qtd = 10
pt = 199.90
```

Por que os nomes ruins são ruins? Vou te explicar!

O nome `id` não deixa claro que a variável guarda uma idade ao olhar somente seu nome. Além disso, a palavra "id" na programação costuma ser usada em variáveis que guardam números de identificação. Por exemplo, o primeiro usuário cadastrado costuma ter o `ìd` com o valor 1. Então, esse nome também pode gerar esse tipo de confusão. Por último, `id` é uma daquelas palavras que são permitidas, mas que podem causar comportamentos inesperados no resto do código. Ou seja, não é uma boa ideia usá-la como variável.

Já `qtd`, não descreve qual tipo de quantidade é guardado nela. É a quantidade de usuários, de produtos ou de outra coisa? Só pelo nome, quem lê seu código não vai saber qual quantidade é essa.

Quanto à `pt`, essa é uma abreviação que não é comumente usada. É normal que pessoas que falam português entendam que "qtd" quer dizer "quantidade", por exemplo, mas "pt" não é uma abreviação que costuma ser usada para representar "preço total". Dessa forma, quem ler o código poderia ter bastante dificuldade para entender o que a variável representa.

Os melhores nomes podem ser mais longos, mas eles deixam claro o que o dado representa. Vai por mim, isso facilita muito a leitura e manutenção do seu código!

---

Com boas práticas de nomenclatura e o uso das variáveis com funções como `print()` e `input()`, seus programas ficam mais organizados, claros e fáceis de manter.

Esses cuidados fazem toda a diferença na hora de escrever um bom código e quanto antes você adotar, melhor!
