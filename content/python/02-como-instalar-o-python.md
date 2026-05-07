---
title: "Como instalar o Python"
description: "Como instalar o Python para usar no seu computador"
order: 2
---

# Checar instalação
Por incrível que pareça pode ser possível que você já tenha o Python instalado no seu computador e nem sabe disso. Para termos certeza, abra um terminal de linha de comando (em qualquer sistema operacional) e execute o comando abaixo:

```bash
python --version
```

Caso não apareça nada ou algum erro como `command not found: python`, tente com `python3` ao invés do `python` (principalmente se você estiver em ambientes Linux, pois boa parte deles já vem com o Python pré instalado). Se o erro persistir... bom, neste caso precisamos realmente instalar o Python. 

Mas não se preocupe que o processo é indolor (na maior parte da vezes).

# Como instalar
A melhor forma de instalar o Python no seu computador é através do **[site oficial na página de downloads](https://www.python.org/downloads/)**. O site detecta automaticamente seu sistema operacional (Windows, Linux ou macOS) e sugere a versão mais recente. Apesar do processo não ter muito segredo, vale mencionar alguns detalhes:
- No Windows, execute o `.exe` normalmente mas não se esqueça de marcar a opção `Add Python to PATH`. Isso vai ser bem útil para usar o Python na linha de comando e evitar algumas dores de cabeça bem chatinhas no futuro não muito distante.
- No macOS uma alternativa bastante utilizada é a instalação por meio do Homebrew. Neste caso, basta executar:

``` bash
brew install python
```

Depois de instalado, não esqueça de usar o comando `python --version` mencionado anteriormente para validar se deu tudo certo!

# Alternativas online
Caso você não queira (ou não possa) instalar localmente, não se preocupe. Existem algumas opções diferentes disponíveis e a maioria delas nem exige cadastro, no entanto, esteja ciente que todas elas possuem algum tipo de limitação e/ou ponto de atenção, como limitação de tempo de execução, recursos (CPU/memória) ou acesso limitado à bibliotecas.

- [Online Python](https://www.online-python.com/)
- [Programiz Online Compiler](https://www.programiz.com/python-programming/online-compiler/)
- [OneCompiler](https://onecompiler.com/python)