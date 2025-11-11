import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { encuestaSchema } from '@/schemas/encuesta.schema'

export async function POST(request: NextRequest) {
	try {
		const body = await request.json()
		const { leadId, token, ...encuestaData } = body

		// Validar que tenemos leadId y token
		if (!leadId || !token) {
			return NextResponse.json(
				{ error: 'Lead ID y token son requeridos' },
				{ status: 400 }
			)
		}

		// Validar los datos de la encuesta
		const validatedData = encuestaSchema.parse(encuestaData)

		const supabase = await createClient()

		// Verificar que el lead existe y el token es correcto
		const { data: lead, error: leadError } = await supabase
			.from('waitlist_leads')
			.select('id, encuesta_completed, encuesta_token')
			.eq('id', leadId)
			.eq('encuesta_token', token)
			.single()

		if (leadError || !lead) {
			return NextResponse.json(
				{ error: 'Token inválido o lead no encontrado' },
				{ status: 404 }
			)
		}

		// Verificar que no haya completado ya la encuesta
		if (lead.encuesta_completed) {
			return NextResponse.json(
				{ error: 'Esta encuesta ya ha sido completada' },
				{ status: 400 }
			)
		}

		// Guardar las respuestas de la encuesta
		const { error: insertError } = await supabase
			.from('encuesta_responses')
			.insert({
				lead_id: leadId,
				// Bloque 1
				tipo_negocio: validatedData.tipo_negocio,
				ciudad: validatedData.ciudad,
				ventas_dia: validatedData.ventas_dia,
				sucursales: validatedData.sucursales,
				metodo_actual: validatedData.metodo_actual,
				metodo_actual_otro: validatedData.metodo_actual_otro,
				frustracion_nivel: validatedData.frustracion_nivel,
				usa_whatsapp: validatedData.usa_whatsapp,
				// Bloque 2
				urgencia_problema: validatedData.urgencia_problema,
				perdida_dinero: validatedData.perdida_dinero,
				tiempo_perdido: validatedData.tiempo_perdido,
				// Bloque 3
				funcionalidades_imprescindibles: validatedData.funcionalidades_imprescindibles,
				funcionalidad_game_changer: validatedData.funcionalidad_game_changer,
				dispuesto_invertir: validatedData.dispuesto_invertir,
				pago_actual: validatedData.pago_actual,
				dispuesto_pagar: validatedData.dispuesto_pagar,
				que_te_haria_elegir: validatedData.que_te_haria_elegir,
				// Bloque 4
				early_adopter_interesado: validatedData.early_adopter_interesado,
				incentivo_preferido: validatedData.incentivo_preferido,
				usaria_activamente: validatedData.usaria_activamente,
				// Bloque 5
				recomendaria: validatedData.recomendaria,
				mejoras_sugeridas: validatedData.mejoras_sugeridas
			})

		if (insertError) {
			console.error('Error inserting encuesta:', insertError)
			return NextResponse.json(
				{ error: 'Error al guardar las respuestas' },
				{ status: 500 }
			)
		}

		// Marcar la encuesta como completada
		const { error: updateError } = await supabase
			.from('waitlist_leads')
			.update({ encuesta_completed: true })
			.eq('id', leadId)

		if (updateError) {
			console.error('Error updating lead:', updateError)
			// No fallar la request si esto falla, ya guardamos las respuestas
		}

		return NextResponse.json(
			{
				success: true,
				message: 'Encuesta guardada exitosamente'
			},
			{ status: 201 }
		)
	} catch (error) {
		console.error('Error in encuesta API:', error)

		if (error instanceof Error && error.name === 'ZodError') {
			return NextResponse.json(
				{ error: 'Datos de encuesta inválidos' },
				{ status: 400 }
			)
		}

		return NextResponse.json(
			{ error: 'Error al procesar la encuesta. Intenta nuevamente.' },
			{ status: 500 }
		)
	}
}
