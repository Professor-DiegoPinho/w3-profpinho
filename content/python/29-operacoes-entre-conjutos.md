---
title: "Operações entre conjuntos"
description: "Utilizando as operações da matemática nos conjuntos do Python"
order: 29
---

Depois de aprender o que são conjuntos, como criá-los, como funcionam suas regras e como manipulá-los no dia a dia, chegou agora a parte que conecta diretamente a programação com a matemática: as **operações entre conjuntos**.

## Os operadores

Se você já viu conceitos como união, interseção e diferença na escola, vai perceber que o Python segue exatamente a mesma lógica, só muda a forma de escrever.

Mesmo que esses nomes não estejam tão frescos na memória, não tem problema: ao longo deste artigo vamos relembrar o que cada operação significa e ver como aplicá‑las no código passo a passo.

### União

A união **junta todos os elementos** dos conjuntos unidos. Se temos um conjunto `A` e um conjunto `B`, o resultado será todos os elementos dentro dos dois, mas **sem repetir valores** que possam ser iguais entre os conjuntos.

Na matemática, essa operação é representada por `A ∪ B`. Já em Python, ela é representada por `|` ou `.union()`:

```python
A = {1, 2, 3}
B = {3, 4, 5}

print(A.union(B))
print(A | B)

# Saída possível:
# {1, 2, 3, 4, 5}
# {1, 2, 3, 4, 5}
```

No mundo real, esse operador pode ser útil quando queremos ter uma lista com todos os alunos que fazem matérias de um curso ou unir listas de tarefas de duas equipes que passaram a trabalhar juntas, por exemplo.

### Interseção

A interseção encontra somente os itens que estão **presentes em todos os conjuntos** avaliados. Na matemática, representamos por `A ∩ B`.

Ela é representada por `&` ou `.intersection()` em Python:

```python
A = {1, 2, 3}
B = {3, 4, 5}

print(A.intersection(B))
print(A & B)

# Saída:
# {3}
# {3}
```

Essa operação é útil para situações como: descobrir quem são as pessoas inscritas em dois cursos ao mesmo tempo ou identificar produtos que aparecem tanto na lista de favoritos quanto no carrinho de um usuário.

### Diferença

A diferença pega os itens que **estão em um conjunto, mas que não estão nos outros**. Ou seja, se temos os conjuntos `A` e `B`, ele considera tudo que está só em `A`, desconsiderando o que está em A mas também está em `B` e o que está só em `B`.

Na matemática indicamos como `A − B`. Em Python, podemos representar da mesma maneira, com o sinal de menos (`-`), ou com a função `.difference()`:

```python
A = {1, 2, 3}
B = {3, 4, 5}

print(A.difference(B))
print(A - B)

# Saída possível:
# {1, 2}
# {1, 2}
```

Apesar de não alterar nada na união e na interseção, aqui a ordem importa! `A - B` é diferente de `B - A`:

```python
A = {1, 2, 3}
B = {3, 4, 5}

print(A - B)
print(B - A)

# Saída possível:
# {1, 2}
# {4, 5}
```

Quando queremos encontrar alunos que faltaram (presentes na lista de matriculados, mas não na lista de presença) ou detectar produtos removidos entre duas versões de um catálogo, podemos utilizar esse operador.

### Diferença simétrica

Vimos que o operador de diferença considera o que está em `A` que não está em `B`. Já a diferença simétrica pega **tudo que está em `A` que não está em `B`** E **tudo que está em `B` que não está em A**. Ou seja, ela pega tudo que está em **`A` OU `B`**, mas não o que está nos dois ao mesmo tempo.

Ela é representada matematicamente por `A △ B`.

Apesar de ser chamada de diferença, ela está bem relacionada com a interseção, já que essa operação considera tudo que não é a interseção entre os conjuntos analisados. Ela é o inverso da interseção.

O símbolo `^` ou a função `.symmetric_difference()` são usadas para representá-la em Python:

```python
A = {1, 2, 3}
B = {3, 4, 5}

print(A.symmetric_difference(B))
print(A ^ B)

# Saída possível:
# {1, 2, 4, 5}
# {1, 2, 4, 5}
```

Essa operação é útil para identificar o que mudou entre duas coleções, como descobrir campos diferentes entre duas versões de um formulário.

Aqui, os campos "nome" e "email" são iguais entre as duas versões. Já os campos "telefone" e "endereco" estão presentes só em uma das versões:

```python
formulario_antigo = {"nome", "telefone", "email"}
formulario_novo = {"nome", "email", "endereco"}

print(formulario_antigo & formulario_novo)
print(formulario_antigo ^ formulario_novo)

# Saída possível:
# {'nome', 'email'}
# {'telefone', 'endereco'}
```

## Usando um operador várias vezes

Nos exemplos acima, realizamos operações entre 2 conjuntos para facilitar a visualização de cada conceito, mas você pode utilizar operadores com vários conjuntos ao mesmo tempo.

Observe:

```python
A = {1, 2, 3, 4}
B = {2, 3, 5}
C = {3, 6}

print (A | B | C)
print(A.intersection(B, C))

# Saída:
# {3}
# {3}
```

## Combinando operações

Além de poder usar um mesmo operador várias vezes, você também pode combinar diferentes operadores de uma só vez. Isso é muito comum tanto na matemática quanto na programação.

Vamos começar com um exemplo simples:

```python
A = {1, 2, 3, 4}
B = {3, 4, 5}
C = {4, 6}

resultado = A - B | C
print(resultado)

# Saída possível:
# {1, 2, 4, 6}
```

Pode surgir a dúvida sobre como fazer essas operações. A ordem correta segue a mesma ideia das operações matemáticas e do que vimos sobre os operadores em Python: **existe uma ordem pré-determinada que define qual operação acontece primeiro** e quais acontecem depois.

### Ordem de precedência dos operadores de conjuntos

Nos conjuntos, devemos seguir essa ordem para ir resolvendo as operações:

1. Interseção (`&`)
2. Diferença (`-`)
3. União (`|`)
4. Diferença simétrica (`^`)

Ou seja, o Python sempre resolve primeiro interseções, depois diferenças, depois uniões e só então diferenças simétricas, a menos que você use parênteses para mudar essa ordem.

### Usando parênteses para controlar a lógica

Assim como na matemática, você pode usar parênteses para deixar sua intenção clara e evitar sustos:

```python
A = {1, 2, 3, 4}
B = {3, 4, 5}
C = {4, 6}

sem_parenteses = A - B | C
# Passo 1: A - B  → {1, 2}
# Passo 2: ({1, 2}) | C → {1, 2, 4, 6}

com_parenteses = A - (B | C)
# Passo 1: B | C → {3, 4, 5, 6}
# Passo 2: A - ({3, 4, 5, 6}) → {1, 2}

print(sem_parenteses)
print(com_parenteses)

# Saída possível:
# {1, 2, 4, 6}
# {1, 2}
```

> Dica: Ao combinar operadores, a regra de ouro é que você pode usar vários juntos à vontade, desde que não vire um monstrinho difícil de entender. Legibilidade em primeiro lugar!

---

Com isso, você já sabe aplicar operações poderosas em seus códigos. Essas ferramentas serão muito úteis quando você começar a trabalhar com conjuntos maiores e quiser comparar dados de forma rápida.
