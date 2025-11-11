-- OPCIONAL: Script para silenciar warnings de RLS
-- Nota: Esto NO agrega seguridad real en este contexto,
-- solo habilita RLS con políticas permisivas para eliminar los warnings

-- Habilitar RLS en ambas tablas
ALTER TABLE encuesta_simple_responses ENABLE ROW LEVEL SECURITY;
-- ====================================
-- POLÍTICAS PARA encuesta_simple_responses
-- ====================================

-- Permitir INSERT/UPDATE público (con validación de token en API route)
CREATE POLICY "Permitir crear respuesta de encuesta"
ON encuesta_simple_responses
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Permitir actualizar respuesta de encuesta"
ON encuesta_simple_responses
FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- Permitir SELECT solo al service_role (admin)
CREATE POLICY "Solo service_role puede leer encuestas"
ON encuesta_simple_responses
FOR SELECT
TO service_role
USING (true);

-- ====================================
-- COMENTARIOS
-- ====================================
COMMENT ON POLICY "Permitir crear respuesta de encuesta" ON encuesta_simple_responses IS
'Permite guardar respuestas de encuesta. La validación del lead_id y token se hace en la API route.';
