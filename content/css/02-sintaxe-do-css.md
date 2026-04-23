---
title: "Sintaxe do CSS"
description: "Como escrever regras CSS: seletores, propriedades e valores"
order: 2
---

# Como o CSS é escrito?

Uma regra CSS é formada por três partes: o **seletor**, a **propriedade** e o **valor**.

```css
seletor {
  propriedade: valor;
}
```

Veja um exemplo real:

```css
h1 {
  color: blue;
  font-size: 32px;
}
```

Nesse exemplo:

- `h1` é o seletor: indica qual elemento HTML será estilizado;
- `color` e `font-size` são as propriedades: o que você quer mudar;
- `blue` e `32px` são os valores: como você quer que fique.

O conjunto de `propriedade: valor` é chamado de **declaração**. O bloco entre `{` e `}` pode ter quantas declarações forem necessárias.

## Cada declaração termina com ponto e vírgula

O `;` ao final de cada declaração é obrigatório quando existem várias. Sem ele, o navegador pode interpretar as regras de forma errada.

```css
p {
  color: red;
  font-size: 16px;
  font-weight: bold;
}
```

Por costume, muitos desenvolvedores colocam o `;` mesmo na última declaração do bloco. É uma boa prática: facilita adicionar novas linhas sem esquecer o separador.

## Espaços e quebras de linha não importam

O CSS ignora espaços extras e quebras de linha. Estas duas regras fazem a mesma coisa:

```css
/* Forma expandida */
p {
  color: red;
  font-size: 16px;
}

/* Forma comprimida */
p { color: red; font-size: 16px; }
```

A forma expandida é mais fácil de ler e é a padrão no dia a dia.

## Maiúsculas e minúsculas

O CSS não diferencia maiúsculas de minúsculas em propriedades e valores. Mas por convenção, tudo é escrito em letras minúsculas.

```css
/* Os dois funcionam, mas o segundo é o padrão */
P { COLOR: RED; }
p { color: red; }
```
