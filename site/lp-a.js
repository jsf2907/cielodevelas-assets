/* Cielo de Velas · Landing A "Noche de Velitas" (prueba de anuncios Meta).
   Embed en Carrd: <div id="lp"></div><script src="https://cdn.jsdelivr.net/gh/jsf2907/cielodevelas-assets@COMMIT/site/lp-a.js"></script>
   Precios y fotos en vivo: pestaña Web de Cielo_de_Velas_-_Ventas_y_Gastos (Web.gs). */
(function () {
  var ROOT = document.getElementById('lp');
  if (!ROOT) return;

  var VARIANT = 'A';
  var BASE = 'https://cdn.jsdelivr.net/gh/jsf2907/cielodevelas-assets@main/';
  var IMG = BASE + 'img/';
  function img(name) { return IMG + name; }
  var FEED = 'https://script.google.com/macros/s/AKfycbzI6w4KqoWFt6ZVrCg9TTOMEUcBpCWJFHZiKHO3z69z52catv57n7dq4bhmksfz4ljBAg/exec';
  var WA = '573116170949';
  var CATALOG = 'https://cielodevelas.com/';
  var IG = 'https://www.instagram.com/cielo.develas';
  var LEAD_DAYS = 7;

  // Respaldo si la hoja no responde (Ref, nombre, precio, foto).
  var PRODUCTS = {
    71: { n: '6 Deseos', p: 50000, f: '6-deseos' },
    152: { n: 'Velitas Santa x6', p: 41000, f: 'velitas-santa-x6' },
    131: { n: 'Candle Christmas', p: 40000, f: 'candle-christmas' },
    93: { n: 'Papá Noel', p: 31000, f: 'papa-noel' },
    96: { n: 'Reno 3D', p: 31000, f: 'reno-3d' }
  };

  // Fases: Velitas hasta la noche del 7 dic, luego Navidad.
  function bogota(y, m, d, h) { return new Date(Date.UTC(y, m - 1, d, h + 5, 0, 0)); }
  var now = new Date();
  var Y = now.getUTCFullYear();
  var PHASES = [
    {
      id: 'velitas', name: 'Velitas', eyebrow: '7 de diciembre · Noche de Velitas',
      title: 'Noche de Velitas', target: bogota(Y, 12, 7, 18), end: bogota(Y, 12, 8, 0), deadlineText: '30 de noviembre',
      sub: 'Velas artesanales hechas a mano en Medellín, para encender la noche más bonita del año con los tuyos.',
      hero: 'temporada-dia-de-las-velitas.jpg', refs: [71, 152, 131]
    },
    {
      id: 'navidad', name: 'Navidad', eyebrow: '24 de diciembre · Nochebuena',
      title: 'Navidad', target: bogota(Y, 12, 24, 20), end: bogota(Y, 12, 26, 0), deadlineText: '17 de diciembre',
      sub: 'Velas artesanales hechas a mano en Medellín, para la cena de Nochebuena y los regalos de los que más quieres.',
      hero: 'temporada-navidad.jpg', refs: [71, 93, 96]
    }
  ];
  var PH = PHASES[PHASES.length - 1];
  for (var i = 0; i < PHASES.length; i++) { if (now < PHASES[i].end) { PH = PHASES[i]; break; } }
  var deadline = new Date(PH.target.getTime() - LEAD_DAYS * 864e5);
  var beforeDeadline = now < deadline;

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
  var GENERAL = wa('Hola Cielo de Velas 🕯️ quiero hacer un pedido para ' + PH.name + '.');
  function orderLink(p) { return wa('Hola Cielo de Velas 🕯️ quiero pedir la vela ' + p.n + ' (' + money(p.p) + ') para ' + PH.name + '. Color: '); }

  var ICON_WA = '<svg viewBox="0 0 24 24" aria-hidden="true" width="20" height="20"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3a.5.5 0 0 0 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7a2.8 2.8 0 0 0 1.9-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.2-.3-.2-.6-.3Z"/></svg>';

  function candle(h, delay) {
    return '<span class="cdl" style="--h:' + h + 'px;--d:' + delay + 's"><span class="glow"></span><span class="fl"></span><span class="wick"></span><span class="wax"></span></span>';
  }
  var CANDLES = candle(54, 0) + candle(86, .4) + candle(66, .9) + candle(104, .2) + candle(72, .7) + candle(92, 1.1) + candle(58, .5);

  var css = [
    '@import url("https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Nunito+Sans:wght@400;600;700;800&family=Pinyon+Script&display=swap");',
    '#lp{--night:#0B1230;--night2:#151B3F;--wine:#8C2F39;--wine-d:#6E222B;--gold:#E6C27A;--gold2:#F5DFA8;--cream:#FFF8EF;--ink:#2B2220;--muted:#C9BFD6;',
    'position:relative;width:100vw;margin-left:calc(50% - 50vw);background:var(--night);color:var(--cream);font-family:"Nunito Sans",system-ui,-apple-system,sans-serif;line-height:1.5;overflow:hidden;text-align:center;-webkit-font-smoothing:antialiased}',
    '#lp *{box-sizing:border-box;margin:0;padding:0}',
    '#lp a{text-decoration:none}',
    '#lp .wrap{max-width:560px;margin:0 auto;padding:0 20px}',
    /* Hero */
    '#lp .hero{position:relative;min-height:100vh;min-height:100svh;display:flex;flex-direction:column;justify-content:center;padding:28px 0 150px}',
    '#lp .hero-bg{position:absolute;inset:0;background-size:cover;background-position:center;opacity:.42;transform:scale(1.08);animation:lpZoom 22s ease-in-out infinite alternate}',
    '#lp .hero:after{content:"";position:absolute;inset:0;background:radial-gradient(120% 70% at 50% 100%,rgba(230,194,122,.28),transparent 60%),linear-gradient(180deg,rgba(11,18,48,.75) 0%,rgba(11,18,48,.35) 40%,rgba(11,18,48,.92) 100%);pointer-events:none}',
    '#lp canvas.spark{position:absolute;inset:0;width:100%;height:100%;z-index:1;pointer-events:none}',
    '#lp .hero .wrap{position:relative;z-index:2}',
    '#lp .logo{width:74px;height:auto;margin:0 auto 18px;display:block;filter:drop-shadow(0 4px 18px rgba(230,194,122,.35))}',
    '#lp .eyebrow{display:inline-block;font-size:12px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:var(--gold);border:1px solid rgba(230,194,122,.45);border-radius:999px;padding:7px 14px;background:rgba(11,18,48,.4);backdrop-filter:blur(4px)}',
    '#lp .script{font-family:"Pinyon Script",cursive;font-size:44px;line-height:1;color:var(--gold2);margin-top:22px;text-shadow:0 0 24px rgba(230,194,122,.5)}',
    '#lp h1{font-family:"Fraunces",Georgia,serif;font-weight:600;font-size:clamp(40px,11vw,62px);line-height:1.02;letter-spacing:-.01em;margin-top:2px;text-shadow:0 4px 30px rgba(0,0,0,.45)}',
    '#lp .sub{font-size:17px;color:#EDE6F2;max-width:400px;margin:16px auto 0}',
    /* Countdown */
    '#lp .cd{display:flex;justify-content:center;gap:10px;margin:26px 0 0}',
    '#lp .cd div{min-width:68px;padding:12px 6px 9px;border-radius:16px;background:linear-gradient(180deg,rgba(255,255,255,.12),rgba(255,255,255,.04));border:1px solid rgba(230,194,122,.35);box-shadow:inset 0 1px 0 rgba(255,255,255,.15),0 10px 30px rgba(0,0,0,.25)}',
    '#lp .cd b{display:block;font-family:"Fraunces",serif;font-size:30px;font-weight:600;line-height:1;color:var(--gold2);font-variant-numeric:tabular-nums}',
    '#lp .cd span{display:block;font-size:10px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-top:6px}',
    '#lp .cd-l{font-size:12px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--muted);margin-top:26px}',
    /* Buttons */
    '#lp .btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;font-weight:800;font-size:18px;letter-spacing:.01em;border-radius:999px;padding:18px 34px;transition:transform .15s ease,box-shadow .2s ease}',
    '#lp .btn:active{transform:scale(.97)}',
    '#lp .btn-gold{color:var(--night);background:linear-gradient(180deg,#F8E3AE,#E6C27A 55%,#D3A85A);box-shadow:0 10px 34px rgba(230,194,122,.45),inset 0 1px 0 rgba(255,255,255,.7);animation:lpPulse 2.6s ease-in-out infinite}',
    '#lp .btn-wine{color:var(--cream);background:linear-gradient(180deg,#9E3A45,var(--wine) 60%,var(--wine-d));box-shadow:0 8px 22px rgba(110,34,43,.45)}',
    '#lp .hero .btn{width:100%;max-width:340px;margin-top:26px;font-size:20px;padding:20px 30px}',
    '#lp .dl{font-size:14px;color:#EDE6F2;margin-top:14px}',
    '#lp .dl strong{color:var(--gold2)}',
    /* Candle row */
    '#lp .candles{position:absolute;left:0;right:0;bottom:0;z-index:2;display:flex;justify-content:center;align-items:flex-end;gap:14px;height:150px;pointer-events:none}',
    '#lp .candles.static{position:relative;height:140px;margin:6px 0 4px}',
    '#lp .cdl{position:relative;width:24px;height:calc(var(--h) + 34px);display:block}',
    '#lp .wax{position:absolute;bottom:0;left:0;width:24px;height:var(--h);border-radius:5px 5px 3px 3px;background:linear-gradient(90deg,#E9DCC8,#FFF8EF 45%,#E2D2BA)}',
    '#lp .wax:before{content:"";position:absolute;top:-3px;left:3px;width:9px;height:12px;border-radius:0 0 6px 6px;background:#FFF8EF}',
    '#lp .wick{position:absolute;left:11px;bottom:var(--h);width:2px;height:7px;background:#3B2C25;border-radius:1px}',
    '#lp .fl{position:absolute;left:5px;bottom:calc(var(--h) + 5px);width:14px;height:26px;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;background:radial-gradient(ellipse at 50% 80%,#FFFFFF 0%,#FFF1B8 25%,#FFC14D 55%,rgba(255,120,30,.85) 80%,transparent 100%);transform-origin:50% 100%;animation:lpFlick 1.6s ease-in-out infinite;animation-delay:var(--d);filter:blur(.3px)}',
    '#lp .glow{position:absolute;left:-28px;bottom:calc(var(--h) - 22px);width:80px;height:80px;border-radius:50%;background:radial-gradient(circle,rgba(255,200,90,.55),rgba(255,170,60,.15) 45%,transparent 70%);animation:lpGlow 2.4s ease-in-out infinite;animation-delay:var(--d)}',
    /* Sections */
    '#lp section.sec{position:relative;padding:64px 0}',
    '#lp .sec-b{background:linear-gradient(180deg,var(--night) 0%,var(--night2) 100%)}',
    '#lp .kicker{font-size:12px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;color:var(--gold)}',
    '#lp h2{font-family:"Fraunces",Georgia,serif;font-weight:600;font-size:32px;line-height:1.1;margin-top:8px}',
    '#lp .lead{color:var(--muted);margin-top:10px;font-size:16px}',
    '#lp .grid{display:grid;gap:18px;margin-top:30px}',
    '#lp .card{position:relative;background:var(--cream);color:var(--ink);border-radius:22px;overflow:hidden;box-shadow:0 18px 50px rgba(0,0,0,.35);text-align:left;transform:translateY(18px);transition:transform .7s ease}',
    '#lp .card.in{opacity:1;transform:none}',
    '#lp .card .ph{position:relative;aspect-ratio:4/5;background:#F6E7D6;overflow:hidden}',
    '#lp .card img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .6s ease}',
    '#lp .card .tag{position:absolute;top:14px;left:14px;font-size:11px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:var(--night);background:var(--gold);padding:6px 11px;border-radius:999px}',
    '#lp .card .meta{display:flex;align-items:baseline;justify-content:space-between;gap:12px;padding:16px 18px 4px}',
    '#lp .card h3{font-family:"Fraunces",serif;font-weight:600;font-size:22px;line-height:1.15}',
    '#lp .card .price{font-weight:800;font-size:19px;color:var(--wine);white-space:nowrap}',
    '#lp .card .btn{width:calc(100% - 36px);margin:12px 18px 18px;font-size:17px;padding:15px 20px}',
    '#lp .more{display:inline-block;margin-top:26px;color:var(--gold2);font-weight:700;border-bottom:1px solid rgba(245,223,168,.5);padding-bottom:2px}',
    /* Steps */
    '#lp .steps{display:grid;gap:14px;margin-top:30px;text-align:left}',
    '#lp .step{display:flex;gap:16px;align-items:flex-start;padding:18px;border-radius:18px;background:rgba(255,255,255,.05);border:1px solid rgba(230,194,122,.2)}',
    '#lp .step i{flex:0 0 40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-style:normal;font-family:"Fraunces",serif;font-weight:600;font-size:19px;color:var(--night);background:linear-gradient(180deg,#F8E3AE,#E6C27A)}',
    '#lp .step h4{font-size:17px;font-weight:800}',
    '#lp .step p{font-size:15px;color:var(--muted);margin-top:2px}',
    '#lp .trust{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin-top:22px}',
    '#lp .trust span{font-size:13px;font-weight:700;color:var(--gold2);padding:7px 12px;border-radius:999px;border:1px solid rgba(230,194,122,.3)}',
    /* Final */
    '#lp .final{padding:56px 0 130px;background:radial-gradient(90% 60% at 50% 30%,rgba(230,194,122,.18),transparent 70%),var(--night2)}',
    '#lp .final .btn{width:100%;max-width:340px;margin-top:22px}',
    '#lp .foot{margin-top:40px;font-size:13px;color:var(--muted)}',
    '#lp .foot a{color:var(--gold2)}',
    /* Sticky */
    '#lp .sticky{position:fixed;left:12px;right:12px;bottom:calc(12px + env(safe-area-inset-bottom, 0px));z-index:9999;display:flex;transform:translateY(140%);transition:transform .35s ease}',
    '#lp .sticky.on{transform:none}',
    '#lp .sticky .btn{width:100%;max-width:520px;margin:0 auto;padding:17px 24px;font-size:18px;animation:none;box-shadow:0 12px 34px rgba(0,0,0,.45),0 0 0 1px rgba(255,255,255,.2) inset}',
    /* Motion */
    '@keyframes lpFlick{0%,100%{transform:scale(1,1) rotate(-1deg)}25%{transform:scale(.94,1.06) rotate(2deg)}50%{transform:scale(1.04,.95) rotate(-2deg)}75%{transform:scale(.97,1.04) rotate(1deg)}}',
    '@keyframes lpGlow{0%,100%{opacity:.85;transform:scale(1)}50%{opacity:1;transform:scale(1.12)}}',
    '@keyframes lpPulse{0%,100%{box-shadow:0 10px 34px rgba(230,194,122,.45),inset 0 1px 0 rgba(255,255,255,.7)}50%{box-shadow:0 10px 50px rgba(230,194,122,.75),0 0 0 6px rgba(230,194,122,.15),inset 0 1px 0 rgba(255,255,255,.7)}}',
    '@keyframes lpZoom{from{transform:scale(1.08)}to{transform:scale(1.18)}}',
    '@media (min-width:720px){#lp .grid{grid-template-columns:repeat(3,1fr)}#lp .wrap.wide{max-width:1000px}#lp .steps{grid-template-columns:repeat(3,1fr)}#lp .step{flex-direction:column}}',
    '@media (prefers-reduced-motion:reduce){#lp *{animation:none!important;transition:none!important}#lp .card{transform:none}}'
  ].join('');

  var dlHtml = beforeDeadline
    ? 'Pide antes del <strong>' + PH.deadlineText + '</strong> y tenlas listas para ' + PH.name + '.'
    : 'Escríbenos hoy y te confirmamos disponibilidad para ' + PH.name + '.';

  ROOT.innerHTML = '<style>' + css + '</style>' +
    '<header class="hero">' +
      '<div class="hero-bg" style="background-image:url(\'' + img(PH.hero) + '\')"></div>' +
      '<canvas class="spark" aria-hidden="true"></canvas>' +
      '<div class="wrap">' +
        '<img class="logo" src="' + img('logo-crema.png') + '" alt="Cielo de Velas" width="600" height="573">' +
        '<span class="eyebrow">' + esc(PH.eyebrow) + '</span>' +
        '<p class="script">Ilumina tu</p>' +
        '<h1>' + esc(PH.title) + '</h1>' +
        '<p class="sub">' + esc(PH.sub) + '</p>' +
        '<p class="cd-l">Faltan</p>' +
        '<div class="cd" role="timer" aria-live="off"><div><b data-k="d">0</b><span>Días</span></div><div><b data-k="h">0</b><span>Horas</span></div><div><b data-k="m">0</b><span>Min</span></div><div><b data-k="s">0</b><span>Seg</span></div></div>' +
        '<a class="btn btn-gold" href="' + GENERAL + '" target="_blank" rel="noopener" data-fb="general">' + ICON_WA + 'Pedir aquí</a>' +
        '<p class="dl">' + dlHtml + '</p>' +
      '</div>' +
      '<div class="candles" aria-hidden="true">' + CANDLES + '</div>' +
    '</header>' +
    '<section class="sec sec-b"><div class="wrap wide">' +
      '<p class="kicker">Hechas a mano en Medellín</p>' +
      '<h2>Las favoritas de ' + esc(PH.name) + '</h2>' +
      '<p class="lead">Elige la tuya y pídela en un toque por WhatsApp.</p>' +
      '<div class="grid" id="lp-grid"></div>' +
      '<a class="more" href="' + CATALOG + '" target="_blank" rel="noopener">Ver todas las velas</a>' +
    '</div></section>' +
    '<section class="sec"><div class="wrap wide">' +
      '<p class="kicker">Así de fácil</p>' +
      '<h2>Tu pedido en 3 pasos</h2>' +
      '<div class="steps">' +
        '<div class="step"><i>1</i><div><h4>Elige tu vela</h4><p>Toca “Pedir aquí” o el botón de la vela que te enamoró.</p></div></div>' +
        '<div class="step"><i>2</i><div><h4>Escríbenos por WhatsApp</h4><p>Te confirmamos color, cantidad y fecha de entrega.</p></div></div>' +
        '<div class="step"><i>3</i><div><h4>Recíbela o recógela</h4><p>Lista en aproximadamente 7 días. Domicilio según tu zona.</p></div></div>' +
      '</div>' +
      '<div class="trust"><span>Hecho a mano</span><span>Efectivo o Bancolombia</span><span>Recogida o domicilio</span></div>' +
    '</div></section>' +
    '<section class="final"><div class="wrap">' +
      '<div class="candles static" aria-hidden="true">' + candle(60, .3) + candle(92, 0) + candle(70, .8) + '</div>' +
      '<h2>Que este año tu casa brille diferente</h2>' +
      '<p class="lead">Cada vela se hace a mano, por eso los cupos de temporada son limitados.</p>' +
      '<a class="btn btn-gold" href="' + GENERAL + '" target="_blank" rel="noopener" data-fb="general">' + ICON_WA + 'Pedir aquí</a>' +
      '<p class="foot">Cielo de Velas · Medellín · <a href="' + IG + '" target="_blank" rel="noopener">@cielo.develas</a></p>' +
    '</div></section>' +
    '<div class="sticky"><a class="btn btn-gold" href="' + GENERAL + '" target="_blank" rel="noopener" data-fb="general">' + ICON_WA + 'Pedir por WhatsApp</a></div>';

  // Productos destacados
  function renderGrid() {
    var g = ROOT.querySelector('#lp-grid');
    g.innerHTML = PH.refs.map(function (r, idx) {
      var p = PRODUCTS[r]; if (!p || !(p.p > 0)) return '';
      return '<article class="card">' +
        '<div class="ph">' + (idx === 0 ? '<span class="tag">Más pedida</span>' : '') +
        '<img loading="lazy" decoding="async" src="' + esc(imgUrl(p.f)) + '" alt="Vela artesanal ' + esc(p.n) + '" width="640" height="800"></div>' +
        '<div class="meta"><h3>' + esc(p.n) + '</h3><span class="price">' + money(p.p) + '</span></div>' +
        '<a class="btn btn-wine" href="' + orderLink(p) + '" target="_blank" rel="noopener" data-fb="pedido" data-n="' + esc(p.n) + '" data-p="' + p.p + '">' + ICON_WA + 'Pedir esta</a>' +
      '</article>';
    }).join('');
    reveal();
  }
  renderGrid();

  // Precios y fotos en vivo desde la hoja
  if (window.fetch) {
    var ctrl = window.AbortController ? new AbortController() : null;
    var t = setTimeout(function () { if (ctrl) ctrl.abort(); }, 8000);
    fetch(FEED, { credentials: 'omit', signal: ctrl ? ctrl.signal : undefined })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        clearTimeout(t);
        var changed = false;
        (d && d.items || []).forEach(function (i) {
          var r = Number(i.r);
          if (PRODUCTS[r] && Number(i.p) > 0) { PRODUCTS[r] = { n: String(i.n), p: Number(i.p), f: i.f || PRODUCTS[r].f }; changed = true; }
        });
        if (changed) renderGrid();
      })
      .catch(function () { clearTimeout(t); });
  }

  // Cuenta regresiva
  var cells = {};
  ROOT.querySelectorAll('.cd b').forEach(function (b) { cells[b.getAttribute('data-k')] = b; });
  function pad(n) { return n < 10 ? '0' + n : String(n); }
  function tick() {
    var ms = Math.max(0, PH.target - new Date());
    var s = Math.floor(ms / 1000);
    cells.d.textContent = Math.floor(s / 86400);
    cells.h.textContent = pad(Math.floor(s % 86400 / 3600));
    cells.m.textContent = pad(Math.floor(s % 3600 / 60));
    cells.s.textContent = pad(s % 60);
  }
  tick(); setInterval(tick, 1000);

  // Entrada de tarjetas al hacer scroll
  function reveal() {
    var cards = ROOT.querySelectorAll('.card:not(.in)');
    if (!('IntersectionObserver' in window)) { cards.forEach(function (c) { c.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e, k) { if (e.isIntersecting) { setTimeout(function () { e.target.classList.add('in'); }, k * 120); io.unobserve(e.target); } });
    }, { threshold: .15 });
    cards.forEach(function (c) { io.observe(c); });
  }

  // Botón fijo: aparece cuando el botón principal sale de pantalla
  var sticky = ROOT.querySelector('.sticky');
  var heroBtn = ROOT.querySelector('.hero .btn');
  var finalBtn = ROOT.querySelector('.final .btn');
  if ('IntersectionObserver' in window) {
    var vis = { hero: true, final: false };
    var so = new IntersectionObserver(function (es) {
      es.forEach(function (e) { vis[e.target === heroBtn ? 'hero' : 'final'] = e.isIntersecting; });
      sticky.classList.toggle('on', !vis.hero && !vis.final);
    });
    so.observe(heroBtn); so.observe(finalBtn);
  } else { sticky.classList.add('on'); }

  // Chispas doradas
  var cv = ROOT.querySelector('canvas.spark');
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (cv && cv.getContext && !reduce) {
    var ctx = cv.getContext('2d'), W, H, dpr = Math.min(window.devicePixelRatio || 1, 2), parts = [];
    function size() { W = cv.offsetWidth; H = cv.offsetHeight; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
    function mk(y) { return { x: Math.random() * W, y: y == null ? Math.random() * H : y, r: Math.random() * 1.8 + .4, v: Math.random() * .35 + .12, w: Math.random() * Math.PI * 2, a: Math.random() * .6 + .3 }; }
    size(); for (var k = 0; k < 55; k++) parts.push(mk());
    window.addEventListener('resize', size);
    var heroEl = ROOT.querySelector('.hero'), running = true;
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { running = es[0].isIntersecting; if (running) requestAnimationFrame(loop); }).observe(heroEl);
    function loop() {
      if (!running) return;
      ctx.clearRect(0, 0, W, H);
      parts.forEach(function (p, idx) {
        p.y -= p.v; p.w += .02; p.x += Math.sin(p.w) * .25;
        if (p.y < -10) parts[idx] = mk(H + 10);
        var tw = p.a * (.6 + .4 * Math.sin(p.w * 3));
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283);
        ctx.fillStyle = 'rgba(245,215,150,' + tw + ')';
        ctx.shadowColor = 'rgba(255,200,100,.9)'; ctx.shadowBlur = 8;
        ctx.fill();
      });
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  // Meta Pixel (el código base vive en el embed oculto de Carrd)
  function fb() { if (typeof window.fbq === 'function') window.fbq.apply(null, arguments); }
  fb('trackCustom', 'LandingView', { landing: 'velitas_' + VARIANT, temporada: PH.id });
  ROOT.addEventListener('click', function (e) {
    var a = e.target.closest('a[href*="wa.me/"]'); if (!a) return;
    if (a.getAttribute('data-fb') === 'pedido') fb('track', 'Contact', { content_name: a.getAttribute('data-n'), value: Number(a.getAttribute('data-p')), currency: 'COP', content_category: 'landing_' + VARIANT });
    else fb('track', 'Contact', { content_category: 'landing_' + VARIANT });
  });
})();
