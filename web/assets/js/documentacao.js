/* =========================================================
   ROMAFE — página de documentação
   Constrói as grelhas a partir de uma lista de tokens, para que
   acrescentar um token seja acrescentar uma linha e nada mais.
   ========================================================= */
(function () {
  'use strict';

  /* ---------------- os tokens ---------------- */
  var CORES = {
    superficies: [
      ['--c-fundo',        'Fundo da página'],
      ['--c-superficie',   'Cartão, campo, barra'],
      ['--c-superficie-2', 'Botão neutro, demo'],
      ['--c-superficie-3', 'Bloco de código, campo desativado'],
      ['--c-borda',        'Traço normal'],
      ['--c-borda-forte',  'Traço de campo vazio']
    ],
    texto: [
      ['--c-texto',   'Tinta principal'],
      ['--c-texto-2', 'Etiqueta, dica'],
      ['--c-texto-3', 'Texto de exemplo, ícone de campo']
    ],
    marca: [
      ['--c-marca',       'Ligações, foco, caixa de verificação'],
      ['--c-marca-forte', 'Estado premido do azul'],
      ['--c-marca-suave', 'Anel de foco, fundo de nota'],
      ['--c-acao',        'Botão de ação — um por ecrã'],
      ['--c-acao-traco',  'Estado premido do laranja'],
      ['--c-ok',          'Estado bom'],
      ['--c-aviso',       'Estado que pede atenção'],
      ['--c-erro',        'Erro, alerta de credenciais'],
      ['--c-erro-suave',  'Fundo do alerta']
    ],
    entrada: [
      ['--c-entrada-fundo',   'Superfície invertida do ecrã'],
      ['--c-entrada-tinta',   'Texto sobre a fotografia'],
      ['--c-entrada-tinta-2', 'Texto secundário sobre a fotografia'],
      ['--c-logotipo',        'Logotipo no cartão']
    ]
  };

  var TIPOGRAFIA = [
    ['--t-xs',  'Dica, selo, rodapé'],
    ['--t-sm',  'Etiqueta, botão, texto de apoio'],
    ['--t-md',  'Corpo'],
    ['--t-lg',  'Subtítulo, vantagem'],
    ['--t-xl',  'Título de secção'],
    ['--t-2xl', 'Logotipo do cartão'],
    ['--t-3xl', 'Discurso do ecrã de entrada']
  ];

  var ESPACO = ['--e-1', '--e-2', '--e-3', '--e-4', '--e-5', '--e-6', '--e-7', '--e-8'];

  /* ---------------- utilitários ---------------- */
  var raiz = document.documentElement;

  function valor(token) {
    return getComputedStyle(raiz).getPropertyValue(token).trim();
  }

  function elemento(tag, classe, texto) {
    var el = document.createElement(tag);
    if (classe) el.className = classe;
    if (texto !== undefined) el.textContent = texto;
    return el;
  }

  /* ---------------- cor ---------------- */
  function pintarCores() {
    Object.keys(CORES).forEach(function (grupo) {
      var alvo = document.querySelector('[data-cores="' + grupo + '"]');
      if (!alvo) return;
      alvo.textContent = '';

      CORES[grupo].forEach(function (par) {
        var token = par[0], uso = par[1];

        var cartao = elemento('button', 'cor');
        cartao.type = 'button';
        cartao.setAttribute('aria-label', 'Copiar ' + token);

        var amostra = elemento('span', 'cor__amostra');
        amostra.style.background = 'var(' + token + ')';

        var texto = elemento('span', 'cor__texto');
        texto.appendChild(elemento('span', 'cor__nome', token));
        texto.appendChild(elemento('span', 'cor__valor', valor(token) || '—'));
        texto.appendChild(elemento('span', 'cor__uso', uso));

        cartao.appendChild(amostra);
        cartao.appendChild(texto);
        cartao.addEventListener('click', function () { copiar(token); });
        alvo.appendChild(cartao);
      });
    });
  }

  /* ---------------- tipografia ---------------- */
  function pintarTipografia() {
    var corpo = document.querySelector('[data-escala="tipografia"] tbody');
    if (!corpo) return;

    TIPOGRAFIA.forEach(function (par) {
      var token = par[0], uso = par[1];
      var linha = document.createElement('tr');

      var td1 = elemento('td');
      td1.appendChild(elemento('code', null, token));

      var v = valor(token);
      var px = Math.round(parseFloat(v) * 16 * 100) / 100;
      var td2 = elemento('td', null, v + '  ·  ' + px + 'px');

      var td3 = elemento('td', null, uso);
      td3.style.fontSize = 'var(' + token + ')';

      linha.appendChild(td1); linha.appendChild(td2); linha.appendChild(td3);
      corpo.appendChild(linha);
    });
  }

  /* ---------------- espaçamento ---------------- */
  function pintarEspaco() {
    var alvo = document.querySelector('[data-escala="espaco"]');
    if (!alvo) return;

    ESPACO.forEach(function (token) {
      var linha = elemento('div', 'espaco');
      linha.appendChild(elemento('span', 'espaco__nome', token + ' · ' + valor(token)));
      var barra = elemento('span', 'espaco__barra');
      barra.style.width = 'var(' + token + ')';
      linha.appendChild(barra);
      alvo.appendChild(linha);
    });
  }

  /* ---------------- copiar ---------------- */
  var aviso;
  function copiar(texto) {
    var feito = function () { mostrarAviso(texto + ' copiado'); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(texto).then(feito, function () { mostrarAviso('Não deu para copiar'); });
    } else {
      mostrarAviso(texto);
    }
  }

  function mostrarAviso(texto) {
    if (aviso) aviso.remove();
    aviso = elemento('p', 'aviso-copia', texto);
    aviso.setAttribute('role', 'status');
    document.body.appendChild(aviso);
    window.setTimeout(function () { if (aviso) { aviso.remove(); aviso = null; } }, 1800);
  }

  /* ---------------- índice que acompanha a leitura ---------------- */
  function seguirIndice() {
    var seccoes = Array.prototype.slice.call(document.querySelectorAll('.seccao'));
    var ligacoes = {};
    document.querySelectorAll('.doc-indice a').forEach(function (a) {
      ligacoes[a.getAttribute('href').slice(1)] = a;
    });

    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        var a = ligacoes[e.target.id];
        if (!a) return;
        if (e.isIntersecting) {
          Object.keys(ligacoes).forEach(function (id) { ligacoes[id].removeAttribute('aria-current'); });
          a.setAttribute('aria-current', 'true');
        }
      });
    }, { rootMargin: '-96px 0px -70% 0px' });

    seccoes.forEach(function (s) { observador.observe(s); });
  }

  /* ---------------- arranque ----------------
     As grelhas leem os valores já resolvidos, por isso voltam a ser
     pintadas sempre que o tema muda: os mesmos nomes, outros valores. */
  function pintarTudo() {
    pintarCores();
  }

  document.addEventListener('DOMContentLoaded', function () {
    pintarTudo();
    pintarTipografia();
    pintarEspaco();
    seguirIndice();

    document.addEventListener('click', function (ev) {
      if (ev.target.closest('.segmented__btn[data-tema]')) {
        window.setTimeout(pintarTudo, 0);
      }
    });

    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', pintarTudo);
    }
  });
})();
