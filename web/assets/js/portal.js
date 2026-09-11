/* =========================================================
   ROMAFE — navegação do portal
   Carregar numa aba marca-a e, se ela tiver ecrã, leva lá.
   ========================================================= */
(function () {
  'use strict';

  function activarAba(aba) {
    if (!aba || !aba.classList.contains('aba')) return false;

    var barra = aba.closest('.portal__abas');
    if (barra) {
      var irmas = barra.querySelectorAll('.aba');
      for (var i = 0; i < irmas.length; i++) irmas[i].removeAttribute('aria-current');
    }
    aba.setAttribute('aria-current', 'true');

    /* Se a aba leva a outro ecrã, a marca vai com ela: cada ecrã tem a sua
       barra, e a aba ativa de um não é a do outro. */
    var destino = aba.dataset.ecra;
    if (destino && window.RomafeEditor && window.RomafeEditor.irPara) {
      window.RomafeEditor.irPara(destino);
    }
    return true;
  }

  document.addEventListener('click', function (ev) {
    var aba = ev.target.closest && ev.target.closest('.aba');
    if (aba) activarAba(aba);
  });

  window.RomafePortal = { activarAba: activarAba };
})();
