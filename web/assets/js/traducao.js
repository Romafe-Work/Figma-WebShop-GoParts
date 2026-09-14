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
    'Texto novo. Faça duplo clique para escrever.': 'New text. Double-click to write.',

    /* ── A MOLDURA DO EDITOR ──
       Camadas, propriedades, paleta e diálogos. Quem trabalha o ecrã em inglês
       não devia ter de ler os botões em português.

       O que continua por traduzir é o CÓDIGO dentro do diálogo do CSS: esse
       copia-se para um projeto que está escrito em português, e comentários
       ingleses num ficheiro português não ajudam ninguém. */

    /* painéis e ações */
    'Camadas': 'Layers',
    'Propriedades': 'Properties',
    'Ecrã': 'Screen',
    'Ver o CSS': 'View the CSS',
    'Anular': 'Undo',
    'Repor tudo': 'Reset everything',
    'Repor': 'Reset',
    'Repor esta peça': 'Reset this element',
    'Copiar': 'Copy',
    'Copiar este CSS': 'Copy this CSS',
    'Fechar': 'Close',
    'Fechar o painel': 'Close the panel',
    'Fechar este painel': 'Close this panel',
    'O que mudaste': 'What you changed',
    'CSS da peça': 'CSS for this element',
    'Clica numa peça do ecrã, ou escolhe-a nas camadas à esquerda.':
      'Click an element on the canvas, or pick it from the layers on the left.',
    'Ver o ecrã no tema claro': 'View the screen in the light theme',
    'Ver o ecrã no tema escuro': 'View the screen in the dark theme',
    'Ver o ecrã no tema auto': 'View the screen in the auto theme',
    'Ver o ecrã em Português': 'View the screen in Portuguese',
    'Ver o ecrã em English': 'View the screen in English',

    /* secções das propriedades */
    'Peça': 'Element',
    'Visível': 'Visible',
    'Esconder': 'Hide',
    'Tira a peça do ecrã sem a apagar. Volta por aqui ou pelas camadas.':
      'Takes the element off the screen without deleting it. It comes back from here or from the layers.',
    'Letra': 'Type',
    'Tinta': 'Ink',
    'Fundo': 'Background',
    'Traço': 'Stroke',
    'Forma e folga': 'Shape and spacing',
    'Raio': 'Radius',
    'Sombra': 'Shadow',
    'Folga': 'Spacing',
    'Espaço': 'Gap',
    'Alinhar': 'Align',
    'Posição': 'Position',
    'Deslocamento em píxeis a partir do sítio de origem':
      'Offset in pixels from where it started',
    'Devolve a peça ao sítio de origem': 'Puts the element back where it started',
    'Tamanho': 'Size',
    'Peso': 'Weight',
    /* Os degraus da opacidade do traço e da sombra. */
    'sem': 'none',
    'leve': 'light',
    'médio': 'medium',
    'cheio': 'full',
    'Categoria': 'Category',
    'Variante': 'Variant',
    'Fotografia de fundo': 'Background photo',
    'Trocar fotografia': 'Change photo',
    'Sem cor própria — herda de quem está por cima':
      'No colour of its own — inherits from the element above',
    'Sete tamanhos, e não há oitavo — 04 §2.': 'Seven sizes, and there is no eighth — 04 §2.',
    'Escala de 4pt, oito degraus — 07 §7.': 'A 4pt scale, eight steps — 07 §7.',
    'A cor do ícone é o traço, e por isso pode ser laranja. O que nunca é laranja é a letra — 02 §1.2.':
      'An icon’s colour is its stroke, so it may be orange. What is never orange is type — 02 §1.2.',

    /* variantes do botão */
    'Ação (laranja)': 'Action (orange)',
    'Primário (azul)': 'Primary (blue)',
    'Neutro': 'Neutral',
    'Fantasma': 'Ghost',
    'Destrutivo': 'Destructive',

    /* a paleta */
    'Acrescentar': 'Add',
    'Campos de texto': 'Text fields',
    'Números e datas': 'Numbers and dates',
    'Escolhas': 'Choices',
    'Outras peças': 'Other elements',
    'Texto': 'Text',
    'Pesquisa': 'Search',
    'Ficheiro': 'File',
    'Área de texto': 'Text area',
    'Botões de opção': 'Radio buttons',
    'Botão': 'Button',
    'Título': 'Heading',
    'Número': 'Number',

    /* nomes das camadas */
    'Ecrã de entrada': 'Sign-in screen',
    'Barra de topo': 'Top bar',
    'Palco': 'Stage',
    'Discurso': 'Pitch',
    'Vantagens': 'Benefits',
    'Vantagem': 'Benefit',
    'Cartão de sessão': 'Sign-in card',
    'Cabeça do cartão': 'Card head',
    'Formulário': 'Form',
    'Campo': 'Field',
    'Caixa de verificação': 'Checkbox',
    'Caixa de texto': 'Text box',
    'Apoio': 'Support',
    'Rodapé': 'Footer',
    'Alerta': 'Alert',
    'Separador': 'Divider',
    'Segmentado': 'Segmented',
    'Portal': 'Portal',
    'Marca ROMAFE': 'ROMAFE lockup',
    'Logótipo': 'Logo',
    'Ícones': 'Icons',
    'Ícone': 'Icon',
    'Abas': 'Tabs',
    'Aba': 'Tab',
    'Conta': 'Account',
    'Painéis': 'Panels',
    'Painel': 'Panel',
    'Cabeça do painel': 'Panel head',
    'Corpo do painel': 'Panel body',
    'Pé do painel': 'Panel foot',
    'Título do painel': 'Panel title',
    'Opções': 'Options',
    'Etiqueta': 'Label',
    'Seleção': 'Select',

    /* Os sufixos das classes, que o editor põe a seguir ao nome da peça —
       «Marca ROMAFE · nome». São identificadores do código, mas aparecem na
       lista de camadas como se fossem nomes, e deixá-los em português era
       deixar meia frase por traduzir à vista de quem está a trabalhar. */
    'nome': 'name',
    'risco': 'rule',
    'accoes': 'actions',
    'foto': 'photo',
    'veu': 'veil',
    'ligacoes': 'links',
    'rodape': 'footer',
    'sinal': 'mark',
    'lema': 'tagline',
    'selo': 'seal',
    'barras': 'bars',
    'idioma': 'language',
    'topo-acima': 'above-top',

    /* os valores da casa, como aparecem nas grelhas do painel */
    'Tinta principal': 'Primary ink',
    'Tinta secundária': 'Secondary ink',
    'Tinta discreta': 'Quiet ink',
    'Azul da marca': 'Brand blue',
    'Azul premido': 'Pressed blue',
    'Azul do logótipo': 'Logo blue',
    'Azul ROMAFE': 'ROMAFE blue',
    'Azul do tema': 'Theme blue',
    'Azul suave': 'Soft blue',
    'Laranja de ação': 'Action orange',
    'Laranja premido': 'Pressed orange',
    'Laranja escuro': 'Dark orange',
    'Superfície': 'Surface',
    'Superfície 2': 'Surface 2',
    'Superfície 3': 'Surface 3',
    'Superfície invertida': 'Inverted surface',
    'Fundo da página': 'Page background',
    'Erro': 'Error',
    'Erro suave': 'Soft error',
    'Estado bom': 'Good state',
    'Bom': 'Good',
    'Bom suave': 'Soft good',
    'Aviso': 'Warning',
    'Aviso suave': 'Soft warning',
    'Branco': 'White',
    'Branco sobre foto': 'White on photo',
    'Branco discreto': 'Quiet white',
    'Meio': 'Medium',
    'Forte': 'Bold',
    'esq': 'left',
    'centro': 'centre',
    'dir': 'right',

    /* a fotografia do ecrã de entrada */
    'Véu': 'Veil',
    'Sem véu, o texto branco deixa de se ler sobre a fotografia clara — 17 §1.':
      'Without the veil, white text stops being readable over a light photograph — 17 §1.',
    'Fotografia trocada — o ficheiro fica só neste separador':
      'Photo changed — the file stays in this tab only',

    /* as regras que o painel explica */
    'A cor vem da variante. Um botão não muda de cor sozinho: muda de categoria, e a cor vem atrás — 09 §2.':
      'The colour comes from the variant. A button does not change colour on its own: it changes category, and the colour follows — 09 §2.',
    'Não há laranja nesta paleta: o laranja é fundo, traço e preenchimento, nunca tinta — 02 §1.2.':
      'There is no orange in this palette: orange is background, stroke and fill, never type — 02 §1.2.',

    /* mostrar e esconder */
    'Mostrar': 'Show',
    'Traz a peça de volta ao ecrã': 'Brings the element back to the screen',
    'Abrir as camadas': 'Open the layers',
    'Abrir as propriedades': 'Open the properties',

    /* avisos que aparecem e somem */
    'Não há nada para anular': 'There is nothing to undo',
    'Anulado': 'Undone',
    'Voltou tudo ao original — texto, variantes, fotografia e peças':
      'Everything is back to the original — text, variants, photo and added elements',
    'CSS copiado': 'CSS copied',
    'CSS da peça copiado': 'The element CSS was copied',
    'Peça acrescentada no fim do bloco': 'Element added at the end of the block',
    'O bloco onde esta peça estava já não existe neste ecrã.':
      'The block this element was in no longer exists on this screen.'
  };

  /* Contagens e outros textos que só mudam no número. Uma linha por padrão, e
     não uma entrada por número: o dicionário não tem de crescer de cada vez que
     um carrinho leva mais um artigo. */
  var PADROES = [
    [/^(\d+) artigos?$/, function (m) { return m[1] + (m[1] === '1' ? ' item' : ' items'); }],
    [/^Carrinho, (\d+) artigos?$/, function (m) { return 'Cart, ' + m[1] + (m[1] === '1' ? ' item' : ' items'); }],
    [/^A mostrar (\d+) de (\d+) pedidos$/, function (m) { return 'Showing ' + m[1] + ' of ' + m[2] + ' orders'; }],

    /* A dica de cada botão da paleta, que o próprio editor compõe com o nome da
       peça. Uma linha aqui em vez de dezassete entradas iguais no dicionário. */
    [/^Acrescentadas \((\d+)\)$/, function (m) { return 'Added (' + m[1] + ')'; }],
    [/^Apagar a peça (.+)$/, function (m) { return 'Delete the element ' + m[1]; }],
    [/^Opacidade do véu: ([\d.]+)$/, function (m) { return 'Veil opacity: ' + m[1]; }],
    [/^Acrescentar no fim do bloco escolhido: (.+)$/, function (m) {
      var nome = directo(m[1]);
      return 'Add to the end of the chosen block: ' + (nome === null ? m[1] : nome);
    }]
  ];

  /* O que estava escrito antes de traduzir. Um Map com o nó como chave, para
     não sujar o HTML com atributos de estado, e porque a volta ao português tem
     de devolver exatamente o original — incluindo o que o editor lhe mudou. */
  var originais = new Map();

  var idioma = 'pt';

  function directo(texto) {
    var limpo = texto.trim();
    if (!limpo) return null;
    if (Object.prototype.hasOwnProperty.call(EN, limpo)) return EN[limpo];
    for (var i = 0; i < PADROES.length; i++) {
      var m = limpo.match(PADROES[i][0]);
      if (m) return PADROES[i][1](m);
    }
    return null;
  }

  /**
   * Traduz por partes o que vem separado por «·».
   *
   * O editor escreve os nomes das camadas assim — «Marca ROMAFE · nome» — e os
   * rótulos dos valores também: «Superfície · --c-superficie · #ffffff». São
   * dezenas de combinações, e pô-las todas no dicionário era escrever à mão o
   * que o editor já compõe sozinho. Traduz-se cada bocado e devolve-se a
   * pontuação onde estava; o que não estiver no dicionário — um token, uma cor,
   * um nome de etiqueta — fica como está.
   */
  function traduzir(texto) {
    var certo = directo(texto);
    if (certo !== null) return certo;

    var limpo = texto.trim();
    if (limpo.indexOf('\u00b7') < 0) return null;

    var partes = limpo.split(/(\s+\u00b7\s+)/);
    var mudou = false;
    var saida = partes.map(function (parte, i) {
      if (i % 2) return parte;
      var t = directo(parte);
      if (t === null) return parte;
      mudou = true;
      return t;
    }).join('');

    return mudou ? saida : null;
  }

  /* O espaço à volta do texto não é decoração: num `<span>Ver</span> todas` é
     ele que separa as duas palavras. Traduz-se o miolo e devolve-se a moldura. */
  function trocar(texto, novo) {
    var antes = texto.match(/^\s*/)[0];
    var depois = texto.match(/\s*$/)[0];
    return antes + novo + depois;
  }

  /**
   * O QUE FICA DE FORA.
   *
   * A moldura do editor — camadas, propriedades, paleta — É traduzida: quem
   * trabalha o ecrã em inglês não devia ter de ler os botões em português.
   *
   * O que continua de fora é o CÓDIGO dentro do diálogo do CSS. Esse texto não
   * é rótulo, é o que se copia para colar no projeto — e o projeto está escrito
   * em português. Traduzir ali era pôr comentários ingleses num ficheiro que
   * ninguém mais escreveu em inglês.
   */
  function foraDeAlcance(no) {
    var pai = no.parentElement;
    if (!pai) return true;
    if (pai.closest('.ed-dialogo pre, .ed-dialogo code')) return true;
    /* O botão do globo diz qual é a língua ACTUAL, e quem o escreve é a função
       `marcar()`. Deixá-lo no percurso automático dava o que se viu: «Português»
       estava no dicionário como «English», e os dois degraus do painel — que são
       os nomes das duas línguas — passaram a dizer «English» os dois.
       O nome de uma língua escreve-se na própria língua, e não se traduz. */
    if (pai.closest('.topo__idioma')) return true;
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

  function traduzirAtributos(elementos) {
    for (var i = 0; i < elementos.length; i++) {
      var elemento = elementos[i];
      ATRIBUTOS.forEach(function (nome) {
        if (!elemento.hasAttribute(nome)) return;
        var guarda = 'ptOriginal' + nome.replace(/[^a-z]/gi, '');
        if (elemento.dataset[guarda]) return;
        var novo = traduzir(elemento.getAttribute(nome));
        if (novo === null) return;
        elemento.dataset[guarda] = elemento.getAttribute(nome);
        elemento.setAttribute(nome, novo);
      });
    }
  }

  function paraIngles() {
    nosDeTexto().forEach(function (no) {
      var novo = traduzir(no.nodeValue);
      if (novo === null) return;
      if (!originais.has(no)) originais.set(no, no.nodeValue);
      no.nodeValue = trocar(no.nodeValue, novo);
    });

    traduzirAtributos(document.querySelectorAll('body *'));

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

  var NOME_DA_LINGUA = { pt: 'Português', en: 'English' };

  function marcar() {
    var botoes = document.querySelectorAll('.topo__idioma, [data-idioma]');
    for (var i = 0; i < botoes.length; i++) {
      botoes[i].setAttribute('aria-label', idioma === 'pt' ? 'Mudar idioma: Português' : 'Change language: English');

      /* O último nó de texto do botão é o nome da língua, ao lado do globo.
         Escreve-se aqui porque é estado, e não tradução. */
      var nos = botoes[i].childNodes;
      for (var j = nos.length - 1; j >= 0; j--) {
        if (nos[j].nodeType === 3 && nos[j].nodeValue.trim()) {
          nos[j].nodeValue = trocar(nos[j].nodeValue, NOME_DA_LINGUA[idioma]);
          break;
        }
      }
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

  /**
   * TRADUZ UM RAMO SÓ.
   *
   * O painel das propriedades é redesenhado a cada peça escolhida, e o que
   * nasce depois da tradução nasce em português. Chamar `aplicar()` a cada
   * clique percorria a página inteira; isto percorre só o painel.
   *
   * Em português não faz nada, porque o que nasceu já nasceu certo.
   */
  function traduzirRamo(raiz) {
    if (!raiz || idioma !== 'en') return;

    var andarilho = document.createTreeWalker(raiz, NodeFilter.SHOW_TEXT, null);
    var no;
    while ((no = andarilho.nextNode())) {
      if (!no.nodeValue.trim() || foraDeAlcance(no)) continue;
      if (originais.has(no)) continue;
      var novo = traduzir(no.nodeValue);
      if (novo === null) continue;
      originais.set(no, no.nodeValue);
      no.nodeValue = trocar(no.nodeValue, novo);
    }

    traduzirAtributos(raiz.querySelectorAll('*'));
  }

  window.RomafeTraducao = {
    aplicar: aplicar,
    traduzirRamo: traduzirRamo,
    actual: function () { return idioma; },
    porTraduzir: porTraduzir
  };
})();
