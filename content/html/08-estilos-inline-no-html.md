---
title: "Estilos Inline no HTML"
description: "Como usar o atributo style para aplicar estilos diretamente em elementos HTML"
order: 8
---

# Aplicando estilo direto no HTML

O HTML possui um atributo chamado `style` que permite aplicar CSS diretamente em um elemento.

Exemplo:

```html
<p style="color: blue;">Este texto está azul.</p>
```

Aqui o HTML continua marcando o conteúdo, mas o `style` adiciona uma regra visual.

## Exemplos simples

### Cor do texto

```html
<h1 style="color: red;">Título vermelho</h1>
```

### Cor de fundo

```html
<p style="background-color: yellow;">Parágrafo com fundo amarelo</p>
```

### Alinhamento

```html
<p style="text-align: center;">Texto centralizado</p>
```

### Tamanho da fonte

```html
<p style="font-size: 24px;">Texto maior</p>
```

## Mais de uma regra no mesmo `style`

Você pode combinar várias propriedades, separando por ponto e vírgula:

```html
<p style="color: white; background-color: black; text-align: center;">
  Texto branco com fundo preto
</p>
```

## Quando isso é útil?

O `style` inline é útil para:

- testar rapidamente um visual;
- entender como uma propriedade funciona;
- aplicar um ajuste bem pontual.

## E qual é o problema?

Quando o projeto começa a crescer, adicionar estilos dentro do HTML torna o código mais difícil de ler, repetir e manter.

Por isso, no dia a dia, é mais comum separar o visual no CSS, uma outra linguagem que tem a função de cuidar do estilo, deixando o HTML apenas para o conteúdo.

## Exemplo prático

```html
<h1 style="color: darkgreen;">Receita do Dia</h1>

<p style="font-size: 18px;">
  Hoje vamos aprender uma receita simples.
</p>

<p style="background-color: #f0f0f0; padding: 10px;">
  Separe os ingredientes antes de começar.
</p>
```

Esse tipo de exemplo já mostra bem a ideia: o conteúdo está no HTML, e o `style` faz ajustes visuais rápidos.
