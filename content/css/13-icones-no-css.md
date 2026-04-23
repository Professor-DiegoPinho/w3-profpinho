---
title: "Ícones no CSS"
description: "Como adicionar ícones em páginas web usando bibliotecas como Font Awesome e Material Icons"
order: 13
---

# Ícones em páginas web

Ícones são adicionados em páginas web principalmente por meio de **bibliotecas de ícones**. Elas funcionam de forma parecida com o Google Fonts: você inclui um link no HTML e passa a ter acesso a centenas de ícones prontos.

As duas bibliotecas mais populares são Font Awesome e Material Icons.

## Font Awesome

Para usar, adicione o link no `<head>`:

```html
<head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
</head>
```

Depois, use a tag `<i>` com as classes correspondentes ao ícone desejado:

```html
<i class="fa-solid fa-house"></i>
<i class="fa-solid fa-envelope"></i>
<i class="fa-brands fa-github"></i>
```

## Material Icons (Google)

```html
<head>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</head>
```

```html
<span class="material-icons">home</span>
<span class="material-icons">email</span>
<span class="material-icons">search</span>
```

No Material Icons, o nome do ícone fica dentro da tag como texto.

## Estilizando ícones

Como os ícones são tratados como texto, você pode estilizá-los com as mesmas propriedades de texto do CSS.

```css
i {
  font-size: 24px;
  color: #333;
}

.icone-destaque {
  color: tomato;
  font-size: 32px;
}
```

## Onde encontrar os ícones disponíveis

Cada biblioteca tem um catálogo onde você busca pelo nome do ícone:

{% links "Links da aula" %}
- [**Font Awesome - Catálogo de ícones**](https://fontawesome.com/icons)
- [**Material Icons - Catálogo de ícones**](https://fonts.google.com/icons)
{% endlinks %}
