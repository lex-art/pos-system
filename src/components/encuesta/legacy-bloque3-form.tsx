'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { bloque3Schema, Bloque3Input, EncuestaInput } from '@/schemas/encuesta.schema'
import { encuestaOptions } from '@/config/encuesta-options'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'

interface Bloque3FormProps {
	initialData: Partial<EncuestaInput>
	onComplete: (data: Partial<EncuestaInput>) => void
	isSubmitting: boolean
}

export function Bloque3Form({ initialData, onComplete, isSubmitting }: Bloque3FormProps) {
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors }
	} = useForm<Bloque3Input>({
		resolver: zodResolver(bloque3Schema),
		defaultValues: {
			funcionalidades_imprescindibles: initialData.funcionalidades_imprescindibles || [],
			funcionalidad_game_changer: initialData.funcionalidad_game_changer || '',
			dispuesto_invertir: initialData.dispuesto_invertir || '',
			pago_actual: initialData.pago_actual || '',
			dispuesto_pagar: initialData.dispuesto_pagar || '',
			que_te_haria_elegir: initialData.que_te_haria_elegir || []
		}
	})

	const [funcionalidades, setFuncionalidades] = useState<string[]>(
		initialData.funcionalidades_imprescindibles || []
	)
	const [queTeHaria, setQueTeHaria] = useState<string[]>(
		initialData.que_te_haria_elegir || []
	)

	const handleFuncionalidadToggle = (value: string) => {
		const newValues = funcionalidades.includes(value)
			? funcionalidades.filter((v) => v !== value)
			: [...funcionalidades, value]
		setFuncionalidades(newValues)
		setValue('funcionalidades_imprescindibles', newValues)
	}

	const handleQueTeHariaToggle = (value: string) => {
		const newValues = queTeHaria.includes(value)
			? queTeHaria.filter((v) => v !== value)
			: [...queTeHaria, value]
		setQueTeHaria(newValues)
		setValue('que_te_haria_elegir', newValues)
	}

	const onSubmit = (data: Bloque3Input) => {
		onComplete(data)
	}

	const dispuestoInvertir = watch('dispuesto_invertir')

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
			{/* Pregunta 1: Funcionalidades imprescindibles */}
			<div className="space-y-4">
				<Label className="text-base font-semibold">
					1. ¿Qué funcionalidades son IMPRESCINDIBLES para ti? <span className="text-destructive">*</span>
				</Label>
				<p className="text-sm text-muted-foreground">Selecciona todas las que apliquen</p>
				<div className="space-y-3">
					{encuestaOptions.funcionalidadesImprescindibles.map((option) => (
						<div key={option.value} className="flex items-center space-x-2">
							<Checkbox
								id={`func-${option.value}`}
								checked={funcionalidades.includes(option.value)}
								onCheckedChange={() => handleFuncionalidadToggle(option.value)}
							/>
							<Label htmlFor={`func-${option.value}`} className="font-normal cursor-pointer">
								{option.label}
							</Label>
						</div>
					))}
				</div>
				{errors.funcionalidades_imprescindibles && (
					<p className="text-sm text-destructive">{errors.funcionalidades_imprescindibles.message}</p>
				)}
			</div>

			{/* Pregunta 2: Funcionalidad game-changer */}
			<div className="space-y-4">
				<Label htmlFor="game-changer" className="text-base font-semibold">
					2. ¿Qué funcionalidad adicional sería un &quot;game-changer&quot; para tu negocio?
				</Label>
				<p className="text-sm text-muted-foreground">Opcional - Comparte tu idea</p>
				<Textarea
					{...register('funcionalidad_game_changer')}
					id="game-changer"
					placeholder="Describe la funcionalidad que marcaría la diferencia..."
					rows={4}
				/>
			</div>

			{/* Pregunta 3: Dispuesto a invertir */}
			<div className="space-y-4">
				<Label className="text-base font-semibold">
					3. ¿Estás dispuesto a invertir en una solución que resuelva estos problemas? <span className="text-destructive">*</span>
				</Label>
				<RadioGroup
					value={dispuestoInvertir}
					onValueChange={(value) => setValue('dispuesto_invertir', value)}
				>
					<div className="space-y-3">
						{encuestaOptions.dispuestoInvertir.map((option) => (
							<div key={option.value} className="flex items-center space-x-2">
								<RadioGroupItem value={option.value} id={`invertir-${option.value}`} />
								<Label htmlFor={`invertir-${option.value}`} className="font-normal cursor-pointer">
									{option.label}
								</Label>
							</div>
						))}
					</div>
				</RadioGroup>
				{errors.dispuesto_invertir && (
					<p className="text-sm text-destructive">{errors.dispuesto_invertir.message}</p>
				)}
			</div>

			{/* Solo mostrar siguientes preguntas si está dispuesto a invertir */}
			{dispuestoInvertir && !['probablemente-no', 'definitivamente-no'].includes(dispuestoInvertir) && (
				<>
					{/* Pregunta 4: Pago actual */}
					<div className="space-y-4">
						<Label className="text-base font-semibold">
							4. ¿Cuánto pagas actualmente por tu método de control? <span className="text-destructive">*</span>
						</Label>
						<RadioGroup
							value={watch('pago_actual')}
							onValueChange={(value) => setValue('pago_actual', value)}
						>
							<div className="space-y-3">
								{encuestaOptions.pagoActual.map((option) => (
									<div key={option.value} className="flex items-center space-x-2">
										<RadioGroupItem value={option.value} id={`pago-actual-${option.value}`} />
										<Label htmlFor={`pago-actual-${option.value}`} className="font-normal cursor-pointer">
											{option.label}
										</Label>
									</div>
								))}
							</div>
						</RadioGroup>
						{errors.pago_actual && (
							<p className="text-sm text-destructive">{errors.pago_actual.message}</p>
						)}
					</div>

					{/* Pregunta 5: Dispuesto a pagar */}
					<div className="space-y-4">
						<Label className="text-base font-semibold">
							5. ¿Cuánto estarías dispuesto a pagar mensualmente? <span className="text-destructive">*</span>
						</Label>
						<p className="text-sm text-muted-foreground">
							Sé honesto, esto nos ayuda a crear el plan perfecto para ti
						</p>
						<RadioGroup
							value={watch('dispuesto_pagar')}
							onValueChange={(value) => setValue('dispuesto_pagar', value)}
						>
							<div className="space-y-3">
								{encuestaOptions.dispuestoPagar.map((option) => (
									<div key={option.value} className="flex items-center space-x-2">
										<RadioGroupItem value={option.value} id={`dispuesto-${option.value}`} />
										<Label htmlFor={`dispuesto-${option.value}`} className="font-normal cursor-pointer">
											{option.label}
										</Label>
									</div>
								))}
							</div>
						</RadioGroup>
						{errors.dispuesto_pagar && (
							<p className="text-sm text-destructive">{errors.dispuesto_pagar.message}</p>
						)}
					</div>

					{/* Pregunta 6: Qué te haría elegir */}
					<div className="space-y-4">
						<Label className="text-base font-semibold">
							6. ¿Qué te haría elegir nuestro POS sobre otras opciones? <span className="text-destructive">*</span>
						</Label>
						<p className="text-sm text-muted-foreground">Selecciona las 3 más importantes</p>
						<div className="space-y-3">
							{encuestaOptions.queTeHariaElegir.map((option) => (
								<div key={option.value} className="flex items-center space-x-2">
									<Checkbox
										id={`elegir-${option.value}`}
										checked={queTeHaria.includes(option.value)}
										onCheckedChange={() => handleQueTeHariaToggle(option.value)}
									/>
									<Label htmlFor={`elegir-${option.value}`} className="font-normal cursor-pointer">
										{option.label}
									</Label>
								</div>
							))}
						</div>
						{errors.que_te_haria_elegir && (
							<p className="text-sm text-destructive">{errors.que_te_haria_elegir.message}</p>
						)}
					</div>
				</>
			)}

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
