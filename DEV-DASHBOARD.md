# Dashboard de Desarrollo

Dashboard simple para ver métricas de la landing page y encuestas.

## Acceso

**IMPORTANTE**: Este dashboard **SOLO está disponible en modo desarrollo**.

### Acceder al Dashboard

1. Asegúrate de estar en modo desarrollo:
```bash
cd ui-landing
pnpm dev
```

2. Navega a: http://localhost:3001/dev-dashboard

### En Producción

El dashboard **NO estará disponible** en producción. Si intentas acceder a `/dev-dashboard` en producción, serás redirigido automáticamente a la página principal.

## Métricas Disponibles

El dashboard muestra:

### 📊 Métricas Principales
- **Total Leads**: Número total de personas registradas en la waitlist
- **Encuestas Simples**: Encuestas de 5 preguntas completadas
- **Encuestas Completas**: Encuestas de validación profunda completadas
- **Tasa de Conversión**: Porcentaje de leads que completaron encuesta simple

### 📈 Distribuciones
- **Tipo de Negocio**: Distribución de leads por tipo de negocio
- **Disposición a Pagar**: Rangos de precio que están dispuestos a pagar
- **Leads por Día**: Gráfico de leads registrados en los últimos 7 días

### 📋 Tabla de Leads Recientes
- Últimos 10 leads registrados
- Nombre, email, fecha de registro
- Estado de encuesta (Completada/Pendiente)

## Arquitectura

- **Middleware**: Bloquea acceso en producción (`src/middleware.ts`)
- **Queries**: Todas las consultas están en `src/lib/supabase/queries.ts`
- **Página**: Dashboard en `src/app/dev-dashboard/page.tsx`
- **Componentes**: Usa componentes UI de ShadCN/UI ya existentes

## Seguridad

- ✅ Protegido por middleware
- ✅ Solo accesible con `NODE_ENV=development`
- ✅ Redirect automático a home en producción
- ✅ No requiere autenticación adicional (ya que solo funciona local)

## Notas

- El dashboard se actualiza cada vez que recargas la página (no hay auto-refresh)
- Todos los datos vienen directamente de Supabase
- Si no hay datos, se muestran mensajes indicando que no hay información disponible
