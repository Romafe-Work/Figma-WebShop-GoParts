# ROMAFE — entrada e sessão

O ecrã de entrada e o início do portal, desenhados com os tokens do
[manual de UI](https://romafe-work.github.io/UIUX/), e uma tela para os editar.

## Abrir

`web/index.html` abre em modo de edição: camadas à esquerda, tela ao centro,
propriedades à direita. Não precisa de servidor nem de build.

`web/documentacao.html` documenta o sistema — cor, tipografia, espaçamento,
botões, campos e a marca — com exemplos que mudam de tema.

## O que há aqui

| Pasta | O que é |
| --- | --- |
| `web/` | O código: HTML, CSS, JS, tipos de letra e a fotografia |
| `01-ecra-entrada.*` · `02-componentes.*` | O mesmo desenho em SVG e PDF, para importar no Figma ou no Canva |
| `gerar.py` | Gera os SVG e os PDF a partir dos mesmos tokens |
| `LEIA-ME.md` | Como importar, e o que difere da maqueta |

## A regra do editor

O painel só oferece o que o manual tem: tokens de cor, os sete tamanhos de
letra, a escala de 4pt e os quatro raios. Não há selecionador de cor livre, e um
botão muda de cor trocando de categoria. Por isso o CSS que o editor exporta
nunca traz um valor inventado.
