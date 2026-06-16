---
title: "Como instalar o Java"
description: "Como instalar o JDK para programar em Java no seu computador"
order: 2
---

# O que é o JDK?

Para programar em Java, você precisa do JDK (Java Development Kit). Ele inclui o compilador, a JVM (Java Virtual Machine) e as bibliotecas necessárias para criar e executar programas Java.

## Checando instalação

Abra um terminal e execute:

```bash
java -version
```

Se aparecer um número de versão, o Java já está instalado. Se aparecer um erro como `command not found`, o JDK precisa ser instalado.

## Como instalar

A forma mais comum é baixar o JDK direto do site da Oracle ou usar uma distribuição gratuita como o **Eclipse Temurin** (antigo AdoptOpenJDK).

- [Oracle JDK](https://www.oracle.com/java/technologies/downloads/)
- [Eclipse Temurin](https://adoptium.net/)

No Windows, depois de instalar, vale conferir se a variável de ambiente `JAVA_HOME` foi configurada corretamente. No macOS, uma alternativa é instalar pelo Homebrew:

```bash
brew install openjdk
```

Depois de instalado, confirme com `java -version` novamente.

## Editores e IDEs

Você pode escrever Java em qualquer editor de texto, mas o mais comum é usar uma IDE (ambiente de desenvolvimento integrado), que oferece autocompletar, depuração e outros recursos. As mais usadas são:

- IntelliJ IDEA
- Eclipse
- VS Code com a extensão Java

## Alternativas online

Se você não quiser instalar nada localmente, existem compiladores online gratuitos:

- [Online GDB](https://www.onlinegdb.com/online_java_compiler)
- [Programiz](https://www.programiz.com/java-programming/online-compiler/)
