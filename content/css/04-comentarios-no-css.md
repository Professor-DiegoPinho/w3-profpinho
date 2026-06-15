---
id: "2fdc18772313"
title: "Comentários no CSS"
description: "Como escrever comentários no CSS e quando usá-los"
order: 4
---

# O que são comentários no CSS?

Comentários são trechos de texto que o navegador ignora completamente. Eles existem para você, não para a máquina.

No CSS, um comentário começa com `/*` e termina com `*/`.

```css
/* Isso é um comentário */
p {
  color: gray; /* Cor do texto dos parágrafos */
}
```

## Para que servem?

Comentários são úteis para algumas situações do dia a dia.

**Explicar decisões não óbvias:**

```css
.botao {
  /* z-index necessário para ficar acima do menu lateral */
  z-index: 10;
}
```

**Organizar seções do arquivo:**

```css
/* ========================
   Cabeçalho
   ======================== */
header { ... }

/* ========================
   Rodapé
   ======================== */
footer { ... }
```

**Desativar uma regra temporariamente sem apagar:**

```css
p {
  color: red;
  /* font-size: 20px; */
}
```

Isso é útil quando você quer testar como a página fica sem uma regra, mas ainda não quer deletá-la de vez. Só cuidado para não deixar comentários desnecessários acumulados no código.

## Comentários podem ocupar várias linhas

```css
/*
  Estilos do card de produto.
  Atualizado em: janeiro de 2025.
*/
.card {
  border: 1px solid #ccc;
  border-radius: 8px;
}
```

## O que evitar

Comentar o óbvio não agrega nada. Se o código já é claro, o comentário só ocupa espaço.

```css
/* Errado: o comentário não diz nada que o código já não diz */
/* Define a cor do texto como azul */
p {
  color: blue;
}
```

Prefira comentar o porquê de uma decisão, não o que ela faz.
