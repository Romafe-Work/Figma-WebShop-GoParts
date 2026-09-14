# ROMAFE — entrada e sessão

O ecrã de entrada e as suas peças, prontos a importar.

| Ficheiro | Para quê |
| --- | --- |
| `importar/01-ecra-entrada.pdf` | **Importar no Canva.** O ecrã completo, 1440×900 |
| `importar/02-componentes.pdf` | **Importar no Canva.** Botões, campos, caixa de verificação, itens e ícones |
| `importar/*.svg` | O mesmo desenho para o Figma, onde entra em camadas com nome |
| `importar/gerar.py` | Gera os quatro. Mudar um token muda tudo |

## O código: `web/`

O mesmo ecrã, agora em HTML, CSS e JS, com o sistema do site
<https://romafe-work.github.io/UIUX/> aplicado — cores dos dois temas,
as três famílias de letra, a escala de espaçamento e os botões.

```
web/
  index.html            o ecrã de entrada
  documentacao.html     o sistema documentado, com exemplos vivos
  assets/css/tokens.css       os valores, copiados do site sem alterar
  assets/css/base.css         botão, campo, opção, segmentado
  assets/css/entrada.css      só o layout do ecrã de entrada
  assets/css/portal.css       só o layout do início do portal
  assets/css/documentacao.css só a página de documentação
  assets/js/tema.js           claro, escuro, auto — a chave é 'uiux:tema'
  assets/js/entrada.js        mostrar/ocultar, erro de credenciais
  assets/js/documentacao.js   constrói as grelhas a partir dos tokens
  assets/js/editor.js         o editor do ecrã, ligado pelo botão Editar
  assets/js/pecas.js          a paleta: acrescentar campos ao ecrã
  assets/js/traducao.js       português e inglês, por dicionário
  assets/css/editor.css       a moldura do editor
  assets/fonts/               Motor, Jost e Lato em woff2
  assets/img/                 colocar aqui oficina.jpg
```

Abre `web/index.html` no navegador. Não precisa de servidor nem de build.

**A página abre em modo de edição**, como uma tela de desenho: camadas à
esquerda, propriedades à direita, e o seletor de ecrã em cima. Há dois ecrãs — a
entrada e o início do portal — e acrescentar outro é acrescentar um
`<div class="ecra" data-ecra="…" data-nome="…">` ao HTML.

Por baixo das camadas há uma **paleta de peças**: dezassete campos — texto,
email, data, número, seleção, caixa de verificação, botões de opção, ficheiro,
área de texto, e mais — que entram no ecrã com um clique, já com as classes da
casa. A peça entra sempre no **fim** do bloco escolhido, nunca a meio: enfiar um
campo entre dois irmãos empurra os de baixo e as regras de CSS já guardadas para
eles passam a apontar para a peça errada, sem erro nenhum à vista.

O ecrã lê-se em **português e inglês**, e os painéis laterais mudam com ele —
camadas, propriedades e paleta. O que fica por traduzir é o código dentro do
diálogo do CSS, que se cola num projeto escrito em português. O botão está na
barra de topo e também no painel do editor, porque só a entrada tem o da barra. O HTML continua escrito
em português e o inglês é um dicionário por cima — uma peça acrescentada na
paleta aparece traduzida sem se lhe mexer, e `RomafeTraducao.porTraduzir()`, na
consola, diz o que falta.

O painel **abre a dizer como a peça está**: tamanho, peso, raio, folga e cores
vêm marcados com o valor que ela já tem. Traço cheio é o que mudaste e sai no
CSS; traço interrompido é o que a peça já tinha e não sai. O valor descobre-se a
perguntar ao navegador, com uma sonda invisível ao lado da peça — ler o ficheiro
não chegava, porque o valor pode vir de uma classe, de quem está por cima, ou de
um `var()`.

O painel só oferece tokens do manual. Não há selecionador de cor livre nem folga
escrita à mão, e um botão muda de cor trocando de categoria. Com o rato sobre
qualquer valor, um rótulo diz o nome, o token e o valor. No fim, *Ver o CSS* dá o
que mudaste, pronto a colar.

**A fotografia é opcional.** Sem `assets/img/oficina.jpg` o fundo fica no azul de
superfície invertida, que é o token que estava lá por baixo.

**O modo auto segue o sistema**, ao contrário do site, que trata auto como claro
por não ter regra `prefers-color-scheme`. É a única diferença de comportamento, e
está comentada no `tokens.css`.

## Importar no Canva

No Canva, **Criar design → Importar ficheiro**, e escolher o PDF. O Canva parte o
PDF em elementos: os textos ficam editáveis, as formas e os ícones ficam como
vetor que se pode recolorir.

**PDF e não SVG.** O SVG entra no Canva como um bloco só, muitas vezes sem texto
editável. É o PDF que se abre em peças.

**Os tipos de letra não viajam no PDF como nomes.** O desenho pede **Jost** nos
títulos e **Lato** no corpo — capítulo 04 do manual. Depois de importar, marcar o
texto e escolher as duas no Canva, senão fica na substituição do importador.

**A fotografia não vem no ficheiro.** O fundo é um gradiente que ocupa o lugar.
Substituir pela fotografia da oficina e manter o véu escuro por cima — é o véu
que garante que o texto branco se lê.

### Se preferires que eu escreva no Canva

O Canva tem servidor MCP oficial. Liga-se com:

```
claude mcp add canva --transport http https://mcp.canva.com/mcp
```

Serve para criar designs com a IA do Canva, preencher modelos e exportar. **Não
coloca elementos em posições exatas**, por isso não reproduz este ecrã ao pixel —
o caminho do PDF continua a ser o mais fiel.

## Duas cores que vêm do produto, e não do manual

As capturas do ecrã de entrada da **Gestão de frota** fixaram dois valores que o
capítulo 02 não tem:

| Token | Valor | Onde |
| --- | --- | --- |
| `--c-logotipo` | `#2762a8` nos dois temas | O nome ROMAFE |
| `--c-campo-fundo` | `#e9f0fe` claro · `#3d434f` escuro | O fundo dos campos |
| `--c-marca-fundo-2` | `#2d7ac6` | O fim do degradé das cabeças dos painéis |
| `--c-portal-fundo` | `#edf4fa` | O fundo do início do portal |

Há ainda duas coisas no portal que o capítulo 02 desaconselha e que a maqueta
pede. A cabeça do terceiro painel é laranja com texto por cima, e o §1 diz que o
laranja não serve de fundo a blocos de texto. E o marcador da aba ativa ficou
laranja, como o §1 manda, quando a maqueta o mostra azul.

O manual diz que uma cor que não esteja no capítulo 02 não existe no produto, e
que um azul quase igual ao da marca é pior do que um azul errado. Ou o manual
ganha e estes dois voltam a `#00537e` e `--c-marca-suave`, ou o capítulo 02 fica
incompleto e é ele que tem de crescer. Não é uma decisão de código.

## O que segue o manual, e não a maqueta

| Peça | Maqueta | Aqui | Porquê |
| --- | --- | --- | --- |
| Laranja do primário | `#ed600e` | `#ef7b10` | É o laranja da marca — 02 §1 |
| Azul das superfícies | `#012a54` | `#012338` | Azul de superfície invertida — 02 §1.1 |
| Largura do cartão | ~456px | 400px | 19 §1: dois campos não pedem coluna larga |
| Manter sessão iniciada | Ligada | Desligada, com dica | 19 §5: o computador do armazém é partilhado |
| Rótulos dos campos | Capitalizados | Maiúsculas 12px | 10 §2 |

O azul do logótipo (`#1b62b7`) fica como está na maqueta: é a cor da marca
impressa, não uma cor de interface.

## O que falta

- Recuperar palavra-passe e definir palavra-passe usam o mesmo cartão.
- O tema escuro, com o cartão a `#333331`, ainda não está desenhado.
