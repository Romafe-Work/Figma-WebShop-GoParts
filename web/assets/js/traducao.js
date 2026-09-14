/* =========================================================
   ROMAFE — português e inglês

   O ecrã está escrito em português no HTML, e essa é a fonte. O inglês é uma
   camada por cima: um dicionário do que está escrito para o que se lê, aplicado
   aos nós de texto e aos atributos que o utilizador vê.

   ── PORQUÊ ASSIM, E NÃO COM CHAVES ──────────────────────────────────────────

   O caminho normal seria marcar cada texto com uma chave — `data-t="entrar"` —
   e ter dois dicionários. Aqui isso custava tocar em algumas centenas de nós do
   HTML, e ganhava pouco: o ecrã continua a ser o produto, e um HTML cheio de
   chaves deixa de se ler como o ecrã que é.

   Com o dicionário à cabeça do que está escrito, o HTML fica igual, uma peça
   nova acrescentada no editor é traduzida sem se lhe mexer, e o que falta
   traduzir aparece sozinho — ver `RomafeTraducao.porTraduzir()`.

   O preço está escrito e é real: duas frases iguais em sítios diferentes têm de
   ter a mesma tradução. Neste ecrã não há nenhum caso em que isso incomode, e
   no dia em que houver a saída é a chave — não é remendar o dicionário.

   ── O QUE NÃO SE TRADUZ ─────────────────────────────────────────────────────

   Marcas de automóvel, moradas, números de pedido, nomes de pessoas e a versão.
   Não estão no dicionário, e o que não está no dicionário fica como está.
   ========================================================= */
(function () {
  'use strict';

  var CHAVE = 'uiux:idioma';

  /* Os atributos que uma pessoa lê. `value` fica de fora de propósito: num
     <input> é conteúdo escrito por quem usa o ecrã, não rótulo da casa. */
  var ATRIBUTOS = ['placeholder', 'aria-label', 'title', 'alt', 'data-nome', 'data-ed-dica'];

  var EN = {
    /* ── entrada ── */
    'Entrar — ROMAFE Gestão de oficina': 'Sign in — ROMAFE Workshop management',
    'Gestão de oficina': 'Workshop management',
    'Saltar para o formulário': 'Skip to the form',
    'Tema da interface': 'Interface theme',
    'Claro': 'Light',
    'Escuro': 'Dark',
    'Auto': 'Auto',
    'Mudar idioma: Português': 'Change language: English',
    'Português': 'English',
    'Oficina ROMAFE': 'ROMAFE workshop',
    'Mais que peças': 'More than parts',
    'soluções que mantêm': 'solutions that keep',
    'o seu negócio a andar': 'your business moving',
    'Peças e equipamentos': 'Parts and equipment',
    'Das melhores marcas': 'From the best brands',
    'Apoio ao profissional': 'Professional support',
    'Sempre ao seu lado': 'Always by your side',
    'Juntos a fazer': 'Together making',
    'o seu negócio avançar': 'your business move forward',
    'Qualidade. Confiança. Parceria.': 'Quality. Trust. Partnership.',
    'Iniciar sessão': 'Sign in',
    'Endereço de Email': 'Email address',
    'exemplo@romafe.com': 'name@romafe.com',
    'Palavra-passe': 'Password',
    'A sua palavra-passe': 'Your password',
    'Mostrar palavra-passe': 'Show password',
    'Manter sessão iniciada': 'Keep me signed in',
    'Esqueceu-se da sua palavra-passe?': 'Forgotten your password?',
    'Email ou palavra-passe incorretos.': 'Incorrect email or password.',
    'Ainda não tem conta?': 'Don’t have an account yet?',
    'Pedir acesso': 'Request access',
    'Acesso seguro': 'Secure access',
    'Os seus dados estão protegidos': 'Your data is protected',
    'Precisa de ajuda?': 'Need help?',
    'Contacte a nossa equipa': 'Contact our team',
    'Entrada': 'Sign in',

    /* ── portal ── */
    'Início do portal': 'Portal home',
    'Início': 'Home',
    'Catálogo': 'Catalogue',
    'Catálogo de peças': 'Parts catalogue',
    'Pedidos': 'Orders',
    'Guias de remessa': 'Delivery notes',
    'Faturas': 'Invoices',
    'Devoluções': 'Returns',
    'Informações técnicas': 'Technical information',
    'Minha lista': 'My list',
    'Mensagens': 'Messages',
    'Novas mensagens': 'New messages',
    'Definições': 'Settings',
    'Ajuda': 'Help',
    'Apoio técnico': 'Technical support',
    'Armazém': 'Warehouse',
    'Identificar veículo': 'Identify vehicle',
    'Pesquise por matrícula, chassis, referência ou selecione o seu veículo.':
      'Search by number plate, chassis, reference, or select your vehicle.',
    'Matrícula': 'Number plate',
    'Introduza a matrícula': 'Enter the number plate',
    'N.º de chassi': 'Chassis no.',
    'Introduza o n.º de chassi': 'Enter the chassis no.',
    'Descrição': 'Description',
    'Introduza a descrição': 'Enter the description',
    'Motor': 'Engine',
    'Introduza o motor': 'Enter the engine',
    'Tipo de veículo': 'Vehicle type',
    'Automóvel ligeiro': 'Passenger car',
    'Marca': 'Make',
    'Marcas': 'Makes',
    'Selecione marca': 'Select make',
    'Modelo': 'Model',
    'Selecione modelo': 'Select model',
    'Veículo': 'Vehicle',
    'Selecione veículo': 'Select vehicle',
    'Selecionar veículo': 'Select vehicle',
    'Selecionar': 'Select',
    'Limpar campos': 'Clear fields',
    'Pesquisa avançada': 'Advanced search',
    'Pesq. avançada': 'Adv. search',
    'Introduza os dados do veículo para uma pesquisa mais precisa.':
      'Enter the vehicle details for a more accurate search.',
    'Quanto mais informação introduzir, mais precisos serão os resultados da pesquisa.':
      'The more information you enter, the more accurate the search results.',
    'Dica': 'Tip',
    'Fechar a dica': 'Close the tip',
    'Referência': 'Reference',
    'Introduza a referência': 'Enter the reference',
    'Introduza a referência da peça': 'Enter the part reference',
    'Pesquisar por referência': 'Search by reference',
    'Pesquisar referências': 'Search references',
    'Pesquisar por referência, marca, modelo, etc.': 'Search by reference, make, model, etc.',
    'Pesquise por referência da peça, aplicável a várias marcas.':
      'Search by part reference, applicable to several makes.',
    'Modo de pesquisa': 'Search mode',
    'Pesquisa parcial': 'Partial search',
    'Incluir equivalências': 'Include equivalents',
    'Pesquisar': 'Search',
    'Peças originais': 'Original parts',
    'e equivalentes': 'and equivalents',
    'Peças de motor': 'Engine parts',
    'Encontre a peça certa,': 'Find the right part,',
    'mais rápido.': 'faster.',
    'Oficinas mais fortes': 'Stronger workshops',
    'todos os dias': 'every day',
    'especializado': 'specialised',
    'as marcas': 'the brands',
    'Ver': 'View',
    'Ver todas': 'View all',
    'Todas': 'All',
    'Todos': 'All',
    'Mais populares': 'Most popular',
    'Favoritas': 'Favourites',
    'Filtrar marcas': 'Filter brands',
    'Navegue pelas características do veículo.': 'Browse by vehicle characteristics.',
    'Secções': 'Sections',
    'O seu pedido': 'Your order',
    'Confirmar stock': 'Check stock',
    'Entrega rápida': 'Fast delivery',
    'Entrega prioritária': 'Priority delivery',
    'Entregar após as 14h': 'Deliver after 2 pm',
    'Morada entrega': 'Delivery address',
    'Observações': 'Notes',
    'Porto · 1 conta': 'Porto · 1 account',
    'Voltar ao topo': 'Back to top',

    /* ── histórico de pedidos ── */
    'Histórico de pedidos': 'Order history',
    'Onde estou': 'You are here',
    'Utilize os filtros abaixo para localizar os seus pedidos.':
      'Use the filters below to find your orders.',
    'Pesquise e acompanhe os seus pedidos.': 'Search and track your orders.',
    'Filtros': 'Filters',
    'Limpar filtros': 'Clear filters',
    'Data': 'Date',
    'Data a partir de': 'Date from',
    'Data até': 'Date to',
    'N.º Pedido': 'Order no.',
    'Introduza o n.º do pedido': 'Enter the order no.',
    'Estado do pedido': 'Order status',
    'Pesquisar pedidos': 'Search orders',
    'Pedidos encontrados': 'Orders found',
    'A mostrar 5 de 5 pedidos': 'Showing 5 of 5 orders',
    'Pedido': 'Order',
    'Valor': 'Value',
    'Processado': 'Processed',
    'Processados': 'Processed',
    'Sem proc.': 'Unproc.',
    'Por recolher': 'Awaiting collection',
    'Recolher': 'Collection',
    'Ações': 'Actions',
    'Mais ações': 'More actions',

    /* ── rodapé ── */
    'Peças para um mundo em movimento': 'Parts for a world in motion',
    'Aviso legal': 'Legal notice',
    'Aviso legal e política de cookies': 'Legal notice and cookie policy',
    'Política de privacidade': 'Privacy policy',
    'Contactos': 'Contacts',
    '© 2026 ROMAFE. Todos os direitos reservados.': '© 2026 ROMAFE. All rights reserved.',
    'ou': 'or',

    /* ── peças acrescentadas no editor ──
       Os rótulos com que uma peça nasce. Sem isto, um campo acrescentado ficava
       em português no meio de um ecrã em inglês — e o buraco só aparecia a quem
       fosse acrescentar. */
    'Novo campo': 'New field',
    'Escreva aqui': 'Type here',
    'Email': 'Email',
    'nome@romafe.com': 'name@romafe.com',
    'Quantidade': 'Quantity',
    'Telefone': 'Phone',
    'Hora': 'Time',
    'Em euros': 'In euros',
    'Selecione uma opção': 'Select an option',
    'Opção A': 'Option A',
    'Opção B': 'Option B',
    'Escolha uma': 'Choose one',
    'Aceito os termos': 'I accept the terms',
    'Escolher ficheiro': 'Choose file',
    'Novo botão': 'New button',
    'Novo título': 'New heading',
    'Texto novo. Faça duplo clique para escrever.': 'New text. Double-click to write.'
  };

  /* Contagens e outros textos que só mudam no número. Uma linha por padrão, e
     não uma entrada por número: o dicionário não tem de crescer de cada vez que
     um carrinho leva mais um artigo. */
  var PADROES = [
    [/^(\d+) artigos?$/, function (m) { return m[1] + (m[1] === '1' ? ' item' : ' items'); }],
    [/^Carrinho, (\d+) artigos?$/, function (m) { return 'Cart, ' + m[1] + (m[1] === '1' ? ' item' : ' items'); }],
    [/^A mostrar (\d+) de (\d+) pedidos$/, function (m) { return 'Showing ' + m[1] + ' of ' + m[2] + ' orders'; }]
  ];

  /* O que estava escrito antes de traduzir. Um Map com o nó como chave, para
     não sujar o HTML com atributos de estado, e porque a volta ao português tem
     de devolver exatamente o original — incluindo o que o editor lhe mudou. */
  var originais = new Map();

  var idioma = 'pt';

  function traduzir(texto) {
    var limpo = texto.trim();
    if (!limpo) return null;
    if (Object.prototype.hasOwnProperty.call(EN, limpo)) return EN[limpo];
    for (var i = 0; i < PADROES.length; i++) {
      var m = limpo.match(PADROES[i][0]);
      if (m) return PADROES[i][1](m);
    }
    return null;
  }

  /* O espaço à volta do texto não é decoração: num `<span>Ver</span> todas` é
     ele que separa as duas palavras. Traduz-se o miolo e devolve-se a moldura. */
  function trocar(texto, novo) {
    var antes = texto.match(/^\s*/)[0];
    var depois = texto.match(/\s*$/)[0];
    return antes + novo + depois;
  }

  function foraDeAlcance(no) {
    var pai = no.parentElement;
    if (!pai) return true;
    if (pai.closest('.ed-painel, .ed-dialogo, .ed-aviso, .ed-dica-flutuante, .ed-abrir')) return true;
    var tag = pai.tagName;
    return tag === 'SCRIPT' || tag === 'STYLE';
  }

  function nosDeTexto() {
    var lista = [];
    var andarilho = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    var no;
    while ((no = andarilho.nextNode())) {
      if (no.nodeValue.trim() && !foraDeAlcance(no)) lista.push(no);
    }
    return lista;
  }

  function paraIngles() {
    nosDeTexto().forEach(function (no) {
      var novo = traduzir(no.nodeValue);
      if (novo === null) return;
      if (!originais.has(no)) originais.set(no, no.nodeValue);
      no.nodeValue = trocar(no.nodeValue, novo);
    });

    var todos = document.querySelectorAll('body *:not(.ed-painel *):not(.ed-dialogo *)');
    for (var i = 0; i < todos.length; i++) {
      var elemento = todos[i];
      if (elemento.closest('.ed-painel, .ed-dialogo, .ed-aviso, .ed-dica-flutuante, .ed-abrir')) continue;
      ATRIBUTOS.forEach(function (nome) {
        if (!elemento.hasAttribute(nome)) return;
        var valor = elemento.getAttribute(nome);
        var novo = traduzir(valor);
        if (novo === null) return;
        var guarda = 'ptOriginal' + nome.replace(/[^a-z]/gi, '');
        if (!elemento.dataset[guarda]) elemento.dataset[guarda] = valor;
        elemento.setAttribute(nome, novo);
      });
    }

    document.documentElement.lang = 'en';
    var titulo = traduzir(document.title);
    if (titulo) document.title = titulo;
  }

  function paraPortugues() {
    originais.forEach(function (valor, no) {
      if (no.isConnected) no.nodeValue = valor;
    });
    originais.clear();

    var todos = document.querySelectorAll('[data-pt-originalplaceholder], [data-pt-originalarialabel], [data-pt-originaltitle], [data-pt-originalalt], [data-pt-originaldatanome], [data-pt-originaldataeddica]');
    for (var i = 0; i < todos.length; i++) {
      var elemento = todos[i];
      ATRIBUTOS.forEach(function (nome) {
        var guarda = 'ptOriginal' + nome.replace(/[^a-z]/gi, '');
        if (elemento.dataset[guarda]) {
          elemento.setAttribute(nome, elemento.dataset[guarda]);
          delete elemento.dataset[guarda];
        }
      });
    }

    document.documentElement.lang = 'pt';
  }

  function aplicar(novo) {
    var alvo = novo || idioma;
    // Volta-se sempre ao português primeiro. Traduzir por cima de traduzido
    // deixava o dicionário a olhar para inglês e a não encontrar nada — e o
    // segundo clique no botão não fazia nada, que é o género de erro que só
    // aparece quando alguém carrega duas vezes.
    paraPortugues();
    if (alvo === 'en') paraIngles();

    idioma = alvo;
    try { localStorage.setItem(CHAVE, alvo); } catch (e) {}
    marcar();
  }

  function marcar() {
    var botoes = document.querySelectorAll('.topo__idioma, [data-idioma]');
    for (var i = 0; i < botoes.length; i++) {
      botoes[i].setAttribute('aria-label', idioma === 'pt' ? 'Mudar idioma: Português' : 'Change language: English');
    }

    /* Os degraus do painel do editor. Marcam-se AQUI e não só no clique deles:
       o botão do globo, na barra de topo, também muda o idioma, e sem isto os
       degraus ficavam a dizer «Português» com o ecrã em inglês. */
    var degraus = document.querySelectorAll('[data-ed-idioma]');
    for (var k = 0; k < degraus.length; k++) {
      degraus[k].setAttribute('aria-pressed', String(degraus[k].dataset.edIdioma === idioma));
    }
  }

  function guardado() {
    try { return localStorage.getItem(CHAVE) || 'pt'; } catch (e) { return 'pt'; }
  }

  /**
   * O QUE FALTA TRADUZIR.
   *
   * Corre-se na consola. Devolve o que está escrito no ecrã, não está no
   * dicionário e não é uma marca nem um número — que é a lista de trabalho de
   * quem for acrescentar um ecrã.
   */
  function porTraduzir() {
    var vistos = {};
    nosDeTexto().forEach(function (no) {
      var t = no.nodeValue.trim();
      if (!t || traduzir(t) !== null) return;
      if (/^[\s\W\d]+$/.test(t)) return;
      vistos[t] = true;
    });
    return Object.keys(vistos).sort();
  }

  document.addEventListener('DOMContentLoaded', function () {
    // Depois do editor: é ele que repõe os textos guardados, e traduzir antes
    // disso era traduzir o que estava prestes a ser substituído.
    window.setTimeout(function () { aplicar(guardado()); }, 0);

    document.addEventListener('click', function (ev) {
      var botao = ev.target.closest('.topo__idioma, [data-idioma]');
      if (!botao) return;
      ev.preventDefault();
      ev.stopPropagation();
      aplicar(idioma === 'pt' ? 'en' : 'pt');
    }, true);
  });

  window.RomafeTraducao = {
    aplicar: aplicar,
    actual: function () { return idioma; },
    porTraduzir: porTraduzir
  };
})();
