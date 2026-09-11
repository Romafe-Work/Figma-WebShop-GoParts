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

  /* ---------------- notificações e modais ----------------
     A região já existe no documento; o que se cria aqui é a notificação.
     O erro não fecha sozinho: uma falha que some em quatro segundos é uma
     falha que ninguém leu — 14 §4. */
  var ICONES = {
    bom:   '<circle cx="12" cy="12" r="9"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
    info:  '<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 8h.01"/>',
    aviso: '<path d="M12 4 3 19h18Z"/><path d="M12 10v4"/><path d="M12 17h.01"/>',
    erro:  '<circle cx="12" cy="12" r="9"/><path d="m9 9 6 6M15 9l-6 6"/>'
  };

  function notificar(tipo, mensagem) {
    var zona = document.getElementById('toasts');
    if (!zona) return;

    var t = elemento('div', 'toast toast--' + tipo);
    t.setAttribute('role', tipo === 'erro' ? 'alert' : 'status');

    var ico = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    ico.setAttribute('class', 'toast__icone');
    ico.setAttribute('viewBox', '0 0 24 24');
    ico.setAttribute('fill', 'none');
    ico.setAttribute('stroke', 'currentColor');
    ico.setAttribute('stroke-width', '2');
    ico.setAttribute('stroke-linecap', 'round');
    ico.setAttribute('stroke-linejoin', 'round');
    ico.innerHTML = ICONES[tipo] || ICONES.info;
    t.appendChild(ico);

    t.appendChild(elemento('span', 'toast__texto', mensagem));

    var x = elemento('button', 'toast__fechar', '×');
    x.type = 'button';
    x.setAttribute('aria-label', 'Fechar');
    x.addEventListener('click', function () { t.remove(); });
    t.appendChild(x);

    zona.appendChild(t);
    if (tipo !== 'erro') window.setTimeout(function () { t.remove(); }, 4000);
  }

  function ligarDemonstracoes() {
    var b1 = document.getElementById('demo-toast');
    if (b1) b1.addEventListener('click', function () { notificar('bom', 'Viatura 12-AB-34 guardada'); });

    var b2 = document.getElementById('demo-toast-erro');
    if (b2) b2.addEventListener('click', function () { notificar('erro', 'Não foi possível guardar'); });

    [['demo-modal', 'modal-demo'], ['demo-modal-estreito', 'modal-confirmar']].forEach(function (par) {
      var botao = document.getElementById(par[0]);
      var modal = document.getElementById(par[1]);
      if (!botao || !modal) return;
      botao.addEventListener('click', function () { modal.showModal(); });
      modal.querySelectorAll('[data-fechar]').forEach(function (f) {
        f.addEventListener('click', function () { modal.close(); });
      });
      /* clicar no véu fecha: o clique cai no próprio dialog, fora da caixa */
      modal.addEventListener('click', function (ev) {
        if (ev.target === modal) modal.close();
      });
    });
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
    ligarDemonstracoes();

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
