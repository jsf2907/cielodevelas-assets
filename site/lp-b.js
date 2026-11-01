/* Cielo de Velas · Landing B "El regalo perfecto" (prueba de anuncios Meta).
   Embed en Carrd: div con id "lpb" (id propio: A usa "lp") + script desde jsDelivr: site/lp-b.js
   Precios y fotos en vivo: pestaña Web de Cielo_de_Velas_-_Ventas_y_Gastos (Web.gs). */
(function () {
  var ROOT = document.getElementById('lpb');
  if (!ROOT) return;

  var VARIANT = 'B';
  var BASE = 'https://cdn.jsdelivr.net/gh/jsf2907/cielodevelas-assets@main/';
  var IMG = BASE + 'img/';
  function img(name) { return IMG + name; }
  var FEED = 'https://script.google.com/macros/s/AKfycbzI6w4KqoWFt6ZVrCg9TTOMEUcBpCWJFHZiKHO3z69z52catv57n7dq4bhmksfz4ljBAg/exec';
  var WA = '573225911307';
  var CATALOG = 'https://cielodevelas.com/';
  var IG = 'https://www.instagram.com/cielo.develas';

  // Las 6 del escaparate, en este orden (Ref). Respaldo si la hoja no responde.
  var ORDER = [71, 93, 96, 113, 7, 73];
  var TAGS = { 71: 'Más pedida', 96: 'Favorita', 7: 'Clásica' };
  var PRODUCTS = {
    71: { n: '6 Deseos', p: 50000, f: '6-deseos' },
    93: { n: 'Papá Noel', p: 31000, f: 'papa-noel' },
    96: { n: 'Reno 3D', p: 31000, f: 'reno-3d' },
    113: { n: 'Gnomo', p: 26000, f: 'gnomo' },
    7: { n: 'Sagrada Familia', p: 25000, f: 'sagrada-familia' },
    73: { n: 'Árbol Bolitas', p: 22000, f: 'arbol-bolitas' }
  };

  // Fechas límite (7 días de producción)
  function bogota(y, m, d, h) { return new Date(Date.UTC(y, m - 1, d, h + 5, 0, 0)); }
  var now = new Date(), Y = now.getUTCFullYear();
  var velitasOpen = now < bogota(Y, 12, 1, 0);   // hasta el 30 nov
  var navidadOpen = now < bogota(Y, 12, 18, 0);  // hasta el 17 dic
  var afterVelitas = now >= bogota(Y, 12, 8, 0);
  var season = afterVelitas ? 'Navidad' : 'Velitas y Navidad';
  var deadline = velitasOpen
    ? 'Pide antes del <b>30 de noviembre</b> para Velitas y del <b>17 de diciembre</b> para Navidad.'
    : navidadOpen
      ? 'Pide antes del <b>17 de diciembre</b> y tenlas listas para Navidad.'
      : 'Escríbenos hoy y te confirmamos disponibilidad.';

  function money(n) { return '$' + Math.round(n).toLocaleString('es-CO').replace(/,/g, '.'); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function imgUrl(f) {
    f = String(f || '').trim();
    var m = f.match(/\/d\/([\w-]{20,})/) || f.match(/[?&]id=([\w-]{20,})/);
    if (m) return 'https://lh3.googleusercontent.com/d/' + m[1] + '=w800';
    if (/^https?:\/\//i.test(f)) return f;
    return img((f || 'proximamente').replace(/\.(jpe?g|png|webp)$/i, '') + '.jpg');
  }
  function wa(text) { return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(text + '\n\n(Código web V-' + VARIANT + ')'); }
  var GENERAL = wa('Hola Cielo de Velas 🎁 quiero hacer un pedido para ' + season + '.');
  var GIFTS = wa('Hola Cielo de Velas, quiero cotizar regalos navideños. Cantidad aproximada: ');
  function orderLink(p) { return wa('Hola Cielo de Velas 🎁 quiero pedir la vela ' + p.n + ' (' + money(p.p) + '). Color: '); }

  var ICON_WA = '<svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3a.5.5 0 0 0 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7a2.8 2.8 0 0 0 1.9-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.2-.3-.2-.6-.3Z"/></svg>';
  var ICON_GIFT = '<svg viewBox="0 0 24 24" aria-hidden="true" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7M7.5 8a2.5 2.5 0 0 1 0-5C10 3 12 8 12 8s2-5 4.5-5a2.5 2.5 0 0 1 0 5"/></svg>';

  // Guirnalda de luces
  var BULBS = '';
  for (var b = 0; b < 16; b++) BULBS += '<i style="--i:' + b + '"></i>';

  var css = [
    '@import url("https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Nunito+Sans:wght@400;600;700;800&family=Pinyon+Script&display=swap");',
    '#lpb{--cream:#FFF8EF;--sand:#F6E7D6;--paper:#FFFDF8;--wine:#8C2F39;--wine-d:#6E222B;--red:#B3242F;--pine:#2F4A3A;--pine-d:#22372B;--gold:#E6C27A;--gold-d:#C99A4A;--ink:#2B2220;--muted:#6B5A52;',
    'position:relative;width:100vw;margin-left:calc(50% - 50vw);background:var(--cream);color:var(--ink);font-family:"Nunito Sans",system-ui,-apple-system,sans-serif;line-height:1.5;overflow:hidden;text-align:center;-webkit-font-smoothing:antialiased}',
    '#lpb *{box-sizing:border-box;margin:0;padding:0}',
    '#lpb a{text-decoration:none}',
    '#lpb b{font-weight:800}',
    '#lpb .wrap{max-width:560px;margin:0 auto;padding:0 18px}',
    /* Lights */
    '#lpb .lights{position:relative;height:46px;overflow:hidden;z-index:3}',
    '#lpb .lights svg{position:absolute;top:0;left:0;width:100%;height:46px}',
    '#lpb .lights .bulbs{position:absolute;inset:0;display:flex;justify-content:space-between;padding:0 2%}',
    '#lpb .lights i{position:relative;width:11px;height:17px;border-radius:50% 50% 50% 50%/40% 40% 60% 60%;margin-top:calc(10px + 14px * var(--y,0));animation:lpTw 1.8s ease-in-out infinite;animation-delay:calc(var(--i) * -.37s)}',
    '#lpb .lights i:before{content:"";position:absolute;top:-5px;left:3px;width:5px;height:6px;border-radius:1px;background:#5B4A3A}',
    '#lpb .lights i:nth-child(4n+1){background:var(--red);color:var(--red)}',
    '#lpb .lights i:nth-child(4n+2){background:var(--gold);color:var(--gold)}',
    '#lpb .lights i:nth-child(4n+3){background:#3E7A55;color:#3E7A55}',
    '#lpb .lights i:nth-child(4n){background:#F2E9DA;color:#F7D98C}',
    /* Hero */
    '#lpb .hero{position:relative;padding:4px 0 26px;background:radial-gradient(120% 80% at 50% 0%,#FFFFFF 0%,var(--cream) 55%)}',
    '#lpb canvas.fx{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1}',
    '#lpb .hero .wrap{position:relative;z-index:2}',
    '#lpb .logo{width:62px;height:auto;display:block;margin:6px auto 12px}',
    '#lpb .eyebrow{display:inline-flex;align-items:center;gap:8px;font-size:11px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:var(--pine);background:rgba(47,74,58,.08);border-radius:999px;padding:7px 13px}',
    '#lpb .eyebrow:before{content:"";width:6px;height:6px;border-radius:50%;background:var(--red);box-shadow:0 0 0 3px rgba(179,36,47,.18);animation:lpTw 1.6s ease-in-out infinite}',
    '#lpb .script{font-family:"Pinyon Script",cursive;font-size:42px;line-height:1;color:var(--wine);margin-top:16px}',
    '#lpb h1{font-family:"Fraunces",Georgia,serif;font-weight:600;font-size:clamp(34px,9.4vw,52px);line-height:1.04;letter-spacing:-.015em;color:var(--ink);margin-top:2px;text-wrap:balance}',
    '#lpb h1 em{font-style:normal;color:var(--red)}',
    '#lpb .sub{font-size:16px;color:var(--muted);max-width:400px;margin:12px auto 0;text-wrap:pretty}',
    '#lpb .sub strong{color:var(--wine);font-weight:800}',
    '#lpb .ctas{display:flex;flex-direction:column;align-items:center;gap:10px;margin-top:20px}',
    /* Buttons */
    '#lpb .btn{display:inline-flex;align-items:center;justify-content:center;gap:9px;font-weight:800;font-size:17px;border-radius:999px;padding:16px 28px;transition:transform .15s ease,box-shadow .2s ease;cursor:pointer}',
    '#lpb .btn:active{transform:scale(.97)}',
    '#lpb .btn:focus-visible{outline:3px solid var(--gold);outline-offset:3px}',
    '#lpb .btn-red{color:#fff;background:linear-gradient(180deg,#C6343F,var(--red) 55%,#93202A);box-shadow:0 10px 26px rgba(179,36,47,.35),inset 0 1px 0 rgba(255,255,255,.25)}',
    '#lpb .btn-pine{color:var(--cream);background:linear-gradient(180deg,#3B5C49,var(--pine) 60%,var(--pine-d));box-shadow:0 8px 20px rgba(47,74,58,.3)}',
    '#lpb .btn-gold{color:var(--ink);background:linear-gradient(180deg,#F8E3AE,#E6C27A 55%,#D3A85A);box-shadow:0 8px 22px rgba(201,154,74,.4),inset 0 1px 0 rgba(255,255,255,.7)}',
    '#lpb .hero .btn-red{width:100%;max-width:340px;font-size:19px;padding:18px 28px;animation:lpBeat 2.8s ease-in-out infinite}',
    '#lpb .link{font-weight:800;font-size:15px;color:var(--pine);border-bottom:2px solid rgba(47,74,58,.25);padding-bottom:1px}',
    '#lpb .deadline{display:inline-block;margin-top:16px;font-size:13.5px;color:var(--ink);background:var(--paper);border:1px dashed rgba(140,47,57,.4);border-radius:14px;padding:9px 14px;max-width:380px}',
    '#lpb .deadline b{color:var(--wine)}',
    /* Grid */
    '#lpb section.sec{position:relative;padding:44px 0}',
    '#lpb .shop{background:linear-gradient(180deg,var(--cream),var(--sand))}',
    '#lpb .kicker{font-size:11.5px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;color:var(--red)}',
    '#lpb h2{font-family:"Fraunces",Georgia,serif;font-weight:600;font-size:30px;line-height:1.1;margin-top:6px;text-wrap:balance}',
    '#lpb .lead{color:var(--muted);margin-top:8px;font-size:15.5px}',
    '#lpb .grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:24px;text-align:left}',
    '#lpb .card{position:relative;display:flex;flex-direction:column;background:var(--paper);border-radius:18px;overflow:hidden;box-shadow:0 1px 0 rgba(43,34,32,.06),0 10px 26px rgba(110,34,43,.12);min-width:0}',
    '#lpb .card .ph{position:relative;aspect-ratio:4/5;background:var(--sand);overflow:hidden}',
    '#lpb .card img{width:100%;height:100%;object-fit:cover;display:block}',
    '#lpb .card .tag{position:absolute;top:9px;left:9px;font-size:10px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#fff;background:var(--red);padding:5px 9px;border-radius:999px;box-shadow:0 3px 10px rgba(179,36,47,.35)}',
    '#lpb .card .bow{position:absolute;top:-2px;right:12px;width:26px;height:34px;background:var(--gold);clip-path:polygon(0 0,100% 0,100% 100%,50% 78%,0 100%);box-shadow:0 2px 6px rgba(0,0,0,.15)}',
    '#lpb .card .meta{padding:11px 12px 0;flex:1}',
    '#lpb .card h3{font-family:"Fraunces",serif;font-weight:600;font-size:17px;line-height:1.2;overflow-wrap:anywhere}',
    '#lpb .card .price{display:block;font-weight:800;font-size:16px;color:var(--wine);margin-top:3px}',
    '#lpb .card .btn{margin:10px 10px 11px;padding:11px 10px;font-size:15px}',
    '#lpb .more{display:inline-block;margin-top:22px}',
    /* Gift quote */
    '#lpb .gift{position:relative;margin-top:30px;padding:26px 22px 24px;border-radius:24px;color:var(--cream);background:radial-gradient(120% 90% at 0% 0%,#3E6450 0%,var(--pine) 45%,var(--pine-d) 100%);box-shadow:0 18px 40px rgba(34,55,43,.35);overflow:hidden;text-align:center}',
    '#lpb .gift .ic{width:54px;height:54px;border-radius:50%;margin:0 auto 10px;display:flex;align-items:center;justify-content:center;color:var(--ink);background:linear-gradient(180deg,#F8E3AE,#E6C27A)}',
    '#lpb .gift h3{font-family:"Fraunces",serif;font-weight:600;font-size:24px;line-height:1.15}',
    '#lpb .gift p{color:#DCE6DE;font-size:15px;margin-top:6px}',
    '#lpb .gift .btn{margin-top:16px;width:100%;max-width:300px}',
    /* Steps */
    '#lpb .steps{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:22px}',
    '#lpb .step{padding:16px 8px 14px;border-radius:16px;background:var(--paper);border:1px solid rgba(140,47,57,.12)}',
    '#lpb .step i{width:34px;height:34px;margin:0 auto 8px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-style:normal;font-family:"Fraunces",serif;font-weight:700;font-size:16px;color:#fff;background:var(--wine)}',
    '#lpb .step h4{font-size:14px;font-weight:800;line-height:1.25}',
    '#lpb .step p{font-size:12.5px;color:var(--muted);margin-top:4px;line-height:1.35}',
    '#lpb .trust{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin-top:18px}',
    '#lpb .trust span{font-size:12.5px;font-weight:700;color:var(--pine);padding:6px 11px;border-radius:999px;background:rgba(47,74,58,.08)}',
    /* Final */
    '#lpb .final{padding:46px 0 120px;background:var(--wine);color:var(--cream);position:relative}',
    '#lpb .final:before{content:"";position:absolute;left:0;right:0;top:0;height:14px;background:radial-gradient(circle at 10px -4px,var(--sand) 12px,transparent 13px) 0 0/20px 14px repeat-x}',
    '#lpb .final .script{color:var(--gold);margin-top:0}',
    '#lpb .final h2{color:#fff}',
    '#lpb .final .lead{color:#F1D9D3}',
    '#lpb .final .btn{margin-top:20px;width:100%;max-width:340px}',
    '#lpb .foot{margin-top:30px;font-size:13px;color:#E8C9C2}',
    '#lpb .foot a{color:var(--gold)}',
    /* Sticky */
    '#lpb .sticky{position:fixed;left:12px;right:12px;bottom:calc(12px + env(safe-area-inset-bottom, 0px));z-index:9999;display:flex;transform:translateY(140%);transition:transform .35s ease}',
    '#lpb .sticky.on{transform:none}',
    '#lpb .sticky .btn{width:100%;max-width:520px;margin:0 auto;padding:16px 24px;font-size:17px;box-shadow:0 12px 30px rgba(43,34,32,.35)}',
    /* Motion */
    '@keyframes lpTw{0%,100%{opacity:1;box-shadow:0 0 10px 2px currentColor}50%{opacity:.45;box-shadow:0 0 2px 0 currentColor}}',
    '@keyframes lpBeat{0%,100%{transform:scale(1)}8%{transform:scale(1.035)}16%{transform:scale(1)}}',
    '@media (min-width:720px){#lpb .grid{grid-template-columns:repeat(3,1fr);gap:18px}#lpb .wrap.wide{max-width:960px}#lpb .card h3{font-size:19px}}',
    '@media (prefers-reduced-motion:reduce){#lpb *{animation:none!important;transition:none!important}}'
  ].join('');

  ROOT.innerHTML = '<style>' + css + '</style>' +
    '<div class="lights" aria-hidden="true"><svg viewBox="0 0 400 46" preserveAspectRatio="none"><path d="M0 6 Q 25 30 50 10 T 100 10 T 150 10 T 200 10 T 250 10 T 300 10 T 350 10 T 400 6" fill="none" stroke="#5B4A3A" stroke-width="1.4"/></svg><div class="bulbs">' + BULBS + '</div></div>' +
    '<header class="hero">' +
      '<canvas class="fx" aria-hidden="true"></canvas>' +
      '<div class="wrap">' +
        '<img class="logo" src="' + img('logo.png') + '" alt="Cielo de Velas" width="600" height="573">' +
        '<span class="eyebrow">Hechas a mano en Medellín</span>' +
        '<p class="script">El regalo perfecto</p>' +
        '<h1>Regala luz esta <em>' + (afterVelitas ? 'Navidad' : 'temporada') + '</em></h1>' +
        '<p class="sub" id="lp-sub">Velas artesanales listas para regalar o encender en familia. Desde <strong id="lp-from">$22.000</strong>.</p>' +
        '<div class="ctas">' +
          '<a class="btn btn-red" href="' + GENERAL + '" target="_blank" rel="noopener" data-fb="general">' + ICON_WA + 'Pedir aquí</a>' +
          '<a class="link" href="#lp-shop" data-scroll="1">Ver las favoritas</a>' +
        '</div>' +
        '<p class="deadline">' + deadline + '</p>' +
      '</div>' +
    '</header>' +
    '<section class="sec shop" id="lp-shop"><div class="wrap wide">' +
      '<p class="kicker">Las más regaladas</p>' +
      '<h2>Elige la tuya</h2>' +
      '<p class="lead">Toca “Pedir” y te atendemos por WhatsApp.</p>' +
      '<div class="grid" id="lp-grid"></div>' +
      '<a class="link more" href="' + CATALOG + '" target="_blank" rel="noopener">Ver todas las velas</a>' +
      '<div class="gift">' +
        '<div class="ic">' + ICON_GIFT + '</div>' +
        '<h3>¿Regalos para tu equipo o tu familia?</h3>' +
        '<p>Cotizamos pedidos por cantidad para empresas, novenas y amigo secreto.</p>' +
        '<a class="btn btn-gold" href="' + GIFTS + '" target="_blank" rel="noopener" data-fb="lead">' + ICON_WA + 'Cotizar regalos</a>' +
      '</div>' +
    '</div></section>' +
    '<section class="sec"><div class="wrap wide">' +
      '<p class="kicker">Así de fácil</p>' +
      '<h2>Tu pedido en 3 pasos</h2>' +
      '<div class="steps">' +
        '<div class="step"><i>1</i><h4>Elige</h4><p>La vela que más te guste</p></div>' +
        '<div class="step"><i>2</i><h4>Escríbenos</h4><p>Color, cantidad y fecha por WhatsApp</p></div>' +
        '<div class="step"><i>3</i><h4>Recibe</h4><p>Lista en unos 7 días</p></div>' +
      '</div>' +
      '<div class="trust"><span>Hecho a mano</span><span>Efectivo o Bancolombia</span><span>Recogida o domicilio</span></div>' +
    '</div></section>' +
    '<section class="final"><div class="wrap">' +
      '<p class="script">Este año,</p>' +
      '<h2>regala algo hecho con amor</h2>' +
      '<p class="lead">Cada vela se hace a mano, por eso los cupos de temporada son limitados.</p>' +
      '<a class="btn btn-gold" href="' + GENERAL + '" target="_blank" rel="noopener" data-fb="general">' + ICON_WA + 'Pedir aquí</a>' +
      '<p class="foot">Cielo de Velas · Medellín · <a href="' + IG + '" target="_blank" rel="noopener">@cielo.develas</a></p>' +
    '</div></section>' +
    '<div class="sticky"><a class="btn btn-red" href="' + GENERAL + '" target="_blank" rel="noopener" data-fb="general">' + ICON_WA + 'Pedir por WhatsApp</a></div>';

  // Altura de cada bombillo siguiendo la curva del cable
  ROOT.querySelectorAll('.lights i').forEach(function (el, k) {
    var t = (k + .5) / 16; el.style.setProperty('--y', Math.abs(Math.sin(t * Math.PI * 4)).toFixed(2));
  });

  function renderGrid() {
    var list = ORDER.map(function (r) { return { r: r, p: PRODUCTS[r] }; }).filter(function (x) { return x.p && x.p.p > 0; });
    ROOT.querySelector('#lp-grid').innerHTML = list.map(function (x) {
      var p = x.p, tag = TAGS[x.r];
      return '<article class="card">' +
        '<div class="ph">' + (tag ? '<span class="tag">' + tag + '</span>' : '') + '<span class="bow" aria-hidden="true"></span>' +
        '<img loading="lazy" decoding="async" src="' + esc(imgUrl(p.f)) + '" alt="Vela artesanal ' + esc(p.n) + '" width="640" height="800"></div>' +
        '<div class="meta"><h3>' + esc(p.n) + '</h3><span class="price">' + money(p.p) + '</span></div>' +
        '<a class="btn btn-red" href="' + orderLink(p) + '" target="_blank" rel="noopener" data-fb="pedido" data-n="' + esc(p.n) + '" data-p="' + p.p + '">' + ICON_WA + 'Pedir</a>' +
      '</article>';
    }).join('');
    var min = Math.min.apply(null, list.map(function (x) { return x.p.p; }));
    if (isFinite(min)) ROOT.querySelector('#lp-from').textContent = money(min);
  }
  renderGrid();

  if (window.fetch) {
    var ctrl = window.AbortController ? new AbortController() : null;
    var t = setTimeout(function () { if (ctrl) ctrl.abort(); }, 8000);
    fetch(FEED, { credentials: 'omit', signal: ctrl ? ctrl.signal : undefined })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        clearTimeout(t);
        var seen = {};
        (d && d.items || []).forEach(function (i) {
          var r = Number(i.r);
          if (PRODUCTS[r]) { seen[r] = true; if (Number(i.p) > 0) PRODUCTS[r] = { n: String(i.n), p: Number(i.p), f: i.f || PRODUCTS[r].f }; }
        });
        // Si una vela se ocultó en la hoja (Mostrar sin marcar), sale del escaparate.
        if (d && d.items && d.items.length) ORDER = ORDER.filter(function (r) { return seen[r]; });
        renderGrid();
      })
      .catch(function () { clearTimeout(t); });
  }

  // Desplazamiento suave a las favoritas
  ROOT.addEventListener('click', function (e) {
    var s = e.target.closest('[data-scroll]'); if (!s) return;
    e.preventDefault();
    var el = ROOT.querySelector('#lp-shop');
    window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 8, behavior: 'smooth' });
  });

  // Botón fijo
  var sticky = ROOT.querySelector('.sticky');
  var watch = [ROOT.querySelector('.hero .btn'), ROOT.querySelector('.final .btn')];
  if ('IntersectionObserver' in window) {
    var vis = [true, false];
    var so = new IntersectionObserver(function (es) {
      es.forEach(function (e) { vis[watch.indexOf(e.target)] = e.isIntersecting; });
      sticky.classList.toggle('on', !vis[0] && !vis[1]);
    });
    watch.forEach(function (w) { so.observe(w); });
  } else { sticky.classList.add('on'); }

  // Confeti suave (estrellas doradas, rojas y verdes) en el encabezado
  var cv = ROOT.querySelector('canvas.fx');
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (cv && cv.getContext && !reduce) {
    var ctx = cv.getContext('2d'), W, H, dpr = Math.min(window.devicePixelRatio || 1, 2), parts = [];
    var COLORS = ['rgba(230,194,122,', 'rgba(179,36,47,', 'rgba(62,122,85,', 'rgba(230,194,122,'];
    function size() { W = cv.offsetWidth; H = cv.offsetHeight; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
    function mk(top) { return { x: Math.random() * W, y: top ? -10 : Math.random() * H, s: Math.random() * 3 + 2.5, v: Math.random() * .4 + .25, w: Math.random() * 6.28, rot: Math.random() * 6.28, c: COLORS[Math.floor(Math.random() * COLORS.length)], a: Math.random() * .35 + .35 }; }
    function star(x, y, r, rot) {
      ctx.beginPath();
      for (var k = 0; k < 10; k++) { var rr = k % 2 ? r * .45 : r, ang = rot + k * Math.PI / 5; ctx.lineTo(x + Math.cos(ang) * rr, y + Math.sin(ang) * rr); }
      ctx.closePath(); ctx.fill();
    }
    size(); for (var k = 0; k < 26; k++) parts.push(mk(false));
    window.addEventListener('resize', size);
    var heroEl = ROOT.querySelector('.hero'), running = true;
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { running = es[0].isIntersecting; if (running) requestAnimationFrame(loop); }).observe(heroEl);
    function loop() {
      if (!running) return;
      ctx.clearRect(0, 0, W, H);
      parts.forEach(function (p, idx) {
        p.y += p.v; p.w += .015; p.x += Math.sin(p.w) * .3; p.rot += .01;
        if (p.y > H + 10) parts[idx] = mk(true);
        ctx.fillStyle = p.c + p.a + ')';
        star(p.x, p.y, p.s, p.rot);
      });
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  // Meta Pixel (el código base vive en el embed oculto de Carrd)
  function fb() { if (typeof window.fbq === 'function') window.fbq.apply(null, arguments); }
  fb('trackCustom', 'LandingView', { landing: 'regalos_' + VARIANT, temporada: afterVelitas ? 'navidad' : 'velitas' });
  ROOT.addEventListener('click', function (e) {
    var a = e.target.closest('a[href*="wa.me/"]'); if (!a) return;
    var kind = a.getAttribute('data-fb');
    if (kind === 'pedido') fb('track', 'Contact', { content_name: a.getAttribute('data-n'), value: Number(a.getAttribute('data-p')), currency: 'COP', content_category: 'landing_' + VARIANT });
    else if (kind === 'lead') fb('track', 'Lead', { content_category: 'cotizacion_regalos_landing_' + VARIANT, currency: 'COP' });
    else fb('track', 'Contact', { content_category: 'landing_' + VARIANT });
  });
})();
