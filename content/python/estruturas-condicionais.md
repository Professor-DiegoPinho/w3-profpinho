---
title: "Estruturas condicionais"
description: "Como tomar decisões no código com if, elif e else"
order: 18
---

Chegou a hora de dar um passo importante: **fazer nosso código tomar decisões**.

É aqui que entram as **estruturas condicionais**, construídas em cima dos valores booleanos (`True` e `False`) e dos operadores que você já viu. Em Python, elas giram principalmente em torno de três palavras-chave:

- `if`
- `elif`
- `else`

## A estrutura básica do `if`

O `if` equivale à palavra **SE** que usamos em português para falar sobre uma condição, como quando falamos: "Se fizer sol, eu vou à praia".

Ele é a estrutura condicional mais simples. Sua função é **testar uma condição** e **executar um bloco de código** apenas se essa condição for verdadeira:

```python
clima = "Ensolarado"

if clima == "Ensolarado":
    print("Vou à praia")     # este código é executado

# Saída:
# Vou à praia
```

Nesse caso, a expressão `clima == "Ensolarado"` vai ter `True` ou `False` como resultado. Se o resultado for `True`, o bloco logo abaixo do `if` é executado.

Se for `False`, o Python ignora o bloco e continua executando as linhas do programa fora dele se houver:

```python
clima = "Chuvoso"

if clima == "Ensolarado":
    print("Vou à praia")     # este código NÃO é executado

# Saída:
# (nada é impresso)
```

### Como o Python sabe o que pertence ao `if`

Em muitas linguagens, blocos de código são delimitados com chaves (`{}`). Em Python, quem manda é a **indentação**, lembra dela? Como vimos na lição "Sintaxe Básica", a indentação são os espaços ou tabulações no começo de uma linha de código.

Logo abaixo do `if`, tudo que estiver mais à direita está indentado e faz parte do bloco condicional. Se você tirar a indentação, o Python entende que a linha **não faz parte** do `if`:

```python
condicao = True

if condicao == True:
    print("Esta linha está DENTRO do if.")    # com indentação
    print("Esta linha também está DENTRO do if.")    # com indentação
print("Esta linha está FORA do if.")    # sem indentação

# Saída:
# Esta linha está DENTRO do if.
# Esta linha também está DENTRO do if.
# Esta linha está FORA do if.
```

No exemplo aqui em cima, o último `print()` realmente deveria estar fora do `if`, mas se você esquecer de indentar uma linha que queria indentar, você pode ter dois tipos de problemas:

- Se o código não indentado só fizer sentido pro Python dentro do bloco do `if`, você vai receber um erro do tipo `IndentationError`;
- Se o código não indentado até fizer sentido fora do bloco, mas deveria estar dentro dele para funcionar conforme o esperado, seu código vai se comportar da forma errada.

> Dica: no terminal, o próprio Python já coloca a indentação para você quando você começa um bloco `if`. Mas quando você usar outros programas feitos para escrever código, fique de olho. Ah, e depois de escolher se vai usar **espaços ou tab**, mantenha sempre o mesmo padrão dentro do bloco. Nada de misturar os dois!

## `If` e `else`: o que fazer quando o caso `False` também é importante

Quando o resultado falso também exigir que a gente faça algo a partir dele, usamos a dupla `if` + `else`.

Se a condição do `if` não for verdadeira, o código vai obrigatoriamente entrar no `else`. Ele equivale à palavra SENÃO que usamos em português para falar sobre uma condição, como quando dizemos: "Se fizer sol, eu vou à praia. Senão, vou ao shopping".

É importante entender que o `if` cobre o caso verdadeiro. Já o `else` fica responsável por todos os outros casos exceto o que aparece no `if`. Pensando na frase acima, Ou seja, ele cobre todo o resto: qualquer situação que não seja sol, como estar chovendo, nublado ou até nevando, leva a pessoa ao shopping.

Veja um exemplo real:

```python
idade = 15

if idade >= 18:
    print("Maior de idade")
else:
    print("Menor de idade")

# Saída:
# Menor de idade
```

## `if`, `elif` e `else`: escolhendo entre vários caminhos

O `if` e o `else` são excelentes para testarmos uma condição, dizendo o que fazer se ela for verdadeira e o que fazer se ela for falsa. Mas às vezes você precisa escolher entre **mais de duas opções**.

É aí que entra em cena o `elif`, que é uma abreviação de "else if". Em português, ele equivale à expressão "SENÃO, SE": "SE fizer sol, eu vou à praia. **SENÃO, SE** estiver chovendo, vou ficar em casa. SENÃO, vou no shopping".

Juntos, eles funcionam da seguinte maneira no código:

- `if`: testa a primeira condição;
- `elif`: testa outras condições, caso as anteriores sejam falsas;
- `else`: testa o último caso, quando nenhuma condição anterior é verdadeira.

Observe:

```python
nota = 75

if nota >= 90:                   # testa a 1ª condição
    print("Nota A")
elif nota >= 60:                 # se a 1ª for falsa, testa esta condição
    print("Nota B")
else:                            # se todas as anteriores forem falsas, entra aqui
    print("Nota C ou menor")

# Saída:
# Nota B
```

Um ponto importante é que apenas **o primeiro bloco com condição verdadeira** é executado. Se o aluno do exemplo acima tivesse tirado 95, as duas primeiras condições seriam verdadeiras, mas o código só entraria na condição `if nota >= 90` e somente "Nota A" seria impresso. Todo o resto seria ignorado.

```python
nota = 95

if nota >= 90:                        # a 1ª condição é verdadeira
    print("Nota A")
elif nota >= 60:                      # não testa esta condição
    print("Nota B")
else:                                 # não testa esta condição
    print("Nota C ou menor")

# Saída:
# Nota A
```

Veja outro possível uso. O código abaixo testa três condições diferentes e apenas a última é verdadeira, então ele entra no bloco dela e imprime a mensagem correspondente:

```python
dia_da_semana = "sábado"

if dia_da_semana == "segunda":
    print("Boa semana para você!")
elif dia_da_semana == "quarta":
    print("Estamos no meio da semana!")
elif dia_da_semana == "sábado" or dia_da_semana == "domingo":
    print("Aproveite o final de semana!")

# Saída
# Aproveite o final de semana!
```

Perceba que não há um `else`. Com isso, nada é impresso caso o dia da semana não seja segunda, quarta, sábado ou domingo.

Se acrescentarmos o `else`, ele dirá o que deve ser feito quando o dia da semana for terça, quinta ou sexta:

```python
dia_da_semana = "quinta"

if dia_da_semana == "segunda":
    print("Boa semana para você!")
elif dia_da_semana == "quarta":
    print("Estamos no meio da semana!")
elif dia_da_semana == "sábado" or dia_da_semana == "domingo":
    print("Aproveite o final de semana!")
else
    print("Tenha um bom dia!")

# Saída
# Tenha um bom dia!
```

> Tudo que não é coberto pelas condições do `if` e `elif`, entra no bloco do `else`. Ou seja, no código acima, `else` equivaleria a verificar `elif dia_da_semana == "terça" or dia_da_semana == "quinta" or dia_da_semana == "sexta"`, que são todos os casos não abordados pelas condições anteriores nesse exemplo.

## Consolidando as regras do `if`, `elif` e `else`

Agora que você já viu como eles funcionam, é importante entender e reforçar suas regras.

**Onde cada palavra-chave pode aparecer:**

- O `if` sempre inicia a estrutura.
- O `elif` só pode aparecer depois de um `if`.
- O `else` deve aparecer por último, depois do `if` e todos os `elif`.

**Quantas vezes cada uma pode ser usada:**

- O `if` só pode ser usado uma vez.
- O `elif` pode ser usado quantas vezes você quiser, mas o uso dele é opcional
- O `else` pode ser usado uma vez, no máximo. O uso dele é opcional.

**O que causa erro:**

- Usar `elif` sem uma condição, como `elif:`.
- Colocar uma condição no `else`, como `else nota >= 60`.
- Tentar colocar um bloco condicional depois do `else`.

**Como o fluxo é avaliado:**

- O Python testa as condições de cima para baixo.
- Ele executa apenas o primeiro bloco cuja condição seja verdadeira.
- Depois do primeiro bloco verdadeiro, todos os outros são ignorados, mesmo que suas condições também sejam verdadeiras.

**Quando são opcionais:**

- O `if` nunca é opcional.
- O `elif` é opcional. Só precisamos dele se quisermos testar condições específicas que não seriam atendidas pelo `if`.
- O `else` só é necessário se algo precisa ser feito caso todas as outras condições sejam falsas. Se nada precisar ser feito para elas, não use o `else`.

---

Não se preocupe se parecer que são muitas informações. Vamos continuar vendo estruturas condicionais na próxima lição. Quanto mais você estudar esse assunto, mais fácil ele vai ficar!
