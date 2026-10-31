/* Cielo de Velas: sitio de catálogo para Carrd. Datos de precios: hoja "Cielo_de_Velas_-_Ventas_y_Gastos", pestaña Catálogo. */
(function () {
  var ROOT = document.getElementById('cdv');
  if (!ROOT) return;

  var BASE = 'https://cdn.jsdelivr.net/gh/jsf2907/cielodevelas-assets@v1/';
  var IMG = BASE + 'img/';
  var WA = '573225911307';
  var IG = 'https://www.instagram.com/cielo.develas';
  var PRODUCTS = [{"s":"ondulada","n":"Ondulada","c":"arte","p":21000,"v":11},{"s":"torre-romana","n":"Torre Romana","c":"arte","p":43000,"v":0},{"s":"waves","n":"Waves","c":"arte","p":30000,"v":0},{"s":"infinito","n":"Infinito","c":"arte","p":60000,"v":0},{"s":"nosotros","n":"Nosotros","c":"arte","p":39000,"v":0},{"s":"cubo-burbuja-l","n":"Cubo Burbuja L","c":"arte","p":68000,"v":0},{"s":"cubo-burbuja-xl","n":"Cubo Burbuja XL","c":"arte","p":85000,"v":0},{"s":"cilindro-tallado-grande","n":"Cilindro Tallado Grande","c":"arte","p":50000,"v":1},{"s":"trenza","n":"Trenza","c":"arte","p":24000,"v":1},{"s":"doble-u","n":"Doble U","c":"arte","p":32000,"v":3},{"s":"cilindro-ese","n":"Cilindro Ese","c":"arte","p":25000,"v":12},{"s":"muse-30","n":"Musé 30","c":"arte","p":23000,"v":0},{"s":"cilindro-lluvia","n":"Cilindro Lluvia","c":"arte","p":54000,"v":3},{"s":"rayas-delgado","n":"Rayas Delgado","c":"arte","p":20000,"v":0},{"s":"rayas-grueso","n":"Rayas Grueso","c":"arte","p":27000,"v":0},{"s":"aura","n":"Aura","c":"arte","p":50000,"v":0},{"s":"arcoiris-m","n":"Arcoíris M","c":"arte","p":39000,"v":0},{"s":"arcoiris-l","n":"Arcoíris L","c":"arte","p":74000,"v":0},{"s":"twins","n":"Twins","c":"arte","p":55000,"v":1},{"s":"set-matisse","n":"Set Matisse","c":"arte","p":64000,"v":0},{"s":"david","n":"David","c":"arte","p":21000,"v":0},{"s":"el","n":"Él","c":"arte","p":27000,"v":0},{"s":"ella","n":"Ella","c":"arte","p":25000,"v":30},{"s":"sagrada-familia","n":"Sagrada Familia","c":"creencias","p":25000,"v":39},{"s":"jesus","n":"Jesús","c":"creencias","p":23000,"v":6},{"s":"cristo","n":"Cristo","c":"creencias","p":49000,"v":0},{"s":"buda","n":"Buda","c":"creencias","p":30000,"v":2},{"s":"manos-bondadosas","n":"Manos Bondadosas","c":"creencias","p":20000,"v":0},{"s":"mama","n":"Mamá","c":"creencias","p":30000,"v":0},{"s":"virgencita","n":"Virgencita","c":"creencias","p":22000,"v":0},{"s":"virgen-maria","n":"Virgen María","c":"creencias","p":22000,"v":8},{"s":"angel-geometrico","n":"Ángel Geométrico","c":"creencias","p":18000,"v":0},{"s":"angel-corazon","n":"Ángel Corazón","c":"creencias","p":22000,"v":0},{"s":"angel-dormido","n":"Ángel Dormido","c":"creencias","p":29000,"v":0},{"s":"pequeno-angel","n":"Pequeño Ángel","c":"creencias","p":9000,"v":0},{"s":"querubin","n":"Querubín","c":"creencias","p":17000,"v":0},{"s":"sol-y-luna","n":"Sol y Luna","c":"creencias","p":18000,"v":0},{"s":"gemelos","n":"Gemelos","c":"creencias","p":17000,"v":0},{"s":"cera-de-abeja","n":"Cera de Abeja","c":"creencias","p":10000,"v":0},{"s":"primera-comunion","n":"Primera Comunión","c":"creencias","p":20000,"v":0},{"s":"cisne","n":"Cisne","c":"animalitos","p":24000,"v":0},{"s":"pato","n":"Pato","c":"animalitos","p":23000,"v":0},{"s":"oveja","n":"Oveja","c":"animalitos","p":39000,"v":0},{"s":"caballito-de-mar","n":"Caballito de Mar","c":"animalitos","p":20000,"v":0},{"s":"perrito-y-gatico-cielo","n":"Perrito y Gatico Cielo","c":"animalitos","p":27000,"v":1},{"s":"gato-sentado","n":"Gato Sentado","c":"animalitos","p":23000,"v":1},{"s":"elefante-bebe","n":"Elefante Bebé","c":"animalitos","p":21000,"v":0},{"s":"cat-majesty","n":"Cat Majesty","c":"animalitos","p":31000,"v":0},{"s":"mariposa","n":"Mariposa","c":"animalitos","p":19000,"v":0},{"s":"conejito","n":"Conejito","c":"animalitos","p":21000,"v":0},{"s":"pomerania","n":"Pomerania","c":"animalitos","p":24000,"v":5},{"s":"bulldog","n":"Bulldog","c":"animalitos","p":17000,"v":0},{"s":"lobo","n":"Lobo","c":"animalitos","p":78000,"v":0},{"s":"perrito","n":"Perrito","c":"animalitos","p":29000,"v":0},{"s":"monito","n":"Monito","c":"animalitos","p":19000,"v":0},{"s":"cerdito","n":"Cerdito","c":"animalitos","p":25000,"v":0},{"s":"llama","n":"Llama","c":"animalitos","p":20000,"v":0},{"s":"labrador","n":"Labrador","c":"animalitos","p":28000,"v":0},{"s":"ardilla","n":"Ardilla","c":"animalitos","p":26000,"v":0},{"s":"leon","n":"León","c":"animalitos","p":35000,"v":1},{"s":"delfin","n":"Delfín","c":"animalitos","p":22000,"v":0},{"s":"huella","n":"Huella","c":"animalitos","p":25000,"v":0},{"s":"caballo","n":"Caballo","c":"animalitos","p":22000,"v":0},{"s":"papa-noel","n":"Papá Noel","c":"navidad","p":31000,"v":0},{"s":"dulce-navidad","n":"Dulce Navidad","c":"navidad","p":24000,"v":0},{"s":"arbolito","n":"Arbolito","c":"navidad","p":23000,"v":1},{"s":"arbol-cilindro","n":"Árbol Cilindro","c":"navidad","p":25000,"v":0},{"s":"arbol-bolitas","n":"Árbol Bolitas","c":"navidad","p":22000,"v":0},{"s":"gnomo","n":"Gnomo","c":"navidad","p":26000,"v":0},{"s":"copito-de-nieve","n":"Copito de Nieve","c":"navidad","p":20000,"v":5},{"s":"muneco-de-nieve","n":"Muñeco de Nieve","c":"navidad","p":28000,"v":0},{"s":"pina","n":"Piña","c":"navidad","p":27000,"v":0},{"s":"reno-3d","n":"Reno 3D","c":"navidad","p":31000,"v":0},{"s":"candle-christmas","n":"Candle Christmas","c":"navidad","p":40000,"v":0},{"s":"cascanueces","n":"Cascanueces","c":"navidad","p":26000,"v":0},{"s":"reno","n":"Reno","c":"navidad","p":21000,"v":0},{"s":"6-deseos","n":"6 Deseos","c":"navidad","p":50000,"v":91},{"s":"casita-navidena","n":"Casita Navideña","c":"navidad","p":25000,"v":0},{"s":"velitas-santa-x6","n":"Velitas Santa x6","c":"navidad","p":41000,"v":0},{"s":"calabaza","n":"Calabaza","c":"halloween","p":22000,"v":0},{"s":"calavera","n":"Calavera","c":"halloween","p":25000,"v":0},{"s":"fantasma-boo","n":"Fantasma Boo","c":"halloween","p":29000,"v":0},{"s":"oso-corazon","n":"Oso Corazón","c":"osos","p":46000,"v":2},{"s":"oso-bebe","n":"Oso Bebé","c":"osos","p":28000,"v":0},{"s":"teddy-mini","n":"Teddy Mini","c":"osos","p":9000,"v":0},{"s":"oso-mono","n":"Oso Moño","c":"osos","p":31000,"v":0},{"s":"osito-flotador","n":"Osito Flotador","c":"osos","p":25000,"v":0},{"s":"oso-musculoso","n":"Oso Musculoso","c":"osos","p":26000,"v":0},{"s":"boda-corazon","n":"Boda Corazón","c":"celebraciones","p":19000,"v":0},{"s":"pareja","n":"Pareja","c":"celebraciones","p":27000,"v":2},{"s":"sweet-heart","n":"Sweet Heart","c":"celebraciones","p":37000,"v":12},{"s":"home","n":"Home","c":"celebraciones","p":40000,"v":1},{"s":"5-corazones","n":"5 Corazones","c":"celebraciones","p":24000,"v":4},{"s":"baby-shower","n":"Baby Shower","c":"celebraciones","p":20000,"v":0},{"s":"carrusel","n":"Carrusel","c":"celebraciones","p":26000,"v":1},{"s":"nube","n":"Nube","c":"celebraciones","p":19000,"v":0},{"s":"zapatico-bebe","n":"Zapatico Bebé","c":"celebraciones","p":20000,"v":0},{"s":"carrito","n":"Carrito","c":"celebraciones","p":27000,"v":0},{"s":"muela","n":"Muela","c":"celebraciones","p":28000,"v":8},{"s":"numeros","n":"Números","c":"celebraciones","p":16000,"v":0},{"s":"torta","n":"Torta","c":"celebraciones","p":29000,"v":4},{"s":"libritos","n":"Libritos","c":"celebraciones","p":25000,"v":0},{"s":"medico","n":"Médico","c":"celebraciones","p":37000,"v":0},{"s":"lego","n":"Lego","c":"celebraciones","p":21000,"v":3},{"s":"astronauta","n":"Astronauta","c":"celebraciones","p":22000,"v":0},{"s":"corazon-anatomico","n":"Corazón Anatómico","c":"celebraciones","p":27000,"v":1},{"s":"peonia-xl","n":"Peonía XL","c":"flores","p":60000,"v":11},{"s":"rosa-3d","n":"Rosa 3D","c":"flores","p":38000,"v":0},{"s":"peonia","n":"Peonía","c":"flores","p":21000,"v":25},{"s":"tulipan","n":"Tulipán","c":"flores","p":30000,"v":4},{"s":"ramo-de-flores","n":"Ramo de Flores","c":"flores","p":38000,"v":0},{"s":"circulo-de-rosas-g","n":"Círculo de Rosas G","c":"flores","p":45000,"v":1},{"s":"circulo-de-rosas-p","n":"Círculo de Rosas P","c":"flores","p":12000,"v":1},{"s":"recipiente-aromatico","n":"Recipiente Aromático","c":"flores","p":65000,"v":8},{"s":"macarrones-x4","n":"Macarrones x4","c":"otros","p":28000,"v":0},{"s":"huevito","n":"Huevito","c":"otros","p":20000,"v":0},{"s":"croissant","n":"Croissant","c":"otros","p":23000,"v":0},{"s":"helado","n":"Helado","c":"otros","p":29000,"v":0},{"s":"dolares","n":"Dólares","c":"otros","p":25000,"v":0},{"s":"dinero","n":"Dinero","c":"otros","p":31000,"v":1}];
  var TOP = ['6-deseos', 'sagrada-familia', 'ella', 'peonia'];

  var COLS = [
    { id: 'navidad', name: 'Navidad' },
    { id: 'arte', name: 'Arte y diseño' },
    { id: 'celebraciones', name: 'Celebraciones' },
    { id: 'creencias', name: 'Creencias' },
    { id: 'animalitos', name: 'Animalitos' },
    { id: 'flores', name: 'Flores' },
    { id: 'osos', name: 'Osos cariñosos' },
    { id: 'otros', name: 'Otros' },
    { id: 'halloween', name: 'Halloween', until: '2026-11-02' }
  ];
  var today = new Date().toISOString().slice(0, 10);
  COLS = COLS.filter(function (c) { return !c.until || today < c.until; });
  var activeIds = COLS.map(function (c) { return c.id; });
  PRODUCTS = PRODUCTS.filter(function (p) { return activeIds.indexOf(p.c) > -1; });

  var COLORS = [
    ['Blanco', '#FFFFFF'], ['Azul cielo', '#A9D6F2'], ['Rosa', '#F2C6DE'],
    ['Salvia', '#9FC3A0'], ['Lavanda', '#C9C1EC'], ['Morado', '#6D5BD0'],
    ['Topo', '#B9A39C'], ['Vainilla', '#F6E3BF'], ['Durazno', '#EEB98F']
  ];

  function money(n) { return '$' + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function waLink(text) { return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(text); }
  function orderLink(p) {
    return waLink('Hola Cielo de Velas, quiero pedir la vela ' + p.n + ' (' + money(p.p) + '). Color: ');
  }
  var GENERAL = waLink('Hola Cielo de Velas, quiero hacer un pedido.');
  var GIFTS = waLink('Hola Cielo de Velas, quiero cotizar regalos navideños. Cantidad aproximada: ');
  var EVENTS = waLink('Hola Cielo de Velas, quiero cotizar velas para un evento. Tipo de evento y fecha: ');
  var bySlug = {};
  PRODUCTS.forEach(function (p) { bySlug[p.s] = p; });

  var ICON_WA = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.4A8.4 8.4 0 1 1 21 11.5z"/></svg>';
  var ICON_IG = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor"/></svg>';
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
    '#cdv .meta{display:flex;justify-content:space-between;align-items:baseline;gap:8px}',
    '#cdv .meta h3{font-size:21px}',
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
    '#cdv .gifts{background:var(--pine);color:var(--cream)}',
    '#cdv .split{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:48px;align-items:center}',
    '#cdv .split img{width:100%;border-radius:24px;aspect-ratio:1/1;object-fit:cover}',
    '#cdv .gifts .script{color:var(--gold);font-size:38px}',
    '#cdv .gifts h2,#cdv .events h2{font-size:clamp(32px,4vw,46px);margin:6px 0 14px}',
    '#cdv .gifts p{color:#D3DED6;font-size:17px}',
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
    '#cdv footer{background:var(--ink);color:#EADBD0;padding:56px 0 36px}',
    '#cdv .foot{display:flex;flex-wrap:wrap;justify-content:space-between;gap:32px}',
    '#cdv .foot img{width:120px}',
    '#cdv .foot a{display:flex;align-items:center;gap:10px;text-decoration:none;color:var(--cream);padding:6px 0}',
    '#cdv .fine{border-top:1px solid #4A3D39;margin-top:32px;padding-top:20px;font-size:14px;color:#BFAFA5}',
    '#cdv .float{position:fixed;right:18px;bottom:18px;z-index:30;display:flex;align-items:center;gap:8px;background:#1F7A4D;color:#fff;text-decoration:none;font-weight:700;padding:14px 18px;border-radius:999px;box-shadow:0 10px 28px rgba(0,0,0,.22)}',
    '@media (max-width:860px){#cdv .links{display:none}#cdv .hero-txt{padding:32px 24px}#cdv .hero-card{min-height:560px}#cdv .hero-card::after{background:linear-gradient(0deg,rgba(43,26,20,.9) 0%,rgba(43,26,20,.55) 60%,rgba(43,26,20,.15) 100%)}#cdv .brand span{display:none}#cdv .search{flex:1 1 100%}}',
    '@media (max-width:520px){#cdv .grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}#cdv .meta{flex-direction:column;gap:2px}#cdv .meta h3{font-size:17px}#cdv .card .btn{font-size:14px;padding:10px}#cdv .float span{display:none}#cdv .float{padding:15px}#cdv section.block{padding:48px 0}}',
    '#cdv .sm{display:none}',
    '@media (max-width:860px){#cdv .tabs{flex-wrap:nowrap;overflow-x:auto;width:100%;padding-bottom:6px;scrollbar-width:none}#cdv .tabs::-webkit-scrollbar{display:none}#cdv .tab{flex:0 0 auto}}',
    '@media (max-width:520px){#cdv .card .lg{display:none}#cdv .card .sm{display:inline}}',
    '@media (prefers-reduced-motion:reduce){#cdv *{transition:none!important}}'
  ].join('\n');

  function card(p) {
    var top = TOP.indexOf(p.s) > -1 ? '<span class="tag">Más vendida</span>' : '';
    return '<article class="card">' +
      '<div class="ph">' + top + '<img loading="lazy" decoding="async" src="' + IMG + p.s + '.jpg" alt="Vela artesanal ' + esc(p.n) + '" width="640" height="800"></div>' +
      '<div class="meta"><h3>' + esc(p.n) + '</h3><span class="price">' + money(p.p) + '</span></div>' +
      '<a class="btn btn-wine" href="' + orderLink(p) + '" target="_blank" rel="noopener">' + ICON_WA + '<span class="lg">Pedir por WhatsApp</span><span class="sm">Pedir</span></a>' +
      '</article>';
  }

  var featured = ['6-deseos', 'arbol-bolitas', 'gnomo', 'reno-3d'].map(function (s) { return bySlug[s]; }).filter(Boolean);

  var html =
    '<div class="topbar">Pedidos navideños abiertos · Separa tus regalos por WhatsApp</div>' +
    '<header class="nav"><div class="nav-in">' +
      '<a class="brand" href="#inicio" aria-label="Cielo de Velas, inicio"><img src="' + IMG + 'logo.png" alt="Logo Cielo de Velas" width="58" height="55"><span>Cielo de velas</span></a>' +
      '<nav class="links" aria-label="Principal"><a href="#catalogo" data-col="navidad">Navidad</a><a href="#catalogo">Catálogo</a><a href="#regalos">Regalos</a><a href="#eventos">Eventos</a><a href="#pedir">Cómo pedir</a></nav>' +
      '<a class="btn btn-dark" href="' + GENERAL + '" target="_blank" rel="noopener">' + ICON_WA + 'Pedir</a>' +
    '</div></header>' +
    '<div id="inicio" class="hero"><div class="hero-card">' +
      '<img src="' + IMG + 'hero-regalos.jpg" alt="Bolsas de regalo con velas artesanales y lazo rosado" fetchpriority="high">' +
      '<div class="hero-txt"><p class="script">Esta Navidad</p><h1>Regala calor de hogar</h1>' +
      '<p>Velas hechas a mano, una por una, con materias primas naturales y certificadas. Para encender las novenas, la cena y los momentos que se quedan.</p>' +
      '<div class="row"><a class="btn btn-gold" href="#catalogo" data-col="navidad">Ver velas navideñas</a><a class="btn btn-ghost" href="' + GIFTS + '" target="_blank" rel="noopener">Armar un regalo</a></div></div>' +
    '</div></div>' +
    '<div class="chips"><span class="chip">Hechas a mano</span><span class="chip">Materias primas naturales</span><span class="chip">Libres de tóxicos</span><span class="chip">Sostenibles</span></div>' +
    '<section class="block" style="padding-top:24px"><div class="wrap">' +
      '<div class="head"><div><span class="script">Temporada navideña</span><h2>Las favoritas de la temporada</h2></div><a class="btn btn-dark" href="#catalogo" data-col="navidad">Ver toda la Navidad</a></div>' +
      '<div class="grid">' + featured.map(card).join('') + '</div>' +
    '</div></section>' +
    '<section id="catalogo" class="block" style="background:#fff;border-top:1px solid #EFE0CF;border-bottom:1px solid #EFE0CF"><div class="wrap">' +
      '<div class="head"><div><span class="script">Nuestro catálogo</span><h2>Una vela para cada momento</h2><p class="sub">' + PRODUCTS.length + ' diseños hechos a mano. Todos disponibles en 9 colores: nos dices cuál al pedir.</p></div></div>' +
      '<div class="tools"><div class="tabs" role="group" aria-label="Colecciones"></div>' +
      '<label class="search"><span style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)">Buscar una vela</span>' + ICON_SEARCH + '<input type="search" placeholder="Buscar: reno, ángel, peonía..." autocomplete="off"></label></div>' +
      '<p class="count" aria-live="polite"></p><div class="grid" id="cdv-grid"></div>' +
    '</div></section>' +
    '<section id="regalos" class="block gifts"><div class="wrap split">' +
      '<img loading="lazy" src="' + IMG + 'hero-carrito.jpg" alt="Carrito rosado lleno de velas artesanales con lazo">' +
      '<div><p class="script">Detalles con amor</p><h2>Regalos listos para entregar</h2>' +
      '<p>Combinamos velas en bolsas y cajas con lazo para intercambios, novenas, clientes y equipos de trabajo.</p>' +
      '<ul class="ticks"><li>Regalos individuales o surtidos</li><li>Pedidos por cantidad para empresas</li><li>Colores a juego con tu marca o tu decoración</li></ul>' +
      '<a class="btn btn-gold" href="' + GIFTS + '" target="_blank" rel="noopener">Cotizar regalos</a></div>' +
    '</div></section>' +
    '<section id="eventos" class="block events"><div class="wrap split">' +
      '<div><p class="script">Celebraciones</p><h2>Recuerdos que tus invitados se llevan a casa</h2>' +
      '<p>Bodas, baby showers, cumpleaños, primeras comuniones y grados. Elige el diseño, el color y la cantidad.</p>' +
      '<ul class="ticks"><li>Pedidos por cantidad para tu evento</li><li>Colores a juego con tu decoración</li><li>Precios especiales por mayor</li></ul>' +
      '<a class="btn btn-wine" href="' + EVENTS + '" target="_blank" rel="noopener">Cotizar mi evento</a></div>' +
      '<div class="mosaic">' + ['boda-corazon', 'baby-shower', 'numeros', 'pareja', 'zapatico-bebe', 'primera-comunion'].map(function (s) {
        var p = bySlug[s]; return p ? '<img loading="lazy" src="' + IMG + s + '.jpg" alt="Vela ' + esc(p.n) + '">' : '';
      }).join('') + '</div>' +
    '</div></section>' +
    '<section class="block"><div class="wrap center"><p class="script" style="font-size:36px;color:var(--wine)">Colores disponibles</p><h2 style="font-size:clamp(30px,4vw,44px)">Elige tu color favorito</h2>' +
      '<div class="swatches">' + COLORS.map(function (c) { return '<div class="sw"><i style="background:' + c[1] + '"></i>' + c[0] + '</div>'; }).join('') + '</div>' +
    '</div></section>' +
    '<section id="pedir" class="block" style="background:var(--sand)"><div class="wrap"><div class="center"><p class="script" style="font-size:36px;color:var(--wine)">Así de fácil</p><h2 style="font-size:clamp(30px,4vw,44px)">Cómo hacer tu pedido</h2></div>' +
      '<div class="steps">' +
        '<div class="step"><b>1</b><strong>Elige tu vela</strong><span>Recorre el catálogo y toca “Pedir por WhatsApp” en la que te guste.</span></div>' +
        '<div class="step"><b>2</b><strong>Escoge el color</strong><span>Dinos en el chat cuál de los 9 colores quieres.</span></div>' +
        '<div class="step"><b>3</b><strong>Confirmamos tu pedido</strong><span>Te confirmamos disponibilidad, forma de pago y entrega.</span></div>' +
      '</div><div class="center" style="margin-top:30px"><a class="btn btn-wine" href="' + GENERAL + '" target="_blank" rel="noopener">' + ICON_WA + 'Escribir por WhatsApp</a></div>' +
    '</div></section>' +
    '<footer><div class="wrap"><div class="foot">' +
      '<div style="max-width:360px;display:flex;flex-direction:column;gap:14px"><img src="' + IMG + 'logo-crema.png" alt="Cielo de Velas" width="120" height="115"><p>Velas artesanales hechas a mano en Medellín con materias primas naturales y certificadas.</p></div>' +
      '<div><p style="font-weight:700;color:var(--cream);margin-bottom:8px">Contacto</p><a href="' + GENERAL + '" target="_blank" rel="noopener">' + ICON_WA + '+57 322 591 1307</a><a href="' + IG + '" target="_blank" rel="noopener">' + ICON_IG + '@cielo.develas</a></div>' +
    '</div><p class="fine">Precios en pesos colombianos, por unidad. Para pedidos por mayor escríbenos por WhatsApp. © ' + new Date().getFullYear() + ' Cielo de Velas.</p></div></footer>' +
    '<a class="float" href="' + GENERAL + '" target="_blank" rel="noopener" aria-label="Pedir por WhatsApp">' + ICON_WA + '<span>Pedir por WhatsApp</span></a>';

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
  ROOT.innerHTML = html;

  var state = { col: 'navidad', q: '' };
  var tabsEl = ROOT.querySelector('.tabs');
  var gridEl = ROOT.querySelector('#cdv-grid');
  var countEl = ROOT.querySelector('.count');
  var input = ROOT.querySelector('.search input');

  function norm(s) { return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  function renderTabs() {
    var all = [{ id: 'todas', name: 'Todas' }].concat(COLS);
    tabsEl.innerHTML = all.map(function (c) {
      return '<button type="button" class="tab" data-id="' + c.id + '" aria-pressed="' + (state.col === c.id && !state.q) + '">' + c.name + '</button>';
    }).join('');
  }
  function renderGrid() {
    var q = norm(state.q.trim());
    var list = PRODUCTS.filter(function (p) {
      if (q) return norm(p.n).indexOf(q) > -1;
      return state.col === 'todas' || p.c === state.col;
    });
    countEl.textContent = list.length + (list.length === 1 ? ' vela' : ' velas');
    gridEl.innerHTML = list.length ? list.map(card).join('') :
      '<div class="empty" style="grid-column:1/-1">No encontramos esa vela. <a href="' + GENERAL + '" target="_blank" rel="noopener">Pregúntanos por WhatsApp</a>.</div>';
  }
  function setCol(id) { state.col = id; state.q = ''; input.value = ''; renderTabs(); renderGrid(); }

  tabsEl.addEventListener('click', function (e) {
    var b = e.target.closest('.tab'); if (b) setCol(b.getAttribute('data-id'));
  });
  input.addEventListener('input', function () { state.q = input.value; renderTabs(); renderGrid(); });
  ROOT.addEventListener('click', function (e) {
    var a = e.target.closest('a[data-col]');
    if (a) setCol(a.getAttribute('data-col'));
  });
  renderTabs(); renderGrid();
})();
