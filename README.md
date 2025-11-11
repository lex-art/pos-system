# Landing Page - POS System

Landing page para validación del producto POS SaaS según metodología SCALE Guatemala.

## ✅ Estado actual del proyecto

### Completado:
- ✅ Configuración del proyecto Next.js 15 en monorepo
- ✅ Tema morado + dark/light mode (idéntico a ui-v2)
- ✅ Componentes ShadCN necesarios
- ✅ Configuración Supabase (client browser + server)
- ✅ Configuración Brevo (email transaccional)
- ✅ Schemas Zod (validación waitlist + encuesta)
- ✅ Schema SQL para base de datos

### Pendiente:
- ⏳ Implementar secciones del landing page
- ⏳ API route /api/waitlist
- ⏳ Formulario de encuesta multi-step
- ⏳ Dashboard admin
- ⏳ Analytics (GA4 + Meta Pixel)

## 📋 Setup

### 1. Crear tablas en Supabase

1. Ve a tu proyecto en [Supabase Dashboard](https://supabase.com/dashboard)
2. Ve a SQL Editor
3. Ejecuta el contenido de `supabase/schema.sql`

### 2. Configurar variables de entorno

Copia `.env.example` a `.env.local` y completa:

\`\`\`bash
cp .env.example .env.local
\`\`\`

Edita `.env.local` con tus credenciales:

\`\`\`env
# Supabase (obtener en: Settings > API)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...

# Brevo (obtener en: Settings > SMTP & API)
BREVO_API_KEY=xkeysib-xxx
BREVO_SENDER_EMAIL=noreply@tudominio.com
BREVO_SENDER_NAME=POS System

# Analytics (opcional por ahora)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=1234567890

# App
NEXT_PUBLIC_APP_URL=http://localhost:3001
\`\`\`

### 3. Instalar dependencias e iniciar

Desde la raíz del monorepo:

\`\`\`bash
# Instalar dependencias
pnpm install

# Iniciar en modo desarrollo
pnpm landing:dev

# O directamente desde ui-landing/
cd ui-landing
pnpm dev
\`\`\`

El proyecto estará disponible en: http://localhost:3001

## 🛠 Stack Técnico

- **Framework:** Next.js 15 (App Router, Server Components)
- **UI:** TailwindCSS v4 + ShadCN/UI
- **Base de datos:** Supabase (PostgreSQL)
- **Email:** Brevo (transactional emails)
- **Validación:** Zod
- **Theme:** next-themes (dark/light mode)

## 📁 Estructura

\`\`\`
ui-landing/
├── src/
│   ├── app/               # Next.js App Router
│   ├── components/
│   │   ├── ui/            # ShadCN components
│   │   ├── theme-provider.tsx
│   │   └── theme-toggle.tsx
│   ├── lib/
│   │   ├── supabase/      # Supabase config + types
│   │   ├── brevo/         # Brevo email templates
│   │   └── utils.ts
│   ├── schemas/           # Zod validation schemas
│   └── config/            # Site config
├── supabase/
│   └── schema.sql         # Database schema
└── public/                # Static assets
\`\`\`

## 🎨 Tema

El proyecto usa el mismo tema morado de `ui-v2`:
- **Primary:** `oklch(0.606 0.25 292.717)` (light)
- **Primary:** `oklch(0.541 0.281 293.009)` (dark)
- Soporte completo dark/light mode
- Toggle en header

## 📝 Próximos pasos

Para continuar el desarrollo, implementar en orden:

1. **Landing page completo:**
   - Hero Section + formulario waitlist
   - Problem Section (4 problemas)
   - Features Section (7 features)
   - Benefits Section
   - CTA Final + contador
   - Footer

2. **Waitlist funcional:**
   - API route `/api/waitlist`
   - Guardar leads en Supabase
   - Enviar email de bienvenida con Brevo
   - Página de confirmación `/gracias`

3. **Encuesta de validación:**
   - Página `/encuesta/[token]`
   - Formulario multi-step (5 bloques)
   - API route `/api/encuesta`
   - Página `/encuesta/completada`

4. **Dashboard admin:**
   - Auth básica
   - Vista de leads
   - Vista de encuestas
   - Exportar CSV

5. **Analytics:**
   - Google Analytics 4
   - Meta Pixel

## 🔐 Seguridad

### RLS (Row Level Security)

**Por defecto:** RLS está deshabilitado porque las tablas son intencionalmente públicas para validación.

**Warnings de Supabase:** Verás warnings sobre RLS deshabilitado. Esto es **esperado y correcto** para este proyecto:
- ✅ Waitlist pública (cualquiera puede registrarse)
- ✅ Encuestas anónimas (token único)
- ✅ Solo validación temporal
- ✅ Acceso admin controlado por JWT en API routes

**Opción (silenciar warnings):** Si quieres eliminar los warnings, ejecuta `supabase/enable-rls.sql` que habilita RLS con políticas permisivas.

### Otras medidas de seguridad:
- Service Role Key solo en server-side
- Anon Key seguro para client-side
- Admin protegido con JWT
- Validación Zod en todos los inputs
- Rate limiting en API routes (pendiente implementar)

## 📧 Email (Brevo)

### Configuración

Ver guía completa: [BREVO-SETUP.md](./BREVO-SETUP.md)

**Setup rápido:**
1. Crea cuenta en [Brevo](https://www.brevo.com) (gratis hasta 300 emails/día)
2. Obtén API Key en Settings > SMTP & API
3. Configura en `.env`:
   ```env
   BREVO_API_KEY=xkeysib-xxx
   BREVO_SENDER_EMAIL=noreply@tudominio.com
   BREVO_SENDER_NAME=POS System
   ```

### Probar Emails

**Página de prueba:** http://localhost:3001/test-email

O con curl:
```bash
curl -X POST http://localhost:3001/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"email":"tu-email@test.com","name":"Test User"}'
```

**Importante:** Si acabas de configurar un dominio en Brevo, puede tardar hasta 48 horas en propagarse el DNS. Mientras tanto:
- Los emails se enviarán desde el dominio default de Brevo
- O usa un email verificado (Gmail, etc.)

## 📚 Recursos

- [Next.js 15 Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Brevo API Docs](https://developers.brevo.com/)
- [ShadCN/UI](https://ui.shadcn.com/)
- [Plan de Validación](../docs/VALIDACION-POS-SAAS.md)
