import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { encuestaSimpleSchema } from '@/schemas/encuesta-simple.schema'

export async function POST(request: NextRequest) {
	try {
		const body = await request.json()
		const { token, leadId, respuestas } = body

		// Validate token and leadId
		if (!token || !leadId) {
			return NextResponse.json(
				{ error: 'Token y leadId son requeridos' },
				{ status: 400 }
			)
		}

		// Validate survey data
		const validatedData = encuestaSimpleSchema.parse(respuestas)

		// Create Supabase client
		const supabase = await createClient()

		// Verify that the lead exists and token matches
		const { data: lead, error: leadError } = await supabase
			.from('waitlist_leads')
			.select('id, email, encuesta_completed')
			.eq('id', leadId)
			.eq('encuesta_token', token)
			.single()

		if (leadError || !lead) {
			return NextResponse.json(
				{ error: 'Token inválido o lead no encontrado' },
				{ status: 404 }
			)
		}

		// Check if survey already completed
		if (lead.encuesta_completed) {
			return NextResponse.json(
				{ error: 'La encuesta ya fue completada anteriormente' },
				{ status: 400 }
			)
		}

		// Save survey responses to the simple survey table
		const { error: insertError } = await supabase
			.from('encuesta_simple_responses')
			.insert({
				lead_id: leadId,
				...validatedData
			})

		if (insertError) {
			console.error('Error inserting survey:', insertError)
			return NextResponse.json(
				{ error: 'Error al guardar la encuesta' },
				{ status: 500 }
			)
		}

		// Mark survey as completed
		const { error: updateError } = await supabase
			.from('waitlist_leads')
			.update({ encuesta_completed: true })
			.eq('id', leadId)

		if (updateError) {
			console.error('Error updating lead:', updateError)
			return NextResponse.json(
				{ error: 'Error al actualizar el estado' },
				{ status: 500 }
			)
		}

		return NextResponse.json({
			success: true,
			message: 'Encuesta completada exitosamente'
		})
	} catch (error) {
		console.error('Error in survey API:', error)

		if (error instanceof Error && error.name === 'ZodError') {
			return NextResponse.json(
				{ error: 'Datos inválidos. Verifica todas las respuestas.' },
				{ status: 400 }
			)
		}

		return NextResponse.json(
			{ error: 'Error al procesar la encuesta. Intenta nuevamente.' },
			{ status: 500 }
		)
	}
}
