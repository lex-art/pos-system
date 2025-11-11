import { emailService } from './email.service'

interface SendWelcomeEmailParams {
	to: {
		email: string
		name: string
	}
	encuestaToken: string
}

export async function sendWelcomeEmail({
	to,
	encuestaToken
}: SendWelcomeEmailParams): Promise<{ success: boolean; error?: string; messageId?: string }> {
	try {
		const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'
		const encuestaUrl = `${appUrl}/encuesta/${encuestaToken}`
		const result = await emailService.sendEmail({
			toEmails: [
				{
					email: to.email,
					name: to.name
				}
			],
			subject: '¡Bienvenido a la lista de espera del POS! 🎉',
			templatePath: 'welcome.template.hbs',
			context: {
				name: to.name,
				encuesta_url: encuestaUrl,
				logo_url: `${appUrl}/logo.png`
			}
		})

		return {
			success: true,
			messageId: result.messageId
		}
	} catch (error) {
		console.error('❌ Error sending email:', error)
		return {
			success: false,
			error: error instanceof Error ? error.message : 'Unknown error'
		}
	}
}
