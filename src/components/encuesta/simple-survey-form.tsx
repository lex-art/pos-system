'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { encuestaSimpleSchema, EncuestaSimpleInput } from '@/schemas/encuesta-simple.schema'
import { encuestaSimpleOptions } from '@/config/encuesta-simple-options'
import { useTracking } from '@/lib/tracking/use-tracking'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

interface SimpleSurveyFormProps {
	leadId: string
	token: string
}

export function SimpleSurveyForm({ leadId, token }: SimpleSurveyFormProps) {
	const router = useRouter()
	const { trackEvent } = useTracking()
	const [isSubmitting, setIsSubmitting] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		watch
	} = useForm<EncuestaSimpleInput>({
		resolver: zodResolver(encuestaSimpleSchema)
	})

	// Watch tipo_negocio to show/hide conditional field
	const tipoNegocio = watch('tipo_negocio')

	// Track survey started on mount
	useEffect(() => {
		trackEvent({
			event: 'SurveyStarted',
			data: {
				survey_type: 'simple',
				lead_id: leadId
			}
		})
	}, [trackEvent, leadId])

	const onSubmit = async (data: EncuestaSimpleInput) => {
		setIsSubmitting(true)

		try {
			const response = await fetch('/api/encuesta-simple', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					token,
					leadId,
					respuestas: data
				})
			})

			if (!response.ok) {
				throw new Error('Error al enviar la encuesta')
			}

			// Track successful survey completion
			trackEvent({
				event: 'SurveyCompleted',
				data: {
					survey_type: 'simple',
					lead_id: leadId,
					content_name: 'Simple Survey Completion',
					content_category: 'survey'
				}
			})

			toast.success('¡Encuesta completada exitosamente!')
			router.push('/encuesta/completada')
		} catch (error) {
			console.error('Error submitting survey:', error)

			// Track survey error
			trackEvent({
				event: 'FormError',
				data: {
					form: 'survey_simple',
					error: error instanceof Error ? error.message : 'Unknown error'
				}
			})

			toast.error('Hubo un error al enviar la encuesta. Intenta nuevamente.')
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
			<Card>
				<CardHeader>
					<CardTitle>Encuesta de Validación</CardTitle>
					<CardDescription>
						Solo 7 preguntas rápidas para conocerte mejor. Toma menos de 3 minutos.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-8">
					{/* Pregunta 1: Tipo de negocio */}
					<div className="space-y-3">
						<Label className="text-base font-semibold">
							1. ¿Qué tipo de negocio tienes?
						</Label>
						<RadioGroup
							onValueChange={(value) => setValue('tipo_negocio', value)}
							className="space-y-2 pt-2"
						>
							{encuestaSimpleOptions.tipo_negocio.map((option) => (
								<div key={option.value} className="flex items-center space-x-2 py-2">
									<RadioGroupItem value={option.value} id={`negocio-${option.value}`} className="cursor-pointer" />
									<Label
										htmlFor={`negocio-${option.value}`}
										className="font-normal cursor-pointer flex-1"
									>
										{option.label}
									</Label>
								</div>
							))}
						</RadioGroup>
						{errors.tipo_negocio && (
							<p className="text-sm text-destructive">{errors.tipo_negocio.message}</p>
						)}

						{/* Campo condicional: mostrar solo si selecciona "otros" */}
						{tipoNegocio === 'otros' && (
							<div className="pt-2 space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
								<Label htmlFor="tipo_negocio_otro" className="text-sm font-medium">
									¿A qué se dedica tu negocio?
								</Label>
								<Input
									id="tipo_negocio_otro"
									{...register('tipo_negocio_otro')}
									placeholder="Ej: Peluquería, Lavandería, Veterinaria, etc."
									className="mt-1"
								/>
								{errors.tipo_negocio_otro && (
									<p className="text-sm text-destructive">{errors.tipo_negocio_otro.message}</p>
								)}
							</div>
						)}
					</div>

					{/* Pregunta 2: Ventas diarias */}
					<div className="space-y-3">
						<Label className="text-base font-semibold">
							2. ¿Cuántas ventas realizas aproximadamente al día?
						</Label>
						<RadioGroup
							onValueChange={(value) => setValue('ventas_diarias', value)}
							className="space-y-2 pt-2"
						>
							{encuestaSimpleOptions.ventas_diarias.map((option) => (
								<div key={option.value} className="flex items-center space-x-2 py-2">
									<RadioGroupItem value={option.value} id={`ventas-${option.value}`} className="cursor-pointer" />
									<Label
										htmlFor={`ventas-${option.value}`}
										className="font-normal cursor-pointer flex-1"
									>
										{option.label}
									</Label>
								</div>
							))}
						</RadioGroup>
						{errors.ventas_diarias && (
							<p className="text-sm text-destructive">{errors.ventas_diarias.message}</p>
						)}
					</div>

					{/* Pregunta 3: Manejo de inventario */}
					<div className="space-y-3">
						<Label className="text-base font-semibold">
							3. ¿Manejas inventario de productos en tu negocio?
						</Label>
						<RadioGroup
							onValueChange={(value) => setValue('maneja_inventario', value as 'si' | 'no')}
							className="space-y-2 pt-2"
						>
							{encuestaSimpleOptions.maneja_inventario.map((option) => (
								<div key={option.value} className="flex items-center space-x-2 py-2">
									<RadioGroupItem value={option.value} id={`inventario-${option.value}`} className="cursor-pointer" />
									<Label
										htmlFor={`inventario-${option.value}`}
										className="font-normal cursor-pointer flex-1"
									>
										{option.label}
									</Label>
								</div>
							))}
						</RadioGroup>
						{errors.maneja_inventario && (
							<p className="text-sm text-destructive">{errors.maneja_inventario.message}</p>
						)}
					</div>

					{/* Pregunta 4: Problema principal */}
					<div className="space-y-3">
						<Label htmlFor="problema_principal" className="text-base font-semibold">
							4. ¿Cuál es tu mayor problema o desafío actual en la gestión de tu negocio?
						</Label>
						<Textarea
							id="problema_principal"
							{...register('problema_principal')}
							placeholder="Por ejemplo: Pierdo mucho tiempo haciendo inventario manual, no sé cuánto gano realmente al mes, etc."
							className="min-h-[100px] mt-2"
						/>
						{errors.problema_principal && (
							<p className="text-sm text-destructive">{errors.problema_principal.message}</p>
						)}
					</div>

					{/* Pregunta 5: Precio mensual */}
					<div className="space-y-3">
						<Label className="text-base font-semibold">
							5. ¿Cuánto estarías dispuesto a pagar mensualmente por un sistema POS completo?
						</Label>
						<p className="text-sm text-muted-foreground">
							Incluye: Ventas, Inventario, Reportes, Multi-sucursal, Soporte
						</p>
						<RadioGroup
							onValueChange={(value) => setValue('precio_mensual', value)}
							className="space-y-2 pt-2"
						>
							{encuestaSimpleOptions.precio_mensual.map((option) => (
								<div key={option.value} className="flex items-center space-x-2 py-2">
									<RadioGroupItem value={option.value} id={`precio-${option.value}`} className="cursor-pointer" />
									<Label
										htmlFor={`precio-${option.value}`}
										className="font-normal cursor-pointer flex-1"
									>
										{option.label}
									</Label>
								</div>
							))}
						</RadioGroup>
						{errors.precio_mensual && (
							<p className="text-sm text-destructive">{errors.precio_mensual.message}</p>
						)}
					</div>
					{/* Pregunta 6: Facturación electrónica */}
				<div className="space-y-3">
					<Label className="text-base font-semibold">
						6. ¿Es netamente necesaria la facturación electrónica para tu negocio?
					</Label>
					<RadioGroup
						onValueChange={(value) => setValue('necesita_facturacion', value)}
						className="space-y-2 pt-2"
					>
						{encuestaSimpleOptions.necesita_facturacion.map((option) => (
							<div key={option.value} className="flex items-center space-x-2 py-2">
								<RadioGroupItem value={option.value} id={`facturacion-${option.value}`} className="cursor-pointer" />
								<Label
									htmlFor={`facturacion-${option.value}`}
									className="font-normal cursor-pointer flex-1"
								>
									{option.label}
								</Label>
							</div>
						))}
					</RadioGroup>
					{errors.necesita_facturacion && (
						<p className="text-sm text-destructive">{errors.necesita_facturacion.message}</p>
					)}
				</div>

					{/* Pregunta 7: Feature deseado */}
					<div className="space-y-3">
						<Label htmlFor="feature_deseado" className="text-base font-semibold">
							7. ¿Qué funcionalidad o característica te gustaría que tuviera el sistema POS?
						</Label>
						<p className="text-sm text-muted-foreground">
							¿Qué necesitas que el sistema tenga para que te ayude más en tu negocio?
						</p>
						<Textarea
							id="feature_deseado"
							{...register('feature_deseado')}
							placeholder="Por ejemplo: cotizaciones, facturación múltiple, reportes avanzados de ventas por producto, gestión de empleados y horarios, etc."
							className="min-h-[100px] mt-2"
						/>
						{errors.feature_deseado && (
							<p className="text-sm text-destructive">{errors.feature_deseado.message}</p>
						)}
					</div>
			</CardContent>
			</Card>

			{/* Submit Button */}
			<div className="flex justify-center">
				<Button type="submit" size="lg" disabled={isSubmitting} className="w-full md:w-auto md:min-w-[200px]">
					{isSubmitting ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Enviando...
						</>
					) : (
						'Completar Encuesta'
					)}
				</Button>
			</div>

			<p className="text-center text-sm text-muted-foreground">
				Tus respuestas son confidenciales y nos ayudan a crear el mejor producto para ti
			</p>
		</form>
	)
}
