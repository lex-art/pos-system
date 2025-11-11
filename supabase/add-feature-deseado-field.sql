-- Migración: Agregar columna feature_deseado a encuesta_simple_responses
-- Descripción: Agrega una columna para capturar la funcionalidad o característica
--              que el usuario desea en el sistema POS

-- Agregar nueva columna para feature deseado
ALTER TABLE encuesta_simple_responses
ADD COLUMN IF NOT EXISTS feature_deseado TEXT;

-- Agregar índice para analizar features más solicitados
CREATE INDEX IF NOT EXISTS idx_encuesta_simple_feature_deseado
ON encuesta_simple_responses(feature_deseado)
WHERE feature_deseado IS NOT NULL;

-- Agregar comentario descriptivo a la columna
COMMENT ON COLUMN encuesta_simple_responses.feature_deseado IS 'Funcionalidad o característica que el usuario desea en el sistema POS (cotizaciones, facturación múltiple, reportes avanzados, etc.)';
