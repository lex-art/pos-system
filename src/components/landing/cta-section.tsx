import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FadeIn } from '@/components/shared/fade-in'
import { SlideIn } from '@/components/shared/slide-in'
import { AnimatedNumber } from '@/components/shared/animated-number'
import { WaitlistForm } from './waitlist-form'
import { copy } from '@/config/copy'
import { getTotalLeadsCount } from '@/lib/supabase/queries'

export async function CTASection() {
	const leadsCount = await getTotalLeadsCount()

	return (
		<section className="py-20 relative overflow-hidden">
			{/* Background gradient */}
			<div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background -z-10" />

			<div className="container mx-auto px-4">
				<div className="max-w-5xl mx-auto">
					<div className="text-center mb-12">
						<SlideIn direction="down">
							<Badge variant="secondary" className="text-sm font-medium mb-4">
								{copy.cta.badge}
							</Badge>
						</SlideIn>

						<SlideIn direction="up" delay={100}>
							<h2 className="text-3xl md:text-4xl font-bold mb-4">
								{copy.cta.title}
							</h2>
						</SlideIn>

						<SlideIn direction="up" delay={200}>
							<p className="text-lg text-muted-foreground mb-8">
								{copy.cta.subtitle}
							</p>
						</SlideIn>

						{/* Counter */}
						<FadeIn delay={300}>
							<div className="inline-flex flex-col items-center gap-2 mb-8">
								<div className="flex items-baseline gap-2">
									<AnimatedNumber
										value={leadsCount}
										duration={2000}
										className="text-4xl md:text-5xl font-bold text-primary"
									/>
									<span className="text-xl md:text-2xl text-muted-foreground">personas</span>
								</div>
								<p className="text-sm text-muted-foreground">
									ya están en la lista de espera
								</p>
							</div>
						</FadeIn>
					</div>

					{/* Form */}
					<FadeIn delay={400}>
						<div className="grid md:grid-cols-2 gap-6 md:gap-8 items-start">
							{/* Left - Form */}
							<div className="space-y-3 relative">
								{/* Promotional Badge */}
								<div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 flex justify-center w-full">
									<Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 px-4 py-2 text-sm md:text-base font-bold shadow-lg ">
										🔥 Primeros 20 usuarios: 3 meses gratis
									</Badge>
								</div>
								<Card className="shadow-lg">
								<CardHeader>
									<CardTitle>Únete ahora</CardTitle>
									<CardDescription>
										Registra tu email y sé de los primeros en acceder
									</CardDescription>
								</CardHeader>
								<CardContent>
									<WaitlistForm />
								</CardContent>
							</Card>
							</div>

							{/* Right - Benefits */}
							<div className="space-y-6">
								<h3 className="font-semibold text-xl">Lo que obtienes:</h3>

								<div className="space-y-4">
									<div className="flex gap-3">
										<div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
											<span className="text-primary font-bold">1</span>
										</div>
										<div>
											<h4 className="font-semibold mb-1">Acceso Anticipado</h4>
											<p className="text-sm text-muted-foreground">
												Sé de los primeros en usar el sistema antes del lanzamiento oficial
											</p>
										</div>
									</div>

									<div className="flex gap-3">
										<div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center shrink-0">
											<span className="text-white font-bold text-lg">🔥</span>
										</div>
										<div>
											<h4 className="font-semibold mb-1 flex items-center gap-2 flex-wrap">
												3 Meses Gratis
												<Badge variant="secondary" className="text-sm">Solo primeros 20</Badge>
											</h4>
											<p className="text-sm text-muted-foreground">
												Primeros 20 usuarios obtienen acceso gratuito por 3 meses
											</p>
										</div>
									</div>

									<div className="flex gap-3">
										<div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
											<span className="text-primary font-bold">3</span>
										</div>
										<div>
											<h4 className="font-semibold mb-1">Influye en el Producto</h4>
											<p className="text-sm text-muted-foreground">
												Tu feedback ayuda a construir las funcionalidades que necesitas
											</p>
										</div>
									</div>

									<div className="flex gap-3">
										<div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
											<span className="text-primary font-bold">4</span>
										</div>
										<div>
											<h4 className="font-semibold mb-1">Soporte Prioritario</h4>
											<p className="text-sm text-muted-foreground">
												Atención personalizada y respuesta rápida a tus consultas
											</p>
										</div>
									</div>
								</div>

								<div className="pt-4 border-t">
									<p className="text-sm text-muted-foreground text-center">
										{copy.cta.guarantee}
									</p>
								</div>
							</div>
						</div>
					</FadeIn>
				</div>
			</div>
		</section>
	)
}
