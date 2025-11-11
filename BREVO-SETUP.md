# Guía de Configuración de Brevo (Email Transaccional)

Esta guía te ayudará a configurar Brevo para enviar emails automáticos de bienvenida con el link a la encuesta.

## 📋 Requisitos

- Cuenta de Brevo (gratuita hasta 300 emails/día)
- Dominio verificado (opcional pero recomendado)

---

## 🚀 Paso 1: Crear Cuenta en Brevo

1. Ve a [https://www.brevo.com](https://www.brevo.com)
2. Click en "Sign up free"
3. Completa el registro con tu email
4. Verifica tu email

**Plan recomendado:** Free (300 emails/día es suficiente para validación)

---

## 🔑 Paso 2: Obtener API Key

1. Inicia sesión en Brevo
2. Ve a **Settings** (⚙️) en la esquina superior derecha
3. Click en **SMTP & API**
4. Scroll hasta **API Keys**
5. Click en **Generate a new API key**
6. Dale un nombre: `POS System - Landing`
7. Copia la API Key (solo se muestra una vez)

**Formato:** `xkeysib-xxxxxxxxxxxxxxxxxxxxx`

---

## 📧 Paso 3: Configurar Email de Envío

### Opción A: Usar email default de Brevo (Rápido)

Por defecto puedes enviar desde cualquier email que hayas verificado en Brevo.

1. Ve a **Settings** > **Senders & IP**
2. Click en **Add a sender**
3. Agrega tu email (ej: `noreply@gmail.com`)
4. Verifica el email (recibirás un link de confirmación)

**Limitaciones:** Los emails pueden caer en spam

### Opción B: Configurar dominio propio (Recomendado para producción)

1. Ve a **Settings** > **Senders & IP**
2. Click en **Domains**
3. Click en **Add a domain**
4. Ingresa tu dominio (ej: `posguatemala.com`)
5. Agrega los registros DNS (SPF, DKIM, DMARC) que Brevo te muestra
6. Espera verificación (puede tardar hasta 48 horas)

**Ventajas:**
- Mejor deliverability
- No caen en spam
- Profesional

---

## ⚙️ Paso 4: Configurar Variables de Entorno

Edita tu archivo `.env` en el proyecto:

```env
# Brevo Configuration
BREVO_API_KEY=xkeysib-tu-api-key-aqui
BREVO_SENDER_EMAIL=noreply@tudominio.com
BREVO_SENDER_NAME=POS System

# App URL (importante para links en emails)
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

**Importante:**
- `BREVO_SENDER_EMAIL` debe ser un email verificado en Brevo
- `NEXT_PUBLIC_APP_URL` debe ser tu dominio en producción

---

## 🧪 Paso 5: Probar Configuración

### Opción A: Página de Prueba (Recomendado)

1. Inicia el servidor de desarrollo:
   ```bash
   cd ui-landing
   pnpm dev
   ```

2. Ve a: `http://localhost:3001/test-email`

3. Ingresa tu email y nombre

4. Click en "Enviar Email de Prueba"

5. Revisa tu bandeja de entrada (y spam)

### Opción B: API Route Directo

```bash
curl -X POST http://localhost:3001/api/test-email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "tu-email@ejemplo.com",
    "name": "Tu Nombre"
  }'
```

---

## ✅ Verificación Exitosa

Si todo está configurado correctamente, deberías:

1. ✅ Ver mensaje de éxito en la página de prueba
2. ✅ Recibir un email en tu bandeja de entrada
3. ✅ El email debe tener:
   - Asunto: "¡Bienvenido a la lista de espera del POS! 🎉"
   - Cuerpo personalizado con tu nombre
   - Botón con link a encuesta
   - Diseño HTML profesional

---

## ❌ Problemas Comunes

### Error: "BREVO_API_KEY no está configurado"

**Solución:**
1. Verifica que copiaste la API key correctamente en `.env`
2. Reinicia el servidor de desarrollo (`Ctrl+C` y `pnpm dev`)
3. La API key debe empezar con `xkeysib-`

### Error: "Invalid API key"

**Solución:**
1. Verifica que la API key sea válida
2. Ve a Brevo > Settings > API Keys
3. Genera una nueva API key si es necesario
4. Copia y pega sin espacios

### Email no llega

**Solución:**
1. Revisa carpeta de spam
2. Verifica que el email de envío esté verificado en Brevo
3. Ve a Brevo > Statistics > Logs para ver el estado del email
4. Espera 2-5 minutos (a veces tarda)

### Email cae en spam

**Solución:**
1. Configura dominio propio con SPF/DKIM (Opción B arriba)
2. Usa un dominio profesional (no gmail.com)
3. Evita palabras spam en el asunto
4. Agrega tu dominio a la whitelist del destinatario

---

## 📊 Monitorear Envíos

1. Ve a Brevo Dashboard
2. Click en **Statistics**
3. Ve métricas en tiempo real:
   - Emails enviados
   - Emails entregados
   - Emails abiertos
   - Clicks en links

---

## 🔒 Seguridad

**IMPORTANTE:**

1. ✅ **Nunca** subas tu `.env` a Git
2. ✅ `.env` está en `.gitignore`
3. ✅ Usa variables de entorno en producción (Vercel)
4. ✅ Rota tu API key si se expone

---

## 🚀 Configuración en Producción (Vercel)

Cuando despliegues a Vercel:

1. Ve a tu proyecto en Vercel Dashboard
2. Settings > Environment Variables
3. Agrega las mismas variables:
   ```
   BREVO_API_KEY=xkeysib-xxx
   BREVO_SENDER_EMAIL=noreply@tudominio.com
   BREVO_SENDER_NAME=POS System
   NEXT_PUBLIC_APP_URL=https://tudominio.com
   ```

4. Redeploy el proyecto

---

## 📈 Límites del Plan Gratuito

- ✅ **300 emails/día** (suficiente para validación)
- ✅ Sin límite de contactos
- ✅ Todas las funcionalidades básicas
- ❌ Sin soporte prioritario
- ❌ Sin email marketing masivo

**Para escalar:** Puedes actualizar a plan pagado cuando tengas más de 300 registros/día

---

## 🎯 Plantilla de Email

El email incluye:

- ✅ Saludo personalizado con nombre
- ✅ Botón CTA principal (Completar Encuesta)
- ✅ Incentivo destacado (2 meses gratis)
- ✅ Link directo a encuesta con token único
- ✅ Diseño responsive (mobile-friendly)
- ✅ Pie de página con contacto

**Ubicación:** `src/lib/brevo/templates.ts`

---

## 📞 Soporte

- **Documentación Brevo:** https://developers.brevo.com/
- **API Reference:** https://developers.brevo.com/reference
- **Soporte:** https://help.brevo.com/

---

## ✨ Resumen Rápido

```bash
# 1. Obtén API Key de Brevo
# 2. Agrega a .env:
BREVO_API_KEY=xkeysib-xxx
BREVO_SENDER_EMAIL=tu-email@dominio.com
BREVO_SENDER_NAME=POS System

# 3. Reinicia servidor
pnpm dev

# 4. Prueba
http://localhost:3001/test-email

# 5. ¡Listo! 🎉
```

---

**Última actualización:** Octubre 2025
