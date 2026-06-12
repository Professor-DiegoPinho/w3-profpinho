---
id: "17f042314752"
title: "Imagens em HTML"
description: "Como exibir imagens em HTML usando a tag img e atributos importantes"
order: 13
---

# Exibindo imagens na página

Para mostrar imagens em HTML, usamos a tag `<img>`.

Exemplo:

```html
<img src="paisagem.jpg" alt="Paisagem com montanhas ao fundo">
```

Essa tag é um pouco diferente de outras, porque ela não envolve conteúdo entre abertura e fechamento. É um elemento vazio.

## Atributos mais importantes

### `src`

Indica o caminho da imagem.

```html
<img src="foto.jpg" alt="Descrição da foto">
```

### `alt`

Fornece uma descrição da imagem.

```html
<img src="produto.png" alt="Tênis esportivo azul">
```

Esse atributo é importante caso a imagem não carregue ou para leitores de tela, garantindo acessibilidade.

## Definindo largura e altura

```html
<img src="banner.jpg" alt="Banner principal" width="300" height="150">
```

## Exemplo com imagem local

```html
<img src="images/logo.png" alt="Logo da empresa">
```

Aqui o navegador vai procurar a imagem dentro da pasta `images`.

## Exemplo prático

```html
<h1>Perfil</h1>

<img
  src="avatar.png"
  alt="Foto de perfil do usuário"
  width="150"
>

<p>Este é o avatar exibido na página.</p>
```

## Um cuidado que vale ouro

Nunca trate o `alt` como detalhe sem importância. Quando a imagem carrega, ele parece invisível. Quando ela não carrega, ou quando alguém depende de leitura assistiva, ele deixa de ser detalhe e vira informação de verdade.

Então a lógica é simples:

- `src` diz qual imagem carregar;
- `alt` explica o que aquela imagem representa.
