/* Cielo de Velas: sitio de catálogo para Carrd. Datos de precios: hoja "Cielo_de_Velas_-_Ventas_y_Gastos", pestaña Catálogo. */
(function () {
  var ROOT = document.getElementById('cdv');
  if (!ROOT) return;

  var BASE = '__BASE__';
  var IMG = BASE + 'img/';
  var WA = '573225911307';
  var IG = 'https://www.instagram.com/cielo.develas';
  var FB = 'https://www.facebook.com/profile.php?id=61571799055866';
  var EMAIL = 'cielodevelas@gmail.com';
  var G_REVIEW = 'https://g.page/r/CZSiTK5KIj11EAI/review';
  var G_PROFILE = 'https://g.page/r/CZSiTK5KIj11EAI';
  // Reseñas reales de Google (elegidas por Jenson, 4 nov 2026). Nombre, insignia, texto, nota.
  var REVIEWS = [
    ['Estefania C.', '', '¡Me encantaron las velas! Son hermosas y su fragancia es increíble. Ya van 15 días desde que abrí la mía y la habitación todavía huele delicioso. Tienen la mejor variedad y los precios son excelentes. Se nota que están hechas con amor 🧡', 'Traducida del inglés'],
    ['Juan C.', 'Local Guide', 'Cielo de Velas hizo de nuestra boda algo simplemente mágico. Las velas eran elegantes y meticulosamente elaboradas, y crearon una luz cálida y romántica que transformó por completo el ambiente.', 'Traducida'],
    ['Claudia C.', 'Local Guide', 'Velas hermosas, originales, creativas y para todos los gustos. ¡Gracias!', 'Traducida del inglés']
  ];
  var G_RATING = '5,0', G_COUNT = 449;
  // Datos en vivo: pestaña "Web" de la hoja Cielo_de_Velas_-_Ventas_y_Gastos (Apps Script, archivo Web.gs).
  var FEED = '__FEED__';
  // Copia de respaldo por si la hoja no responde.
  var FALLBACK = __PRODUCTS__;
  var CACHE_KEY = 'cdv_catalogo_v1';

  var COLS = [
    { id: 'navidad', name: 'Navidad' },
    { id: 'arte', name: 'Arte y diseño' },
    { id: 'celebraciones', name: 'Celebraciones' },
    { id: 'creencias', name: 'Creencias' },
    { id: 'animalitos', name: 'Animalitos' },
    { id: 'flores', name: 'Flores' },
    { id: 'osos', name: 'Osos cariñosos' },
    { id: 'otros', name: 'Otros' },
    { id: 'halloween', name: 'Halloween' },
    { id: 'easter', name: 'Happy Easter' }
  ];
  var today = new Date().toISOString().slice(0, 10);
  COLS = COLS.filter(function (c) { return !c.until || today < c.until; });
  var activeIds = COLS.map(function (c) { return c.id; });
  var COLMAP = {};
  COLS.forEach(function (c) { COLMAP[norm(c.name)] = c.id; });

  function imgUrl(f) {
    f = String(f || '').trim();
    if (!f) return IMG + 'logo.png';
    var m = f.match(/\/d\/([\w-]{20,})/) || f.match(/[?&]id=([\w-]{20,})/);
    if (m) return 'https://lh3.googleusercontent.com/d/' + m[1] + '=w800';
    if (/^https?:\/\//i.test(f)) return f;
    return IMG + f.replace(/\.(jpe?g|png|webp)$/i, '') + '.jpg';
  }
  // Colecciones nuevas en la hoja (ej. "Dipping"): se agregan solas después de las conocidas.
  function addNewCols(items) {
    (items || []).forEach(function (i) {
      var name = String(i.c || '').trim(), key = norm(name);
      if (!name || COLMAP[key]) return;
      var id = 'c-' + key.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      COLS.push({ id: id, name: name });
      COLMAP[key] = id;
      activeIds.push(id);
    });
  }
  function normalize(items) {
    addNewCols(items);
    return (items || []).map(function (i) {
      return { n: String(i.n), r: Number(i.r) || 0, cn: String(i.c || ''), c: COLMAP[norm(String(i.c || ''))] || 'otros', p: Number(i.p), img: imgUrl(i.f), top: !!i.t, feat: !!i.d, s: (i.s || []).map(String),
        x: String(i.x || ''), a: Number(i.a) || 0, w: Number(i.w) || 0, g: Number(i.g) || 0, fs: (i.fs || []).map(String).filter(String), k: (i.k || []).map(String) };
    }).filter(function (p) { return p.n && p.p > 0 && activeIds.indexOf(p.c) > -1; });
  }
  var PRODUCTS = normalize(FALLBACK);
  var SEASON = null; // { actual, siguiente } desde la pestaña Temporadas (Web.gs)
  try {
    var cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
    if (cached && cached.items && cached.items.length) PRODUCTS = normalize(cached.items);
    if (cached && cached.temporada) SEASON = cached.temporada;
  } catch (e) {}

  // Temporadas: promocionan, nunca ocultan. Una vela entra en la temporada por su colección, su etiqueta o su Ref.
  var MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  var DEFAULT_SEASON = { nombre: 'Entre temporadas', entre: true, titular: 'Velas hechas a mano en Medellín', subtitulo: 'Diseños únicos para tu hogar y para regalar.', coleccion: '', refs: [] };
  function slug(s) { return norm(String(s || '')).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
  // Fotos claras (fondo blanco): portada luminosa. Valor = versión vertical para celular.
  var BRIGHT = { 'temporada-velitas-navidad-laura': 'temporada-velitas-navidad-laura-movil' };
  function brightMobile(t) { var k = String(t.imagen || '').trim().replace(/\.(jpe?g|png|webp)$/i, ''); return BRIGHT[k] || ''; }
  function seasonImg(t) { return t.imagen ? imgUrl(t.imagen) : IMG + 'temporada-' + slug(t.nombre) + '.jpg'; }
  function daysTo(f) {
    if (!f) return null;
    var p = String(f).split('-').map(Number), now = new Date();
    var a = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()), b = Date.UTC(p[0], p[1] - 1, p[2]);
    return Math.round((b - a) / 86400000);
  }
  function dateTxt(f) { var p = String(f || '').split('-').map(Number); return p.length === 3 ? p[2] + ' de ' + MESES[p[1] - 1] : ''; }
  function inSeason(p, t) {
    if (!t) return false;
    if (t.coleccion && norm(p.cn) === norm(t.coleccion)) return true;
    if ((t.refs || []).indexOf(p.r) > -1) return true;
    var n = norm(t.nombre || '');
    return p.s.some(function (x) { return norm(x) === n; });
  }
  function current() { var a = SEASON && SEASON.actual; return a && a.nombre ? a : DEFAULT_SEASON; }
  function nextSeason() { var n = SEASON && SEASON.siguiente; return n && n.nombre && n.fecha ? n : null; }
  function seasonList(t) { return PRODUCTS.filter(function (p) { return inSeason(p, t); }); }
  function shortName(t) { return t.entre ? (t.coleccion || 'Destacadas') : t.nombre; }

  var COLORS = [
    ['Cera natural', '#FFFDF8'], ['Azul cielo', '#A9D6F2'], ['Rosa', '#F2C6DE'],
    ['Verde', '#3F8F5A'], ['Lavanda', '#C9C1EC'], ['Morado', '#6D5BD0'],
    ['Beige', '#D8C3A5'], ['Amarillo', '#FFD42A'], ['Naranja', '#F28C38']
  ];

  function money(n) { return '$' + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function waLink(text) { return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(text); }
  function orderLink(p) {
    return waLink('Hola Cielo de Velas, quiero pedir la vela ' + p.n + ' (' + money(p.p) + '). Color: ');
  }
  var GENERAL = waLink('Hola Cielo de Velas, quiero hacer un pedido.');
  var GIFTS = waLink('Hola Cielo de Velas, quiero cotizar regalos. Cantidad aproximada: ');
  var EVENTS = waLink('Hola Cielo de Velas, quiero cotizar velas para un evento. Tipo de evento y fecha: ');

  var ICON_WA = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.4A8.4 8.4 0 1 1 21 11.5z"/></svg>';
  var ICON_HOME = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg>';
  var ICON_GRID = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>';
  var ICON_GIFT = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v8h14v-8M12 8v12M12 8S10.5 3 8 4.5 9.5 8 12 8zm0 0s1.5-5 4-3.5S14.5 8 12 8z"/></svg>';
  var ICON_EVENT = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4M12 13.5l1 2 2.2.3-1.6 1.5.4 2.2-2-1-2 1 .4-2.2-1.6-1.5 2.2-.3z"/></svg>';
  var ICON_MAIL = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>';
  var ICON_PIN = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>';
  var ICON_FB = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3h-2.5A3.5 3.5 0 0 0 9 6.5V10H6.5v3.5H9V21h3.5v-7.5H15l.5-3.5h-3V7a1 1 0 0 1 1-1H15z"/></svg>';
  var ICON_STAR = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/></svg>';
  var ICON_IG = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor"/></svg>';
  var ICON_CART = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2.5 3.5h2.6l2.3 11.2a1.6 1.6 0 0 0 1.6 1.3h8.6a1.6 1.6 0 0 0 1.6-1.2l1.6-7.3H6.2"/></svg>';
  var ICON_SEARCH = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>';

  var css = [
    '@import url("https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Nunito+Sans:wght@400;600;700&family=Pinyon+Script&display=swap");',
    '#cdv{--ink:#2B2220;--muted:#6B5A52;--cream:#FFF8EF;--sand:#F6E7D6;--wine:#8C2F39;--wine-d:#6E222B;--gold:#E6C27A;--pine:#2F4A3A;font-family:"Nunito Sans",system-ui,-apple-system,sans-serif;color:var(--ink);background:var(--cream);line-height:1.55;-webkit-font-smoothing:antialiased;text-align:left;width:100%}',
    '#cdv *,#cdv *::before,#cdv *::after{box-sizing:border-box}',
    '#cdv img{display:block;max-width:100%}',
    '#cdv a{color:inherit}',
    '#cdv h1,#cdv h2,#cdv h3{font-family:"Fraunces",Georgia,serif;font-weight:600;margin:0;line-height:1.08;letter-spacing:-.01em}',
    '#cdv p{margin:0}',
    '#cdv .wrap{max-width:1240px;margin:0 auto;padding:0 20px}',
    '#cdv .script{font-family:"Pinyon Script",cursive;font-weight:400;line-height:1.1}',
    '#cdv .btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:48px;padding:13px 24px;border-radius:12px;font-weight:700;font-size:16px;text-decoration:none;border:1.5px solid transparent;cursor:pointer;transition:transform .15s ease,background .15s ease}',
    '#cdv .btn:hover{transform:translateY(-1px)}',
    '#cdv .btn:focus-visible,#cdv button:focus-visible,#cdv input:focus-visible{outline:3px solid var(--gold);outline-offset:2px}',
    '#cdv .btn-wine{background:var(--wine);color:#fff}#cdv .btn-wine:hover{background:var(--wine-d)}',
    '#cdv .btn-gold{background:var(--gold);color:var(--ink)}',
    '#cdv .btn-dark{background:var(--ink);color:var(--cream)}',
    '#cdv .btn-ghost{border-color:currentColor;color:var(--cream);background:transparent}',
    '#cdv .topbar{background:var(--wine);color:var(--cream);text-align:center;font-size:14px;letter-spacing:.03em;padding:9px 16px}',
    '#cdv header.nav{position:sticky;top:0;z-index:20;background:rgba(255,248,239,.94);backdrop-filter:saturate(1.2) blur(8px);-webkit-backdrop-filter:blur(8px);border-bottom:1px solid #EFE0CF}',
    '#cdv .nav-in{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:10px 20px;max-width:1240px;margin:0 auto}',
    '#cdv .brand{display:flex;align-items:center;gap:10px;text-decoration:none}',
    '#cdv .brand img{width:58px;height:auto}',
    '#cdv .brand span{font-family:"Pinyon Script",cursive;font-size:32px;line-height:1}',
    '#cdv .links{display:flex;gap:26px;font-weight:600;font-size:15px}',
    '#cdv .links a{text-decoration:none;padding:10px 0}#cdv .links a:hover{color:var(--wine)}',
    '#cdv .hero{padding:16px 20px 0}',
    '#cdv .hero-card{position:relative;max-width:1240px;margin:0 auto;border-radius:28px;overflow:hidden;min-height:600px;display:flex;align-items:flex-end;background:#5A3A2E}',
    '#cdv .hero-card img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 70%}',
    '#cdv .hero-card::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(43,26,20,.86) 0%,rgba(43,26,20,.62) 45%,rgba(43,26,20,.08) 80%)}',
    '#cdv .hero-txt{position:relative;z-index:1;max-width:640px;padding:56px;color:var(--cream);display:flex;flex-direction:column;gap:18px}',
    '#cdv .hero-txt .script{font-size:42px;color:var(--gold)}',
    '#cdv .hero-txt h1{font-size:clamp(42px,6vw,70px)}',
    '#cdv .hero-txt p{font-size:19px;color:#F4E6DA;max-width:520px}',
    '#cdv .row{display:flex;flex-wrap:wrap;gap:12px}',
    '#cdv .nextbar{max-width:1240px;margin:16px auto 0;padding:0 20px}',
    '#cdv .nextbar a{display:flex;align-items:center;justify-content:space-between;gap:16px;background:var(--sand);border-radius:18px;padding:18px 26px;text-decoration:none;font-weight:600;font-size:17px}',
    '#cdv .nextbar b{color:var(--wine);font-weight:700;white-space:nowrap}',
    '#cdv .nextbar:empty{display:none}',
    '@media (max-width:860px){#cdv .hero-card img{object-position:78% 60%}#cdv .nextbar a{flex-direction:column;align-items:flex-start;gap:4px;padding:14px 18px;font-size:15px}}',
    '#cdv .tab.season{border-color:var(--wine);color:var(--wine)}#cdv .tab.season[aria-pressed="true"]{background:var(--wine);border-color:var(--wine);color:#fff}',
    '#cdv .chips{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;padding:32px 20px}',
    '#cdv .chip{background:var(--sand);color:#5A3A2E;padding:10px 18px;border-radius:999px;font-size:15px;font-weight:700}',
    '#cdv section.block{padding:64px 0}',
    '#cdv .head{display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:16px;margin-bottom:28px}',
    '#cdv .head h2{font-size:clamp(32px,4vw,46px)}',
    '#cdv .head .script{font-size:36px;color:var(--wine);display:block;margin-bottom:4px}',
    '#cdv .sub{color:var(--muted);font-size:17px;max-width:620px;margin-top:8px}',
    '#cdv .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:22px}',
    '#cdv .card{display:flex;flex-direction:column;gap:10px}',
    '#cdv .ph{position:relative;border-radius:20px;overflow:hidden;background:var(--sand);aspect-ratio:4/5}',
    '#cdv .ph img{width:100%;height:100%;object-fit:cover;transition:transform .4s ease}',
    '#cdv .card:hover .ph img{transform:scale(1.04)}',
    '#cdv .tag{position:absolute;top:12px;left:12px;background:var(--wine);color:var(--cream);font-size:12px;font-weight:700;padding:6px 11px;border-radius:999px}',
    '#cdv .meta{display:flex;flex-direction:column;align-items:flex-start;gap:6px;color:inherit;text-decoration:none}',
    '#cdv .meta h3{font-size:21px;line-height:1.2;min-height:2.4em;margin:0;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}',
    '#cdv .meta .price{font-size:16px;letter-spacing:.01em}',
    '#cdv .price{font-weight:700;color:var(--wine);white-space:nowrap}',
    '#cdv .card .btn{min-height:44px;padding:11px 14px;font-size:15px;width:100%}',
    '#cdv .tools{display:flex;flex-wrap:wrap;gap:12px;align-items:center;justify-content:space-between;margin-bottom:26px}',
    '#cdv .tabs{display:flex;flex-wrap:wrap;gap:8px}',
    '#cdv .tab{min-height:44px;padding:9px 16px;border-radius:999px;border:1.5px solid #D9C4B1;background:transparent;font:inherit;font-weight:700;font-size:15px;color:var(--ink);cursor:pointer}',
    '#cdv .tab[aria-pressed="true"]{background:var(--ink);border-color:var(--ink);color:var(--cream)}',
    '#cdv .search{position:relative;flex:0 1 280px}',
    '#cdv .search input{width:100%;min-height:44px;padding:10px 14px 10px 40px;border:1.5px solid #D9C4B1;border-radius:12px;font:inherit;font-size:16px;background:#fff;color:var(--ink)}',
    '#cdv .search svg{position:absolute;left:13px;top:50%;transform:translateY(-50%);color:var(--muted)}',
    '#cdv .count{color:var(--muted);font-size:15px;margin-bottom:16px}',
    '#cdv .empty{padding:40px;text-align:center;color:var(--muted);background:var(--sand);border-radius:20px}',
    '#cdv .gifts{background:linear-gradient(135deg,#9C4A36 0%,#7E3A2C 100%);color:var(--cream)}',
    '#cdv .split{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:48px;align-items:center}',
    '#cdv .split img{width:100%;border-radius:24px;aspect-ratio:1/1;object-fit:cover}',
    '#cdv .gifts .script{color:var(--gold);font-size:38px}',
    '#cdv .gifts h2,#cdv .events h2{font-size:clamp(32px,4vw,46px);margin:6px 0 14px}',
    '#cdv .gifts p{color:#F6E2D3;font-size:17px}',
    '#cdv ul.ticks{list-style:none;padding:0;margin:18px 0 26px;display:flex;flex-direction:column;gap:10px}',
    '#cdv ul.ticks li{display:flex;gap:10px;align-items:flex-start;font-size:16px}',
    '#cdv ul.ticks li::before{content:"";flex:0 0 18px;height:18px;margin-top:3px;border-radius:50%;background:var(--gold)}',
    '#cdv .events{background:var(--sand)}',
    '#cdv .events .script{color:var(--wine);font-size:38px}',
    '#cdv .events p{color:#5A4A43;font-size:17px}',
    '#cdv .events ul.ticks li::before{background:var(--wine)}',
    '#cdv .mosaic{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}',
    '#cdv .mosaic img{border-radius:16px;aspect-ratio:4/5;object-fit:cover;width:100%}',
    '#cdv .swatches{display:flex;flex-wrap:wrap;justify-content:center;gap:20px;margin-top:24px}',
    '#cdv .sw{display:flex;flex-direction:column;align-items:center;gap:8px;width:84px;font-size:14px;color:var(--muted)}',
    '#cdv .sw i{width:58px;height:58px;border-radius:50%;border:1px solid #DCCCC6;display:block}',
    '#cdv .center{text-align:center;display:flex;flex-direction:column;align-items:center}',
    '#cdv .steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:22px;margin-top:28px}',
    '#cdv .step{background:#fff;border:1px solid #EFE0CF;border-radius:20px;padding:28px;display:flex;flex-direction:column;gap:10px}',
    '#cdv .step b{width:48px;height:48px;border-radius:50%;background:var(--wine);color:var(--cream);display:flex;align-items:center;justify-content:center;font-family:"Fraunces",serif;font-size:22px}',
    '#cdv .step strong{font-size:19px}#cdv .step span{color:var(--muted)}',
    '#cdv .reviews{background:var(--cream)}',
    '#cdv .rating{display:inline-flex;align-items:center;flex-wrap:wrap;justify-content:center;gap:8px;background:#fff;border:1px solid #EFE0CF;border-radius:999px;padding:8px 16px;font-weight:700;font-size:15px;margin-top:16px}',
    '#cdv .gword{font-weight:800;letter-spacing:-.01em}#cdv .gword b:nth-child(1),#cdv .gword b:nth-child(4){color:#4285F4}#cdv .gword b:nth-child(2),#cdv .gword b:nth-child(6){color:#EA4335}#cdv .gword b:nth-child(3){color:#FBBC05}#cdv .gword b:nth-child(5){color:#34A853}',
    '#cdv .stars{color:#E8A93B;letter-spacing:1px}',
    '#cdv .revs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;margin-top:32px}',
    '#cdv .rev{background:#fff;border:1px solid #EFE0CF;border-radius:20px;padding:22px;display:flex;flex-direction:column;gap:10px;min-width:0}',
    '#cdv .rev-top{display:flex;align-items:center;gap:12px}',
    '#cdv .av{flex:0 0 40px;height:40px;border-radius:50%;display:grid;place-items:center;color:#fff;font-weight:700;font-size:16px}',
    '#cdv .rev-top div{display:flex;flex-direction:column;line-height:1.25;flex:1;min-width:0}#cdv .rev-top b{font-size:15px}#cdv .rev-top small{font-size:12.5px;color:var(--muted)}',
    '#cdv .rev p{margin:0;font-size:15.5px;line-height:1.6}',
    '#cdv .rev .tr{font-size:12px;color:var(--muted);font-style:italic;margin-top:auto}',
    '#cdv .revdots{display:none}',
    '#cdv .revbtns{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-top:32px}',
    '#cdv .btn-out{border-color:var(--ink);color:var(--ink);background:transparent}',
    '@media (max-width:860px){#cdv .revs{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;gap:12px;margin:24px -20px 0;padding:0 20px 6px;scrollbar-width:none}#cdv .revs::-webkit-scrollbar{display:none}#cdv .rev{flex:0 0 84%;scroll-snap-align:start;padding:18px}#cdv .rev p{font-size:15px}#cdv .revdots{display:flex;justify-content:center;gap:6px;margin-top:12px}#cdv .revdots i{width:7px;height:7px;border-radius:50%;background:#D9C4B1;transition:background .2s ease}#cdv .revdots i.on{background:var(--wine)}#cdv .revbtns{flex-direction:column;align-items:stretch;margin-top:24px}#cdv .revbtns .btn{width:100%;box-sizing:border-box}}',
    '#cdv footer{background:var(--wine);color:#F6E4DA;padding:64px 0 36px;font-size:15px;line-height:1.6}',
    '#cdv .ft-grid{display:grid;grid-template-columns:1.4fr 1.2fr 1fr 1fr;gap:40px}',
    '#cdv .ft-brand{display:flex;flex-direction:column;gap:14px;max-width:360px}#cdv .ft-brand img{width:110px;height:auto}#cdv .ft-brand p{margin:0;color:#F3DDD2}#cdv .ft-brand em{font-family:"Fraunces",Georgia,serif;font-style:italic;color:var(--gold);font-size:17px;line-height:1.45}',
    '#cdv footer h4{margin:0 0 14px;font-family:"Nunito Sans",system-ui,sans-serif;color:var(--gold);font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase}',
    '#cdv .ft-row{display:flex;align-items:center;gap:14px;min-height:52px;color:var(--cream);text-decoration:none}#cdv .ft-row+.ft-row{margin-top:6px}',
    '#cdv .ft-row .ic{flex:0 0 40px;height:40px;border-radius:50%;background:rgba(230,194,122,.18);display:grid;place-items:center;color:var(--gold)}',
    '#cdv .ft-row .tx{display:flex;flex-direction:column;line-height:1.35;min-width:0;word-break:break-word}#cdv .ft-row .tx small{font-size:12px;font-weight:600;color:#E8C3B8;letter-spacing:.04em}',
    '#cdv a.ft-row:hover .tx span{text-decoration:underline}',
    '#cdv .social{display:grid;grid-template-columns:1fr 1fr;gap:10px}#cdv .social a{display:flex;align-items:center;justify-content:center;gap:8px;min-height:48px;border:1px solid rgba(231,214,202,.28);border-radius:12px;color:var(--cream);font-weight:700;font-size:15px;text-decoration:none}#cdv .social a svg{color:var(--gold)}#cdv .social a:hover{border-color:var(--gold)}',
    '#cdv .ft-links{display:flex;flex-direction:column}#cdv .ft-links a{min-height:40px;display:flex;align-items:center;color:var(--cream);text-decoration:none}#cdv .ft-links a:hover{color:var(--gold)}',
    '#cdv .fine{border-top:1px solid rgba(246,228,218,.22);margin-top:40px;padding-top:22px;font-size:13px;line-height:1.7;color:#E2BDB2}',
    '@media (max-width:860px){#cdv footer{padding-top:44px}#cdv .ft-grid{grid-template-columns:1fr;gap:0}#cdv .ft-grid>div{padding:24px 0;border-top:1px solid rgba(231,214,202,.14)}#cdv .ft-grid>.ft-brand{padding:0 0 28px;border-top:0}#cdv .ft-brand img{width:96px}#cdv .ft-links{display:grid;grid-template-columns:1fr 1fr;column-gap:16px}#cdv .ft-links a{min-height:44px;border-bottom:1px solid rgba(231,214,202,.08)}#cdv .fine{text-align:center;margin-top:8px;font-size:12px}}',
    '#cdv .float{position:fixed;right:18px;bottom:18px;z-index:30;display:flex;align-items:center;gap:8px;background:#1F7A4D;color:#fff;text-decoration:none;font-weight:700;padding:14px 18px;border-radius:999px;box-shadow:0 10px 28px rgba(0,0,0,.22)}',
    '@media (max-width:860px){#cdv .links{display:none}#cdv .hero-txt{padding:32px 24px}#cdv .hero-card{min-height:560px}#cdv .hero-card::after{background:linear-gradient(0deg,rgba(43,26,20,.9) 0%,rgba(43,26,20,.55) 60%,rgba(43,26,20,.15) 100%)}#cdv .brand span{display:none}#cdv .search{flex:1 1 100%}}',
    '@media (max-width:520px){#cdv .grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}#cdv .meta{gap:4px}#cdv .meta h3{font-size:17px}#cdv .meta .price{font-size:14px}#cdv .card .btn{font-size:14px;padding:10px}#cdv .float span{display:none}#cdv .float{padding:15px}#cdv section.block{padding:48px 0}}',
    '#cdv .sm{display:none}',
    '@media (max-width:860px){#cdv .tabs{flex-wrap:nowrap;overflow-x:auto;width:100%;padding-bottom:6px;scrollbar-width:none}#cdv .tabs::-webkit-scrollbar{display:none}#cdv .tab{flex:0 0 auto}}',
    '@media (max-width:520px){#cdv .card .lg{display:none}#cdv .card .sm{display:inline}}',
    '#cdv .slogan{display:none}',
    '@media (max-width:860px){#cdv .brand{flex:0 0 auto}#cdv .nav-in{gap:12px}#cdv .slogan{display:block;flex:1 1 auto;min-width:0;margin:0 auto 0 0;padding-left:12px;border-left:1px solid #E3CDB8;font-family:"Fraunces",Georgia,serif;font-style:italic;font-size:12.5px;line-height:1.3;color:var(--wine);text-wrap:balance;max-width:260px}}',
    '@media (max-width:380px){#cdv .slogan{font-size:12px;padding-left:9px}}',
    '#cdv .hero-card picture{position:absolute;inset:0}',
    '#cdv .hero-card.bright::after{background:linear-gradient(90deg,rgba(43,26,20,.84) 0%,rgba(43,26,20,.58) 36%,rgba(43,26,20,0) 60%)}',
    '@media (max-width:860px){#cdv .hero-card.bright{min-height:0;flex-direction:column;align-items:stretch;background:#F3F1F2}#cdv .hero-card.bright picture{position:relative;order:2;display:block;aspect-ratio:900/1180;margin-top:-40px}#cdv .hero-card.bright img{object-position:center bottom}#cdv .hero-card.bright::after{display:none}#cdv .hero-card.bright .hero-txt{order:1;padding:28px 22px 8px;gap:14px;color:var(--ink)}#cdv .hero-card.bright .hero-txt h1{color:var(--ink)}#cdv .hero-card.bright .hero-txt .script{color:var(--wine)}#cdv .hero-card.bright .hero-txt p{color:var(--muted)}#cdv .hero-card.bright .btn-ghost{color:var(--ink);border-color:var(--ink)}}',
    '#cdv .tabbar{display:none}',
    '@media (max-width:860px){#cdv .float{display:none}#cdv .tabbar{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));position:fixed;left:0;right:0;bottom:0;z-index:40;background:rgba(255,248,239,.97);backdrop-filter:saturate(1.2) blur(8px);-webkit-backdrop-filter:blur(8px);border-top:1px solid #EFE0CF;box-shadow:0 -6px 20px rgba(43,34,32,.08);padding:6px 4px calc(8px + env(safe-area-inset-bottom,0px))}#cdv .tabbar a{display:flex;flex-direction:column;align-items:center;gap:3px;min-height:48px;justify-content:center;font-size:11px;font-weight:700;color:var(--muted);text-decoration:none;transition:color .2s ease}#cdv .tabbar a.on{color:var(--wine)}#cdv .tabbar a.wa{color:#1F7A4D}#cdv footer{padding-bottom:calc(36px + 72px + env(safe-area-inset-bottom,0px))}}',
    '#cdv a.ph{display:block;color:inherit;text-decoration:none;cursor:pointer}',
    '#cdv .cartbtn{width:46px;height:46px;border-radius:50%;border:0;background:var(--wine);color:#fff;display:grid;place-items:center;margin:2px auto 0;cursor:pointer;box-shadow:0 4px 12px rgba(140,47,57,.25);transition:background .2s ease,transform .15s ease}#cdv .cartbtn:hover{background:var(--wine-d)}#cdv .cartbtn:active{transform:scale(.94)}#cdv .cartbtn:focus-visible,#cdv .hcart:focus-visible{outline:3px solid var(--gold);outline-offset:2px}',
    '#cdv .hcart{position:relative;width:44px;height:44px;border-radius:50%;border:1px solid #E6D3BF;background:#fff;color:var(--ink);display:grid;place-items:center;cursor:pointer;flex:0 0 auto}',
    '#cdv .cbadge{position:absolute;top:-5px;right:-6px;min-width:19px;height:19px;padding:0 5px;border-radius:10px;background:var(--wine);color:#fff;font:700 11px/19px "Nunito Sans",system-ui,sans-serif;text-align:center}',
    '#cdv .tabbar a.cart{color:var(--wine)}#cdv .tabbar .ci{position:relative;display:inline-grid}',
    '#cdv .hcart{width:auto;padding:0 18px 0 14px;gap:8px;display:flex;align-items:center;border-radius:999px;font:700 15px "Nunito Sans",system-ui,sans-serif}',
    '#cdv .hcart .cbadge{position:static;margin-left:2px}',
    '#cdv .fcart{border:0;cursor:pointer;background:var(--wine);font:700 15px "Nunito Sans",system-ui,sans-serif;box-shadow:0 10px 28px rgba(140,47,57,.3)}#cdv .fcart:hover{background:var(--wine-d)}#cdv .fcart .cbadge{position:static;background:#fff;color:var(--wine)}',
    '#cdv .askwa{margin:16px 0 0;font-size:14px;color:var(--muted)}#cdv .askwa a{color:var(--wine);font-weight:700}',
    '@media (max-width:860px){#cdv .hcart{display:none}}',
    '@media (prefers-reduced-motion:reduce){#cdv *{transition:none!important}}'
  ].join('\n');

  function card(p) {
    var top = p.top ? '<span class="tag">Más vendida</span>' : '';
    return '<article class="card">' +
      '<a class="ph" href="' + prodHref(p) + '" data-vela="' + p.r + '" aria-label="Ver ' + esc(p.n) + '">' + top + '<img loading="lazy" decoding="async" src="' + esc(p.img) + '" alt="Vela artesanal ' + esc(p.n) + '" width="640" height="800"></a>' +
      '<a class="meta" href="' + prodHref(p) + '" data-vela="' + p.r + '" tabindex="-1"><h3>' + esc(p.n) + '</h3><span class="price">' + money(p.p) + '</span></a>' +
      '</article>';
  }

  function featured() {
    var t = current();
    var list = seasonList(t);
    if (t.entre || !list.length) {
      var f = PRODUCTS.filter(function (p) { return p.feat; });
      list = list.length ? list : f;
      if (!list.length) list = PRODUCTS.filter(function (p) { return p.top; });
    }
    var fav = list.filter(function (p) { return p.feat || p.top; });
    var rest = list.filter(function (p) { return !(p.feat || p.top); });
    return fav.concat(rest).slice(0, 8);
  }

  var html =
    '<div class="topbar" id="cdv-top"></div>' +
    '<header class="nav"><div class="nav-in">' +
      '<a class="brand" href="#inicio" aria-label="Cielo de Velas, inicio"><img src="' + IMG + 'logo.png" alt="Logo Cielo de Velas" width="58" height="55"><span>Cielo de velas</span></a>' +
      '<p class="slogan">Por cada vela que enciendes, nace una luz en el cielo.</p>' +
      '<nav class="links" aria-label="Principal"><a href="#catalogo" data-col="temp:actual" id="cdv-navseason">Temporada</a><a href="#catalogo">Catálogo</a><a href="#regalos">Regalos</a><a href="#eventos">Eventos</a><a href="#pedir">Cómo pedir</a><a href="#nosotros">Nosotros</a></nav>' +
      '<button type="button" class="hcart" data-cart="open" aria-label="Ver carrito">' + ICON_CART + '<span>Carrito</span><b class="cbadge" hidden>0</b></button>' +
    '</div></header>' +
    '<div id="inicio" class="hero"><div class="hero-card" id="cdv-hero"></div></div>' +
    '<div class="nextbar" id="cdv-next"></div>' +
    '<div class="chips"><span class="chip">Hechas a mano</span><span class="chip">Materias primas naturales</span><span class="chip">Libres de tóxicos</span><span class="chip">Sostenibles</span></div>' +
    '<section class="block" style="padding-top:24px"><div class="wrap">' +
      '<div class="head" id="cdv-feathead"></div>' +
      '<div class="grid" id="cdv-feat">' + featured().map(card).join('') + '</div>' +
    '</div></section>' +
    '<section id="catalogo" class="block" style="background:#fff;border-top:1px solid #EFE0CF;border-bottom:1px solid #EFE0CF"><div class="wrap">' +
      '<div class="head"><div><span class="script">Nuestro catálogo</span><h2>Una vela para cada momento</h2><p class="sub"><span id="cdv-total">' + PRODUCTS.length + '</span> diseños hechos a mano. Toca una vela para ver sus fotos, elegir el color y agregarla al carrito.</p></div></div>' +
      '<div class="tools"><div class="tabs" role="group" aria-label="Colecciones"></div>' +
      '<label class="search"><span style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)">Buscar una vela</span>' + ICON_SEARCH + '<input type="search" placeholder="Buscar: reno, ángel, peonía..." autocomplete="off"></label></div>' +
      '<p class="count" aria-live="polite"></p><div class="grid" id="cdv-grid"></div>' +
    '</div></section>' +
    '<section id="regalos" class="block gifts"><div class="wrap split">' +
      '<img loading="lazy" src="' + IMG + 'hero-carrito.jpg" alt="Carrito rosado lleno de velas artesanales con lazo">' +
      '<div><p class="script">Detalles con amor</p><h2>Regalos listos para entregar</h2>' +
      '<p>Combinamos velas en bolsas y cajas con lazo para fechas especiales, intercambios, clientes y equipos de trabajo.</p>' +
      '<ul class="ticks"><li>Regalos individuales o surtidos</li><li>Pedidos por cantidad para empresas</li><li>Colores a juego con tu marca o tu decoración</li></ul>' +
      '<a class="btn btn-gold" href="' + GIFTS + '" target="_blank" rel="noopener">Cotizar regalos</a></div>' +
    '</div></section>' +
    '<section id="eventos" class="block events"><div class="wrap split">' +
      '<div><p class="script">Celebraciones</p><h2>Recuerdos que tus invitados se llevan a casa</h2>' +
      '<p>Bodas, baby showers, cumpleaños, primeras comuniones y grados. Elige el diseño, el color y la cantidad.</p>' +
      '<ul class="ticks"><li>Pedidos por cantidad para tu evento</li><li>Colores a juego con tu decoración</li><li>Precios especiales por mayor</li></ul>' +
      '<a class="btn btn-wine" href="' + EVENTS + '" target="_blank" rel="noopener">Cotizar mi evento</a></div>' +
      '<div class="mosaic">' + [['boda-corazon', 'Boda Corazón'], ['baby-shower', 'Baby Shower'], ['numeros', 'Números'], ['pareja', 'Pareja'], ['zapatico-bebe', 'Zapatico Bebé'], ['primera-comunion', 'Primera Comunión']].map(function (m) {
        return '<img loading="lazy" src="' + IMG + m[0] + '.jpg" alt="Vela ' + m[1] + '">';
      }).join('') + '</div>' +
    '</div></section>' +
    '<section class="block"><div class="wrap center"><p class="script" style="font-size:36px;color:var(--wine)">Colores disponibles</p><h2 style="font-size:clamp(30px,4vw,44px)">Elige tu color favorito</h2>' +
      '<div class="swatches">' + COLORS.map(function (c) { return '<div class="sw"><i style="background:' + c[1] + '"></i>' + c[0] + '</div>'; }).join('') + '</div>' +
    '</div></section>' +
    '<section id="pedir" class="block" style="background:var(--sand)"><div class="wrap"><div class="center"><p class="script" style="font-size:36px;color:var(--wine)">Así de fácil</p><h2 style="font-size:clamp(30px,4vw,44px)">Cómo hacer tu pedido</h2></div>' +
      '<div class="steps">' +
        '<div class="step"><b>1</b><strong>Elige tu vela</strong><span>Toca una vela, mira sus fotos y agrégala al carrito.</span></div>' +
        '<div class="step"><b>2</b><strong>Escoge el color</strong><span>En la página de cada vela eliges uno de los 9 colores.</span></div>' +
        '<div class="step"><b>3</b><strong>Envía tu pedido</strong><span>Completa tus datos y envíanos el carrito por WhatsApp. Te confirmamos disponibilidad, envío y pago.</span></div>' +
      '</div><div class="center" style="margin-top:30px"><a class="btn btn-wine" href="#catalogo" data-col="todas">Ver catálogo</a>' +
      '<p class="askwa">¿Tienes una pregunta o un pedido especial? <a href="' + waLink('Hola Cielo de Velas, tengo una pregunta.') + '" target="_blank" rel="noopener">Escríbenos por WhatsApp</a></p></div>' +
    '</div></section>' +
    '<section id="resenas" class="block reviews"><div class="wrap"><div class="center"><p class="script" style="font-size:36px;color:var(--wine)">Lo que dicen de nosotros</p><h2 style="font-size:clamp(30px,4vw,44px)">Reseñas en Google</h2>' +
      '<a class="rating" href="' + G_PROFILE + '" target="_blank" rel="noopener" style="text-decoration:none;color:var(--ink)"><span class="gword"><b>G</b><b>o</b><b>o</b><b>g</b><b>l</b><b>e</b></span>' + G_RATING + ' <span class="stars" aria-label="5 estrellas">★★★★★</span> · ' + G_COUNT + ' reseñas</a></div>' +
      '<div class="revs">' + REVIEWS.map(function (r, i) {
        return '<article class="rev"><div class="rev-top"><span class="av" style="background:' + ['#B5305A', '#2F4A3A', '#6D5BD0'][i % 3] + '">' + esc(r[0].charAt(0)) + '</span><div><b>' + esc(r[0]) + '</b><small>' + esc(r[1] || 'Reseña de Google') + '</small></div></div>' +
          '<span class="stars" aria-label="5 estrellas">★★★★★</span><p>' + esc(r[2]) + '</p>' + (r[3] ? '<span class="tr">' + esc(r[3]) + '</span>' : '') + '</article>';
      }).join('') + '</div>' +
      '<div class="revdots" aria-hidden="true">' + REVIEWS.map(function (r, i) { return '<i' + (i ? '' : ' class="on"') + '></i>'; }).join('') + '</div>' +
      '<div class="revbtns"><a class="btn btn-wine" href="' + G_REVIEW + '" target="_blank" rel="noopener">' + ICON_STAR + 'Déjanos tu reseña</a><a class="btn btn-out" href="' + G_PROFILE + '" target="_blank" rel="noopener">Ver todas en Google</a></div>' +
    '</div></section>' +
    '<footer><div class="wrap"><div class="ft-grid">' +
      '<div class="ft-brand"><img src="' + IMG + 'logo-crema.png" alt="Cielo de Velas" width="110" height="105"><p>Velas artesanales hechas a mano en Medellín con materias primas naturales y certificadas.</p><em>“Por cada vela que enciendes, nace una luz en el cielo.”</em></div>' +
      '<div><h4>Contacto</h4>' +
        '<a class="ft-row" href="' + GENERAL + '" target="_blank" rel="noopener"><span class="ic">' + ICON_WA + '</span><span class="tx"><small>WhatsApp</small><span>+57 322 591 1307</span></span></a>' +
        '<a class="ft-row" href="mailto:' + EMAIL + '"><span class="ic">' + ICON_MAIL + '</span><span class="tx"><small>Correo</small><span>' + EMAIL + '</span></span></a>' +
        '<div class="ft-row"><span class="ic">' + ICON_PIN + '</span><span class="tx"><small>Ubicación</small><span>Medellín, Colombia</span></span></div></div>' +
      '<div><h4>Síguenos</h4><div class="social"><a href="' + IG + '" target="_blank" rel="noopener">' + ICON_IG + 'Instagram</a><a href="' + FB + '" target="_blank" rel="noopener">' + ICON_FB + 'Facebook</a></div></div>' +
      '<div><h4>Explora</h4><nav class="ft-links" aria-label="Explora"><a href="#catalogo">Catálogo</a><a href="#regalos">Regalos</a><a href="#eventos">Eventos</a><a href="#pedir">Cómo pedir</a><a href="#resenas">Reseñas</a><a href="#nosotros">Sobre nosotros</a><a href="https://blog.cielodevelas.com/">Colecciones por ocasión</a><a href="' + G_REVIEW + '" target="_blank" rel="noopener">Déjanos tu reseña</a></nav></div>' +
    '</div><p class="fine">Precios en pesos colombianos, por unidad. Para pedidos por mayor escríbenos por WhatsApp.<br>© ' + new Date().getFullYear() + ' Cielo de Velas · Medellín, Colombia</p></div></footer>' +
    '<button type="button" class="float fcart" data-cart="open" aria-label="Ver carrito">' + ICON_CART + '<span>Ver carrito</span><b class="cbadge" hidden>0</b></button>' +
    '<nav class="tabbar" aria-label="Secciones">' +
      '<a href="#inicio" data-spy="inicio" class="on">' + ICON_HOME + 'Inicio</a>' +
      '<a href="#catalogo" data-spy="catalogo">' + ICON_GRID + 'Catálogo</a>' +
      '<a href="#regalos" data-spy="regalos">' + ICON_GIFT + 'Regalos</a>' +
      '<a href="#eventos" data-spy="eventos">' + ICON_EVENT + 'Eventos</a>' +
      '<a class="cart" href="#carrito" data-cart="open">' + '<span class="ci">' + ICON_CART + '<b class="cbadge" hidden>0</b></span>' + 'Carrito</a>' +
    '</nav>';

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
  ROOT.innerHTML = html;

  var state = { col: 'temp:actual', q: '' };
  var tabsEl = ROOT.querySelector('.tabs');
  var gridEl = ROOT.querySelector('#cdv-grid');
  var countEl = ROOT.querySelector('.count');
  var input = ROOT.querySelector('.search input');

  function norm(s) { return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  function renderTabs() {
    var used = {};
    PRODUCTS.forEach(function (p) { used[p.c] = true; });
    var seasonTabs = [];
    var t = current(), nx = nextSeason();
    if (seasonList(t).length) seasonTabs.push({ id: 'temp:actual', name: shortName(t), season: true });
    if (nx && seasonList(nx).length && nx.nombre !== t.nombre) seasonTabs.push({ id: 'temp:siguiente', name: nx.nombre, season: true });
    var valid = seasonTabs.some(function (x) { return x.id === state.col; }) || state.col === 'todas' || used[state.col];
    if (!valid) state.col = seasonTabs.length ? 'temp:actual' : 'todas';
    var sNames = seasonTabs.map(function (x) { return norm(x.name); });
    var all = [{ id: 'todas', name: 'Todas' }].concat(seasonTabs).concat(COLS.filter(function (c) { return used[c.id] && sNames.indexOf(norm(c.name)) < 0; }));
    tabsEl.innerHTML = all.map(function (c) {
      return '<button type="button" class="tab' + (c.season ? ' season' : '') + '" data-id="' + c.id + '" aria-pressed="' + (state.col === c.id && !state.q) + '">' + esc(c.name) + '</button>';
    }).join('');
  }
  function renderGrid() {
    var q = norm(state.q.trim());
    var list = PRODUCTS.filter(function (p) {
      if (q) return norm(p.n).indexOf(q) > -1;
      if (state.col === 'temp:actual') return inSeason(p, current());
      if (state.col === 'temp:siguiente') return inSeason(p, nextSeason());
      return state.col === 'todas' || p.c === state.col;
    });
    countEl.textContent = list.length + (list.length === 1 ? ' vela' : ' velas');
    gridEl.innerHTML = list.length ? list.map(card).join('') :
      '<div class="empty" style="grid-column:1/-1">No encontramos esa vela. <a href="' + GENERAL + '" target="_blank" rel="noopener">Pregúntanos por WhatsApp</a>.</div>';
  }
  function renderSeason() {
    var t = current(), nx = nextSeason(), d = daysTo(t.fecha);
    var kicker = t.entre ? 'Hechas a mano en Medellín' : (d === 0 ? '¡Es hoy!' : d === 1 ? 'Falta 1 día' : d > 1 ? 'Faltan ' + d + ' días' : t.nombre);
    var waSeason = t.entre ? GENERAL : waLink('Hola Cielo de Velas, quiero hacer un pedido para ' + t.nombre + '.');
    var hasList = seasonList(t).length > 0;
    var mob = brightMobile(t), heroEl = ROOT.querySelector('#cdv-hero');
    heroEl.classList.toggle('bright', !!mob);
    var heroImg = '<img src="' + esc(seasonImg(t)) + '" alt="' + esc(t.titular || t.nombre) + '" fetchpriority="high" onerror="this.onerror=null;this.src=\'' + IMG + 'hero-regalos.jpg\'">';
    heroEl.innerHTML =
      (mob ? '<picture><source media="(max-width:860px)" srcset="' + IMG + mob + '.jpg">' + heroImg + '</picture>' : heroImg) +
      '<div class="hero-txt"><p class="script">' + esc(kicker) + '</p><h1>' + esc(t.titular || t.nombre) + '</h1>' +
      (t.subtitulo ? '<p>' + esc(t.subtitulo) + '</p>' : '') +
      '<div class="row"><a class="btn btn-wine" href="#catalogo" data-col="' + (hasList ? 'temp:actual' : 'todas') + '">Ver colección</a>' +
      '<a class="btn btn-ghost" href="#catalogo" data-col="todas">Ver catálogo completo</a></div></div>';
    ROOT.querySelector('#cdv-next').innerHTML = (nx && nx.nombre !== t.nombre) ?
      '<a href="#catalogo" data-col="temp:siguiente">' + (t.entre ? 'Ya llega ' : 'Después: ') + esc(nx.nombre) + ' · ' + dateTxt(nx.fecha) + '<b>Ver colección →</b></a>' : '';
    ROOT.querySelector('#cdv-top').textContent = t.entre ?
      'Velas artesanales hechas a mano en Medellín · Pedidos por WhatsApp' :
      'Pedidos para ' + t.nombre + ' abiertos · ' + (d > 0 ? 'Faltan ' + d + ' días · ' : '') + 'Escríbenos por WhatsApp';
    var nav = ROOT.querySelector('#cdv-navseason');
    nav.textContent = shortName(t);
    nav.setAttribute('data-col', hasList ? 'temp:actual' : 'todas');
    ROOT.querySelector('#cdv-feathead').innerHTML =
      '<div><span class="script">' + esc(t.entre ? 'Nuestras favoritas' : 'Especial ' + t.nombre) + '</span><h2>' + (t.entre ? 'Las más pedidas' : 'Las favoritas de la temporada') + '</h2></div>' +
      '<a class="btn btn-dark" href="#catalogo" data-col="' + (hasList ? 'temp:actual' : 'todas') + '">Ver todas</a>';
    ROOT.querySelector('#cdv-feat').innerHTML = featured().map(card).join('');
  }
  function setCol(id) { state.col = id; state.q = ''; input.value = ''; renderTabs(); renderGrid(); }

  tabsEl.addEventListener('click', function (e) {
    var b = e.target.closest('.tab'); if (b) setCol(b.getAttribute('data-id'));
  });
  input.addEventListener('input', function () { state.q = input.value; renderTabs(); renderGrid(); });
  // Carrd trata cualquier enlace "#algo" como cambio de sección y manda al inicio
  // (o abre la landing "#regalos"). Atrapamos los enlaces internos antes que Carrd
  // y hacemos el scroll nosotros, compensando el menú fijo.
  window.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest && e.target.closest('#cdv a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute('href').slice(1);
    var target = id === 'inicio' ? ROOT : (id && ROOT.querySelector('#' + CSS.escape(id)));
    if (!target) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    if (a.hasAttribute('data-col')) setCol(a.getAttribute('data-col'));
    var head = ROOT.querySelector('header.nav');
    var off = head ? head.getBoundingClientRect().height + 8 : 0;
    var y = id === 'inicio' ? 0 : target.getBoundingClientRect().top + window.pageYOffset - off;
    window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
  }, true);

  // Reseñas (celular): puntos que siguen la tarjeta visible.
  (function () {
    var rv = ROOT.querySelector('.revs'), dots = [].slice.call(ROOT.querySelectorAll('.revdots i'));
    if (!rv || !dots.length) return;
    rv.addEventListener('scroll', function () {
      var c = rv.children[0]; if (!c) return;
      var i = Math.round(rv.scrollLeft / (c.getBoundingClientRect().width + 12));
      dots.forEach(function (d, k) { d.classList.toggle('on', k === Math.min(i, dots.length - 1)); });
    }, { passive: true });
  })();

  // Barra inferior (solo celular): resalta la sección visible.
  (function () {
    var bar = ROOT.querySelector('.tabbar'); if (!bar) return;
    var links = [].slice.call(bar.querySelectorAll('[data-spy]'));
    var ids = ['catalogo', 'regalos', 'eventos', 'pedir'];
    var last = 'inicio', ticking = false;
    function update() {
      ticking = false;
      var head = ROOT.querySelector('header.nav');
      var line = (head ? head.getBoundingClientRect().height : 0) + 60, cur = 'inicio';
      ids.forEach(function (id) { var el = ROOT.querySelector('#' + id); if (el && el.getBoundingClientRect().top <= line) cur = id; });
      if (cur === 'pedir') cur = '';
      if (cur === last) return; last = cur;
      links.forEach(function (a) { a.classList.toggle('on', a.getAttribute('data-spy') === cur); });
    }
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  })();

  ROOT.addEventListener('click', function (e) {
    var a = e.target.closest('a[data-col]');
    if (a) setCol(a.getAttribute('data-col'));
    var w = e.target.closest('a[href*="wa.me/"]');
    if (w) track(w);
  });

  // Meta Pixel: cada clic a WhatsApp es un contacto (pedido o cotización).
  function track(a) {
    if (typeof window.fbq !== 'function') return;
    try {
      var href = a.getAttribute('href');
      if (a.getAttribute('data-fb') === 'pedido') {
        window.fbq('track', 'Contact', { content_name: a.getAttribute('data-n'), value: Number(a.getAttribute('data-p')), currency: 'COP', content_category: 'pedido_vela' });
      } else if (href === GIFTS || href === EVENTS) {
        window.fbq('track', 'Lead', { content_category: href === GIFTS ? 'cotizacion_regalos' : 'cotizacion_evento', currency: 'COP' });
      } else {
        window.fbq('track', 'Contact', { content_category: 'whatsapp_general' });
      }
    } catch (err) {}
  }
  var searchTimer;
  input.addEventListener('input', function () {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(function () {
      var q = input.value.trim();
      if (q.length > 2 && typeof window.fbq === 'function') window.fbq('track', 'Search', { search_string: q });
    }, 1500);
  });
  renderSeason(); renderTabs(); renderGrid();

  // =========================================================================
  // Página de producto + carrito (nov 2026)
  // - Cada vela tiene su página: cielodevelas.com/?vela=001 (se puede compartir)
  // - El carrito vive en el celular del cliente (localStorage) y se envía por WhatsApp
  // - Colores: los 9 estándar; si la columna Colores de la pestaña Web tiene una
  //   lista, solo esos (siempre dentro de los 9).
  // =========================================================================
  var CART_KEY = 'cdv_carrito_v1';
  var WHOLESALE = waLink('Hola Cielo de Velas, quiero hacer un pedido al por mayor. ¿Me pueden dar el precio? Velas y cantidades: ');
  function ref3(r) { return ('00' + r).slice(-3); }
  function prodHref(p) { return '?vela=' + ref3(p.r); }
  function byRef(r) { r = Number(r); for (var i = 0; i < PRODUCTS.length; i++) if (PRODUCTS[i].r === r) return PRODUCTS[i]; return null; }
  function bigImg(u) { return String(u).replace(/=w\d+$/, '=w1200'); }
  function cm(n) { return String(n).replace('.', ',') + ' cm'; }
  function colorsFor(p) {
    var wanted = (p.k || []).map(norm);
    var list = COLORS.filter(function (c) { return !wanted.length || wanted.indexOf(norm(c[0])) > -1; });
    return list.length ? list : COLORS;
  }
  function pix(ev, data) { try { if (typeof window.fbq === 'function') window.fbq('track', ev, data); } catch (e) {} }

  // ---------- carrito ----------
  var cart = [];
  try { cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]') || []; } catch (e) { cart = []; }
  cart = cart.filter(function (l) { return l && l.r && l.q > 0; });
  function saveCart() { try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) {} }
  function cartLines() {
    return cart.map(function (l) { var p = byRef(l.r); return p ? { p: p, c: l.c, q: l.q } : null; }).filter(Boolean);
  }
  function cartCount() { return cartLines().reduce(function (s, l) { return s + l.q; }, 0); }
  function cartTotal() { return cartLines().reduce(function (s, l) { return s + l.q * l.p.p; }, 0); }
  function addToCart(p, color, q) {
    var hit = null;
    cart.forEach(function (l) { if (l.r === p.r && l.c === color) hit = l; });
    if (hit) hit.q += q; else cart.push({ r: p.r, c: color, q: q });
    saveCart(); updateBadges();
    pix('AddToCart', { content_ids: [ref3(p.r)], content_type: 'product', content_name: p.n, value: p.p * q, currency: 'COP' });
  }
  function updateBadges() {
    var n = cartCount();
    [].slice.call(document.querySelectorAll('#cdv .cbadge, #cdvx .cbadge')).forEach(function (b) { b.textContent = n; b.hidden = !n; });
  }

  // ---------- capa (página de producto y carrito) ----------
  var X = document.createElement('div');
  X.id = 'cdvx';
  document.body.appendChild(X);
  var xs = document.createElement('style');
  xs.textContent = [
    '#cdvx{--ink:#2B2220;--muted:#6B5A52;--cream:#FFF8EF;--sand:#F6E7D6;--wine:#8C2F39;--wine-d:#6E222B;--gold:#E6C27A;--pine:#2F4A3A;--line:#EADBC9;font-family:"Nunito Sans",system-ui,-apple-system,sans-serif;color:var(--ink);-webkit-font-smoothing:antialiased;text-align:left;line-height:1.55}',
    '#cdvx *{box-sizing:border-box}#cdvx [hidden]{display:none!important}',
    '#cdvx button{font:inherit;color:inherit;cursor:pointer}',
    '#cdvx .pp{position:fixed;inset:0;z-index:2147483000;background:var(--cream);overflow-y:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain}',
    '#cdvx .pp-top{position:sticky;top:0;z-index:3;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px max(16px,env(safe-area-inset-left,0px));padding-top:calc(10px + env(safe-area-inset-top,0px));background:rgba(255,248,239,.95);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border-bottom:1px solid #F0E2D2}',
    '#cdvx .ib{position:relative;width:42px;height:42px;border-radius:50%;border:1px solid var(--line);background:#fff;display:grid;place-items:center;flex:0 0 auto}',
    '#cdvx .ib:focus-visible,#cdvx .sw:focus-visible,#cdvx .add:focus-visible,#cdvx .go:focus-visible{outline:3px solid var(--gold);outline-offset:2px}',
    '#cdvx .crumb{font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
    '#cdvx .cbadge{position:absolute;top:-5px;right:-6px;min-width:19px;height:19px;padding:0 5px;border-radius:10px;background:var(--wine);color:#fff;font:700 11px/19px "Nunito Sans",system-ui,sans-serif;text-align:center}',
    '#cdvx .pp-in{max-width:1080px;margin:0 auto;display:grid;grid-template-columns:1fr;gap:0}',
    '@media (min-width:861px){#cdvx .pp-in{grid-template-columns:minmax(0,1.05fr) minmax(0,1fr);gap:48px;padding:32px 32px 60px}#cdvx .gal{border-radius:18px;overflow:hidden}#cdvx .pp-body{padding:0!important}}',
    '#cdvx .pp-in>div{min-width:0}#cdvx .gal{position:relative;background:var(--sand);min-width:0;width:100%}#cdvx .track{min-width:0;width:100%}',
    '#cdvx .track{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none}#cdvx .track::-webkit-scrollbar{display:none}',
    '#cdvx .track img{flex:0 0 100%;width:100%;aspect-ratio:1/1;object-fit:cover;scroll-snap-align:center;display:block}',
    '#cdvx .cnt{position:absolute;right:12px;bottom:12px;background:rgba(43,34,32,.72);color:#fff;font-size:12px;padding:4px 10px;border-radius:20px;font-variant-numeric:tabular-nums}',
    '#cdvx .thumbs{display:flex;gap:8px;padding:10px 16px 0}',
    '@media (min-width:861px){#cdvx .thumbs{padding:12px 0 0}}',
    '#cdvx .thumbs button{padding:0;border:2px solid transparent;border-radius:10px;overflow:hidden;background:none;opacity:.6;width:60px;height:60px}',
    '#cdvx .thumbs button.on{border-color:var(--wine);opacity:1}#cdvx .thumbs img{width:100%;height:100%;object-fit:cover;display:block}',
    '#cdvx .pp-body{padding:18px max(18px,env(safe-area-inset-right,0px)) 130px max(18px,env(safe-area-inset-left,0px));display:flex;flex-direction:column;gap:18px}',
    '#cdvx .eyebrow{font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:var(--pine);font-weight:700}',
    '#cdvx h1{font-family:"Fraunces",Georgia,serif;font-weight:600;font-size:clamp(28px,6vw,40px);line-height:1.05;margin:4px 0 0;letter-spacing:-.01em;text-wrap:balance}',
    '#cdvx .ref{font-size:12.5px;color:var(--muted);margin-top:6px}',
    '#cdvx .price{font-family:"Fraunces",Georgia,serif;font-size:28px;color:var(--wine);font-weight:600;font-variant-numeric:tabular-nums}',
    '#cdvx .lbl{font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);font-weight:700;margin-bottom:10px}',
    '#cdvx .sws{display:flex;gap:10px;flex-wrap:wrap}',
    '#cdvx .sw{width:36px;height:36px;border-radius:50%;border:3px solid #fff;box-shadow:0 0 0 1px #D9C7B3;padding:0}',
    '#cdvx .sw[aria-pressed="true"]{box-shadow:0 0 0 2px var(--wine)}',
    '#cdvx .swn{font-size:14px;margin-top:8px;font-weight:600}',
    '#cdvx .qty{display:inline-flex;align-items:center;border:1px solid #D9C7B3;border-radius:28px;background:#fff}',
    '#cdvx .qty button{width:44px;height:44px;font-size:20px;background:none;border:0}#cdvx .qty span{min-width:28px;text-align:center;font-weight:700;font-variant-numeric:tabular-nums}',
    '#cdvx .desc{margin:0;font-size:15.5px;line-height:1.65;max-width:62ch}',
    '#cdvx .specs{display:grid;grid-auto-flow:column;grid-auto-columns:1fr;border:1px solid var(--line);border-radius:14px;background:#fff;overflow:hidden}',
    '#cdvx .specs div{padding:12px 8px;text-align:center;border-left:1px solid #F0E2D2}#cdvx .specs div:first-child{border-left:0}',
    '#cdvx .specs b{display:block;font-family:"Fraunces",Georgia,serif;font-size:20px;font-weight:600;font-variant-numeric:tabular-nums}',
    '#cdvx .specs small{font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:.06em}',
    '#cdvx .info{display:flex;flex-direction:column;gap:10px;font-size:14px}#cdvx .info div{display:flex;gap:10px;align-items:flex-start}#cdvx .info svg{flex:0 0 auto;color:var(--pine);margin-top:2px}',
    '#cdvx .note{background:var(--sand);border-radius:14px;padding:16px 18px;font-size:14px;line-height:1.6;color:#4a3c36;display:flex;flex-direction:column;gap:10px;max-width:62ch}#cdvx .note p{margin:0}',
    '#cdvx h2{font-family:"Fraunces",Georgia,serif;font-size:21px;font-weight:600;margin:6px 0 12px}',
    '#cdvx .rel{display:flex;gap:12px;overflow-x:auto;padding-bottom:6px;scrollbar-width:none}#cdvx .rel::-webkit-scrollbar{display:none}',
    '#cdvx .rel a{flex:0 0 136px;color:inherit;text-decoration:none}#cdvx .rel img{width:136px;height:136px;object-fit:cover;border-radius:12px;background:var(--sand);display:block}',
    '#cdvx .rel span{display:block;font-size:13px;margin-top:6px;line-height:1.3}#cdvx .rel em{font-style:normal;color:var(--wine);font-weight:700;font-size:13px}',
    '#cdvx .bar{position:fixed;left:0;right:0;bottom:0;z-index:2147483001;background:#fff;border-top:1px solid var(--line);padding:12px max(16px,env(safe-area-inset-right,0px)) calc(14px + env(safe-area-inset-bottom,0px)) max(16px,env(safe-area-inset-left,0px));display:flex;gap:14px;align-items:center;box-shadow:0 -6px 20px rgba(43,34,32,.08)}',
    '@media (min-width:861px){#cdvx .bar{position:static;border:0;box-shadow:none;padding:0;background:none}}',
    '#cdvx .bar .t{font-size:12px;color:var(--muted)}#cdvx .bar .t b{display:block;font-size:18px;color:var(--ink);font-variant-numeric:tabular-nums}',
    '#cdvx .add{flex:1;min-height:52px;border-radius:28px;border:0;background:var(--wine);color:#fff;font-weight:700;font-size:16px;transition:background .2s ease}#cdvx .add:hover{background:var(--wine-d)}#cdvx .add.ok{background:var(--pine)}',
    // carrito
    '#cdvx .cs{position:fixed;inset:0;z-index:2147483002}',
    '#cdvx .shade{position:absolute;inset:0;background:rgba(43,34,32,.45);border:0;width:100%;padding:0}',
    '#cdvx .sheet{position:absolute;left:0;right:0;bottom:0;max-height:90%;background:var(--cream);border-radius:22px 22px 0 0;display:flex;flex-direction:column;box-shadow:0 -10px 40px rgba(0,0,0,.2)}',
    '@media (min-width:861px){#cdvx .sheet{left:auto;top:0;bottom:0;width:440px;max-height:none;border-radius:0}}',
    '#cdvx .grab{width:40px;height:4px;border-radius:2px;background:#D9C7B3;margin:10px auto 0}',
    '#cdvx .hd{display:flex;justify-content:space-between;align-items:center;padding:10px 18px 12px;border-bottom:1px solid #F0E2D2}',
    '#cdvx .hd h3{font-family:"Fraunces",Georgia,serif;font-size:24px;font-weight:600;margin:0}',
    '#cdvx .ls{overflow-y:auto;padding:4px 18px;flex:1;-webkit-overflow-scrolling:touch}',
    '#cdvx .it{display:grid;grid-template-columns:72px minmax(0,1fr) auto;gap:12px;padding:14px 0;border-bottom:1px solid #F0E2D2;align-items:center}',
    '#cdvx .it img{width:72px;height:72px;border-radius:12px;object-fit:cover;background:var(--sand)}',
    '#cdvx .nm{font-weight:700;font-size:15px;line-height:1.25}',
    '#cdvx .mt{font-size:12.5px;color:var(--muted);margin-top:3px;display:flex;align-items:center;gap:6px}#cdvx .mt i{width:12px;height:12px;border-radius:50%;box-shadow:0 0 0 1px #D9C7B3;display:inline-block}',
    '#cdvx .it .qty{margin-top:8px}#cdvx .it .qty button{width:34px;height:34px;font-size:17px}#cdvx .it .qty span{min-width:22px}',
    '#cdvx .pr{text-align:right;font-weight:700;font-variant-numeric:tabular-nums}#cdvx .pr button{display:block;margin:10px 0 0 auto;background:none;border:0;padding:4px 0;font-size:12.5px;color:var(--wine);text-decoration:underline}',
    '#cdvx .empty{padding:36px 8px;text-align:center;color:var(--muted)}',
    '#cdvx .ft{padding:14px 18px calc(18px + env(safe-area-inset-bottom,0px));border-top:1px solid var(--line);background:#fff;display:flex;flex-direction:column;gap:10px}',
    '#cdvx .row{display:flex;justify-content:space-between;align-items:baseline;font-family:"Fraunces",Georgia,serif;font-size:22px;font-weight:600;font-variant-numeric:tabular-nums}',
    '#cdvx .sm{font-size:12.5px;color:var(--muted);line-height:1.45}',
    '#cdvx .mayor{background:var(--sand);border-radius:10px;padding:10px 12px;font-size:12.5px;line-height:1.45}#cdvx .mayor a{color:var(--wine);font-weight:700}',
    '#cdvx .go{min-height:54px;border-radius:28px;border:0;background:#1F7A4D;color:#fff;font-weight:700;font-size:16px;display:flex;align-items:center;justify-content:center;gap:10px;text-decoration:none}',
    '#cdvx .go[aria-disabled="true"]{opacity:.45;pointer-events:none}#cdvx .go.wait{opacity:.6}',
    '#cdvx .scroll{flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;min-height:0}#cdvx .scroll .ls{overflow:visible;flex:none}',
    '#cdvx .datos{padding:6px 18px 18px;display:flex;flex-direction:column;gap:10px}',
    '#cdvx .datos h4{font-family:"Fraunces",Georgia,serif;font-size:18px;font-weight:600;margin:10px 0 0}',
    '#cdvx .datos .sub{font-size:12.5px;color:var(--muted);margin:-6px 0 2px}',
    '#cdvx .datos label.f{display:flex;flex-direction:column;gap:4px;font-size:12px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:var(--muted)}',
    '#cdvx .datos input[type=text],#cdvx .datos input[type=email],#cdvx .datos input[type=tel]{font:16px "Nunito Sans",system-ui,sans-serif;color:var(--ink);background:#fff;border:1px solid #D9C7B3;border-radius:12px;padding:12px 14px;min-height:48px;width:100%;text-transform:none;letter-spacing:0}',
    '#cdvx .datos input:focus{outline:2px solid var(--gold);outline-offset:1px;border-color:var(--gold)}',
    '#cdvx .datos input.bad{border-color:var(--wine);background:#FFF3F3}',
    '#cdvx .datos .ok{display:flex;gap:10px;align-items:flex-start;font-size:13px;line-height:1.45;color:var(--ink);cursor:pointer}',
    '#cdvx .datos .ok input{width:20px;height:20px;margin:1px 0 0;flex:0 0 auto;accent-color:var(--wine)}',
    '#cdvx .datos .ok.bad{color:var(--wine)}#cdvx .datos .ok a{color:var(--wine);font-weight:700}',
    '#cdvx .err{background:#FFF3F3;border:1px solid #E7B8BC;color:var(--wine);border-radius:10px;padding:10px 12px;font-size:13px}',
    '#cdvx .pv{position:fixed;inset:0;z-index:2147483003;background:var(--cream);overflow-y:auto;-webkit-overflow-scrolling:touch}',
    '#cdvx .pv-in{max-width:720px;margin:0 auto;padding:16px max(18px,env(safe-area-inset-right,0px)) 60px max(18px,env(safe-area-inset-left,0px))}',
    '#cdvx .pv h2{font-size:26px;margin:14px 0 6px}#cdvx .pv h3{font-family:"Fraunces",Georgia,serif;font-size:18px;font-weight:600;margin:20px 0 6px}#cdvx .pv p{margin:0 0 10px;font-size:15px;line-height:1.65;max-width:65ch}',
    '#cdvx .kp{background:none;border:0;font-size:14px;text-decoration:underline;padding:6px}',
    '@media (prefers-reduced-motion:reduce){#cdvx *{transition:none!important}}'
  ].join('\n');
  document.head.appendChild(xs);

  var ICON_BACK = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>';
  var ICON_X = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  var ICON_TRUCK = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/></svg>';
  var ICON_BANK = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 10l9-5 9 5M5 10v8M19 10v8M9.5 10v8M14.5 10v8M3 20h18"/></svg>';
  var ICON_HAND = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3c1.5 2 3 3.6 3 5.6A3 3 0 0 1 12 12a3 3 0 0 1-3-3.4C9 6.6 10.5 5 12 3zM8 14h8v7H8z"/></svg>';

  var curRef = null, curSig = '';
  var ppEl = null, csEl = null, pushed = false, lastFocus = null, scrollY0 = 0;
  function lockScroll(on) {
    if (on) { scrollY0 = window.pageYOffset; document.documentElement.style.overflow = 'hidden'; document.body.style.overflow = 'hidden'; }
    else if (!ppEl && !csEl) { document.documentElement.style.overflow = ''; document.body.style.overflow = ''; }
  }

  function openProduct(r, fromHistory) {
    var p = byRef(r);
    if (!p) return false;
    closeCart(true);
    if (!ppEl) lastFocus = document.activeElement;
    if (ppEl) ppEl.remove();
    curRef = p.r; curSig = JSON.stringify(p);
    var imgs = (p.fs.length ? p.fs.map(imgUrl) : [p.img]).map(bigImg);
    var cols = colorsFor(p);
    var sel = cols[0][0], q = 1;
    var specs = [];
    if (p.a) specs.push('<div><b>' + cm(p.a) + '</b><small>Alto</small></div>');
    if (p.w) specs.push('<div><b>' + cm(p.w) + '</b><small>Ancho</small></div>');
    if (p.g) specs.push('<div><b>' + p.g + ' g</b><small>Cera</small></div>');
    var rel = PRODUCTS.filter(function (o) { return o.c === p.c && o.r !== p.r; }).slice(0, 8);
    ppEl = document.createElement('div');
    ppEl.className = 'pp';
    ppEl.setAttribute('role', 'dialog');
    ppEl.setAttribute('aria-modal', 'true');
    ppEl.setAttribute('aria-label', p.n);
    ppEl.innerHTML =
      '<div class="pp-top"><button type="button" class="ib" data-x="close" aria-label="Volver al catálogo">' + ICON_BACK + '</button>' +
        '<span class="crumb">' + esc(p.cn || 'Catálogo') + '</span>' +
        '<button type="button" class="ib" data-cart="open" aria-label="Ver carrito">' + ICON_CART + '<b class="cbadge" hidden>0</b></button></div>' +
      '<div class="pp-in">' +
        '<div><div class="gal"><div class="track">' + imgs.map(function (u, i) { return '<img src="' + esc(u) + '" alt="' + esc(p.n) + (imgs.length > 1 ? ', foto ' + (i + 1) : '') + '"' + (i ? ' loading="lazy"' : '') + '>'; }).join('') + '</div>' +
          (imgs.length > 1 ? '<span class="cnt">1 / ' + imgs.length + '</span>' : '') + '</div>' +
          (imgs.length > 1 ? '<div class="thumbs">' + imgs.map(function (u, i) { return '<button type="button" data-i="' + i + '"' + (i ? '' : ' class="on"') + ' aria-label="Ver foto ' + (i + 1) + '"><img src="' + esc(u.replace(/=w\d+$/, '=w200')) + '" alt=""></button>'; }).join('') + '</div>' : '') +
        '</div>' +
        '<div class="pp-body">' +
          '<div><div class="eyebrow">Colección ' + esc(p.cn || '') + '</div><h1>' + esc(p.n) + '</h1><div class="ref">Ref. ' + ref3(p.r) + ' · Hecha a mano en Medellín</div></div>' +
          '<div class="price">' + money(p.p) + '</div>' +
          '<div><div class="lbl">Color</div><div class="sws">' + cols.map(function (c, i) { return '<button type="button" class="sw" data-c="' + esc(c[0]) + '" style="background:' + c[1] + '" aria-label="' + esc(c[0]) + '" aria-pressed="' + (i ? 'false' : 'true') + '"></button>'; }).join('') + '</div><div class="swn">' + esc(sel) + '</div></div>' +
          '<div><div class="lbl">Cantidad</div><div class="qty"><button type="button" data-q="-1" aria-label="Menos">−</button><span>1</span><button type="button" data-q="1" aria-label="Más">+</button></div></div>' +
          (p.x ? '<p class="desc">' + esc(p.x) + '</p>' : '') +
          (specs.length ? '<div class="specs">' + specs.join('') + '</div>' : '') +
          '<div class="info"><div>' + ICON_TRUCK + '<span><b>Envíos a toda Colombia.</b> Tu pedido está listo en unos 7 días.</span></div>' +
            '<div>' + ICON_BANK + '<span><b>Pago por transferencia</b> Bancolombia, al confirmar tu pedido por WhatsApp.</span></div>' +
            '<div>' + ICON_HAND + '<span><b>Hecha a mano en Medellín.</b></span></div></div>' +
          '<div class="note"><p>Nuestras velas están elaboradas artesanalmente con cera de origen vegetal, reflejando nuestro compromiso con una producción más consciente con el medio ambiente.</p>' +
            '<p>Cada vela es hecha y decorada a mano en nuestro taller en Medellín. Por su proceso artesanal, pueden presentar ligeras variaciones en los colores y diseños, haciendo de cada pieza una creación única y especial.</p></div>' +
          '<div class="bar"><div class="t">Total<b class="tt">' + money(p.p) + '</b></div><button type="button" class="add">Agregar al carrito</button></div>' +
          (rel.length ? '<div><h2>También te puede gustar</h2><div class="rel">' + rel.map(function (o) { return '<a href="' + prodHref(o) + '" data-vela="' + o.r + '"><img loading="lazy" src="' + esc(o.img) + '" alt=""><span>' + esc(o.n) + '</span><em>' + money(o.p) + '</em></a>'; }).join('') + '</div></div>' : '') +
        '</div>' +
      '</div>';
    X.appendChild(ppEl);
    lockScroll(true);
    updateBadges();

    var tr = ppEl.querySelector('.track'), cnt = ppEl.querySelector('.cnt'), th = [].slice.call(ppEl.querySelectorAll('.thumbs button'));
    // Si una foto de la galería no carga, se usa la foto principal del catálogo; si esa tampoco, se quita
    [].slice.call(ppEl.querySelectorAll('.track img, .thumbs img')).forEach(function (im) {
      im.addEventListener('error', function () {
        var main = im.closest('.thumbs') ? p.img.replace(/=w\d+$/, '=w200') : bigImg(p.img);
        if (!im.getAttribute('data-fb') && im.src !== main) { im.setAttribute('data-fb', '1'); im.src = main; return; }
        var b = im.closest('.thumbs button'); if (b) b.hidden = true; else im.style.objectFit = 'contain';
      });
    });
    tr.addEventListener('scroll', function () {
      var i = Math.round(tr.scrollLeft / Math.max(1, tr.clientWidth));
      if (cnt) cnt.textContent = (i + 1) + ' / ' + imgs.length;
      th.forEach(function (b, k) { b.classList.toggle('on', k === i); });
    }, { passive: true });
    th.forEach(function (b) { b.addEventListener('click', function () { tr.scrollTo({ left: tr.clientWidth * Number(b.getAttribute('data-i')), behavior: 'smooth' }); }); });
    var sws = [].slice.call(ppEl.querySelectorAll('.sw')), swn = ppEl.querySelector('.swn');
    sws.forEach(function (b) { b.addEventListener('click', function () { sel = b.getAttribute('data-c'); sws.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); }); swn.textContent = sel; }); });
    var qn = ppEl.querySelector('.qty span'), tt = ppEl.querySelector('.tt');
    [].slice.call(ppEl.querySelectorAll('[data-q]')).forEach(function (b) { b.addEventListener('click', function () { q = Math.max(1, Math.min(99, q + Number(b.getAttribute('data-q')))); qn.textContent = q; tt.textContent = money(p.p * q); }); });
    var add = ppEl.querySelector('.add'), addT = null;
    add.addEventListener('click', function () {
      addToCart(p, sel, q);
      add.textContent = '✓ Agregada al carrito'; add.classList.add('ok');
      clearTimeout(addT); addT = setTimeout(function () { if (add) { add.textContent = 'Agregar al carrito'; add.classList.remove('ok'); } }, 1600);
    });
    ppEl.scrollTop = 0;
    if (!fromHistory) {
      try {
        var url = location.pathname + '?vela=' + ref3(p.r);
        if (pushed) history.replaceState({ cdvVela: p.r }, '', url);
        else { history.pushState({ cdvVela: p.r }, '', url); pushed = true; }
      } catch (e) {}
    }
    var back = ppEl.querySelector('[data-x="close"]'); if (back) back.focus({ preventScroll: true });
    pix('ViewContent', { content_ids: [ref3(p.r)], content_type: 'product', content_name: p.n, content_category: p.cn, value: p.p, currency: 'COP' });
    return true;
  }
  function closeProduct(fromHistory) {
    if (!ppEl) return;
    ppEl.remove(); ppEl = null; curRef = null;
    lockScroll(false);
    if (!fromHistory) {
      if (pushed) { pushed = false; try { history.back(); } catch (e) {} }
      else { try { history.replaceState(null, '', location.pathname); } catch (e) {} }
    }
    if (lastFocus && lastFocus.focus) try { lastFocus.focus({ preventScroll: true }); } catch (e) {}
    window.scrollTo(0, scrollY0);
  }

  function cartMessage() {
    var L = cartLines();
    var d = datos;
    return 'Hola Cielo de Velas, quiero hacer este pedido:\n' +
      (d.nombre ? 'Nombre: ' + d.nombre + '\nCiudad: ' + d.ciudad + '\nCorreo: ' + d.email + '\nWhatsApp: ' + d.whatsapp + '\n\n' : '') +
      L.map(function (l) { return '• ' + l.q + ' × ' + l.p.n + ' (Ref. ' + ref3(l.p.r) + '), color ' + l.c + ': ' + money(l.p.p * l.q); }).join('\n') +
      '\nTotal velas: ' + money(cartTotal()) + '\nEnvío: por confirmar\n(Código web CARRITO)';
  }
  function renderCart() {
    if (!csEl) return;
    var L = cartLines(), n = cartCount();
    var hex = {}; COLORS.forEach(function (c) { hex[c[0]] = c[1]; });
    csEl.querySelector('.cn').textContent = n ? n + (n === 1 ? ' vela' : ' velas') : '';
    csEl.querySelector('.ls').innerHTML = L.length ? L.map(function (l, k) {
      return '<div class="it"><a href="' + prodHref(l.p) + '" data-vela="' + l.p.r + '"><img src="' + esc(l.p.img) + '" alt=""></a><div><div class="nm">' + esc(l.p.n) + '</div>' +
        '<div class="mt"><i style="background:' + (hex[l.c] || '#fff') + '"></i>' + esc(l.c) + ' · Ref. ' + ref3(l.p.r) + '</div>' +
        '<div class="qty"><button type="button" data-k="' + k + '" data-d="-1" aria-label="Menos">−</button><span>' + l.q + '</span><button type="button" data-k="' + k + '" data-d="1" aria-label="Más">+</button></div></div>' +
        '<div class="pr">' + money(l.p.p * l.q) + '<button type="button" data-del="' + k + '">Quitar</button></div></div>';
    }).join('') : '<div class="empty">Tu carrito está vacío.<br>Toca una vela del catálogo para elegir el color y agregarla.</div>';
    csEl.querySelector('.tot').textContent = money(cartTotal());
    var go = csEl.querySelector('.go');
    go.setAttribute('aria-disabled', L.length ? 'false' : 'true');
    var dz = csEl.querySelector('.datos'); if (dz) dz.hidden = !L.length;
    refreshGo();
    updateBadges();
  }
  // ---------- datos del cliente (Ley 1581: solo se guardan si acepta) ----------
  var DATOS_KEY = 'cdv_datos_v1';
  var datos = { nombre: '', ciudad: '', email: '', whatsapp: '' };
  try { var dsv = JSON.parse(localStorage.getItem(DATOS_KEY) || 'null'); if (dsv) Object.keys(datos).forEach(function (k) { datos[k] = String(dsv[k] || ''); }); } catch (e) {}
  function telDigits(s) { var d = String(s || '').replace(/\D/g, ''); if (d.length === 12 && d.indexOf('57') === 0) d = d.slice(2); return d; }
  function readDatos() {
    if (!csEl) return;
    ['nombre', 'ciudad', 'email', 'whatsapp'].forEach(function (k) { var i = csEl.querySelector('#cdv-' + k); if (i) datos[k] = i.value.replace(/\s+/g, ' ').trim(); });
    try { localStorage.setItem(DATOS_KEY, JSON.stringify(datos)); } catch (e) {}
  }
  function datosErrores() {
    var e = [];
    if (datos.nombre.length < 2) e.push('nombre');
    if (datos.ciudad.length < 2) e.push('ciudad');
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(datos.email)) e.push('email');
    var t = telDigits(datos.whatsapp); if (t.length < 7 || t.length > 13) e.push('whatsapp');
    var ac = csEl && csEl.querySelector('#cdv-acepta'); if (!ac || !ac.checked) e.push('acepta');
    return e;
  }
  function refreshGo() {
    if (!csEl) return;
    var go = csEl.querySelector('.go');
    var okDatos = !datosErrores().length;
    go.classList.toggle('wait', !okDatos);
    go.setAttribute('href', cartLines().length && okDatos ? waLink(cartMessage()) : '#');
  }
  function showErrores(errs) {
    var nombres = { nombre: 'tu nombre', ciudad: 'tu ciudad', email: 'un correo válido', whatsapp: 'tu número de WhatsApp', acepta: 'aceptar la política de datos' };
    ['nombre', 'ciudad', 'email', 'whatsapp'].forEach(function (k) { var i = csEl.querySelector('#cdv-' + k); if (i) i.classList.toggle('bad', errs.indexOf(k) > -1); });
    var ok = csEl.querySelector('.datos .ok'); if (ok) ok.classList.toggle('bad', errs.indexOf('acepta') > -1);
    var box = csEl.querySelector('.datos .err');
    box.textContent = 'Para enviar tu pedido falta: ' + errs.map(function (k) { return nombres[k]; }).join(', ') + '.';
    box.hidden = false;
    var first = errs[0] === 'acepta' ? csEl.querySelector('#cdv-acepta') : csEl.querySelector('#cdv-' + errs[0]);
    if (first) { first.scrollIntoView({ block: 'center' }); try { first.focus({ preventScroll: true }); } catch (e) {} }
  }
  function enviarDatos() {
    var payload = JSON.stringify({ nombre: datos.nombre, ciudad: datos.ciudad, email: datos.email, whatsapp: datos.whatsapp, acepta: true,
      items: cartLines().map(function (l) { return { r: l.p.r, n: l.p.n, c: l.c, q: l.q, p: l.p.p }; }) });
    if (FEED.indexOf('http') !== 0) return;
    try {
      if (navigator.sendBeacon && navigator.sendBeacon(FEED, new Blob([payload], { type: 'text/plain;charset=utf-8' }))) return;
    } catch (e) {}
    try { fetch(FEED, { method: 'POST', mode: 'no-cors', keepalive: true, headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: payload }); } catch (e) {}
  }
  function openPrivacy() {
    var old = X.querySelector('.pv'); if (old) old.remove();
    var pv = document.createElement('div');
    pv.className = 'pv'; pv.setAttribute('role', 'dialog'); pv.setAttribute('aria-modal', 'true'); pv.setAttribute('aria-label', 'Política de privacidad');
    pv.innerHTML = '<div class="pp-top"><button type="button" class="ib" data-x="priv" aria-label="Cerrar">' + ICON_BACK + '</button><span class="crumb">Privacidad</span><span style="width:42px"></span></div>' +
      '<div class="pv-in"><h2>Política de tratamiento de datos personales</h2>' +
      '<p>Cielo de Velas cumple la Ley 1581 de 2012 y el Decreto 1377 de 2013 de Colombia sobre protección de datos personales.</p>' +
      '<h3>Responsable</h3><p>Cielo de Velas (Laura Foti), Medellín, Colombia. Correo: cielodevelas@gmail.com · WhatsApp: +57 322 591 1307.</p>' +
      '<h3>Qué datos recogemos</h3><p>Cuando envías un pedido desde la página: tu nombre, ciudad, correo electrónico y número de WhatsApp, junto con las velas que elegiste.</p>' +
      '<h3>Para qué los usamos</h3><p>Para atender y coordinar tu pedido: confirmarlo, cotizar el envío, hacer la factura si la pides y entregarlo. También para contarte de vez en cuando sobre nuevas colecciones y temporadas; puedes pedirnos que no te escribamos más en cualquier momento.</p>' +
      '<p>No vendemos tus datos. Solo los compartimos con la transportadora cuando hay un envío, y únicamente lo necesario para entregarlo.</p>' +
      '<h3>Tus derechos</h3><p>Puedes conocer, actualizar y corregir tus datos, pedir que los borremos y retirar tu autorización. Escríbenos a cielodevelas@gmail.com o por WhatsApp y te respondemos en un máximo de 15 días hábiles.</p>' +
      '<h3>Medición de la página</h3><p>Usamos herramientas de medición (Meta Pixel y Microsoft Clarity) para entender cómo se usa la página y mejorar nuestros anuncios. Estas herramientas no reciben tu nombre, correo ni teléfono desde nuestro formulario.</p>' +
      '<h3>Vigencia</h3><p>Esta política rige desde noviembre de 2026.</p></div>';
    X.appendChild(pv);
    var b = pv.querySelector('.ib'); if (b) b.focus({ preventScroll: true });
  }
  function openCart() {
    if (csEl) return;
    csEl = document.createElement('div');
    csEl.className = 'cs';
    csEl.innerHTML = '<button type="button" class="shade" data-x="cart" aria-label="Cerrar carrito"></button>' +
      '<div class="sheet" role="dialog" aria-modal="true" aria-label="Tu pedido"><div class="grab" aria-hidden="true"></div>' +
      '<div class="hd"><div><h3>Tu pedido</h3><span class="sm cn"></span></div><button type="button" class="ib" data-x="cart" aria-label="Cerrar carrito">' + ICON_X + '</button></div>' +
      '<div class="scroll"><div class="ls"></div>' +
      '<div class="datos"><h4>Tus datos para el pedido</h4><p class="sub">Los usamos solo para atender tu pedido.</p>' +
        '<label class="f">Nombre<input type="text" id="cdv-nombre" autocomplete="name" maxlength="80" value="' + esc(datos.nombre) + '"></label>' +
        '<label class="f">Ciudad<input type="text" id="cdv-ciudad" autocomplete="address-level2" maxlength="60" value="' + esc(datos.ciudad) + '"></label>' +
        '<label class="f">Correo<input type="email" id="cdv-email" autocomplete="email" inputmode="email" maxlength="100" value="' + esc(datos.email) + '"></label>' +
        '<label class="f">WhatsApp<input type="tel" id="cdv-whatsapp" autocomplete="tel" inputmode="tel" maxlength="20" placeholder="300 123 4567" value="' + esc(datos.whatsapp) + '"></label>' +
        '<label class="ok"><input type="checkbox" id="cdv-acepta"><span>Acepto el tratamiento de mis datos personales según la <a href="#" data-priv="1">política de privacidad</a> (Ley 1581 de 2012).</span></label>' +
        '<div class="err" role="alert" hidden></div></div></div>' +
      '<div class="ft"><div class="row"><span>Total</span><span class="tot"></span></div>' +
        '<div class="sm">El envío se confirma por WhatsApp según tu ciudad. Pago por transferencia Bancolombia.</div>' +
        '<div class="mayor">Para pedidos al por mayor, <a href="' + WHOLESALE + '" target="_blank" rel="noopener" data-fb="mayor">escríbenos</a> y te damos el precio.</div>' +
        '<a class="go" target="_blank" rel="noopener" href="#">' + ICON_WA + 'Enviar pedido por WhatsApp</a>' +
        '<button type="button" class="kp" data-x="cart">Seguir viendo velas</button></div></div>';
    X.appendChild(csEl);
    lockScroll(true);
    renderCart();
    csEl.querySelector('.datos').addEventListener('input', function () { readDatos(); refreshGo(); var b = csEl.querySelector('.datos .err'); if (b && !b.hidden && !datosErrores().length) b.hidden = true; });
    csEl.querySelector('#cdv-acepta').addEventListener('change', function () { refreshGo(); var b = csEl.querySelector('.datos .err'); if (b && !b.hidden && !datosErrores().length) b.hidden = true; });
    var c = csEl.querySelector('.hd .ib'); if (c) c.focus({ preventScroll: true });
  }
  function closeCart(silent) {
    if (!csEl) return;
    csEl.remove(); csEl = null;
    lockScroll(false);
    if (!silent && !ppEl) window.scrollTo(0, scrollY0);
  }

  // Clics: abrir vela, abrir carrito, cerrar, cantidades del carrito
  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var t = e.target;
    var v = t.closest && t.closest('[data-vela]');
    if (v && (ROOT.contains(v) || X.contains(v))) {
      e.preventDefault();
      if (openProduct(v.getAttribute('data-vela'))) return;
    }
    var oc = t.closest && t.closest('[data-cart="open"]');
    if (oc && (ROOT.contains(oc) || X.contains(oc))) { e.preventDefault(); e.stopImmediatePropagation(); openCart(); return; }
    if (!X.contains(t)) return;
    var pl = t.closest('[data-priv]');
    if (pl) { e.preventDefault(); openPrivacy(); return; }
    var xb = t.closest('[data-x]');
    if (xb) { e.preventDefault(); var w = xb.getAttribute('data-x'); if (w === 'priv') { var pv = X.querySelector('.pv'); if (pv) pv.remove(); } else if (w === 'cart') closeCart(); else closeProduct(); return; }
    var d = t.closest('[data-d]');
    if (d) { var l = cartLines()[Number(d.getAttribute('data-k'))]; if (l) { cart.forEach(function (c) { if (c.r === l.p.r && c.c === l.c) c.q = Math.max(1, Math.min(99, c.q + Number(d.getAttribute('data-d')))); }); saveCart(); renderCart(); } return; }
    var del = t.closest('[data-del]');
    if (del) { var m = cartLines()[Number(del.getAttribute('data-del'))]; if (m) { cart = cart.filter(function (c) { return !(c.r === m.p.r && c.c === m.c); }); saveCart(); renderCart(); } return; }
    var go = t.closest('a.go');
    if (go && go.getAttribute('aria-disabled') !== 'true') {
      readDatos();
      var errs = datosErrores();
      if (errs.length) { e.preventDefault(); showErrores(errs); return; }
      go.setAttribute('href', waLink(cartMessage()));
      enviarDatos();
      var L = cartLines();
      pix('InitiateCheckout', { content_ids: L.map(function (x) { return ref3(x.p.r); }), content_type: 'product', num_items: cartCount(), value: cartTotal(), currency: 'COP' });
      pix('Contact', { content_category: 'pedido_carrito', value: cartTotal(), currency: 'COP' });
      return;
    }
    var my = t.closest('a[data-fb="mayor"]');
    if (my) pix('Contact', { content_category: 'pedido_mayor' });
  }, true);
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var pv = X.querySelector('.pv');
    if (pv) pv.remove(); else if (csEl) closeCart(); else if (ppEl) closeProduct();
  });
  window.addEventListener('popstate', function (e) {
    var r = e.state && e.state.cdvVela;
    if (r) { pushed = true; openProduct(r, true); }
    else { pushed = false; closeCart(true); closeProduct(true); }
  });
  // Abrir directo desde un enlace compartido: cielodevelas.com/?vela=071
  var wantVela = (location.search.match(/[?&]vela=(\d{1,4})/) || [])[1];
  function shopAfterFeed() {
    updateBadges();
    if (csEl) renderCart();
    if (ppEl && curRef && byRef(curRef) && JSON.stringify(byRef(curRef)) !== curSig) { var y = ppEl.scrollTop; openProduct(curRef, true); ppEl.scrollTop = y; }
    if (wantVela && byRef(wantVela)) {
      try { history.replaceState(null, '', location.pathname); history.pushState({ cdvVela: Number(wantVela) }, '', location.pathname + '?vela=' + ref3(wantVela)); pushed = true; } catch (e) {}
      openProduct(wantVela, true);
      wantVela = null;
    }
  }
  updateBadges();
  if (wantVela && byRef(wantVela)) shopAfterFeed();

  function applyFeed(items, temporada) {
    var next = normalize(items);
    if (!next.length) return;
    PRODUCTS = next;
    if (temporada) SEASON = temporada;
    ROOT.querySelector('#cdv-total').textContent = PRODUCTS.length;
    renderSeason(); renderTabs(); renderGrid();
    shopAfterFeed();
  }
  if (FEED.indexOf('http') === 0 && window.fetch) {
    var ctrl = window.AbortController ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 8000);
    fetch(FEED, { credentials: 'omit', signal: ctrl ? ctrl.signal : undefined })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        clearTimeout(timer);
        if (!d || !d.items) return;
        applyFeed(d.items, d.temporada);
        try { localStorage.setItem(CACHE_KEY, JSON.stringify(d)); } catch (e) {}
      })
      .catch(function () { clearTimeout(timer); });
  }
})();
