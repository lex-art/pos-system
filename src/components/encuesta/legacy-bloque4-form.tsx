'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { bloque4Schema, Bloque4Input, EncuestaInput } from '@/schemas/encuesta.schema'
import { encuestaOptions } from '@/config/encuesta-options'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ArrowRight } from 'lucide-react'

interface Bloque4FormProps {
	initialData: Partial<EncuestaInput>
	onComplete: (data: Partial<EncuestaInput>) => void
	isSubmitting: boolean
}

export function Bloque4Form({ initialData, onComplete, isSubmitting }: Bloque4FormProps) {
	const {
		handleSubmit,
		watch,
		setValue,
		formState: { errors }
	} = useForm<Bloque4Input>({
		resolver: zodResolver(bloque4Schema),
		defaultValues: {
			early_adopter_interesado: initialData.early_adopter_interesado || '',
			incentivo_preferido: initialData.incentivo_preferido || '',
			usaria_activamente: initialData.usaria_activamente || ''
		}
	})

	const onSubmit = (data: Bloque4Input) => {
		onComplete(data)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
			{/* Pregunta 1: Interés en acceso anticipado */}
			<div className="space-y-4">
				<Label className="text-base font-semibold">
					1. Si te ofreciéramos acceso anticipado con un descuento especial, ¿estarías interesado? <span className="text-destructive">*</span>
				</Label>
				<p className="text-sm text-muted-foreground">Antes del lanzamiento oficial</p>
				<RadioGroup
					value={watch('early_adopter_interesado')}
					onValueChange={(value) => setValue('early_adopter_interesado', value)}
				>
					<div className="space-y-3">
						{encuestaOptions.earlyAdopterInteresado.map((option) => (
							<div key={option.value} className="flex items-center space-x-2">
								<RadioGroupItem value={option.value} id={`early-${option.value}`} />
								<Label htmlFor={`early-${option.value}`} className="font-normal cursor-pointer">
									{option.label}
								</Label>
							</div>
						))}
					</div>
				</RadioGroup>
				{errors.early_adopter_interesado && (
					<p className="text-sm text-destructive">{errors.early_adopter_interesado.message}</p>
				)}
			</div>

			{/* Pregunta 2: Incentivo preferido */}
			<div className="space-y-4">
				<Label className="text-base font-semibold">
					2. Como agradecimiento por ser early adopter, ¿cuál incentivo te interesa más? <span className="text-destructive">*</span>
				</Label>
				<RadioGroup
					value={watch('incentivo_preferido')}
					onValueChange={(value) => setValue('incentivo_preferido', value)}
				>
					<div className="space-y-3">
						{encuestaOptions.incentivoPreferido.map((option) => (
							<div key={option.value} className="flex items-center space-x-2">
								<RadioGroupItem value={option.value} id={`incentivo-${option.value}`} />
								<Label htmlFor={`incentivo-${option.value}`} className="font-normal cursor-pointer">
									{option.label}
								</Label>
							</div>
						))}
					</div>
				</RadioGroup>
				{errors.incentivo_preferido && (
					<p className="text-sm text-destructive">{errors.incentivo_preferido.message}</p>
				)}
			</div>

			{/* Pregunta 3: Compromiso de uso */}
			<div className="space-y-4">
				<Label className="text-base font-semibold">
					3. Si lanzamos el producto en las próximas 4-6 semanas con alguno de los incentivos anteriores, ¿lo usarías activamente? <span className="text-destructive">*</span>
				</Label>
				<RadioGroup
					value={watch('usaria_activamente')}
					onValueChange={(value) => setValue('usaria_activamente', value)}
				>
					<div className="space-y-3">
						{encuestaOptions.usariaActivamente.map((option) => (
							<div key={option.value} className="flex items-center space-x-2">
								<RadioGroupItem value={option.value} id={`usaria-${option.value}`} />
								<Label htmlFor={`usaria-${option.value}`} className="font-normal cursor-pointer">
									{option.label}
								</Label>
							</div>
						))}
					</div>
				</RadioGroup>
				{errors.usaria_activamente && (
					<p className="text-sm text-destructive">{errors.usaria_activamente.message}</p>
				)}
			</div>

			{/* Botón Siguiente */}
			<div className="flex justify-end pt-4">
				<Button type="submit" size="lg" disabled={isSubmitting}>
					Continuar
					<ArrowRight className="ml-2 h-4 w-4" />
				</Button>
			</div>
		</form>
	)
}
