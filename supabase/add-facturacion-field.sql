-- Migración: Agregar campo necesita_facturacion a encuesta_simple_responses
-- Fecha: 2025-10-30
-- Descripción: Agrega el campo para la pregunta #6 sobre facturación electrónica

-- Agregar la columna necesita_facturacion
ALTER TABLE encuesta_simple_responses
ADD COLUMN IF NOT EXISTS necesita_facturacion TEXT;

-- Agregar índice para analizar por necesidad de facturación
CREATE INDEX IF NOT EXISTS idx_encuesta_simple_necesita_facturacion
ON encuesta_simple_responses(necesita_facturacion);

-- Actualizar comentario de la tabla
COMMENT ON TABLE encuesta_simple_responses IS 'Respuestas de la encuesta simple de 6 preguntas para validación rápida de leads';

-- Agregar comentario para el nuevo campo
COMMENT ON COLUMN encuesta_simple_responses.necesita_facturacion IS 'Indica si el negocio necesita facturación electrónica (si_obligatorio, si_importante, no_importante, no_necesito)';

-- Para registros existentes, establecer un valor por defecto (opcional)
-- UPDATE encuesta_simple_responses
-- SET necesita_facturacion = 'no_importante'
-- WHERE necesita_facturacion IS NULL;
