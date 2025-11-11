import { Metadata } from 'next'

export const metadata: Metadata = {
	title: '🔥 Completa tu Encuesta - 3 Meses Gratis | POS Guatemala',
	description: '¡Garantiza tus 3 meses GRATIS! Solo 6 preguntas rápidas (menos de 3 minutos). Sé uno de los primeros 20 usuarios con acceso anticipado.',
	openGraph: {
		title: '🔥 ¡3 Meses Gratis! Completa Tu Encuesta',
		description: 'Solo 6 preguntas • Menos de 3 minutos • Primeros 20 usuarios con acceso anticipado al POS más fácil de Guatemala',
		type: 'website',
		locale: 'es_GT',
		siteName: 'POS Guatemala',
		images: [
			{
				url: '/og-image-encuesta.jpg',
				width: 1200,
				height: 630,
				alt: '3 Meses Gratis - POS Guatemala'
			}
		]
	},
	twitter: {
		card: 'summary_large_image',
		title: '🔥 ¡3 Meses Gratis! Completa Tu Encuesta',
		description: 'Solo 6 preguntas • Menos de 3 minutos • Sé early adopter',
		images: ['/og-image-encuesta.jpg']
	}
}

export default function MiEncuestaLayout({ children }: { children: React.ReactNode }) {
	return children
}
