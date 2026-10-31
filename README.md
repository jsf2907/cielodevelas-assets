# cielodevelas-assets

Fotos y código del catálogo de **cielodevelas.com** (sitio en Carrd).

- `img/` fotos de producto (640×800, 4:5), logo e imágenes de portada
- `site/cdv.js` script que dibuja el sitio dentro del bloque Embed de Carrd
- `site/products.json` productos y precios (fuente: hoja *Cielo_de_Velas_-_Ventas_y_Gastos*, pestaña Catálogo)

Código del Embed en Carrd (COMMIT = commit de la versión publicada):

```html
<div id="cdv"></div>
<script src="https://cdn.jsdelivr.net/gh/jsf2907/cielodevelas-assets@COMMIT/site/cdv.js"></script>
```
