import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const getTokenSchema = z.object({
	email: z.string().email('Email inválido')
})

export async function POST(request: NextRequest) {
	try {
		const body = await request.json()

		// Validate email
		const { email } = getTokenSchema.parse(body)

		// Create Supabase client
		const supabase = await createClient()

		// Find lead by email
		const { data: lead, error } = await supabase
			.from('waitlist_leads')
			.select('id, name, encuesta_token, encuesta_completed')
			.eq('email', email.toLowerCase().trim())
			.single()

		if (error || !lead) {
			return NextResponse.json(
				{
					error: 'No encontramos tu registro. Verifica que el email sea correcto o regístrate primero.'
				},
				{ status: 404 }
			)
		}

		// Check if survey already completed
		if (lead.encuesta_completed) {
			return NextResponse.json(
				{
					error: 'Ya completaste la encuesta anteriormente. ¡Gracias por tu participación!',
					completed: true
				},
				{ status: 400 }
			)
		}

		// Return token
		return NextResponse.json({
			success: true,
			token: lead.encuesta_token,
			name: lead.name
		})
	} catch (error) {
		console.error('Error getting survey token:', error)

		if (error instanceof z.ZodError) {
			return NextResponse.json(
				{ error: 'Email inválido. Por favor verifica el formato.' },
				{ status: 400 }
			)
		}

		return NextResponse.json(
			{ error: 'Error al buscar tu encuesta. Intenta nuevamente.' },
			{ status: 500 }
		)
	}
}
