'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { bloque5Schema, Bloque5Input, EncuestaInput } from '@/schemas/encuesta.schema'
import { encuestaOptions } from '@/config/encuesta-options'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { CheckCircle2, Loader2 } from 'lucide-react'

interface Bloque5FormProps {
	initialData: Partial<EncuestaInput>
	onComplete: (data: Partial<EncuestaInput>) => void
	isSubmitting: boolean
}

export function Bloque5Form({ initialData, onComplete, isSubmitting }: Bloque5FormProps) {
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors }
	} = useForm<Bloque5Input>({
		resolver: zodResolver(bloque5Schema),
		defaultValues: {
			recomendaria: initialData.recomendaria || '',
			mejoras_sugeridas: initialData.mejoras_sugeridas || ''
		}
	})

	const onSubmit = (data: Bloque5Input) => {
		onComplete(data)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
			{/* Mensaje de última pregunta */}
			<div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
				<p className="text-sm text-muted-foreground">
					<strong className="text-foreground">¡Casi terminamos!</strong> Estas son las últimas 2 preguntas.
					Tu opinión es muy valiosa para nosotros.
				</p>
			</div>

			{/* Pregunta 1: Recomendación */}
			<div className="space-y-4">
				<Label className="text-base font-semibold">
					1. ¿Recomendarías este sistema a otros negocios como el tuyo? <span className="text-destructive">*</span>
				</Label>
				<RadioGroup
					value={watch('recomendaria')}
					onValueChange={(value) => setValue('recomendaria', value)}
				>
					<div className="space-y-3">
						{encuestaOptions.recomendaria.map((option) => (
							<div key={option.value} className="flex items-center space-x-2">
								<RadioGroupItem value={option.value} id={`recomendaria-${option.value}`} />
								<Label htmlFor={`recomendaria-${option.value}`} className="font-normal cursor-pointer">
									{option.label}
								</Label>
							</div>
						))}
					</div>
				</RadioGroup>
				{errors.recomendaria && (
					<p className="text-sm text-destructive">{errors.recomendaria.message}</p>
				)}
			</div>

			{/* Pregunta 2: Mejoras sugeridas */}
			<div className="space-y-4">
				<Label htmlFor="mejoras" className="text-base font-semibold">
					2. Si pudieras cambiar o mejorar algo del sistema, ¿qué sería?
				</Label>
				<p className="text-sm text-muted-foreground">
					Opcional - Comparte tus ideas para mejorar el producto
				</p>
				<Textarea
					{...register('mejoras_sugeridas')}
					id="mejoras"
					placeholder="Cuéntanos qué cambiarías o agregarías..."
					rows={5}
				/>
			</div>

			{/* Mensaje de agradecimiento */}
			<div className="bg-muted/50 rounded-lg p-6 text-center space-y-3">
				<div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
					<CheckCircle2 className="w-6 h-6 text-primary" />
				</div>
				<h3 className="font-semibold text-lg">¡Gracias por tu tiempo!</h3>
				<p className="text-sm text-muted-foreground">
					Tu feedback nos ayuda a construir el POS perfecto para negocios guatemaltecos como el tuyo.
				</p>
			</div>

			{/* Botón Finalizar */}
			<div className="flex justify-center pt-4">
				<Button type="submit" size="lg" disabled={isSubmitting} className="min-w-[200px]">
					{isSubmitting ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Guardando...
						</>
					) : (
						<>
							<CheckCircle2 className="mr-2 h-4 w-4" />
							Finalizar Encuesta
						</>
					)}
				</Button>
			</div>
		</form>
	)
}
