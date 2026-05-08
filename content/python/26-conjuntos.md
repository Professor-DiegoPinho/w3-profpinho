---
title: "Conjuntos"
description: "O que são e como funcionam os conjuntos em Python."
order: 26
---

Depois de trabalhar com listas e tuplas, vamos conhecer mais uma coleção importante do Python: o **conjunto** (`set`).

## O que é um conjunto?

À primeira vista, conjuntos lembram um pouco as listas e tuplas. Mas basta olhar um pouquinho mais de perto para perceber que eles funcionam de um jeito bem diferente.

Um conjunto é uma coleção:

- **não ordenada** → os itens podem aparecer em qualquer ordem, não seguem uma ordem fixa;
- **sem índices** → você não acessa valores por posição, como conjunto[0];
- **mutável** → dá para adicionar e remover elementos quando quiser;
- **sem valores duplicados** → cada item aparece uma única vez, mesmo que você tente repetir.

Isso faz dos conjuntos uma ótima ferramenta quando você precisa garantir que **não existam valores repetidos** ou quando quer comparar grupos de dados de forma rápida, algo muito parecido com o que fazemos lá na matemática.

Talvez você se lembre da união (`A ∪ B`), que junta tudo o que está em A e em B, e da interseção (`A ∩ B`), que pega apenas o que aparece nos dois conjuntos ao mesmo tempo. Aqui em Python, essas ideias aparecem do mesmo jeito, só que aplicadas ao código.

Se esses símbolos da matemática não estão frescos na sua memória, tudo bem! Vamos construir cada conceito com calma e do início, para deixar o aprendizado o mais tranquilo possível.

## Criando conjuntos com chaves `{}`

A forma mais direta de criar um conjunto é usando **chaves** e separando os valores por vírgula:

```python
frutas = {"maçã", "banana", "laranja"}
print(frutas)

# Saída possível:
# {'banana', 'maçã', 'laranja'}
```

Acima, vemos como a característica dos conjuntos **não serem ordenados** funciona na prática. Apesar de acrescentarmos os itens na ordem maçã, banana e laranja, eles são impressos na ordem banana, maçã e laranja.

O Python é livre para organizar os itens da forma que for mais conveniente internamente. Isso significa que a ordem pode mudar a cada vez que você roda o código.

## Tipos diferentes dentro do conjunto

Assim como listas e tuplas, conjuntos podem guardar **diferentes tipos de dados**:

```python
nomes = {"Ana", "Bruno", "Carla"}
idades = {18, 21, 30, 30}
respostas = {True, False, False}
misturado = {"Ana", 34, True, 40.5}

print(nomes)
print(idades)
print(respostas)
print(misturado)

# Saída possível:
# {'Carla', 'Ana', 'Bruno'}
# {18, 21, 30}
# {False, True}
# {40.5, True, 'Ana', 34}
```

Para confirmar o tipo guardado em uma variável é um conjunto, ou seja do tipo `set`, usamos a função `type()`:

```python
frutas = {"maçã", "banana", "laranja"}
print(type(frutas))

# Saída:
# <class 'set'>
```

> Um ponto de atenção é que os conjuntos aceitam apenas valores imutáveis como seus elementos. Então, você pode guardar números, _strings_, booleanos e tuplas, por exemplo.

Não é possível guardar outros conjuntos, listas e dicionários, que veremos mais adiante, como valores de um conjunto por eles serem mutáveis.

### Valores repetidos

Como vimos acima, uma característica central dos conjuntos é que **não existem valores duplicados** neles. Se você tentar colocar o mesmo valor mais de uma vez, o Python simplesmente o **mantém só uma vez**:

```python
frutas = {"maçã", "banana", "maçã", "laranja"}
print(frutas)

# Saída possível:
# {'banana', 'laranja', 'maçã'}
```

Mesmo que "maçã" apareça duas vezes quando criamos o conjunto, ele é criado apenas **uma** "maçã".

### Booleanos, 0 e 1

Vimos há algumas lições que, em alguns contextos, os números `1` e `0` são tratados como se fossem os valores `True` e `False`. Ou seja, eles são considerados como _truthy_ e _falsy_.

Esse comportamento também acontece nos conjuntos e costuma surpreender muita gente que está começando! Como os conjuntos não aceitam duplicados, apenas uma das versões é mantida.

Observe:

```python
conjunto1 = {True, 1, 2}
print(conjunto1)

conjunto2 = {False, 0, 1}
print(conjunto2)

# Saída possível:
# {True, 2}
# {False, 1}
```

O que está acontecendo aqui?

- `1` é considerando como sendo igual a `True` → então `True` e `1` contam como **o mesmo valor**.
- `0` é considerado como sendo igual a `False` → então `False` e `0` também contam como **o mesmo valor**.

Por isso, o conjunto não guarda as duas versões separadas. Ele guarda apenas a primeira versão que foi incluída nele:

```python
conjunto1 = {True, 1, 2}
print(conjunto1)

conjunto2 = {1, True, 2}
print(conjunto2)

# Saída possível:
# {True, 2}
# {1, 2}
```

Em `conjunto1`, o `True` aparece primeiro que o `1` na definição do conjunto, então apenas o `True` é mantido e o `1` é descartado. Já no `conjunto2`, o `1` aparece primeiro, então ele é mantido e o `True` é descartado.

## Acessando valores

Já vimos que os conjuntos **não têm índices** e que você não consegue fazer algo como `frutas[0]` para acessar um valor dentro deles. Em vez disso, podemos usar um operador que já vimos quando estávamos estudando _strings_, o `in`.

Da mesma forma que ele podia ser usado para verificar se um determinado valor existia dentro do nosso texto, agora podemos usá-lo para verificar se algo existe dentro de nosso conjunto.

Se o valor que procuramos estiver presente, recebemos `True` como resultado. Senão, recebemos `False`:

```python
frutas = {"maçã", "banana", "laranja"}

print("banana" in frutas)
print("melancia" in frutas)

# Saída:
# True
# False
```

Essas verificações costumam ser bem rápidas em conjuntos e são uma das razões pelas quais eles são tão úteis.

---

Agora que você já viu o que são conjuntos e como acessar seus valores, vamos nos aprofundar em como trabalhar com eles nas próximas lições.
