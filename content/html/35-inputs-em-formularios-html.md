---
title: "Inputs em Formulários HTML"
description: "Tipos de input e atributos úteis para trabalhar melhor com formulários"
order: 35
---

# Nem todo campo de formulário é igual

A tag `<input>` pode representar vários tipos de campo. É o atributo `type` que muda esse comportamento.

## Exemplos comuns

```html
<input type="text" name="nome">
<input type="email" name="email">
<input type="password" name="senha">
<input type="number" name="idade">
```

## Outros tipos úteis

```html
<input type="checkbox" name="aceito">
<input type="radio" name="nivel" value="iniciante">
<input type="date" name="nascimento">
<input type="file" name="arquivo">
```

## Atributos importantes

```html
<input
  type="text"
  name="usuario"
  placeholder="Digite seu nome"
  required
>
```

Alguns atributos bem usados:

- `placeholder` mostra uma dica;
- `required` torna o campo obrigatório;
- `value` define valor inicial;
- `disabled` desativa o campo;
- `readonly` impede edição.

## Exemplo completo

```html
<form>
  <input type="email" name="email" placeholder="Seu melhor email" required>
  <input type="password" name="senha" required>
  <button type="submit">Entrar</button>
</form>
```

Escolher o tipo certo de input ajuda o formulário a ficar mais claro, mais útil e menos sujeito a erro bobo.
