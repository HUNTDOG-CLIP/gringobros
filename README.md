# Gringo Bros · Página web

Sitio estático (HTML + CSS + JS, sin dependencias). Se publica gratis con GitHub Pages.

## Publicar en GitHub Pages
1. Crea un repositorio en GitHub (por ejemplo `gringobros`).
2. Sube **todo el contenido de esta carpeta** (`index.html` y la carpeta `assets`) a la raíz del repositorio.
3. En el repositorio: **Settings → Pages → Source: Deploy from a branch → Branch: main / (root) → Save**.
4. En 1–2 minutos queda en `https://TU-USUARIO.github.io/gringobros/`.
   - Si el repositorio se llama `TU-USUARIO.github.io`, la web queda directo en `https://TU-USUARIO.github.io/`.

## Cosas fáciles de cambiar
| Qué | Dónde |
|---|---|
| Precios (USD) | `assets/js/main.js` → `CONFIG.precios` (vacío = "Consultar precio") |
| Número / mensaje de WhatsApp | `assets/js/main.js` → `CONFIG.whatsapp`, `CONFIG.mensajeWhatsApp` |
| Fotos de los profes | `index.html`, sección `#equipo` (instrucción en el comentario) |
| Testimonios | `index.html`, sección `#testimonios` |
| Colores | `assets/css/styles.css` → bloque `:root` |

## Identidad visual usada
- Degradado naranja → rojo (`#F39200 → #EC6B0E → #E84E1B`), negro `#111` y crema `#FFF6EA`.
- Tipografía **Domus** (archivos en `assets/fonts`) + "Permanent Marker" para los textos a mano, como en la portada.
- Logos e iconografía oficiales, recortados y optimizados en `assets/img`.
