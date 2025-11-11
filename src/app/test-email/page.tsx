'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2, XCircle, Loader2, Mail } from 'lucide-react'

export default function TestEmailPage() {
	const [email, setEmail] = useState('')
	const [name, setName] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [result, setResult] = useState<{
		success: boolean
		message?: string
		error?: string
		details?: any
	} | null>(null)

	const handleTest = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)
		setResult(null)

		try {
			const response = await fetch('/api/test-email', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, name })
			})

			const data = await response.json()
			setResult(data)
		} catch (error) {
			setResult({
				success: false,
				error: error instanceof Error ? error.message : 'Error desconocido'
			})
		} finally {
			setIsLoading(false)
		}
	}

	// Solo mostrar en desarrollo
	if (process.env.NODE_ENV === 'production') {
		return (
			<div className="min-h-screen flex items-center justify-center p-4">
				<Card>
					<CardHeader>
						<CardTitle>No Disponible</CardTitle>
						<CardDescription>Esta página solo está disponible en desarrollo</CardDescription>
					</CardHeader>
				</Card>
			</div>
		)
	}

	return (
		<div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
			<div className="w-full max-w-2xl">
				<Card>
					<CardHeader>
						<div className="flex items-center gap-3">
							<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
								<Mail className="w-6 h-6 text-primary" />
							</div>
							<div>
								<CardTitle>Prueba de Email - Brevo</CardTitle>
								<CardDescription>
									Envía un email de prueba para verificar la configuración
								</CardDescription>
							</div>
						</div>
					</CardHeader>

					<CardContent className="space-y-6">
						{/* Configuración actual */}
						<div className="bg-muted/50 p-4 rounded-lg space-y-2 text-sm">
							<h3 className="font-semibold mb-2">Configuración Actual:</h3>
							<div className="space-y-1 font-mono text-xs">
								<div className="flex justify-between">
									<span className="text-muted-foreground">BREVO_API_KEY:</span>
									<span>
										{process.env.NEXT_PUBLIC_BREVO_CONFIGURED ? '✅ Configurado' : '❌ No configurado'}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-muted-foreground">BREVO_SENDER_EMAIL:</span>
									<span className="text-foreground">
										{process.env.NEXT_PUBLIC_SENDER_EMAIL || 'No configurado'}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-muted-foreground">BREVO_SENDER_NAME:</span>
									<span className="text-foreground">
										{process.env.NEXT_PUBLIC_SENDER_NAME || 'POS System'}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-muted-foreground">APP_URL:</span>
									<span className="text-foreground">
										{process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'}
									</span>
								</div>
							</div>
						</div>

						{/* Formulario */}
						<form onSubmit={handleTest} className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="name">Nombre</Label>
								<Input
									id="name"
									value={name}
									onChange={(e) => setName(e.target.value)}
									placeholder="Ej: Juan Pérez"
									required
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="tu-email@ejemplo.com"
									required
								/>
								<p className="text-xs text-muted-foreground">
									Se enviará un email de prueba a esta dirección
								</p>
							</div>

							<Button type="submit" className="w-full" disabled={isLoading}>
								{isLoading ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Enviando...
									</>
								) : (
									<>
										<Mail className="mr-2 h-4 w-4" />
										Enviar Email de Prueba
									</>
								)}
							</Button>
						</form>

						{/* Resultado */}
						{result && (
							<Alert
								variant={result.success ? 'default' : 'destructive'}
								className={result.success ? 'border-green-500' : ''}
							>
								{result.success ? (
									<CheckCircle2 className="h-4 w-4 text-green-500" />
								) : (
									<XCircle className="h-4 w-4" />
								)}
								<AlertTitle>{result.success ? '¡Éxito!' : 'Error'}</AlertTitle>
								<AlertDescription>
									{result.message || result.error}
									{result.details && (
										<div className="mt-3 p-3 bg-background rounded text-xs font-mono space-y-1">
											<div>
												<strong>Para:</strong> {result.details.to}
											</div>
											<div>
												<strong>Token:</strong> {result.details.token}
											</div>
											<div>
												<strong>URL:</strong>{' '}
												<a
													href={result.details.url}
													target="_blank"
													rel="noopener noreferrer"
													className="text-primary hover:underline"
												>
													{result.details.url}
												</a>
											</div>
										</div>
									)}
								</AlertDescription>
							</Alert>
						)}

						{/* Instrucciones */}
						<div className="border-t pt-4">
							<h3 className="font-semibold mb-2 text-sm">Instrucciones:</h3>
							<ol className="text-sm space-y-2 text-muted-foreground list-decimal list-inside">
								<li>Configura tus credenciales de Brevo en el archivo .env</li>
								<li>Ingresa tu email y nombre en el formulario</li>
								<li>Click en &quot;Enviar Email de Prueba&quot;</li>
								<li>Revisa tu bandeja de entrada (y spam)</li>
								<li>Verifica que el link de la encuesta funcione</li>
							</ol>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
