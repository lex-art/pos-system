# Migraciones de Base de Datos - Supabase

Este directorio contiene los scripts SQL para la base de datos de la landing page.

## Estructura de Tablas

- **waitlist_leads**: Leads registrados en la lista de espera
- **encuesta_simple_responses**: Respuestas de la encuesta simple (6 preguntas)
- **encuesta_responses**: Respuestas de la encuesta completa de validación

## Archivos SQL

### Configuración Inicial
1. **schema.sql**: Tablas principales y función para actualizar `updated_at`
2. **encuesta-simple.sql**: Tabla de encuesta simple
3. **enable-rls.sql**: Configuración de Row Level Security

### Migraciones
- **add-facturacion-field.sql**: Agrega campo `necesita_facturacion` a encuesta simple (2025-10-30)

## Cómo Aplicar las Migraciones

### Opción 1: Supabase Dashboard (Recomendado)
1. Ve a tu proyecto en [app.supabase.com](https://app.supabase.com)
2. Navega a **SQL Editor**
3. Copia y pega el contenido del archivo de migración
4. Ejecuta el query
5. Verifica que se ejecutó correctamente

### Opción 2: CLI de Supabase
```bash
# Si tienes Supabase CLI instalado
supabase db push supabase/add-facturacion-field.sql
```

## Orden de Ejecución (Primera vez)

Si estás configurando la base de datos por primera vez:

```bash
1. schema.sql
2. encuesta-simple.sql
3. enable-rls.sql
```

Si ya tienes la base de datos configurada y solo necesitas agregar el campo nuevo:

```bash
1. add-facturacion-field.sql
```

## Verificar la Migración

Después de ejecutar la migración, verifica que el campo fue agregado correctamente:

```sql
-- Verificar estructura de la tabla
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'encuesta_simple_responses'
ORDER BY ordinal_position;

-- Debería mostrar el campo necesita_facturacion
```

## Notas Importantes

- ⚠️ **Siempre haz un backup antes de ejecutar migraciones en producción**
- ✅ Los scripts usan `IF NOT EXISTS` para evitar errores si ya existen
- ✅ Las migraciones son idempotentes (se pueden ejecutar múltiples veces sin problemas)
- 📝 Los registros existentes tendrán `NULL` en `necesita_facturacion` hasta que se actualicen

## Cambios Recientes

### 2025-10-30: Campo de Facturación Electrónica
- **Archivo**: `add-facturacion-field.sql`
- **Descripción**: Agrega campo `necesita_facturacion` para la pregunta #6 de la encuesta simple
- **Valores posibles**:
  - `si_obligatorio`: Es obligatorio para el negocio
  - `si_importante`: Sería muy útil
  - `no_importante`: No es importante por ahora
  - `no_necesito`: No necesita facturación electrónica
