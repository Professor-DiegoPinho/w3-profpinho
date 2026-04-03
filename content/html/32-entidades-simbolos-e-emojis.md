---
title: "Entidades, Símbolos e Emojis no HTML"
description: "Como exibir caracteres especiais, símbolos e emojis em HTML"
order: 32
---

# Quando o caractere especial entra em cena

Nem sempre o texto da página é feito só de letras comuns.

Às vezes você precisa mostrar sinais como `<`, `>`, `&`, símbolos monetários ou até emojis. Nesses casos, as entidades HTML ajudam bastante.

## Exemplo com caracteres especiais

```html
<p>Use &lt;h1&gt; para criar um título.</p>
<p>João &amp; Maria</p>
```

Resultado esperado:

- `&lt;` vira `<`
- `&gt;` vira `>`
- `&amp;` vira `&`

## Exemplo com símbolos

```html
<p>Preço: 50 &euro;</p>
<p>Marca registrada &reg;</p>
```

## Exemplo com emoji

```html
<p>Curso concluído &#128640;</p>
```

## Por que isso existe?

Porque alguns caracteres têm significado especial no próprio HTML. Então, para exibi-los como texto, você precisa escapá-los.

Parece detalhe pequeno, mas evita muita confusão entre “mostrar um símbolo” e “o navegador tentar interpretar aquilo como marcação”.
