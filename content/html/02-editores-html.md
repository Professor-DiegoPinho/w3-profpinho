---
title: "Editores HTML"
description: "Como escrever arquivos HTML em um editor de texto e visualizar o resultado no navegador"
order: 2
---

# Onde escrever HTML?

Para criar uma página HTML, você não precisa de uma ferramenta mirabolante. Na prática, precisa de duas coisas:

- um **editor de texto** para escrever o código;
- um **navegador** para abrir o arquivo e ver o resultado.

Só isso. O navegador interpreta o HTML e monta a página na tela.

## O que usar como editor?

Qualquer editor de texto simples já serve, desde que ele salve o arquivo com a extensão `.html`.

Alguns exemplos comuns:

- VS Code;
- Notepad++;
- Sublime Text;
- o Bloco de Notas, em último caso.

O importante aqui não é o editor ser chique. É ele deixar você escrever texto puro sem inventar formatação escondida.

## Criando o primeiro arquivo

Suponha que você crie um arquivo chamado `index.html` com este conteúdo:

```html
<!DOCTYPE html>
<html>
  <body>
    <h1>Minha primeira página</h1>
    <p>Escrevi isso em um editor e abri no navegador.</p>
  </body>
</html>
```

Depois de salvar, basta dar dois cliques no arquivo que ele abrirá no seu navegador.

## O que acontece depois?

O navegador lê o arquivo e renderiza a página. Ou seja: ele interpreta aquelas tags e transforma isso em conteúdo visual.

O código:

```html
<h1>Minha primeira página</h1>
<p>Escrevi isso em um editor e abri no navegador.</p>
```

vira algo como:

- um título grande;
- um texto logo abaixo.

## Fluxo mais comum no dia a dia

Quando estiver estudando ou desenvolvendo, o fluxo costuma ser este:

1. escrever o HTML no editor;
2. salvar o arquivo;
3. atualizar o navegador;
4. ver o resultado;
5. corrigir o que ficou errado, porque quase sempre fica alguma coisinha errada mesmo.

Esse ciclo é o arroz com feijão do front-end. Você escreve, salva, testa e ajusta.
