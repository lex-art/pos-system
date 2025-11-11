-- Tabla para encuesta simple (5 preguntas clave)
-- Esta es una versión simplificada para validación rápida de leads
CREATE TABLE IF NOT EXISTS encuesta_simple_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES waitlist_leads(id) ON DELETE CASCADE NOT NULL,

  -- Preguntas de la encuesta simple
  tipo_negocio TEXT NOT NULL,
  tipo_negocio_otro TEXT, -- Campo condicional: requerido solo si tipo_negocio = 'otro'
  ventas_diarias TEXT NOT NULL,
  maneja_inventario TEXT NOT NULL CHECK (maneja_inventario IN ('si', 'no')),
  problema_principal TEXT NOT NULL,
  precio_mensual TEXT NOT NULL,
  necesita_facturacion TEXT NOT NULL,

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para búsquedas eficientes
CREATE INDEX IF NOT EXISTS idx_encuesta_simple_lead_id ON encuesta_simple_responses(lead_id);
CREATE INDEX IF NOT EXISTS idx_encuesta_simple_created_at ON encuesta_simple_responses(created_at DESC);

-- Índice para analizar por tipo de negocio
CREATE INDEX IF NOT EXISTS idx_encuesta_simple_tipo_negocio ON encuesta_simple_responses(tipo_negocio);

-- Trigger para actualizar updated_at automáticamente
DROP TRIGGER IF EXISTS update_encuesta_simple_responses_updated_at ON encuesta_simple_responses;
CREATE TRIGGER update_encuesta_simple_responses_updated_at
    BEFORE UPDATE ON encuesta_simple_responses
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Comentarios para documentación
COMMENT ON TABLE encuesta_simple_responses IS 'Respuestas de la encuesta simple de 6 preguntas para validación rápida de leads';
COMMENT ON COLUMN encuesta_simple_responses.tipo_negocio IS 'Tipo de negocio del lead (restaurante, retail, etc)';
COMMENT ON COLUMN encuesta_simple_responses.tipo_negocio_otro IS 'Especificación del tipo de negocio cuando se selecciona "otro"';
COMMENT ON COLUMN encuesta_simple_responses.ventas_diarias IS 'Rango de ventas diarias del negocio';
COMMENT ON COLUMN encuesta_simple_responses.maneja_inventario IS 'Indica si el negocio maneja inventario';
COMMENT ON COLUMN encuesta_simple_responses.problema_principal IS 'Descripción del problema principal que enfrenta';
COMMENT ON COLUMN encuesta_simple_responses.precio_mensual IS 'Rango de precio mensual que estaría dispuesto a pagar';
COMMENT ON COLUMN encuesta_simple_responses.necesita_facturacion IS 'Indica si el negocio necesita facturación electrónica (si_obligatorio, si_importante, no_importante, no_necesito)';
