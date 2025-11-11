import Link from 'next/link'
import { CheckCircle2, Mail, ArrowLeft, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata = {
	title: '¡Bienvenido! | POS Guatemala',
	description: '✅ Estás en la lista de espera. Revisa tu email para completar la encuesta y garantizar tus 3 meses gratis.',
	openGraph: {
		title: '✅ ¡Ya estás en la lista de espera!',
		description: 'Revisa tu email para el siguiente paso. Primeros 20 usuarios: 3 meses gratis 🔥',
		images: ['/opengraph-image']
	}
}

export default function GraciasPage() {
	// WhatsApp o Telegram - configurar en variables de entorno
	const communityLink = process.env.NEXT_PUBLIC_COMMUNITY_LINK
	const communityType = process.env.NEXT_PUBLIC_COMMUNITY_TYPE || 'WhatsApp'

	return (
		<div className="min-h-screen flex items-center justify-center p-4">
			<div className="w-full max-w-2xl">
				<Card className="shadow-lg">
					<CardHeader className="text-center space-y-4">
						<div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
							<CheckCircle2 className="w-10 h-10 text-primary" />
						</div>
						<CardTitle className="text-3xl">¡Gracias por unirte!</CardTitle>
						<CardDescription className="text-base">
							Has sido registrado exitosamente en nuestra lista de espera
						</CardDescription>
					</CardHeader>

					<CardContent className="space-y-6">
						<div className="bg-muted/50 p-6 rounded-lg space-y-4">
							<div className="flex gap-3">
								<Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
								<div>
									<h3 className="font-semibold mb-2">Revisa tu correo electrónico</h3>
									<p className="text-sm text-muted-foreground mb-3">
										Te hemos enviado un email con un link para completar una{' '}
										<strong>encuesta de validación</strong>. Esto nos ayuda a construir el
										producto perfecto para tu negocio.
									</p>
									<div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-3">
										<p className="text-xs text-yellow-800 dark:text-yellow-200 font-medium">
											💡 <strong>¿No ves el email?</strong> Revisa tu carpeta de spam o correo no deseado.
											A veces nuestros emails terminan ahí.
										</p>
									</div>
								</div>
							</div>

							<div className="border-t border-border pt-4">
								<h4 className="font-semibold text-sm mb-2">¿Por qué completar la encuesta?</h4>
								<ul className="space-y-2 text-sm text-muted-foreground">
									<li className="flex gap-2">
										<span className="text-primary">✓</span>
										<span>Garantizas tu lugar como <strong>early adopter</strong></span>
									</li>
									<li className="flex gap-2">
										<span className="text-primary">✓</span>
										<span>Primeros 20 usuarios: <strong>3 meses gratis</strong></span>
									</li>
									<li className="flex gap-2">
										<span className="text-primary">✓</span>
										<span>Ayudas a construir las funcionalidades que realmente necesitas</span>
									</li>
								</ul>
							</div>
						</div>

						{communityLink && (
							<div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
								<div className="flex items-start gap-3">
									<MessageCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
									<div className="flex-1">
										<h3 className="font-semibold text-sm mb-1">
											Únete a nuestra comunidad
										</h3>
										<p className="text-xs text-muted-foreground mb-3">
											Recibe actualizaciones, comparte ideas y conecta con otros early adopters
										</p>
										<Button asChild size="sm" className="w-full sm:w-auto">
											<a
												href={communityLink}
												target="_blank"
												rel="noopener noreferrer"
											>
												<MessageCircle className="mr-2 h-4 w-4" />
												Unirse a {communityType}
											</a>
										</Button>
									</div>
								</div>
							</div>
						)}

						<div className="flex flex-col sm:flex-row gap-3">
							<Button asChild variant="outline" className="flex-1">
								<Link href="/">
									<ArrowLeft className="mr-2 h-4 w-4" />
									Volver al inicio
								</Link>
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
