'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Bloque1Form } from './legacy-bloque1-form'
import { Bloque2Form } from './legacy-bloque2-form'
import { Bloque3Form } from './legacy-bloque3-form'
import { Bloque4Form } from './legacy-bloque4-form'
import { Bloque5Form } from './legacy-bloque5-form'
import { EncuestaInput } from '@/schemas/encuesta.schema'
import { toast } from 'sonner'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'

interface MultiStepEncuestaFormProps {
	leadId: string
	token: string
}

const TOTAL_BLOQUES = 5

const bloqueTitles = [
	'Información Básica',
	'Validación del Problema',
	'Disposición a Pagar',
	'Compromiso como Early Adopter',
	'Feedback Final'
]

const bloqueDescriptions = [
	'Cuéntanos sobre tu negocio',
	'¿Qué tan urgente es resolver tu problema?',
	'Ayúdanos a entender tu presupuesto',
	'¿Estás listo para ser de los primeros?',
	'Tu opinión es valiosa para nosotros'
]

export function MultiStepEncuestaForm({ leadId, token }: MultiStepEncuestaFormProps) {
	const router = useRouter()
	const [currentStep, setCurrentStep] = useState(1)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [formData, setFormData] = useState<Partial<EncuestaInput>>({})

	const progress = (currentStep / TOTAL_BLOQUES) * 100

	const handleBloqueComplete = (bloqueData: Partial<EncuestaInput>) => {
		// Guardar datos del bloque actual
		setFormData((prev) => ({ ...prev, ...bloqueData }))

		// Si es el último bloque, enviar todo
		if (currentStep === TOTAL_BLOQUES) {
			submitEncuesta({ ...formData, ...bloqueData })
		} else {
			// Ir al siguiente bloque
			setCurrentStep((prev) => prev + 1)
			window.scrollTo({ top: 0, behavior: 'smooth' })
		}
	}

	const submitEncuesta = async (data: Partial<EncuestaInput>) => {
		setIsSubmitting(true)

		try {
			const response = await fetch('/api/encuesta', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					leadId,
					token,
					...data
				})
			})

			const result = await response.json()

			if (!response.ok) {
				throw new Error(result.error || 'Error al guardar la encuesta')
			}

			toast.success('¡Encuesta completada exitosamente!')
			router.push('/encuesta/completada')
		} catch (error) {
			console.error('Error submitting encuesta:', error)
			toast.error(
				error instanceof Error ? error.message : 'Error al guardar la encuesta'
			)
			setIsSubmitting(false)
		}
	}

	const goToPreviousStep = () => {
		if (currentStep > 1) {
			setCurrentStep((prev) => prev - 1)
			window.scrollTo({ top: 0, behavior: 'smooth' })
		}
	}

	const renderCurrentBloque = () => {
		const commonProps = {
			initialData: formData,
			onComplete: handleBloqueComplete,
			isSubmitting
		}

		switch (currentStep) {
			case 1:
				return <Bloque1Form {...commonProps} />
			case 2:
				return <Bloque2Form {...commonProps} />
			case 3:
				return <Bloque3Form {...commonProps} />
			case 4:
				return <Bloque4Form {...commonProps} />
			case 5:
				return <Bloque5Form {...commonProps} />
			default:
				return null
		}
	}

	return (
		<div className="space-y-6">
			{/* Progress Bar */}
			<Card>
				<CardHeader className="pb-3">
					<div className="flex items-center justify-between mb-2">
						<span className="text-sm font-medium">
							Paso {currentStep} de {TOTAL_BLOQUES}
						</span>
						<span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
					</div>
					<Progress value={progress} className="h-2" />
				</CardHeader>
			</Card>

			{/* Current Bloque */}
			<Card>
				<CardHeader>
					<div className="flex items-center gap-3 mb-2">
						<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
							{currentStep === TOTAL_BLOQUES ? (
								<CheckCircle2 className="w-5 h-5 text-primary" />
							) : (
								<span className="text-primary font-bold">{currentStep}</span>
							)}
						</div>
						<div>
							<CardTitle>{bloqueTitles[currentStep - 1]}</CardTitle>
							<CardDescription>{bloqueDescriptions[currentStep - 1]}</CardDescription>
						</div>
					</div>
				</CardHeader>

				<CardContent>{renderCurrentBloque()}</CardContent>
			</Card>

			{/* Navigation Buttons */}
			{currentStep > 1 && (
				<div className="flex justify-center">
					<Button variant="ghost" onClick={goToPreviousStep} disabled={isSubmitting}>
						<ArrowLeft className="mr-2 h-4 w-4" />
						Anterior
					</Button>
				</div>
			)}
		</div>
	)
}
