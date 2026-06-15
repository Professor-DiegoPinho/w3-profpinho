---
id: "d02b25b70210"
title: "Títulos HTML"
description: "Como usar as tags h1 até h6 para criar hierarquia de títulos em uma página"
order: 6
---

# Títulos no HTML

HTML possui seis níveis de títulos:

- `<h1>`
- `<h2>`
- `<h3>`
- `<h4>`
- `<h5>`
- `<h6>`

Eles representam uma **hierarquia**. O `h1` é o título principal. Os demais vão descendo em importância.

## Exemplo

```html
<h1>Guia de Viagem</h1>
<h2>Brasil</h2>
<h3>Rio de Janeiro</h3>
```

Perceba a lógica: cada nível aprofunda o assunto do nível anterior.

## Não é só uma questão de tamanho

Muita gente olha para os títulos e pensa: “vou usar `h1` porque fica maior”. Porém, o tamanho visual é apenas um detalhe. O mais importante é a **semântica**.

As tags de título existem para dar **significado** ao conteúdo, e não apenas aparência. O tamanho visual pode ser alterado depois com CSS.

## Exemplo mais realista

```html
<h1>Loja de Roupas</h1>
<h2>Promoções da Semana</h2>
<p>Confira os itens com desconto.</p>

<h2>Novidades</h2>
<p>Veja as peças que chegaram hoje.</p>
```

Aqui o `h1` apresenta a página e os `h2` dividem as seções principais.

## O que evitar

Evite pular níveis sem necessidade.

Em vez de sair de `h1` direto para `h4`, normalmente faz mais sentido seguir uma ordem lógica:

```html
<h1>Título principal</h1>
<h2>Seção</h2>
<h3>Subseção</h3>
```

Nem sempre a página vai usar todos os níveis, e está tudo bem. O importante é manter a hierarquia coerente.

## Resumindo a ideia

Quando você usa títulos corretamente, o conteúdo fica mais organizado para:

- o navegador;
- mecanismos de busca;
- tecnologias de acessibilidade, como leitores de tela.
