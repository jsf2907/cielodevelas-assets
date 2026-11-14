/* Cielo de Velas · Landing C "Pide antes del 30" (prueba de anuncios Meta).
   Embed en Carrd: div con id "lpc" (id propio: A usa "lp", B usa "lpb") + script desde jsDelivr: site/lp-c.js
   Página mínima de urgencia: cuenta regresiva al CIERRE DE PEDIDOS, no a la fecha de la fiesta. */
(function () {
  var ROOT = document.getElementById('lpc');
  if (!ROOT) return;

  var VARIANT = 'C';
  var BASE = 'https://cdn.jsdelivr.net/gh/jsf2907/cielodevelas-assets@main/';
  var IMG = BASE + 'img/';
  function img(name) { return IMG + name; }
  var WA = '573116170949';
  var CATALOG = 'https://cielodevelas.com/';
  var IG = 'https://www.instagram.com/cielo.develas';

  // Cierres de pedido (7 días de producción antes de cada fecha)
  function bogota(y, m, d, h, mi) { return new Date(Date.UTC(y, m - 1, d, h + 5, mi || 0, 0)); }
  var now = new Date(), Y = now.getUTCFullYear();
  var PHASES = [
    { id: 'velitas', name: 'Velitas', event: '7 de diciembre', cutoff: bogota(Y, 11, 30, 23, 59), cutoffText: '30 de noviembre', hero: 'temporada-dia-de-las-velitas.jpg' },
    { id: 'navidad', name: 'Navidad', event: '24 de diciembre', cutoff: bogota(Y, 12, 17, 23, 59), cutoffText: '17 de diciembre', hero: 'temporada-navidad.jpg' }
  ];
  var PH = null;
  for (var i = 0; i < PHASES.length; i++) { if (now < PHASES[i].cutoff) { PH = PHASES[i]; break; } }
  var closed = !PH;
  if (closed) PH = PHASES[PHASES.length - 1];

  function wa(text) { return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(text + '\n\n(Código web V-' + VARIANT + ')'); }
  var ORDER = wa('Hola Cielo de Velas 🕯️ quiero apartar mi pedido para ' + PH.name + '.');

  var ICON_WA = '<svg viewBox="0 0 24 24" aria-hidden="true" width="22" height="22"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3a.5.5 0 0 0 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7a2.8 2.8 0 0 0 1.9-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.2-.3-.2-.6-.3Z"/></svg>';

  var css = [
    '@import url("https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Nunito+Sans:wght@400;600;700;800;900&display=swap");',
    '#lpc{--esp:#1C1513;--esp2:#261D1A;--line:rgba(255,240,220,.14);--cream:#FFF8EF;--soft:#D9CBBE;--wine:#8C2F39;--flame:#E4572E;--gold:#E6C27A;',
    'position:relative;width:100vw;margin-left:calc(50% - 50vw);background:var(--esp);color:var(--cream);font-family:"Nunito Sans",system-ui,-apple-system,sans-serif;line-height:1.5;overflow:hidden;text-align:center;-webkit-font-smoothing:antialiased}',
    '#lpc *{box-sizing:border-box;margin:0;padding:0}',
    '#lpc a{text-decoration:none}',
    '#lpc .wrap{max-width:520px;margin:0 auto;padding:0 20px}',
    /* Urgency bar */
    '#lpc .bar{display:flex;align-items:center;justify-content:center;gap:8px;padding:10px 14px;font-size:12px;font-weight:900;letter-spacing:.14em;text-transform:uppercase;color:#fff;background:var(--wine)}',
    '#lpc .bar i{width:7px;height:7px;border-radius:50%;background:#fff;animation:lpcBlink 1.2s steps(2,start) infinite}',
    /* Hero image */
    '#lpc .photo{position:relative;height:46vh;min-height:280px;max-height:460px;background-size:cover;background-position:center 60%}',
    '#lpc .photo:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(28,21,19,0) 45%,var(--esp) 100%)}',
    /* Copy */
    '#lpc .main{position:relative;margin-top:-56px;z-index:2;padding-bottom:30px}',
    '#lpc .label{font-size:12px;font-weight:900;letter-spacing:.2em;text-transform:uppercase;color:var(--gold)}',
    '#lpc h1{font-family:"Fraunces",Georgia,serif;font-weight:700;font-size:clamp(40px,11.5vw,64px);line-height:.98;letter-spacing:-.025em;margin-top:10px;text-wrap:balance}',
    '#lpc h1 span{color:var(--flame)}',
    '#lpc .sub{font-size:16.5px;color:var(--soft);margin:14px auto 0;max-width:400px;text-wrap:pretty}',
    /* Countdown */
    '#lpc .cd-l{margin-top:26px;font-size:12px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:var(--soft)}',
    '#lpc .cd{display:grid;grid-template-columns:repeat(4,1fr);margin-top:10px;border:1px solid var(--line);border-radius:18px;overflow:hidden}',
    '#lpc .cd div{padding:14px 2px 11px;border-left:1px solid var(--line)}',
    '#lpc .cd div:first-child{border-left:0}',
    '#lpc .cd b{display:block;font-family:"Fraunces",serif;font-weight:600;font-size:38px;line-height:1;font-variant-numeric:tabular-nums}',
    '#lpc .cd span{display:block;margin-top:6px;font-size:10.5px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--soft)}',
    '#lpc .cd div:first-child b{color:var(--flame)}',
    /* Button */
    '#lpc .btn{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;font-weight:900;font-size:21px;letter-spacing:.01em;border-radius:18px;padding:22px 24px;color:var(--esp);background:var(--cream);box-shadow:0 0 0 1px rgba(255,255,255,.4) inset,0 16px 40px rgba(228,87,46,.28);transition:transform .15s ease}',
    '#lpc .btn:active{transform:scale(.98)}',
    '#lpc .btn:focus-visible{outline:3px solid var(--gold);outline-offset:3px}',
    '#lpc .btn svg{color:#1E9E4A}',
    '#lpc .main .btn{margin-top:22px}',
    '#lpc .note{margin-top:12px;font-size:13.5px;color:var(--soft)}',
    /* Facts */
    '#lpc .facts{border-top:1px solid var(--line);padding:26px 0 8px}',
    '#lpc .row{display:flex;gap:14px;align-items:flex-start;text-align:left;padding:14px 0;border-bottom:1px solid var(--line)}',
    '#lpc .row:last-child{border-bottom:0}',
    '#lpc .row i{flex:0 0 30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-style:normal;font-family:"Fraunces",serif;font-weight:700;font-size:15px;color:var(--esp);background:var(--gold)}',
    '#lpc .row h4{font-size:16px;font-weight:800;line-height:1.3}',
    '#lpc .row p{font-size:14.5px;color:var(--soft);margin-top:2px}',
    '#lpc .end{padding:30px 0 120px}',
    '#lpc .end p.k{font-family:"Fraunces",serif;font-weight:600;font-size:24px;line-height:1.2;margin-bottom:18px;text-wrap:balance}',
    '#lpc .foot{margin-top:26px;font-size:13px;color:var(--soft)}',
    '#lpc .foot a{color:var(--gold)}',
    /* Sticky */
    '#lpc .sticky{position:fixed;left:12px;right:12px;bottom:calc(12px + env(safe-area-inset-bottom, 0px));z-index:9999;transform:translateY(140%);transition:transform .35s ease}',
    '#lpc .sticky.on{transform:none}',
    '#lpc .sticky .btn{max-width:500px;margin:0 auto;padding:17px 20px;font-size:17px;box-shadow:0 14px 34px rgba(0,0,0,.5)}',
    '#lpc .sticky small{font-weight:800;font-size:13px;color:var(--wine);margin-left:2px;font-variant-numeric:tabular-nums}',
    '@keyframes lpcBlink{to{opacity:.15}}',
    '@media (prefers-reduced-motion:reduce){#lpc *{animation:none!important;transition:none!important}}'
  ].join('');

  var headline = closed
    ? 'Aún podemos <span>ayudarte</span>'
    : 'Pide antes del <span>' + PH.cutoffText.replace(' de ', ' de&nbsp;') + '</span>';
  var sub = closed
    ? 'Los cupos de temporada ya cerraron, pero escríbenos y te confirmamos qué velas tenemos listas.'
    : 'Velas artesanales hechas a mano en Medellín para tu ' + (PH.id === 'velitas' ? 'Noche de Velitas' : 'Navidad') + '. Cada una toma unos 7 días, por eso los pedidos cierran el ' + PH.cutoffText + '.';

  ROOT.innerHTML = '<style>' + css + '</style>' +
    '<div class="bar"><i aria-hidden="true"></i>' + (closed ? 'Pedidos de temporada cerrados' : 'Cupos limitados · ' + PH.name + ' ' + PH.event) + '</div>' +
    '<div class="photo" role="img" aria-label="Velas encendidas para ' + PH.name + '" style="background-image:url(\'' + img(PH.hero) + '\')"></div>' +
    '<div class="main"><div class="wrap">' +
      '<p class="label">Cielo de Velas</p>' +
      '<h1>' + headline + '</h1>' +
      '<p class="sub">' + sub + '</p>' +
      (closed ? '' :
        '<p class="cd-l">Cierre de pedidos en</p>' +
        '<div class="cd" role="timer" aria-live="off"><div><b data-k="d">0</b><span>Días</span></div><div><b data-k="h">00</b><span>Horas</span></div><div><b data-k="m">00</b><span>Min</span></div><div><b data-k="s">00</b><span>Seg</span></div></div>') +
      '<a class="btn" href="' + ORDER + '" target="_blank" rel="noopener" data-fb="general">' + ICON_WA + 'Pedir aquí</a>' +
      '<p class="note">Te respondemos por WhatsApp el mismo día.</p>' +
    '</div></div>' +
    '<div class="wrap">' +
      '<div class="facts">' +
        '<div class="row"><i>1</i><div><h4>Escríbenos por WhatsApp</h4><p>Cuéntanos qué vela quieres, o te mostramos las favoritas.</p></div></div>' +
        '<div class="row"><i>2</i><div><h4>Confirmamos tu pedido</h4><p>Color, cantidad y fecha. Pago en efectivo o transferencia Bancolombia.</p></div></div>' +
        '<div class="row"><i>3</i><div><h4>Recíbela o recógela</h4><p>Lista en unos 7 días. Domicilio según tu zona en Medellín.</p></div></div>' +
      '</div>' +
      '<div class="end">' +
        '<p class="k">' + (closed ? 'Escríbenos y buscamos la mejor opción.' : 'Aparta la tuya hoy, antes de que se llenen los cupos.') + '</p>' +
        '<a class="btn" href="' + ORDER + '" target="_blank" rel="noopener" data-fb="general">' + ICON_WA + 'Pedir aquí</a>' +
        '<p class="foot"><a href="' + CATALOG + '" target="_blank" rel="noopener">Ver todas las velas</a> · <a href="' + IG + '" target="_blank" rel="noopener">@cielo.develas</a></p>' +
      '</div>' +
    '</div>' +
    '<div class="sticky"><a class="btn" href="' + ORDER + '" target="_blank" rel="noopener" data-fb="general">' + ICON_WA + 'Pedir aquí' + (closed ? '' : ' <small data-k="short"></small>') + '</a></div>';

  // Cuenta regresiva al cierre de pedidos
  if (!closed) {
    var cells = {};
    ROOT.querySelectorAll('[data-k]').forEach(function (b) { cells[b.getAttribute('data-k')] = b; });
    var pad = function (n) { return n < 10 ? '0' + n : String(n); };
    var tick = function () {
      var s = Math.max(0, Math.floor((PH.cutoff - new Date()) / 1000));
      var d = Math.floor(s / 86400), h = Math.floor(s % 86400 / 3600), m = Math.floor(s % 3600 / 60);
      cells.d.textContent = d; cells.h.textContent = pad(h); cells.m.textContent = pad(m); cells.s.textContent = pad(s % 60);
      if (cells.short) cells.short.textContent = '· quedan ' + (d > 0 ? d + ' días' : pad(h) + ':' + pad(m));
    };
    tick(); setInterval(tick, 1000);
  }

  // Botón fijo
  var sticky = ROOT.querySelector('.sticky');
  var watch = [ROOT.querySelector('.main .btn'), ROOT.querySelector('.end .btn')];
  if ('IntersectionObserver' in window) {
    var vis = [true, false];
    var so = new IntersectionObserver(function (es) {
      es.forEach(function (e) { vis[watch.indexOf(e.target)] = e.isIntersecting; });
      sticky.classList.toggle('on', !vis[0] && !vis[1]);
    });
    watch.forEach(function (w) { so.observe(w); });
  } else { sticky.classList.add('on'); }

  // Meta Pixel (el código base vive en el embed oculto de Carrd)
  function fb() { if (typeof window.fbq === 'function') window.fbq.apply(null, arguments); }
  fb('trackCustom', 'LandingView', { landing: 'pedido_' + VARIANT, temporada: PH.id, cerrado: closed });
  ROOT.addEventListener('click', function (e) {
    var a = e.target.closest('a[href*="wa.me/"]'); if (!a) return;
    fb('track', 'Contact', { content_category: 'landing_' + VARIANT });
  });
})();
