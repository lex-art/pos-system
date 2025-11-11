import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { waitlistSchema } from '@/schemas/waitlist.schema'
import { sendWelcomeEmail } from '@/lib/brevo/send-email'
import { randomUUID } from 'crypto'

export async function POST(request: NextRequest) {
	try {
		// Parse and validate request body
		const body = await request.json()
		const validatedData = waitlistSchema.parse(body)

		// Create Supabase client
		const supabase = await createClient()

		// Check if email already exists
		const { data: existingLead } = await supabase
			.from('waitlist_leads')
			.select('email')
			.eq('email', validatedData.email)
			.single()

		if (existingLead) {
			return NextResponse.json(
				{ error: 'Este correo ya está registrado en la lista de espera' },
				{ status: 400 }
			)
		}

		// Generate unique token for survey
		const encuestaToken = randomUUID()

		// Insert lead into database
		const { data: newLead, error: insertError } = await supabase
			.from('waitlist_leads')
			.insert({
				email: validatedData.email,
				name: validatedData.name,
				encuesta_token: encuestaToken,
				encuesta_completed: false
			})
			.select()
			.single()

		if (insertError) {
			console.error('Error inserting lead:', insertError)
			return NextResponse.json(
				{ error: 'Error al guardar el registro' },
				{ status: 500 }
			)
		}

		// Send welcome email with Brevo
		const emailResult = await sendWelcomeEmail({
			to: {
				email: validatedData.email,
				name: validatedData.name
			},
			encuestaToken
		})

		if (!emailResult.success) {
			console.error('Error sending email:', emailResult.error)
			// Don't fail the request if email fails, just log it
		}

		return NextResponse.json(
			{
				success: true,
				message: 'Registro exitoso. Revisa tu correo para completar la encuesta.',
				data: {
					email: newLead.email,
					name: newLead.name
				}
			},
			{ status: 201 }
		)
	} catch (error) {
		console.error('Error in waitlist API:', error)

		if (error instanceof Error && error.name === 'ZodError') {
			return NextResponse.json(
				{ error: 'Datos inválidos. Verifica tu nombre y correo.' },
				{ status: 400 }
			)
		}

		return NextResponse.json(
			{ error: 'Error al procesar el registro. Intenta nuevamente.' },
			{ status: 500 }
		)
	}
}
