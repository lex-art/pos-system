'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Mail, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const emailSchema = z.object({
	email: z.string().email('Por favor ingresa un email válido')
})

type EmailInput = z.infer<typeof emailSchema>

export default function MiEncuestaPage() {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [isCompleted, setIsCompleted] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<EmailInput>({
		resolver: zodResolver(emailSchema)
	})

	const onSubmit = async (data: EmailInput) => {
		try {
			setIsLoading(true)
			setError(null)
			setIsCompleted(false)

			const response = await fetch('/api/encuesta/get-token', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email: data.email })
			})

			const result = await response.json()

			if (!response.ok) {
				// Check if survey was already completed
				if (result.completed) {
					setIsCompleted(true)
				}
				throw new Error(result.error || 'Error al buscar tu encuesta')
			}

			// Redirect to survey with token
			router.push(`/encuesta/${result.token}`)
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Error al buscar tu encuesta'
			setError(errorMessage)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-muted/20">
			<div className="w-full max-w-md">
				<Card className="shadow-xl">
					<CardHeader className="text-center space-y-2">
						<div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
							<Mail className="w-6 h-6 text-primary" />
						</div>
						<CardTitle className="text-2xl">Accede a tu Encuesta</CardTitle>
						<CardDescription>
							Ingresa tu correo electrónico para continuar con la encuesta de validación
						</CardDescription>
					</CardHeader>

					<CardContent className="space-y-6">
						<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="email">Correo Electrónico</Label>
								<Input
									id="email"
									type="email"
									placeholder="tu-email@ejemplo.com"
									{...register('email')}
									disabled={isLoading}
								/>
								{errors.email && (
									<p className="text-sm text-destructive">{errors.email.message}</p>
								)}
							</div>

							{error && !isCompleted && (
								<Alert variant="destructive">
									<AlertCircle className="h-4 w-4" />
									<AlertDescription>{error}</AlertDescription>
								</Alert>
							)}

							{isCompleted && (
								<Alert className="border-primary/50 bg-primary/5">
									<CheckCircle2 className="h-4 w-4 text-primary" />
									<AlertDescription className="text-primary">
										¡Ya completaste la encuesta! Gracias por tu participación.{' '}
										<Link href="/encuesta/completada" className="underline font-semibold">
											Ver detalles
										</Link>
									</AlertDescription>
								</Alert>
							)}

							<Button type="submit" className="w-full" size="lg" disabled={isLoading}>
								{isLoading ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Buscando...
									</>
								) : (
									<>
										<Mail className="mr-2 h-4 w-4" />
										Acceder a mi Encuesta
									</>
								)}
							</Button>
						</form>

						<div className="pt-4 border-t">
							<div className="text-center space-y-3">
								<p className="text-xs text-muted-foreground">
									¿Aún no te has registrado?
								</p>
								<Button asChild variant="outline" size="sm" className="w-full">
									<Link href="/">
										<ArrowLeft className="mr-2 h-4 w-4" />
										Volver al Inicio
									</Link>
								</Button>
							</div>
						</div>

						<div className="bg-muted/50 p-4 rounded-lg">
							<p className="text-xs text-muted-foreground text-center">
								💡 <strong>Consejo:</strong> Si no encuentras el email en tu bandeja, revisa tu carpeta de spam o correo no deseado.
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
