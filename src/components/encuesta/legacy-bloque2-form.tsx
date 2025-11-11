'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { bloque2Schema, Bloque2Input, EncuestaInput } from '@/schemas/encuesta.schema'
import { encuestaOptions } from '@/config/encuesta-options'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ArrowRight } from 'lucide-react'

interface Bloque2FormProps {
	initialData: Partial<EncuestaInput>
	onComplete: (data: Partial<EncuestaInput>) => void
	isSubmitting: boolean
}

export function Bloque2Form({ initialData, onComplete, isSubmitting }: Bloque2FormProps) {
	const {
		handleSubmit,
		watch,
		setValue,
		formState: { errors }
	} = useForm<Bloque2Input>({
		resolver: zodResolver(bloque2Schema),
		defaultValues: {
			urgencia_problema: initialData.urgencia_problema || '',
			perdida_dinero: initialData.perdida_dinero || '',
			tiempo_perdido: initialData.tiempo_perdido || ''
		}
	})

	const onSubmit = (data: Bloque2Input) => {
		onComplete(data)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
			{/* Pregunta 1: Urgencia */}
			<div className="space-y-4">
				<Label className="text-base font-semibold">
					1. ¿Qué tan urgente es resolver el problema de control de ventas/inventario para tu negocio? <span className="text-destructive">*</span>
				</Label>
				<p className="text-sm text-muted-foreground">En una escala del 1-10</p>
				<RadioGroup
					value={watch('urgencia_problema')}
					onValueChange={(value) => setValue('urgencia_problema', value)}
				>
					<div className="space-y-3">
						{encuestaOptions.urgenciaProblema.map((option) => (
							<div key={option.value} className="flex items-center space-x-2">
								<RadioGroupItem value={option.value} id={`urgencia-${option.value}`} />
								<Label htmlFor={`urgencia-${option.value}`} className="font-normal cursor-pointer">
									{option.label}
								</Label>
							</div>
						))}
					</div>
				</RadioGroup>
				{errors.urgencia_problema && (
					<p className="text-sm text-destructive">{errors.urgencia_problema.message}</p>
				)}
			</div>

			{/* Pregunta 2: Pérdida de dinero */}
			<div className="space-y-4">
				<Label className="text-base font-semibold">
					2. ¿Has perdido dinero por errores en inventario, faltantes o mala gestión de caja? <span className="text-destructive">*</span>
				</Label>
				<RadioGroup
					value={watch('perdida_dinero')}
					onValueChange={(value) => setValue('perdida_dinero', value)}
				>
					<div className="space-y-3">
						{encuestaOptions.perdidaDinero.map((option) => (
							<div key={option.value} className="flex items-center space-x-2">
								<RadioGroupItem value={option.value} id={`perdida-${option.value}`} />
								<Label htmlFor={`perdida-${option.value}`} className="font-normal cursor-pointer">
									{option.label}
								</Label>
							</div>
						))}
					</div>
				</RadioGroup>
				{errors.perdida_dinero && (
					<p className="text-sm text-destructive">{errors.perdida_dinero.message}</p>
				)}
			</div>

			{/* Pregunta 3: Tiempo perdido */}
			<div className="space-y-4">
				<Label className="text-base font-semibold">
					3. ¿Cuánto tiempo pierdes semanalmente en tareas administrativas manuales? <span className="text-destructive">*</span>
				</Label>
				<p className="text-sm text-muted-foreground">(Inventario, reportes, cuadrar caja, etc.)</p>
				<RadioGroup
					value={watch('tiempo_perdido')}
					onValueChange={(value) => setValue('tiempo_perdido', value)}
				>
					<div className="space-y-3">
						{encuestaOptions.tiempoPerdido.map((option) => (
							<div key={option.value} className="flex items-center space-x-2">
								<RadioGroupItem value={option.value} id={`tiempo-${option.value}`} />
								<Label htmlFor={`tiempo-${option.value}`} className="font-normal cursor-pointer">
									{option.label}
								</Label>
							</div>
						))}
					</div>
				</RadioGroup>
				{errors.tiempo_perdido && (
					<p className="text-sm text-destructive">{errors.tiempo_perdido.message}</p>
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
