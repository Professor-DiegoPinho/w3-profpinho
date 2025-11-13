---
title: "Operadores lógicos"
description: "Os operadores lógicos em Python"
order: 16
---

# Operadores lógicos

No artigo anterior, vimos como comparar valores individuais usando os **operadores de comparação**. Aprendemos também que com eles podemos verificar se um número está entre dois valores com expressões como `1 < x < 10`.

Nesse caso, duas comparações são feitas ao mesmo tempo: conferimos tanto se `1 < x` e se `x < 10`. Se as duas comparações forem verdadeiras, o valor `True` era retornado:

```python
x = 5
print(1 < x < 10)   # 5 é maior que 1 E menor que 10? sim!

# Saída:
# True
```

Agora, vamos dar um passo além!

## Os operadores lógicos

O Python permite **combinar várias condições ao mesmo tempo** e é aí que entram os **operadores lógicos**.

Esses operadores são usados para conectar expressões e trazem resultados em valores booleanos (`True` ou `False`). Eles nos ajudam a tomar decisões mais complexas, unindo comparações e expressões.

Em Python, temos três operadores lógicos:

| Operador | Descrição                                                          | Exemplo                 |
| -------- | ------------------------------------------------------------------ | ----------------------- |
| `and`    | Retorna `True` se **todas** as expressões forem verdadeiras        | `x > 0` `and` `x < 10`  |
| `or`     | Retorna `True` se **pelo menos uma** das expressões for verdadeira | `x < 5` `or` `x > 10`   |
| `not`    | Inverte o resultado lógico (troca `True` por `False` e vice-versa) | `not(x > 3 and x < 10)` |

Vamos ver cada um deles em ação.

## O operador `and`

O operador `and` representa o **E lógico** em português. Ele é usado quando queremos verificar se **todas as expressões** avaliadas são verdadeiras.

Por exemplo, se a primeira expressão é verdadeira **E** a segunda também é verdeira, recebemos `True` como resultado:

```python
x = 5
y = 8

print(x > 0 and y > 0)

# Saída:
# True
```

Se qualquer uma das expressões for falsa, o resultado será `False`.

Uma situação da vida real que pode ajudar a visualizar é quando você quer acessar alguma conta online, como entrar no seu e-mail. Isso só é possível se **duas condições** forem verdadeiras: você digitou o endereço de e-mail correto **E** a senha correta.

```python
email_correto = True
senha_correta = True

print(email_correto and senha_correta)  # ambas precisam ser verdadeiras

# Saída:
# True
```

Se uma delas estiver errada, o acesso é negado.

```python
email_correto = False
senha_correta = True

print(email_correto and senha_correta)  # ambas precisam ser verdadeiras

# Saída:
# False
```

Uma maneira comum de visualizar todas as possíveis saídas para operadores lógicos é através do que chamamos de **tabela‑verdade**.

Para facilitar, vamos usar as mesmas variáveis que usamos acima na tabela para vermos se o usuário deveria conseguir acessar a conta (`email_correto and senha_correta` é `True`) ou não (`email_correto and senha_correta` é `False`):

| `email_correto` | `senha_correta` | `email_correto` `and` `senha_correta` |
| --------------- | --------------- | ------------------------------------- |
| True            | True            | True                                  |
| True            | False           | False                                 |
| False           | True            | False                                 |
| False           | False           | False                                 |

## O operador `or`

O operador `or` representa o **OU lógico**. Ele é usado quando queremos que **pelo menos uma das condições** seja verdadeira para que o resultado também seja `True`.

```python
x = 4

print(x < 5 or x > 10)

# Saída:
# True
```

Aqui, `x` é menor que 5. Mesmo não sendo maior que 10, pelo menos uma das condições é verdadeira, então o resultado é `True`.

Mas se nenhuma das condições for verdadeira, o resultado muda para `False`:

```python
x = 6
print(x < 5 or x > 10)

# Saída:
# False
```

Uma situação da vida real seria uma promoção de loja que oferece desconto se o cliente **for estudante** ou **tiver um cupom de fidelidade**. Basta **uma** dessas condições ser verdadeira para que o desconto seja aplicado:

```python
is_estudante = False
tem_cupom = True

print(is_estudante or tem_cupom)

# Saída:
# True
```

Veja a tabela‑verdade que mostra todos os resultados possíveis com o `or`:

| `is_estudante` | `tem_cupom` | `is_estudante or tem_cupom` |
| -------------- | ----------- | --------------------------- |
| True           | True        | True                        |
| True           | False       | True                        |
| False          | True        | True                        |
| False          | False       | False                       |

## O operador `not`

O operador `not` representa a **negação lógica**. Ele **inverte** o valor de uma expressão:

- o que é `True` vira `False`;
- o que é `False` vira `True`.

```python
x = 5
comparacao = x > 3    # 5 é maior que 3, então é True.

print(not comparacao)   # mas aqui o not inverte o resultado!

# Saída:
# False
```

Aqui, `x > 3 and x < 10` é `True`, mas o `not` inverte o resultado e retorna `False`.

Para deixar mais intuitivo, imagine um interruptor de lâmpada inteligente que acende somente quando o ambiente NÃO está claro.

```python
esta_claro = False
acender_luz = not esta_claro

print(acender_luz)

# Saída:
# True
```

Ou seja, se `esta_claro` for `False`, então `acender_luz`, que é o mesmo que `not` `esta_claro`, será `True` e a luz acende automaticamente. É como dizer: "Não está claro? Então acenda a luz!"

Veja como isso se representa em uma tabela‑verdade:

| `esta_claro` | `not esta_claro` |
| ------------ | ---------------- |
| True         | False            |
| False        | True             |

Um ponto de atenção é que o `and` e `or` precisam de pelo menos duas expressões para funcionarem. Você compara se isso E/OU aquilo são verdadeiros ou falsos.

No caso do `not`, ele atua sobre **uma única expressão** mesmo que essa expressão única tenha várias expressões dentro dela. O operador vai considerar só o resultado booleano para devolver o **oposto**:

```python
x = 12
print(not(x > 3 and x < 10))

# Saída:
# False
```

Aqui, vamos resolver primeiro a expressão dentro dos parênteses: `x > 3` é `True` e `x < 10` é `False`. Dessa forma, `x > 3 and x < 10` é `False` e `not(False)` é `True`. O resultado final é `False`.

## Combinando operadores

O `not` não é o único operador que pode ser combinado com outros. O `and` e o `or` também podem formar expressões mais complexas:

```python
x = 7

print((x > 0 and x < 10) or x == 100)

# Saída:
# True
```

Aqui, o Python primeiro avalia o que está dentro dos parênteses e depois aplica o `or`. Como `x` está entre 0 e 10, a expressão dentro do parêntese é `True`, e o `or` mantém esse resultado como `True`.

Um bom exemplo disso seria um caixa eletrônico que libera o saque se **a conta estiver ativa E houver saldo suficiente**, **OU** se o cartão for de emergência, o que permite saque limitado. Essa combinação mostra como operadores podem trabalhar juntos para expressar regras mais completas.

---

Os operadores lógicos são a base do raciocínio em programação. Logo veremos como eles são aplicados em **estruturas de decisão** para deixar o código ainda mais inteligente.
