import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FadeIn } from '@/components/shared/fade-in'
import { WaitlistForm } from './waitlist-form'
import { copy } from '@/config/copy'

export function FeaturesSection() {
	return (
		<section id="waitlist-form" className="py-20 bg-muted/30">
			<div className="container mx-auto px-4">
				<div className="max-w-2xl mx-auto">
					<FadeIn>
						<div className="text-center mb-12">
							<h2 className="text-3xl md:text-4xl font-bold mb-4">
								{copy.hero.formTitle}
							</h2>
							<p className="text-lg text-muted-foreground">
								{copy.hero.formDescription}
							</p>
						</div>
					</FadeIn>
					

					<FadeIn delay={100}>
						<Card className="shadow-xl  relative">
							
							<CardHeader className="text-center">
								
								<CardTitle className="text-2xl">Únete a la Lista de Espera</CardTitle>
								<CardDescription className="text-base">
								🔥 Regístrate ahora y obtén 3 meses gratis al lanzar
								</CardDescription>
							</CardHeader>
							<CardContent className="p-6">
								<WaitlistForm />
							</CardContent>
						</Card>
					</FadeIn>

					<FadeIn delay={200}>
						<div className="mt-8 text-center space-y-2">
							<p className="text-base md:text-sm text-muted-foreground">
								✓ Sin tarjeta de crédito ✓ Acceso gratuito ✓ Cancela cuando quieras
							</p>
						</div>
					</FadeIn>
				</div>
			</div>
		</section>
	)
}
