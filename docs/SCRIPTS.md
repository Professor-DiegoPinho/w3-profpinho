# Como rodar o script `remove_lesson.sh`

Este script serve para remover uma aula em formato Markdown e, em seguida, reorganizar as próximas aulas automaticamente.

Ao remover uma aula, ele faz duas coisas:

1. apaga o arquivo escolhido;
2. reduz em `1` o número e o `order` de todas as aulas seguintes.

## Exemplo do que ele faz

Supondo estes arquivos:

- `14-links-html.md`
- `15-imagens-em-html.md`
- `16-tabelas-html.md`
- `17-listas-html.md`

Se você remover o arquivo `15-imagens-em-html.md`, o script vai:

- apagar `15-imagens-em-html.md`
- renomear `16-tabelas-html.md` para `15-tabelas-html.md`
- renomear `17-listas-html.md` para `16-listas-html.md`

Além disso, ele também atualiza o `order:` dentro do frontmatter de cada arquivo afetado.

Exemplo:

Antes:

```md
---
title: "Tabelas HTML"
description: "Aprendendo a criar tabelas em HTML"
order: 16
---
```

Depois:

```md
---
title: "Tabelas HTML"
description: "Aprendendo a criar tabelas em HTML"
order: 15
---
```

## Pré-requisitos

Antes de rodar o script, você precisa ter:

- um terminal com suporte a Bash;
- permissão para executar o script.

## Dando permissão de execução

Antes da primeira execução, dê permissão para o script:

```bash
chmod +x remove_lesson.sh
```

# Rodando o script
Para remover uma aula, use o comando:

```bash
npm run remove:lesson -- <caminho-da-pasta> <numero-da-aula>
```
Por exemplo, para remover a aula `01-introducao-ao-html` que está na pasta `content/html`, o comando seria:

```bash
npm run remove:lesson -- ./content/html 1
```

## Observação
- Não esqueça de dar permissão de execução para o script antes de rodá-lo.
- O script é seguro, mas é sempre bom ter um backup dos arquivos antes de fazer alterações importantes.
- O script não tem confirmação, então certifique-se de que o número da aula e o caminho estão corretos antes de executá-lo.