import { Card, CardContent } from '@/components/ui/card'
import { FadeIn } from '@/components/shared/fade-in'
import { copy } from '@/config/copy'

export function ProblemSection() {
	return (
		<section className="py-20 bg-muted/30">
			<div className="container mx-auto px-4">
				<div className="text-center max-w-3xl mx-auto mb-16">
					<FadeIn>
						<h2 className="text-3xl md:text-4xl font-bold mb-4">
							{copy.problem.title}
						</h2>
					</FadeIn>
					<FadeIn delay={100}>
						<p className="text-lg text-muted-foreground">{copy.problem.subtitle}</p>
					</FadeIn>
				</div>

				<div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
					{copy.problem.items.map((item, index) => (
						<FadeIn key={index} delay={index * 100}>
							<Card className="h-full hover:shadow-lg transition-shadow">
								<CardContent className="p-6">
									<div className="flex gap-4">
										<div className="text-3xl shrink-0">{item.icon}</div>
										<div>
											<h3 className="font-semibold mb-2">{item.title}</h3>
											<p className="text-sm text-muted-foreground">
												{item.description}
											</p>
										</div>
									</div>
								</CardContent>
							</Card>
						</FadeIn>
					))}
				</div>

				{/* Solution teaser */}
				<FadeIn delay={400}>
					<div className="mt-16 text-center max-w-3xl mx-auto">
						<div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
							{copy.solution.badge}
						</div>
						<h3 className="text-2xl font-bold mb-4">{copy.solution.title}</h3>
						<p className="text-muted-foreground">{copy.solution.description}</p>
					</div>
				</FadeIn>
			</div>
		</section>
	)
}
