---
title: "Variáveis CSS"
description: "Como usar custom properties para armazenar e reutilizar valores em todo o CSS"
order: 28
---

# Como usar variáveis CSS?

As variáveis CSS, também chamadas de **custom properties**, permitem armazenar valores e reutilizá-los ao longo de todo o arquivo de estilo. Quando você precisa mudar uma cor ou um espaçamento que aparece em vários lugares, basta alterar o valor da variável em um único ponto.

## Como declarar

Variáveis são declaradas com dois hífens antes do nome. O lugar mais comum para declará-las é no seletor `:root`, que representa o elemento raiz do documento, tornando-as disponíveis em qualquer parte do CSS.

```css
:root {
  --cor-primaria: #3b82f6;
  --cor-texto: #1f2937;
  --espacamento-base: 16px;
  --borda-radius: 8px;
}
```

## Como usar

Para usar uma variável, chame a função `var()` com o nome dela.

```css
button {
  background-color: var(--cor-primaria);
  border-radius: var(--borda-radius);
  padding: var(--espacamento-base);
}

p {
  color: var(--cor-texto);
}
```

## Valor de fallback

A função `var()` aceita um segundo argumento como valor de fallback, usado caso a variável não esteja definida.

```css
p {
  color: var(--cor-texto, #333333);
}
```

## Variáveis no escopo de um elemento

Variáveis não precisam estar obrigatoriamente no `:root`. Quando declaradas em um seletor específico, só valem dentro dele e nos seus filhos.

```css
.card {
  --cor-fundo: white;
  background-color: var(--cor-fundo);
}

.card.destaque {
  --cor-fundo: #fffbeb;
}
```

## Tema escuro com variáveis

Uma das aplicações mais poderosas das variáveis CSS é criar suporte a tema escuro de forma organizada.

```css
:root {
  --cor-fundo: #ffffff;
  --cor-texto: #1f2937;
}

@media (prefers-color-scheme: dark) {
  :root {
    --cor-fundo: #111827;
    --cor-texto: #f9fafb;
  }
}

body {
  background-color: var(--cor-fundo);
  color: var(--cor-texto);
}
```

Com isso, todo o estilo que usa as variáveis se adapta automaticamente ao tema do sistema operacional.

## Por que usar variáveis?

Sem variáveis, uma cor que aparece em 20 lugares do CSS precisa ser alterada 20 vezes. Com variáveis, você muda em um lugar só. Isso torna o código mais fácil de manter e mais resistente a erros.
