import Link from 'next/link'
import { CheckCircle2, Gift, Star, ArrowLeft, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const metadata = {
	title: '¡Encuesta Completada! - Eres Early Adopter | POS Guatemala',
	description: '✅ ¡Felicidades! Ya eres early adopter. Disfruta 3 meses gratis, acceso anticipado y soporte VIP en el POS más fácil de Guatemala.',
	openGraph: {
		title: '✅ ¡Soy Early Adopter de POS Guatemala!',
		description: '3 meses gratis • Acceso anticipado • Soporte VIP. El POS más fácil para negocios guatemaltecos está por llegar.',
		images: ['/opengraph-image']
	}
}

export default function EncuestaCompletadaPage() {
	// WhatsApp community configuration
	const communityLink = process.env.NEXT_PUBLIC_COMMUNITY_LINK
	const communityType = process.env.NEXT_PUBLIC_COMMUNITY_TYPE || 'WhatsApp'

	return (
		<div className="min-h-screen flex items-center justify-center p-4">
			<div className="w-full max-w-3xl">
				<Card className="shadow-2xl border-2">
					<CardHeader className="text-center space-y-4 pb-6">
						<div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
							<CheckCircle2 className="w-12 h-12 text-primary" />
						</div>

						<div>
							<CardTitle className="text-3xl md:text-4xl mb-2">
								¡Encuesta Completada!
							</CardTitle>
							<CardDescription className="text-base">
								Muchas gracias por tomarte el tiempo de completar la encuesta
							</CardDescription>
						</div>

						<Badge variant="secondary" className="mx-auto text-sm px-4 py-2">
							🎉 Eres oficialmente un Early Adopter
						</Badge>
					</CardHeader>

					<CardContent className="space-y-8">
						{/* Beneficios */}
						<div className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-lg space-y-4">
							<div className="flex items-center gap-2 mb-4">
								<Gift className="w-5 h-5 text-primary" />
								<h3 className="font-semibold text-lg">Tus Beneficios como Early Adopter</h3>
							</div>

							<div className="space-y-3">
								<div className="flex gap-3">
									<div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
										<Star className="w-4 h-4 text-primary" />
									</div>
									<div>
										<h4 className="font-semibold mb-1">3 Meses Gratis Garantizados</h4>
										<p className="text-sm text-muted-foreground">
											Como uno de los primeros 20 usuarios, tendrás acceso gratuito por 3 meses
										</p>
									</div>
								</div>

								<div className="flex gap-3">
									<div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
										<Star className="w-4 h-4 text-primary" />
									</div>
									<div>
										<h4 className="font-semibold mb-1">Acceso Anticipado</h4>
										<p className="text-sm text-muted-foreground">
											Serás de los primeros en usar el sistema antes del lanzamiento oficial
										</p>
									</div>
								</div>

								<div className="flex gap-3">
									<div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
										<Star className="w-4 h-4 text-primary" />
									</div>
									<div>
										<h4 className="font-semibold mb-1">Influencia Directa</h4>
										<p className="text-sm text-muted-foreground">
											Tu feedback ayuda a construir las funcionalidades que realmente necesitas
										</p>
									</div>
								</div>

								<div className="flex gap-3">
									<div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
										<Star className="w-4 h-4 text-primary" />
									</div>
									<div>
										<h4 className="font-semibold mb-1">Soporte VIP</h4>
										<p className="text-sm text-muted-foreground">
											Atención prioritaria y personalizada para todos tus casos
										</p>
									</div>
								</div>
							</div>
						</div>

						{/* Próximos pasos */}
						<div className="space-y-4">
							<h3 className="font-semibold text-lg">¿Qué sigue ahora?</h3>

							<div className="space-y-3 text-sm">
								<div className="flex gap-3">
									<div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center shrink-0 text-xs font-bold">
										1
									</div>
									<p className="text-muted-foreground">
										<strong className="text-foreground">Revisaremos tu feedback</strong> y lo usaremos para mejorar el producto
									</p>
								</div>

								<div className="flex gap-3">
									<div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center shrink-0 text-xs font-bold">
										2
									</div>
									<p className="text-muted-foreground">
										<strong className="text-foreground">Te contactaremos por email</strong> cuando el producto esté listo para early adopters (4-6 semanas)
									</p>
								</div>

								<div className="flex gap-3">
									<div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center shrink-0 text-xs font-bold">
										3
									</div>
									<p className="text-muted-foreground">
										<strong className="text-foreground">Podrás activar tu cuenta</strong> y empezar a usar el sistema con todos los beneficios
									</p>
								</div>
							</div>
						</div>

						{/* WhatsApp Community */}
						{communityLink && (
							<div className="bg-primary/5 border border-primary/20 p-6 rounded-lg">
								<div className="flex items-start gap-4">
									<MessageCircle className="w-6 h-6 text-primary shrink-0 mt-0.5" />
									<div className="flex-1">
										<h3 className="font-semibold text-lg mb-2">
											Únete a nuestra comunidad
										</h3>
										<p className="text-sm text-muted-foreground mb-4">
											Recibe actualizaciones exclusivas, comparte ideas y conecta con otros early adopters
										</p>
										<Button asChild size="lg" className="w-full sm:w-auto">
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

						{/* Mensaje adicional */}
						<div className="border-t pt-6">
							<p className="text-center text-sm text-muted-foreground">
								Tu opinión es muy valiosa para nosotros. Estamos construyendo el POS perfecto para negocios guatemaltecos como el tuyo.
							</p>
						</div>

						{/* Botón volver */}
						<div className="flex justify-center">
							<Button asChild variant="outline" size="lg">
								<Link href="/">
									<ArrowLeft className="mr-2 h-4 w-4" />
									Volver al Inicio
								</Link>
							</Button>
						</div>

						{/* Footer */}
						{/* <div className="text-center space-y-2 pt-4">
							<p className="text-xs text-muted-foreground">
								¿Tienes alguna pregunta? Escríbenos a{' '}
								<a href="mailto:soporte@posguatemala.com" className="text-primary hover:underline">
									soporte@posguatemala.com
								</a>
							</p>
						</div> */}
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
