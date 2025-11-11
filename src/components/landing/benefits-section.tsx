import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { HoverScale } from '@/components/shared/hover-scale'
import { SlideIn } from '@/components/shared/slide-in'
import { copy } from '@/config/copy'

export function BenefitsSection() {
	return (
		<section className="py-20 bg-muted/30">
			<div className="container mx-auto px-4">
				<div className="text-center max-w-3xl mx-auto mb-16">
					<SlideIn direction="up">
						<h2 className="text-3xl md:text-4xl font-bold mb-4">
							{copy.benefits.title}
						</h2>
					</SlideIn>
					<SlideIn direction="up" delay={100}>
						<p className="text-lg text-muted-foreground">
							{copy.benefits.subtitle}
						</p>
					</SlideIn>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
					{copy.benefits.items.map((benefit, index) => (
						<SlideIn key={index} delay={index * 100} direction="up">
							<HoverScale>
								<Card className="h-full text-center shadow-lg border-2 hover:border-primary/50 transition-colors">
									<CardHeader>
										<div className="text-4xl mb-2">{benefit.icon}</div>
										<CardTitle className="text-lg">{benefit.title}</CardTitle>
										<CardDescription>{benefit.description}</CardDescription>
									</CardHeader>
								</Card>
							</HoverScale>
						</SlideIn>
					))}
				</div>
			</div>
		</section>
	)
}
