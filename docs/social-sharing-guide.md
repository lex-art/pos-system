# Guía de Compartir en Redes Sociales

## Cambios Realizados

### 1. Meta Tags Open Graph (Facebook, WhatsApp, LinkedIn)
- ✅ Video configurado en Open Graph
- ✅ Imagen de preview (og:image)
- ✅ Dimensiones del video
- ✅ Locale configurado (es_GT)

### 2. Twitter Card
- ✅ Twitter Player Card configurado
- ✅ Video stream URL
- ✅ Dimensiones del player

### 3. Schema.org Structured Data
- ✅ VideoObject JSON-LD
- ✅ Información completa del video
- ✅ Publisher y logo

## Cómo Probar

### Facebook & WhatsApp
1. Usa el **Facebook Sharing Debugger**:
   - URL: https://developers.facebook.com/tools/debug/
   - Pega tu URL de producción
   - Click en "Debug" o "Scrape Again"
   - Verifica que aparezca el video

2. **WhatsApp**:
   - Envía el link por WhatsApp
   - WhatsApp usará los Open Graph tags
   - Debería mostrar el título, descripción e imagen

### Twitter/X
1. Usa el **Twitter Card Validator**:
   - URL: https://cards-dev.twitter.com/validator
   - Pega tu URL
   - Verifica el preview

### LinkedIn
1. Usa el **LinkedIn Post Inspector**:
   - URL: https://www.linkedin.com/post-inspector/
   - Pega tu URL
   - Click en "Inspect"

### Google Rich Results
1. Usa **Google Rich Results Test**:
   - URL: https://search.google.com/test/rich-results
   - Pega tu URL
   - Verifica el VideoObject

## Notas Importantes

### Video en Redes Sociales
- **Facebook/WhatsApp**: Muestra imagen preview + link al video
- **Twitter**: Player Card (requiere URL pública)
- **LinkedIn**: Muestra imagen preview
- **Instagram**: No soporta embeds directos (solo imagen)

### Recomendaciones
1. **Hosting del video**: El archivo debe estar en una URL pública accesible
2. **Tamaño del video**: Considera usar un CDN para mejor performance
3. **Thumbnail**: La imagen Open Graph es lo que se ve primero
4. **Duración**: Actualiza el campo `duration` en `page.tsx` con la duración real

### Limpiar Cache
Si los cambios no aparecen:
1. Usa los debuggers mencionados arriba con "Scrape Again"
2. Las plataformas cachean los meta tags por 24-48 horas
3. Puedes forzar actualización con los debuggers

## Estructura de Archivos

```
ui-landing/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Meta tags principales
│   │   ├── page.tsx            # JSON-LD structured data
│   │   └── opengraph-image.tsx # Imagen de preview
│   └── config/
│       ├── site.ts             # Configuración del sitio
│       └── copy.ts             # Contenido y URL del video
└── public/
    └── media/
        └── POS-en-accion.mp4   # Video del POS
```

## Testing Local

Para probar localmente antes de deployar:
1. Usa **ngrok** o **localtunnel** para exponer tu localhost
2. Usa la URL pública generada en los debuggers
3. Así puedes validar antes de producción

```bash
# Con ngrok
ngrok http 3001

# Luego usa la URL https://xxx.ngrok.io en los debuggers
```

## Formato del Video

El video actual está en MP4 (H.264), que es compatible con:
- ✅ Facebook
- ✅ Twitter/X
- ✅ LinkedIn
- ✅ WhatsApp (muestra preview)
- ✅ Navegadores modernos

## Meta Tags Implementados

### Open Graph (Facebook, WhatsApp, LinkedIn)
```html
<meta property="og:type" content="website" />
<meta property="og:title" content="POS Guatemala" />
<meta property="og:description" content="..." />
<meta property="og:image" content="/opengraph-image" />
<meta property="og:video" content="/media/POS-en-accion.mp4" />
<meta property="og:video:type" content="video/mp4" />
<meta property="og:video:width" content="1920" />
<meta property="og:video:height" content="1080" />
```

### Twitter
```html
<meta name="twitter:card" content="player" />
<meta name="twitter:player" content="/media/POS-en-accion.mp4" />
```

### Schema.org
```json
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "...",
  "description": "...",
  "contentUrl": "/media/POS-en-accion.mp4"
}
```

