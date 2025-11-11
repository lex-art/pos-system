import { z } from 'zod'

// Bloque 1: Información básica (7 preguntas)
export const bloque1Schema = z.object({
	tipo_negocio: z.string().min(1, 'Selecciona el tipo de negocio'),
	ciudad: z.string().min(1, 'Indica la ciudad'),
	ventas_dia: z.string().min(1, 'Selecciona el rango de ventas'),
	sucursales: z.string().min(1, 'Indica cuántas sucursales tienes'),
	metodo_actual: z.string().min(1, 'Selecciona tu método actual'),
	metodo_actual_otro: z.string().optional(),
	frustracion_nivel: z.string().min(1, 'Indica el nivel de frustración'),
	usa_whatsapp: z.boolean()
})

// Bloque 2: Validación del problema (3 preguntas)
export const bloque2Schema = z.object({
	urgencia_problema: z.string().min(1, 'Indica qué tan urgente es resolver este problema'),
	perdida_dinero: z.string().min(1, 'Selecciona una opción'),
	tiempo_perdido: z.string().min(1, 'Indica cuánto tiempo pierdes')
})

// Bloque 3: Disposición a pagar (4 preguntas)
export const bloque3Schema = z.object({
	funcionalidades_imprescindibles: z
		.array(z.string())
		.min(1, 'Selecciona al menos una funcionalidad'),
	funcionalidad_game_changer: z.string().optional(),
	dispuesto_invertir: z.string().min(1, 'Indica tu disposición a invertir'),
	pago_actual: z.string().min(1, 'Selecciona una opción'),
	dispuesto_pagar: z.string().min(1, 'Selecciona un rango de precio'),
	que_te_haria_elegir: z.array(z.string()).min(1, 'Selecciona al menos una opción')
})

// Bloque 4: Compromiso early adopter (3 preguntas)
export const bloque4Schema = z.object({
	early_adopter_interesado: z.string().min(1, 'Selecciona una opción'),
	incentivo_preferido: z.string().min(1, 'Selecciona tu incentivo preferido'),
	usaria_activamente: z.string().min(1, 'Indica tu nivel de compromiso')
})

// Bloque 5: Feedback final (2 preguntas)
export const bloque5Schema = z.object({
	recomendaria: z.string().min(1, 'Indica si recomendarías el sistema'),
	mejoras_sugeridas: z.string().optional()
})

// Schema completo de la encuesta
export const encuestaSchema = z.object({
	...bloque1Schema.shape,
	...bloque2Schema.shape,
	...bloque3Schema.shape,
	...bloque4Schema.shape,
	...bloque5Schema.shape
})

export type EncuestaInput = z.infer<typeof encuestaSchema>
export type Bloque1Input = z.infer<typeof bloque1Schema>
export type Bloque2Input = z.infer<typeof bloque2Schema>
export type Bloque3Input = z.infer<typeof bloque3Schema>
export type Bloque4Input = z.infer<typeof bloque4Schema>
export type Bloque5Input = z.infer<typeof bloque5Schema>

// Schema parcial para guardar progreso
export const encuestaPartialSchema = encuestaSchema.partial()
