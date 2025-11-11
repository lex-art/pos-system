import Link from 'next/link'
import { AlertCircle, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function NotFound() {
	return (
		<div className="min-h-screen flex items-center justify-center p-4">
			<div className="w-full max-w-2xl">
				<Card className="shadow-lg">
					<CardHeader className="text-center space-y-4">
						<div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
							<AlertCircle className="w-10 h-10 text-destructive" />
						</div>
						<CardTitle className="text-3xl">Encuesta no encontrada</CardTitle>
						<CardDescription className="text-base">
							El link que usaste no es válido o ya expiró
						</CardDescription>
					</CardHeader>

					<CardContent className="space-y-6">
						<div className="bg-muted/50 p-6 rounded-lg space-y-3">
							<h3 className="font-semibold">¿Qué pudo haber pasado?</h3>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li className="flex gap-2">
									<span>•</span>
									<span>El link de la encuesta no es correcto</span>
								</li>
								<li className="flex gap-2">
									<span>•</span>
									<span>Ya completaste esta encuesta anteriormente</span>
								</li>
								<li className="flex gap-2">
									<span>•</span>
									<span>El link expiró o fue usado en otra sesión</span>
								</li>
							</ul>
						</div>

						<div className="space-y-4">
							<p className="text-sm text-muted-foreground text-center">
								Si crees que esto es un error, contáctanos a{' '}
								<a
									href="mailto:soporte@posguatemala.com"
									className="text-primary hover:underline"
								>
									soporte@posguatemala.com
								</a>
							</p>

							<div className="flex flex-col sm:flex-row gap-3">
								<Button asChild variant="outline" className="flex-1">
									<Link href="/">
										<ArrowLeft className="mr-2 h-4 w-4" />
										Volver al inicio
									</Link>
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
