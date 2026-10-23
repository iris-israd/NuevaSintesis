# Sitio web del Movimiento Nueva Síntesis

Sitio estático de 11 páginas. No necesita servidor, base de datos ni proceso de compilación:
basta con subir esta carpeta tal cual a cualquier hosting de archivos estáticos.

## Cómo publicarlo

Elige una opción. Todas son gratuitas para un sitio de este tamaño.

- **Netlify:** entra a app.netlify.com/drop y arrastra la carpeta descomprimida.
- **Cloudflare Pages:** crea un proyecto con "Direct Upload" y sube la carpeta.
- **GitHub Pages:** sube los archivos a un repositorio y activa Pages en Settings > Pages.
- **Hosting tradicional (cPanel, etc.):** sube todo el contenido a la carpeta `public_html`.

El archivo de entrada es `index.html`. Los enlaces entre páginas son relativos, así que el sitio funciona
en la raíz de un dominio (nuevasintesis.co) o en una subcarpeta.

## Qué editar

| Qué | Dónde |
|---|---|
| Enlace a SIRANS (Sistema de Registro de Afiliados Nueva Síntesis) | `config.js`, campo `sirans` |
| Correo de contacto | buscar `nuevasintesis@proton.me` en los archivos `.html` y reemplazar |
| Estatutos en PDF | reemplazar `estatutos-movimiento-nueva-sintesis.pdf` conservando el nombre |
| Colores y tipografía | variables al inicio de `styles.css` |
| Ideario y fusiones del Estado | listas `IDEAS` y `M` al inicio de `site.js` |

**Para activar la afiliación:** abre `config.js` y pega la dirección completa de SIRANS entre las comillas,
por ejemplo `sirans: "https://sirans.ejemplo.co"`. Guarda y vuelve a subir `config.js`. Con eso, todos los
botones "Afíliate" y "Quiero afiliarme" del sitio abren SIRANS en una pestaña nueva, y la página Participa
muestra el botón "Inscribirme en SIRANS". No hay que tocar nada más.

## Contenido del paquete

- `index.html` y 10 páginas más: movimiento, programa, estructura, organizaciones, democracia, participa, etica, transparencia, estatutos, contacto.
- `styles.css`, `site.js`, `config.js`: estilos, comportamiento y configuración.
- `logo.png`, `favicon.png`, `apple-touch-icon.png`: logo e íconos.
- `estatutos-movimiento-nueva-sintesis.pdf`: estatutos completos (54 páginas).
- `404.html`, `robots.txt`, `_headers` (encabezados de seguridad para Netlify y Cloudflare Pages).

## Notas

- Las tipografías (Anton, Fira Sans y Michroma) se cargan desde Google Fonts, así que el sitio necesita conexión
  a internet para verse con la tipografía de marca. Sin ella se ve con tipografías del sistema.
- Para que las vistas previas al compartir en redes muestren una imagen, agrega una etiqueta `og:image` con la
  dirección absoluta del logo en cada `.html`, cuando ya tengas dominio.
- Cuando tengas dominio, conviene agregar un `sitemap.xml`.
- El sitio resume los estatutos. Si hay alguna diferencia, prevalece el texto del PDF.
