---
id: "63aa03df8f2a"
title: "Tabelas HTML"
description: "Como organizar dados em linhas e colunas usando tabelas no HTML"
order: 16
---

# Quando os dados pedem linhas e colunas

Tabela em HTML serve para exibir **dados tabulares**. Ou seja: informações que fazem sentido em linhas e colunas.

É perfeita para horários, preços, relatórios simples e listas comparativas.

## Exemplo básico

```html
<table>
  <tr>
<th>Nome</th>
<th>Idade</th>
  </tr>
  <tr>
<td>Ana</td>
<td>28</td>
  </tr>
  <tr>
<td>Bruno</td>
<td>32</td>
  </tr>
</table>
```

## O papel de cada tag

- `<table>` cria a tabela;
- `<tr>` representa uma linha;
- `<th>` representa uma célula de cabeçalho;
- `<td>` representa uma célula comum.

## Exemplo com borda

```html
<table border="1">
  <tr>
<th>Produto</th>
<th>Preço</th>
  </tr>
  <tr>
<td>Teclado</td>
<td>R$ 120,00</td>
  </tr>
</table>
```

## Colspan e rowspan

Também é possível fazer uma célula ocupar mais de uma coluna ou mais de uma linha.

```html
<table border="1">
  <tr>
<th colspan="2">Contato</th>
  </tr>
  <tr>
<td>Email</td>
<td>contato@site.com</td>
  </tr>
</table>
```

## Um aviso importante

Tabela é para **dados**. Não para montar layout da página. Isso já foi moda um dia, mas também já foi moda muita coisa duvidosa.
