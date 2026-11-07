/* Cielo de Velas · Página "Sobre nosotros" (sección Carrd #nosotros).
   Embed: <div id="nos"></div><script src="https://cdn.jsdelivr.net/gh/jsf2907/cielodevelas-assets@COMMIT/site/nosotros.js"></script>
   Contenedor propio (#nos) y CSS con alcance #nos, para no chocar con #cdv ni con las landings. */
(function () {
  var ROOT = document.getElementById('nos');
  if (!ROOT || ROOT.getAttribute('data-ready')) return;
  ROOT.setAttribute('data-ready', '1');

  var IMG = 'https://cdn.jsdelivr.net/gh/jsf2907/cielodevelas-assets@main/img/';
  var WA = 'https://wa.me/573225911307?text=' + encodeURIComponent('Hola Cielo de Velas, quiero hacer un pedido.');
  var FOTOS = [
    ['candle-christmas.jpg', 'Velas navideñas talladas con renos'],
    ['aura.jpg', 'Velas en espiral color crema y durazno'],
    ['angel-dormido.jpg', 'Vela de ángel dormido'],
    ['circulo-de-rosas-g.jpg', 'Vela esfera de rosas'],
    ['casita-navidena.jpg', 'Vela árbol de Navidad con casitas'],
    ['cascanueces.jpg', 'Velas cascanueces verde y crema']
  ];
  var ICON_WA = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.4A8.4 8.4 0 1 1 21 11.5z"/></svg>';

  var css = [
    '@import url("https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Nunito+Sans:wght@400;600;700&family=Pinyon+Script&display=swap");',
    '#nos{--ink:#2B2220;--muted:#6B5A52;--cream:#FFF8EF;--sand:#F6E7D6;--wine:#8C2F39;--wine-d:#6E222B;--gold:#E6C27A;font-family:"Nunito Sans",system-ui,-apple-system,sans-serif;color:var(--ink);background:var(--cream);line-height:1.55;-webkit-font-smoothing:antialiased;text-align:left;width:100%;min-height:100vh}',
    '#nos *{box-sizing:border-box}',
    '#nos .top{position:sticky;top:0;z-index:5;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 20px;background:rgba(255,248,239,.95);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border-bottom:1px solid #EFE0CF}',
    '#nos .top img{width:58px;height:auto;display:block}',
    '#nos .back{display:inline-flex;align-items:center;gap:6px;min-height:44px;padding:0 4px;font-weight:700;font-size:15px;color:var(--wine);text-decoration:none}',
    '#nos .wrap{max-width:980px;margin:0 auto;padding:0 20px}',
    '#nos .hero{text-align:center;padding:56px 0 8px}',
    '#nos .script{font-family:"Pinyon Script",cursive;font-size:40px;line-height:1;color:var(--wine);display:block}',
    '#nos h1{font-family:"Fraunces",Georgia,serif;font-weight:600;font-size:clamp(34px,6vw,54px);line-height:1.08;margin:6px 0 12px;letter-spacing:-.01em}',
    '#nos .hero p{color:var(--muted);font-size:17px;max-width:440px;margin:0 auto}',
    '#nos .lead{display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:24px;margin:28px 0 8px;background:var(--sand)}',
    '#nos .story{max-width:720px;margin:0 auto;padding:28px 0 8px}',
    '#nos .story p,#nos .close p{font-size:18px;line-height:1.75;margin:0 0 18px;color:var(--ink);max-width:62ch}',
    '#nos .story img{width:100%;height:auto;aspect-ratio:4/5;object-fit:cover;object-position:35% 50%;border-radius:24px;display:block;background:var(--sand)}',
    '#nos .homenaje{text-align:center;padding:40px 0;margin:24px auto;max-width:720px;border-top:1px solid #EAD8C4;border-bottom:1px solid #EAD8C4}',
    '#nos .homenaje p{font-family:"Fraunces",Georgia,serif;font-style:italic;font-size:clamp(21px,2.6vw,27px);line-height:1.5;color:var(--wine);max-width:720px;margin:0 auto}',
    '#nos .homenaje .star{display:block;color:var(--gold);font-size:22px;margin-bottom:12px}',
    '#nos .close{max-width:720px;margin:0 auto;padding:8px 0 48px}#nos .close p{margin:0}',
    '#nos .galt{text-align:center;font-family:"Fraunces",Georgia,serif;font-weight:600;font-size:clamp(24px,3vw,30px);margin:56px 0 0}',
    '#nos .gal{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;padding:32px 0}',
    '#nos .gal img{width:100%;aspect-ratio:4/5;object-fit:cover;border-radius:18px;display:block;background:var(--sand)}',
    '#nos .cta{text-align:center;padding:32px 0 72px;max-width:720px;margin:0 auto;border-top:1px solid #EAD8C4}',
    '#nos .cta p{font-family:"Fraunces",Georgia,serif;font-style:italic;color:var(--wine);font-size:20px;line-height:1.45;margin:0 auto 20px;max-width:440px}',
    '#nos .btns{display:flex;flex-wrap:wrap;justify-content:center;gap:12px}',
    '#nos .btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:48px;padding:13px 24px;border-radius:12px;font-weight:700;font-size:16px;text-decoration:none;border:1.5px solid transparent;cursor:pointer}',
    '#nos .btn-wine{background:var(--wine);color:#fff}#nos .btn-wine:hover{background:var(--wine-d)}',
    '#nos .btn-out{border-color:var(--ink);color:var(--ink)}',
    '#nos a:focus-visible{outline:3px solid var(--gold);outline-offset:2px}',
    '@media (max-width:860px){#nos .lead{aspect-ratio:4/3;border-radius:18px;margin-top:20px}#nos .story{grid-template-columns:1fr;gap:24px;padding-top:28px}#nos .story img{aspect-ratio:4/3;object-position:center;border-radius:18px}#nos .story p,#nos .close p{font-size:17px}#nos .homenaje{padding:28px 0}#nos .close{text-align:left}#nos .hero{padding-top:36px}#nos .gal{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;padding:24px 0}#nos .gal img:first-child,#nos .gal img:last-child{grid-column:span 2;aspect-ratio:16/11}#nos .gal img{border-radius:14px}#nos .btns{flex-direction:column;align-items:stretch}#nos .cta{padding-bottom:calc(48px + env(safe-area-inset-bottom,0px))}}'
  ].join('');

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  ROOT.innerHTML =
    '<div class="top"><a href="#" data-go="inicio" aria-label="Cielo de Velas, inicio"><img src="' + IMG + 'logo.png" alt="Logo Cielo de Velas" width="58" height="55"></a>' +
      '<a class="back" href="#" data-go="inicio">← Volver al inicio</a></div>' +
    '<div class="wrap">' +
      '<div class="hero"><span class="script">Sobre nosotros</span><h1>Nuestra Historia</h1></div>' +
      '<div class="story"><div>' +
        '<p>Cielo de Velas nació en Medellín en 2025, de un amor especial por las velas y la curiosidad de crear una con mis propias manos. Lo que comenzó como un pasatiempo se convirtió en una pasión por la artesanía, la creatividad y los pequeños detalles.</p>' +
        '<p>Con los materiales que sobraron de aquella primera vela, elaboré mis primeras creaciones para vender: una caja de seis velitas de deseos para celebrar el tradicional Día de las Velitas en Colombia.</p>' +
      '</div></div>' +
      '<div class="homenaje"><span class="star" aria-hidden="true">✦</span><p>Su nombre está inspirado en alguien muy especial que hoy está en el cielo, como un homenaje al amor, y a los recuerdos.</p></div>' +
      '<div class="close"><p>Hoy creamos velas artesanales con materias primas de alta calidad, fragancias cuidadosamente seleccionadas y una atención especial a cada detalle, buscando que cada pieza sea tan única como la historia que hay detrás de ella.</p></div>' +

      '<div class="cta"><p>“Por cada vela que enciendes, nace una luz en el cielo.”</p>' +
        '<div class="btns"><a class="btn btn-wine" href="#" data-go="catalogo">Ver catálogo</a>' +
        '<a class="btn btn-out" href="' + WA + '" target="_blank" rel="noopener">' + ICON_WA + 'Escríbenos por WhatsApp</a></div></div>' +
    '</div>';

  // Volver a la página principal (Carrd: "#" = sección de inicio) y, si se pide, bajar a una sección de #cdv.
  // Captura en window: así nos adelantamos al manejador de enlaces "#" de Carrd.
  window.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('#nos [data-go]');
    if (!a) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    var go = a.getAttribute('data-go');
    if (location.hash) location.hash = '';
    else window.scrollTo(0, 0);
    if (go === 'inicio') { setTimeout(function () { window.scrollTo(0, 0); }, 60); return; }
    // Carrd devuelve la página arriba ~0,1 s después de cambiar de sección: esperamos y repetimos.
    function jump() {
      var t = document.getElementById(go), head = document.querySelector('#cdv header.nav');
      if (t && t.getBoundingClientRect().height) window.scrollTo(0, t.getBoundingClientRect().top + window.pageYOffset - (head ? head.offsetHeight + 8 : 0));
    }
    [400, 1000].forEach(function (ms) { setTimeout(jump, ms); });
  }, true);

  if (typeof window.fbq === 'function') { try { window.fbq('trackCustom', 'NosotrosView'); } catch (err) {} }
})();
