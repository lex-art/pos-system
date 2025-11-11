-- Tabla para leads de la waitlist
CREATE TABLE IF NOT EXISTS waitlist_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  encuesta_token TEXT UNIQUE NOT NULL,
  encuesta_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para waitlist_leads
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist_leads(email);
CREATE INDEX IF NOT EXISTS idx_encuesta_token ON waitlist_leads(encuesta_token);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist_leads(created_at DESC);

-- Tabla para respuestas de encuestas
CREATE TABLE IF NOT EXISTS encuesta_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES waitlist_leads(id) ON DELETE CASCADE NOT NULL,

  -- Bloque 1: Información básica
  tipo_negocio TEXT,
  ciudad TEXT,
  ventas_dia TEXT,
  sucursales TEXT,
  metodo_actual TEXT,
  metodo_actual_otro TEXT,
  frustracion_nivel TEXT,
  usa_whatsapp BOOLEAN,

  -- Bloque 2: Validación del problema
  urgencia_problema TEXT,
  perdida_dinero TEXT,
  tiempo_perdido TEXT,

  -- Bloque 3: Disposición a pagar
  funcionalidades_imprescindibles JSONB,
  funcionalidad_game_changer TEXT,
  dispuesto_invertir TEXT,
  pago_actual TEXT,
  dispuesto_pagar TEXT,
  que_te_haria_elegir JSONB,

  -- Bloque 4: Compromiso early adopter
  early_adopter_interesado TEXT,
  incentivo_preferido TEXT,
  usaria_activamente TEXT,

  -- Bloque 5: Feedback final
  recomendaria TEXT,
  mejoras_sugeridas TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para encuesta_responses
CREATE INDEX IF NOT EXISTS idx_encuesta_lead_id ON encuesta_responses(lead_id);
CREATE INDEX IF NOT EXISTS idx_encuesta_created_at ON encuesta_responses(created_at DESC);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para actualizar updated_at
DROP TRIGGER IF EXISTS update_waitlist_leads_updated_at ON waitlist_leads;
CREATE TRIGGER update_waitlist_leads_updated_at
    BEFORE UPDATE ON waitlist_leads
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_encuesta_responses_updated_at ON encuesta_responses;
CREATE TRIGGER update_encuesta_responses_updated_at
    BEFORE UPDATE ON encuesta_responses
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Comentarios para documentación
COMMENT ON TABLE waitlist_leads IS 'Leads registrados en la lista de espera';
COMMENT ON TABLE encuesta_responses IS 'Respuestas de la encuesta de validación profunda';
COMMENT ON COLUMN waitlist_leads.encuesta_token IS 'Token único para acceder a la encuesta';
COMMENT ON COLUMN waitlist_leads.encuesta_completed IS 'Indica si completó la encuesta';
