import { z } from 'zod'

// Schema simplificado de 7 preguntas clave para validación rápida
export const encuestaSimpleSchema = z
	.object({
		// 1. Tipo de negocio
		tipo_negocio: z.string().min(1, 'Selecciona el tipo de negocio'),

		// 1b. Especificación si es "otro"
		tipo_negocio_otro: z.string().optional(),

		// 2. Volumen de ventas diarias
		ventas_diarias: z.string().min(1, 'Selecciona el rango de ventas diarias'),

		// 3. Manejo de inventario
		maneja_inventario: z.enum(['si', 'no'], {
			required_error: 'Indica si manejas inventario'
		}),

		// 4. Problema principal
		problema_principal: z
			.string()
			.min(10, 'Describe tu problema principal (mínimo 10 caracteres)'),

		// 5. Disposición a pagar
		precio_mensual: z.string().min(1, 'Selecciona el rango de precio'),

		// 6. Facturación electrónica
		necesita_facturacion: z.string().min(1, 'Indica si necesitas facturación electrónica'),

		// 7. Feature deseado en el POS
		feature_deseado: z
			.string()
			.min(10, 'Describe la funcionalidad que deseas (mínimo 10 caracteres)')
	})
	.refine(
		(data) => {
			// Si tipo_negocio es "otros", entonces tipo_negocio_otro es requerido
			if (data.tipo_negocio === 'otros') {
				return data.tipo_negocio_otro && data.tipo_negocio_otro.trim().length > 0
			}
			return true
		},
		{
			message: 'Por favor especifica a qué se dedica tu negocio',
			path: ['tipo_negocio_otro']
		}
	)

export type EncuestaSimpleInput = z.infer<typeof encuestaSimpleSchema>
