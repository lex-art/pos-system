import { NextRequest, NextResponse } from 'next/server'
import { sendWelcomeEmail } from '@/lib/brevo/send-email'

// Solo disponible en desarrollo
export async function POST(request: NextRequest) {
	// Verificar que estamos en desarrollo
	if (process.env.NODE_ENV !== 'development') {
		return NextResponse.json({ error: 'Not available in production' }, { status: 403 })
	}

	try {
		const body = await request.json()
		const { email, name } = body

		if (!email || !name) {
			return NextResponse.json(
				{ error: 'Email y nombre son requeridos' },
				{ status: 400 }
			)
		}

		// Validar configuración de Brevo
		if (!process.env.BREVO_API_KEY) {
			return NextResponse.json(
				{
					error: 'BREVO_API_KEY no está configurado',
					help: 'Agrega BREVO_API_KEY en tu archivo .env'
				},
				{ status: 500 }
			)
		}

		if (!process.env.BREVO_SENDER_EMAIL) {
			return NextResponse.json(
				{
					error: 'BREVO_SENDER_EMAIL no está configurado',
					help: 'Agrega BREVO_SENDER_EMAIL en tu archivo .env'
				},
				{ status: 500 }
			)
		}

		// Generar token de prueba
		const testToken = 'test-token-' + Date.now()

		// Enviar email de prueba
		const result = await sendWelcomeEmail({
			to: {
				email,
				name
			},
			encuestaToken: testToken
		})

		if (!result.success) {
			return NextResponse.json(
				{
					success: false,
					error: result.error,
					help: 'Verifica que tu BREVO_API_KEY sea válida'
				},
				{ status: 500 }
			)
		}

		return NextResponse.json({
			success: true,
			message: 'Email de prueba enviado exitosamente',
			details: {
				to: email,
				token: testToken,
				url: `${process.env.NEXT_PUBLIC_APP_URL}/encuesta/${testToken}`
			}
		})
	} catch (error) {
		console.error('Error en test-email:', error)
		return NextResponse.json(
			{
				success: false,
				error: error instanceof Error ? error.message : 'Error desconocido'
			},
			{ status: 500 }
		)
	}
}
