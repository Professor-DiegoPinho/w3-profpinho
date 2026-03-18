---
title: "Resumo Prático de Git"
description: "Guia essencial de Git em português para iniciantes. Conceitos fundamentais com comandos práticos para controle de versão."
order: 1
---

## 1. Configuração Inicial

```bash
# Inicializar um novo repositório Git
$ git init

# Configurar nome de usuário (global)
$ git config --global user.name "Seu Nome"

# Configurar email do usuário (global)
$ git config --global user.email "seu.email@exemplo.com"

# Visualizar configurações definidas
$ git config --global user.name
$ git config --global user.email

# Configurar para assinatura de commits com GPG
$ git config --global user.signingkey ID_CHAVE_AQUI

# Ver rapidamente os comandos disponíveis
$ git help

# Ver todos os comandos disponíveis
$ git help -a

# Help detalhado para um comando específico
$ git help add
$ git help commit
$ git help pull
```

## 2. Ignorar Arquivos e Status

```bash
# Listar e ignorar arquivos usando .gitignore
# Criar arquivo na raiz do projeto:
$ echo "node_modules/" >> .gitignore
$ echo "*.log" >> .gitignore
$ echo "chaves_privadas/" >> .gitignore
$ echo ".env" >> .gitignore

# Ver status do repositório
# (mostra branch, alterações e arquivos não rastreados)
$ git status

# Status em formato resumido
$ git status --short

# Ver quais arquivos estão sendo rastreados
$ git ls-files
```

## 3. Adicionar e Fazer Commit

```bash
# Adicionar um arquivo específico
$ git add README.md

# Adicionar todos os arquivos em um sub-diretório
$ git add ./src/

# Adicionar múltiplos arquivos com padrão
$ git add ./*.java
$ git add ./src/**/*.js

# Adicionar todas as alterações do projeto
$ git add -A
$ git add .

# Adicionar apenas arquivos já rastreados
$ git add -u

# Fazer commit com mensagem
$ git commit -m "Implementar função de login"

# Adicionar e fazer commit de uma vez
$ git commit -a -m "Modificar arquivo existente e fazer commit"

# Emendar o último commit (sem criar um novo)
$ git commit --amend -m "Mensagem corrigida"

# Fazer commit assinado com GPG
$ git commit -S -m "Adicionar validação de entrada"

# Ver log de commits
$ git log

# Log em uma linha (mais compacto)
$ git log --oneline

# Log com gráfico visual de branches
$ git log --graph

# Log com limite de commits
$ git log -5

# Ver commits de um arquivo específico
$ git log -- arquivo.txt
```

## 4. Branches

```bash
# Listar todas as branches locais
$ git branch

# Listar branches remotas
$ git branch -r

# Listar todas as branches (locais e remotas)
$ git branch -a

# Criar uma nova branch
$ git branch develop

# Criar e fazer checkout de uma nova branch
$ git checkout -b feature/login

# Renomear uma branch
$ git branch -m develop new-develop
$ git branch -m old-name new-name

# Deletar uma branch
$ git branch -d develop

# Forçar deletar uma branch
$ git branch -D develop

# Editar descrição de uma branch
$ git branch develop --edit-description

# Ver ramo atual
$ git rev-parse --abbrev-ref HEAD
```

## 5. Checkout e Alternância

```bash
# Ver status atual (em qual branch você está)
$ git status

# Mudar para uma branch existente
$ git checkout develop
$ git checkout main

# Criar e mudar para uma nova branch
$ git checkout -b feature/novo-componente

# Mudar para um commit específico (detached HEAD)
$ git checkout abc123def

# Descartar alterações em um arquivo
$ git checkout -- arquivo.js

# Restaurar um arquivo de um commit específico
$ git checkout HEAD~2 -- arquivo.js
```

## 6. Tags (Marcadores de Versão)

```bash
# Listar todas as tags
$ git tag

# Listar tags com padrão específico
$ git tag -l "v1.*"

# Criar uma tag anotada (recomendado)
$ git tag -a v1.0.0 -m 'Release versão 1.0.0'

# Criar uma tag leve (lightweight - mais simples)
$ git tag v1.0.0-beta

# Ver informações de uma tag
$ git show v1.0.0

# Criar tag em um commit específico
$ git tag -a v0.9.0 -m "Beta" abc123def

# Deletar uma tag local
$ git tag -d v1.0.0

# Enviar uma tag específica para repositório remoto
$ git push origin v1.0.0

# Enviar todas as tags para remoto
$ git push origin --tags
```

## 7. Clonar e Repositórios Remotos

```bash
# Clonar um repositório (cria cópia local completa)
$ git clone https://github.com/usuario/projeto.git

# Clonar apenas o último commit (clone superficial - mais rápido)
$ git clone --depth 1 https://github.com/usuario/projeto.git

# Clonar apenas uma branch específica
$ git clone -b main --single-branch https://github.com/usuario/projeto.git

# Listar repositórios remotos configurados
$ git remote

# Ver URLs dos repositórios remotos
$ git remote -v

# Adicionar um novo repositório remoto
$ git remote add origin https://github.com/usuario/projeto.git

# Renomear um repositório remoto
$ git remote rename origin upstream

# Remover um repositório remoto
$ git remote remove origin

# Ver informações detalhadas de um remoto
$ git remote show origin
```

## 8. Comparar Alterações

```bash
# Ver diferenças entre arquivo modificado e staged
$ git diff

# Ver diferenças entre staged e último commit
$ git diff --cached
$ git diff --staged

# Ver diferenças entre diretório atual e último commit
$ git diff HEAD

# Ver diferenças entre dois commits
$ git diff abc123def def456ghi

# Ver diferenças de um arquivo específico
$ git diff -- arquivo.js

# Ver diferenças com números de linha
$ git diff -U0

# Ver apenas nomes de arquivos modificados
$ git diff --name-only

# Pesquisar por padrão em arquivos (grep)
$ git grep 'nomeDaVariavel' -- '*.js'

# Pesquisar por múltiplos padrões
$ git grep -e 'nomeDoArray' --and \( -e add -e remove \)
```

## 9. Merge e Rebase

```bash
# Mesclar uma branch na branch atual
$ git merge develop

# Mesclar sem criar commit de merge (fast-forward)
$ git merge --ff-only develop

# Forçar criar um commit de merge mesmo se possível fast-forward
$ git merge --no-ff develop

# Ver branches já mescladas
$ git branch --merged

# Ver branches não mescladas
$ git branch --no-merged

# Fazer rebase da branch atual em cima de outra
$ git rebase main

# Rebase interativo (reorganizar/editar commits)
$ git rebase -i HEAD~3

# Continuar rebase após resolver conflitos
$ git rebase --continue

# Abortar um rebase
$ git rebase --abort
```

## 10. Push, Pull e Desfazer

```bash
# Enviar commits para repositório remoto
$ git push origin main

# Enviar e associar branch local com branch remota
$ git push -u origin feature/login

# Enviar todas as branches
$ git push --all

# Buscar alterações do remoto (sem mesclar)
$ git fetch origin

# Buscar alterações e mesclar (equivalente a fetch + merge)
$ git pull origin main

# Pull com rebase (em vez de merge)
$ git pull origin main --rebase

# Desfazer alterações não staged
$ git restore arquivo.js
$ git checkout -- arquivo.js

# Resetar index (desfazer git add)
$ git reset filename.js

# Resetar para o último commit (mantém alterações no diretório)
$ git reset --soft HEAD~1

# Resetar para o último commit (descarta alterações)
$ git reset --hard HEAD~1

# Resetar para um commit específico
$ git reset --hard abc123def

# Reverter um commit específico (cria novo commit desfazendo-o)
$ git revert abc123def

# Guardar alterações temporariamente
$ git stash

# Listar alterações guardadas
$ git stash list

# Aplicar alterações guardadas
$ git stash pop

# Aplicar sem remover do stash
$ git stash apply

# Deletar alterações guardadas
$ git stash drop stash@{0}

# Ver o reflog (histórico de movimentações HEAD)
$ git reflog

# Voltar para um estado anterior usando reflog
$ git reset --hard HEAD@{2}
```
