---
title: "Botões no HTML"
description: "Como criar botões com a tag button e entender usos comuns"
order: 22
---

# Criando botões

Botões aparecem em toda parte: enviar formulário, abrir modal, confirmar ação, disparar script e por aí vai.

Em HTML, o jeito mais direto de criar um botão é com a tag `<button>`.

## Exemplo básico

```html
<button>Clique aqui</button>
```

## Exemplo com texto mais claro

```html
<button>Salvar alterações</button>
```

Isso parece detalhe, mas botão com texto genérico demais costuma confundir mais do que ajudar.

## Botão dentro de formulário

```html
<form>
  <input type="text" name="nome">
  <button type="submit">Enviar</button>
</form>
```

Aqui o botão envia o formulário.

## Tipos comuns

- `type="submit"` envia o formulário;
- `type="button"` cria um botão comum;
- `type="reset"` limpa os campos do formulário.

## Exemplo com estilo inline

```html
<button style="background-color: black; color: white; padding: 10px 16px;">
  Comprar
</button>
```

Botão é simples, mas importante. Quando ele fica mal nomeado ou faz uma ação inesperada, o usuário pode acabar desistindo da interação. Por isso, vale a pena pensar um pouco mais no texto e na função do botão para garantir que ele seja claro e útil.
