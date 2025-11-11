import { notFound, redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { SimpleSurveyForm } from '@/components/encuesta/simple-survey-form'

interface PageProps {
	params: Promise<{ token: string }>
}

export const metadata = {
	title: 'Encuesta de Validación | POS System',
	description: 'Ayúdanos a construir el POS perfecto para tu negocio'
}

export default async function EncuestaPage({ params }: PageProps) {
	const { token } = await params
	const supabase = await createClient()

	// Verificar que el token existe
	const { data: lead, error } = await supabase
		.from('waitlist_leads')
		.select('id, email, name, encuesta_completed')
		.eq('encuesta_token', token)
		.single()

	// Si el token no existe, mostrar 404
	if (error || !lead) {
		notFound()
	}

	// Si ya completó la encuesta, redirigir a página de completada
	if (lead.encuesta_completed) {
		redirect('/encuesta/completada')
	}

	return (
		<div className="min-h-screen py-12 px-4">
			<div className="container mx-auto max-w-4xl">
				{/* Header */}
				<div className="text-center mb-12">
					<h1 className="text-3xl md:text-4xl font-bold mb-4">
						Encuesta de Validación
					</h1>
					<p className="text-lg text-muted-foreground">
						Hola <span className="font-semibold text-foreground">{lead.name}</span>,
						ayúdanos a construir el POS perfecto para tu negocio
					</p>
					<p className="text-sm text-muted-foreground mt-2">
						Solo 6 preguntas · Menos de 3 minutos ⚡
					</p>
				</div>

				{/* Formulario Simple */}
				<SimpleSurveyForm leadId={lead.id} token={token} />
			</div>
		</div>
	)
}
