import * as Brevo from '@getbrevo/brevo'
import * as fs from 'fs/promises'
import { join } from 'path'

interface EmailData {
	toEmails: Array<{
		email: string
		name?: string
	}>
	subject: string
	templatePath: string
	context?: Record<string, any>
	senderEmail?: string
	senderName?: string
}

interface EmailResult {
	code: string
	emailSend: boolean
	messageId?: string
}

// Simple template compiler without handlebars
function compileTemplate(template: string, context: Record<string, any> = {}): string {
	let result = template

	// Replace {{variable}} with context values
	Object.keys(context).forEach(key => {
		const regex = new RegExp(`{{${key}}}`, 'g')
		result = result.replace(regex, String(context[key] || ''))
	})

	// Handle {{#if variable}} blocks
	result = result.replace(/{{#if\s+(\w+)}}([\s\S]*?){{\/if}}/g, (_match, variable, content) => {
		return context[variable] ? content : ''
	})

	return result
}

class EmailService {
	private readonly brevoClient: Brevo.TransactionalEmailsApi

	constructor() {
		const apiKey = process.env.BREVO_API_KEY

		if (!apiKey) {
			throw new Error('BREVO_API_KEY is not configured')
		}

		this.brevoClient = new Brevo.TransactionalEmailsApi()
		this.brevoClient.setApiKey(
			Brevo.TransactionalEmailsApiApiKeys.apiKey,
			apiKey
		)
	}

	async sendEmail({
		toEmails,
		subject,
		context,
		templatePath,
		senderEmail = process.env.BREVO_SENDER_EMAIL,
		senderName = process.env.BREVO_SENDER_NAME || 'POS System'
	}: EmailData): Promise<EmailResult> {
		if (!senderEmail) {
			console.error('No sender email provided =>', senderEmail)
			throw new Error('No sender email provided')
		}

		if (!toEmails || toEmails.length === 0) {
			console.error('No recipient email provided')
			throw new Error('No recipient email provided')
		}

		// Read and compile the template
		const templateFullPath = join(process.cwd(), 'src/lib/brevo/templates', templatePath)
		const templateContent = await fs.readFile(templateFullPath, 'utf-8')
		const htmlContent = compileTemplate(templateContent, context)

		// Create the email
		const sendSmtpEmail = new Brevo.SendSmtpEmail()
		sendSmtpEmail.subject = subject
		sendSmtpEmail.to = toEmails
		sendSmtpEmail.htmlContent = htmlContent
		sendSmtpEmail.sender = {
			email: senderEmail,
			name: senderName
		}

		// Send the email
		try {
			const response = await this.brevoClient.sendTransacEmail(sendSmtpEmail)
			return {
				code: 'EMAIL_SEND_SUCCESS',
				emailSend: true,
				messageId: response.body?.messageId
			}
		} catch (error: any) {
			console.error('❌ Error sending email:', {
				message: error?.message,
				response: error?.response?.body,
				statusCode: error?.response?.statusCode
			})
			throw new Error(
				error?.response?.body?.message ?? error?.message ?? 'Error sending email'
			)
		}
	}
}

// Export a singleton instance
export const emailService = new EmailService()
