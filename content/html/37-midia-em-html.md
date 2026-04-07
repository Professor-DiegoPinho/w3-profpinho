---
title: "Mídia no HTML"
description: "Como incorporar vídeo e áudio em uma página HTML"
order: 37
---

# Colocando áudio e vídeo na página

HTML também permite incorporar mídia diretamente na página.

Os dois elementos mais usados para isso são `<video>` e `<audio>`.

## Exemplo com vídeo

```html
<video width="320" controls>
  <source src="apresentacao.mp4" type="video/mp4">
  Seu navegador não suporta vídeo.
</video>
```

## Exemplo com áudio

```html
<audio controls>
  <source src="trilha.mp3" type="audio/mpeg">
  Seu navegador não suporta áudio.
</audio>
```

## O atributo `controls`

Ele exibe os controles de reprodução, como play, pause e volume.

## Por que usar `<source>`?

Porque ele define o arquivo de mídia e seu tipo.

## Observação rápida

Recursos antigos de mídia e plugins já foram mais comuns no passado, mas hoje o caminho principal costuma ser trabalhar com as tags nativas do HTML.

Em resumo: para o básico, `video` e `audio` já resolvem muita coisa sem complicação desnecessária.
