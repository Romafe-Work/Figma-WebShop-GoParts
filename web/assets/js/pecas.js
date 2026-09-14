/* =========================================================
   ROMAFE — acrescentar peças ao ecrã

   O editor deixava mudar o que já lá estava. Isto deixa pôr o que não está:
   um campo de texto, uma data, uma seleção, uma caixa de verificação, um botão.

   ── AS PEÇAS SAEM DO MANUAL, NÃO DO NADA ────────────────────────────────────

   Cada peça é escrita com as classes da casa — `.campo`, `.campo__label`,
   `.input`, `.opcao`, `.btn` — e não com estilo próprio. Nasce já com a cor, a
   altura, o raio e o tipo de letra do capítulo 10, e muda com o tema sem
   ninguém lhe tocar. É a mesma regra do painel das propriedades: aqui não se
   inventa nada que o produto não consiga construir.

   ── ONDE A PEÇA ENTRA, E PORQUE É SEMPRE NO FIM ─────────────────────────────

   A peça entra no FIM do bloco escolhido, nunca a meio. Não é preguiça.

   O editor identifica cada peça por um caminho de classes com `:nth-of-type`
   quando há irmãos iguais — três campos seguidos são `div:nth-of-type(1..3)`.
   Enfiar um campo novo entre o primeiro e o segundo empurra os de baixo, e
   todas as regras de CSS já guardadas para eles passam a apontar para o campo
   errado. **As cores e as folgas que alguém afinou mudavam de peça sozinhas**,
   sem erro nenhum à vista.

   Acrescentar no fim não empurra ninguém. Depois arrasta-se para o sítio, que é
   o que o editor já sabe fazer.
   ========================================================= */
(function () {
  'use strict';

  var CHAVE = 'romafe:editor:pecas';

  /* As peças acrescentadas, por ordem de entrada. A ordem importa: uma peça
     posta dentro de outra peça acrescentada só se repõe depois dela. */
  var pecas = [];
  var contador = 0;

  /* Igual ao do editor, e pela mesma razão: a paleta tem de acrescentar peças
     mesmo que o tradutor falhe. Ver o comentário em `editor.js`. */
  function traduzirRamo(raiz) {
    if (!window.RomafeTraducao || typeof window.RomafeTraducao.traduzirRamo !== 'function') return;
    try {
      window.RomafeTraducao.traduzirRamo(raiz);
    } catch (e) {
      if (window.console) console.warn('A tradução falhou neste ramo:', e);
    }
  }

  /* ---------------- o catálogo ---------------- */

  /* Um `id` por peça, porque é o que dá ao editor um seletor que não depende da
     posição — e a posição é precisamente o que muda quando se acrescenta. */
  function idNovo(prefixo) {
    contador += 1;
    return prefixo + '-' + contador;
  }

  function campo(rotulo, dentro, ajuda) {
    return '<div class="campo" id="' + idNovo('peca') + '">' +
      '<label class="campo__label" for="' + dentro.id + '">' + rotulo + '</label>' +
      dentro.html +
      (ajuda ? '<p class="campo__ajuda">' + ajuda + '</p>' : '') +
      '</div>';
  }

  function entrada(tipo, atributos) {
    var id = idNovo('entrada');
    return {
      id: id,
      html: '<input class="input" id="' + id + '" type="' + tipo + '" ' + (atributos || '') + '>'
    };
  }

  var CATALOGO = [
    {
      grupo: 'Campos de texto',
      itens: [
        ['Texto', function () { return campo('Novo campo', entrada('text', 'placeholder="Escreva aqui"')); }],
        ['Email', function () { return campo('Email', entrada('email', 'placeholder="nome@romafe.com"')); }],
        ['Palavra-passe', function () { return campo('Palavra-passe', entrada('password', 'placeholder="A sua palavra-passe"')); }],
        ['Pesquisa', function () { return campo('Pesquisar', entrada('search', 'placeholder="Escreva aqui"')); }],
        ['Área de texto', function () {
          var id = idNovo('area');
          return campo('Observações', {
            id: id,
            html: '<textarea class="input" id="' + id + '" rows="3" placeholder="Escreva aqui"></textarea>'
          });
        }]
      ]
    },
    {
      grupo: 'Números e datas',
      itens: [
        ['Número', function () { return campo('Quantidade', entrada('number', 'min="0" step="1" value="1"')); }],
        ['Telefone', function () { return campo('Telefone', entrada('tel', 'placeholder="+351 000 000 000"')); }],
        ['Data', function () { return campo('Data', entrada('date')); }],
        ['Hora', function () { return campo('Hora', entrada('time')); }],
        ['Valor', function () { return campo('Valor', entrada('number', 'min="0" step="0.01" placeholder="0,00"'), 'Em euros'); }]
      ]
    },
    {
      grupo: 'Escolhas',
      itens: [
        ['Seleção', function () {
          var id = idNovo('sel');
          return campo('Selecione uma opção', {
            id: id,
            html: '<select class="input" id="' + id + '">' +
              '<option>Selecione uma opção</option><option>Opção A</option><option>Opção B</option></select>'
          });
        }],
        ['Caixa de verificação', function () {
          var id = idNovo('check');
          return '<div class="opcao" id="' + idNovo('peca') + '">' +
            '<input type="checkbox" id="' + id + '">' +
            '<label class="opcao__texto" for="' + id + '">Aceito os termos</label>' +
            '</div>';
        }],
        ['Botões de opção', function () {
          var nome = idNovo('grupo');
          var a = idNovo('op');
          var b = idNovo('op');
          return '<div class="campo" id="' + idNovo('peca') + '">' +
            '<span class="campo__label">Escolha uma</span>' +
            '<div class="opcao"><input type="radio" name="' + nome + '" id="' + a + '" checked>' +
            '<label class="opcao__texto" for="' + a + '">Opção A</label></div>' +
            '<div class="opcao"><input type="radio" name="' + nome + '" id="' + b + '">' +
            '<label class="opcao__texto" for="' + b + '">Opção B</label></div>' +
            '</div>';
        }],
        ['Ficheiro', function () { return campo('Escolher ficheiro', entrada('file')); }]
      ]
    },
    {
      grupo: 'Outras peças',
      itens: [
        ['Botão', function () {
          return '<button type="button" class="btn btn--acao" id="' + idNovo('peca') + '">' +
            '<span class="btn__rotulo">Novo botão</span></button>';
        }],
        ['Título', function () {
          return '<h3 class="campo__label" id="' + idNovo('peca') + '" style="font-size: var(--t-lg)">Novo título</h3>';
        }],
        ['Texto', function () {
          return '<p class="campo__ajuda" id="' + idNovo('peca') + '">' +
            'Texto novo. Faça duplo clique para escrever.</p>';
        }]
      ]
    }
  ];

  /* ---------------- onde a peça entra ---------------- */

  /* Blocos que já são feitos para levar campos lá dentro. Procura-se um destes
     a subir a partir do que está escolhido: quem clica num campo quer o campo
     novo ao lado, e não dentro do campo antigo. */
  var RECIPIENTES = 'form, .formulario, .painel__corpo, .filtros__corpo, .filtros, ' +
    '.cartao__corpo, .pesquisa__corpo, .separacao, .coluna';

  function ecraActual() {
    return document.querySelector('.ecra:not([hidden])') || document.querySelector('.ecra');
  }

  function recipiente() {
    var ed = window.RomafeEditor;
    var alvo = ed && ed.alvo && ed.alvo();

    if (alvo) {
      var bloco = alvo.closest(RECIPIENTES);
      if (bloco) return bloco;
      // O que está escolhido pode ser ele próprio um contentor — uma secção, um
      // painel. Um botão ou um campo não são, e aí serve o pai.
      if (/^(DIV|SECTION|FORM|FIELDSET|MAIN|ASIDE|NAV|UL|OL)$/.test(alvo.tagName)) return alvo;
      if (alvo.parentElement) return alvo.parentElement;
    }

    var ecra = ecraActual();
    return ecra.querySelector(RECIPIENTES) || ecra;
  }

  /* ---------------- acrescentar, apagar, repor ---------------- */

  function acrescentar(fabrica) {
    var destino = recipiente();
    var html = fabrica();

    destino.insertAdjacentHTML('beforeend', html);
    var novo = destino.lastElementChild;

    var ed = window.RomafeEditor;
    pecas.push({
      // O recipiente é guardado pelo seletor do editor, que é o mesmo que as
      // regras de CSS usam. Um seletor próprio aqui era um segundo sítio para
      // a mesma verdade, e os dois um dia discordavam.
      recipiente: ed && ed.seletor ? ed.seletor(destino) : null,
      ecra: destino.closest('.ecra') ? destino.closest('.ecra').dataset.ecra : null,
      html: novo.outerHTML
    });
    guardar();

    if (window.RomafeTraducao) window.RomafeTraducao.aplicar();
    if (ed && ed.seleccionar) ed.seleccionar(novo);
    if (ed && ed.refrescar) ed.refrescar();
    if (ed && ed.aviso) ed.aviso('Peça acrescentada no fim do bloco');

    novo.scrollIntoView({ block: 'center' });
    pintarLista();
  }

  function apagar(indice) {
    var peca = pecas[indice];
    if (!peca) return;

    var no = document.getElementById(idDe(peca.html));
    if (no) no.remove();

    pecas.splice(indice, 1);
    guardar();

    var ed = window.RomafeEditor;
    if (ed && ed.seleccionar) ed.seleccionar(null);
    if (ed && ed.refrescar) ed.refrescar();
    pintarLista();
  }

  function idDe(html) {
    var m = html.match(/\bid="([^"]+)"/);
    return m ? m[1] : '';
  }

  function guardar() {
    try { localStorage.setItem(CHAVE, JSON.stringify({ contador: contador, pecas: pecas })); } catch (e) {}
  }

  /**
   * REPÕE AS PEÇAS GUARDADAS.
   *
   * Chamada pelo editor ANTES de ele aplicar os estilos e os textos guardados.
   * A ordem não é detalhe: uma regra de CSS guardada para uma peça que ainda
   * não existe não se aplica a nada, e a peça voltava sem a cor que alguém lhe
   * tinha dado.
   */
  function repor() {
    var guardadas;
    try { guardadas = JSON.parse(localStorage.getItem(CHAVE) || '{}'); } catch (e) { guardadas = {}; }

    contador = guardadas.contador || 0;
    pecas = [];

    (guardadas.pecas || []).forEach(function (peca) {
      var destino = null;
      try { destino = peca.recipiente ? document.querySelector(peca.recipiente) : null; } catch (e) {}
      // O ecrã pode ter mudado desde que a peça foi posta. Sem recipiente, a
      // peça não volta — e não volta em silêncio: fica escrito na lista.
      if (!destino) { peca.perdida = true; pecas.push(peca); return; }
      destino.insertAdjacentHTML('beforeend', peca.html);
      pecas.push(peca);
    });

    pintarLista();
  }

  function limpar() {
    pecas.forEach(function (peca) {
      var no = document.getElementById(idDe(peca.html));
      if (no) no.remove();
    });
    pecas = [];
    contador = 0;
    try { localStorage.removeItem(CHAVE); } catch (e) {}
    pintarLista();
  }

  /* ---------------- o painel ---------------- */

  var caixa, lista;

  function montar(onde) {
    caixa = document.createElement('div');
    caixa.className = 'ed-pecas';

    var titulo = document.createElement('p');
    titulo.className = 'ed-seccao__titulo';
    titulo.textContent = 'Acrescentar';
    caixa.appendChild(titulo);

    CATALOGO.forEach(function (grupo) {
      var g = document.createElement('p');
      g.className = 'ed-pecas__grupo';
      g.textContent = grupo.grupo;
      caixa.appendChild(g);

      var grelha = document.createElement('div');
      grelha.className = 'ed-pecas__grelha';
      grupo.itens.forEach(function (item) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'ed-peca';
        b.textContent = item[0];
        b.dataset.edDica = 'Acrescentar no fim do bloco escolhido: ' + item[0];
        b.addEventListener('click', function () { acrescentar(item[1]); });
        grelha.appendChild(b);
      });
      caixa.appendChild(grelha);
    });

    lista = document.createElement('div');
    lista.className = 'ed-pecas__lista';
    caixa.appendChild(lista);

    onde.appendChild(caixa);
    pintarLista();
    traduzirRamo(caixa);
  }

  function pintarLista() {
    if (!lista) return;
    lista.textContent = '';
    if (!pecas.length) return;

    var t = document.createElement('p');
    t.className = 'ed-pecas__grupo';
    t.textContent = 'Acrescentadas (' + pecas.length + ')';
    lista.appendChild(t);

    pecas.forEach(function (peca, i) {
      var linha = document.createElement('div');
      linha.className = 'ed-pecas__linha';

      var nome = document.createElement('button');
      nome.type = 'button';
      nome.className = 'ed-pecas__nome';
      nome.textContent = (peca.perdida ? '⚠ ' : '') + idDe(peca.html);
      if (peca.perdida) nome.title = 'O bloco onde esta peça estava já não existe neste ecrã.';
      nome.addEventListener('click', function () {
        var no = document.getElementById(idDe(peca.html));
        if (!no) return;
        if (window.RomafeEditor && window.RomafeEditor.seleccionar) window.RomafeEditor.seleccionar(no);
        no.scrollIntoView({ block: 'center' });
      });

      var fora = document.createElement('button');
      fora.type = 'button';
      fora.className = 'ed-pecas__apagar';
      fora.textContent = '×';
      fora.setAttribute('aria-label', 'Apagar a peça ' + idDe(peca.html));
      fora.addEventListener('click', function () { apagar(i); });

      linha.appendChild(nome);
      linha.appendChild(fora);
      lista.appendChild(linha);
    });

    traduzirRamo(lista);
  }

  /**
   * O HTML das peças acrescentadas, para colar no ficheiro.
   *
   * O editor exporta CSS; isto exporta o que não é CSS. Uma peça nova não é uma
   * regra de estilo — é marcação, e tem de ir para o `index.html` à mão.
   */
  function html() {
    if (!pecas.length) return '';
    return pecas.map(function (peca) {
      return '<!-- no fim de: ' + peca.recipiente + ' -->\n' + peca.html;
    }).join('\n\n');
  }

  window.RomafePecas = {
    montar: montar,
    repor: repor,
    limpar: limpar,
    html: html
  };
})();
