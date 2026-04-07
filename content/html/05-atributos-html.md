---
title: "Atributos HTML"
description: "Como adicionar informações extras aos elementos HTML com atributos"
order: 5
---

# O que são atributos?

Atributos são informações extras colocadas na **tag de abertura** de um elemento HTML.

Eles ajudam a configurar o comportamento, a identificação ou o valor daquele elemento.

Exemplo:

```html
<a href="https://exemplo.com">Visitar site</a>
```

Nesse caso, `href` é um atributo da tag `<a>`.

## Como um atributo é escrito?

A estrutura mais comum é esta:

```html
nome="valor"
```

Então:

```html
href="https://exemplo.com"
```

significa que o atributo `href` recebeu o valor `"https://exemplo.com"`.

## Exemplos comuns

### Link com `href`

```html
<a href="https://meusite.com">Meu site</a>
```

O `href` diz para onde o link aponta.

### Imagem com `src` e `alt`

```html
<img src="gato.jpg" alt="Um gato deitado no sofá">
```

- `src` informa o caminho da imagem;
- `alt` descreve a imagem.

### Campo de texto com `placeholder`

```html
<input type="text" placeholder="Digite seu nome">
```

Note que nos dois últimos exemplos temos mais de um atributo no mesmo elemento.

## Mais de um atributo na mesma tag

Isso é totalmente normal:

```html
<a href="contato.html" target="_blank" title="Abrir página de contato">
  Contato
</a>
```

Nesse link:

- `href` define o destino;
- `target="_blank"` abre em outra aba;
- `title` adiciona uma dica de texto ao passar o mouse.

## Um cuidado importante

Os atributos não ficam jogados em qualquer lugar do elemento. Eles devem aparecer **dentro da tag de abertura**.

Correto:

```html
<p title="Texto de exemplo">Parágrafo</p>
```

Errado:

```html
<p>Parágrafo title="Texto de exemplo"</p>
```

## Exemplo prático

```html
<img
  src="produto.png"
  alt="Imagem de um produto"
  width="200"
>
```

Aqui a tag da imagem recebe informações suficientes para o navegador saber:

- qual arquivo carregar;
- o que mostrar como descrição;
- qual largura usar.
