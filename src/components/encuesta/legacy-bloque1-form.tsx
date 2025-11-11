'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { bloque1Schema, Bloque1Input } from '@/schemas/encuesta.schema'
import { encuestaOptions } from '@/config/encuesta-options'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { EncuestaInput } from '@/schemas/encuesta.schema'
import { ArrowRight } from 'lucide-react'

interface Bloque1FormProps {
	initialData: Partial<EncuestaInput>
	onComplete: (data: Partial<EncuestaInput>) => void
	isSubmitting: boolean
}

export function Bloque1Form({ initialData, onComplete, isSubmitting }: Bloque1FormProps) {
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors }
	} = useForm<Bloque1Input>({
		resolver: zodResolver(bloque1Schema),
		defaultValues: {
			tipo_negocio: initialData.tipo_negocio || '',
			ciudad: initialData.ciudad || '',
			ventas_dia: initialData.ventas_dia || '',
			sucursales: initialData.sucursales || '',
			metodo_actual: initialData.metodo_actual || '',
			metodo_actual_otro: initialData.metodo_actual_otro || '',
			frustracion_nivel: initialData.frustracion_nivel || '',
			usa_whatsapp: initialData.usa_whatsapp ?? false
		}
	})

	const metodoActualValue = watch('metodo_actual')
	const tipoNegocioValue = watch('tipo_negocio')

	const onSubmit = (data: Bloque1Input) => {
		onComplete(data)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
			{/* Pregunta 1: Tipo de negocio */}
			<div className="space-y-4">
				<Label className="text-base font-semibold">
					1. ¿Qué tipo de negocio tienes? <span className="text-destructive">*</span>
				</Label>
				<RadioGroup
					value={tipoNegocioValue}
					onValueChange={(value) => setValue('tipo_negocio', value)}
				>
					<div className="space-y-3">
						{encuestaOptions.tipoNegocio.map((option) => (
							<div key={option.value} className="flex items-center space-x-2">
								<RadioGroupItem value={option.value} id={`tipo-${option.value}`} />
								<Label htmlFor={`tipo-${option.value}`} className="font-normal cursor-pointer">
									{option.label}
								</Label>
							</div>
						))}
					</div>
				</RadioGroup>
				{tipoNegocioValue === 'otro' && (
					<Input {...register('metodo_actual_otro')} placeholder="Especifica el tipo de negocio" />
				)}
				{errors.tipo_negocio && (
					<p className="text-sm text-destructive">{errors.tipo_negocio.message}</p>
				)}
			</div>

			{/* Pregunta 2: Ciudad */}
			<div className="space-y-4">
				<Label htmlFor="ciudad" className="text-base font-semibold">
					2. ¿En qué ciudad está tu negocio? <span className="text-destructive">*</span>
				</Label>
				<Input {...register('ciudad')} id="ciudad" placeholder="Ej: Ciudad de Guatemala, Antigua, Quetzaltenango..." />
				{errors.ciudad && (
					<p className="text-sm text-destructive">{errors.ciudad.message}</p>
				)}
			</div>

			{/* Pregunta 3: Ventas por día */}
			<div className="space-y-4">
				<Label className="text-base font-semibold">
					3. ¿Cuántas ventas realizas aproximadamente al día? <span className="text-destructive">*</span>
				</Label>
				<RadioGroup
					value={watch('ventas_dia')}
					onValueChange={(value) => setValue('ventas_dia', value)}
				>
					<div className="space-y-3">
						{encuestaOptions.ventas_dia.map((option) => (
							<div key={option.value} className="flex items-center space-x-2">
								<RadioGroupItem value={option.value} id={`ventas-${option.value}`} />
								<Label htmlFor={`ventas-${option.value}`} className="font-normal cursor-pointer">
									{option.label}
								</Label>
							</div>
						))}
					</div>
				</RadioGroup>
				{errors.ventas_dia && (
					<p className="text-sm text-destructive">{errors.ventas_dia.message}</p>
				)}
			</div>

			{/* Pregunta 4: Sucursales */}
			<div className="space-y-4">
				<Label className="text-base font-semibold">
					4. ¿Tienes más de una sucursal? <span className="text-destructive">*</span>
				</Label>
				<RadioGroup
					value={watch('sucursales')}
					onValueChange={(value) => setValue('sucursales', value)}
				>
					<div className="space-y-3">
						{encuestaOptions.sucursales.map((option) => (
							<div key={option.value} className="flex items-center space-x-2">
								<RadioGroupItem value={option.value} id={`sucursal-${option.value}`} />
								<Label htmlFor={`sucursal-${option.value}`} className="font-normal cursor-pointer">
									{option.label}
								</Label>
							</div>
						))}
					</div>
				</RadioGroup>
				{errors.sucursales && (
					<p className="text-sm text-destructive">{errors.sucursales.message}</p>
				)}
			</div>

			{/* Pregunta 5: Método actual */}
			<div className="space-y-4">
				<Label className="text-base font-semibold">
					5. ¿Cómo controlas tus ventas e inventario actualmente? <span className="text-destructive">*</span>
				</Label>
				<RadioGroup
					value={metodoActualValue}
					onValueChange={(value) => setValue('metodo_actual', value)}
				>
					<div className="space-y-3">
						{encuestaOptions.metodoActual.map((option) => (
							<div key={option.value} className="flex items-center space-x-2">
								<RadioGroupItem value={option.value} id={`metodo-${option.value}`} />
								<Label htmlFor={`metodo-${option.value}`} className="font-normal cursor-pointer">
									{option.label}
								</Label>
							</div>
						))}
					</div>
				</RadioGroup>
				{(metodoActualValue === 'pos' || metodoActualValue === 'otro') && (
					<Input {...register('metodo_actual_otro')} placeholder="¿Cuál sistema usas?" />
				)}
				{errors.metodo_actual && (
					<p className="text-sm text-destructive">{errors.metodo_actual.message}</p>
				)}
			</div>

			{/* Pregunta 6: Nivel de frustración */}
			<div className="space-y-4">
				<Label className="text-base font-semibold">
					6. Del 1 al 10, ¿qué tan frustrante es tu método actual? <span className="text-destructive">*</span>
				</Label>
				<p className="text-sm text-muted-foreground">1 = Nada frustrante, 10 = Muy frustrante</p>
				<RadioGroup
					value={watch('frustracion_nivel')}
					onValueChange={(value) => setValue('frustracion_nivel', value)}
				>
					<div className="space-y-3">
						{encuestaOptions.frustracionNivel.map((option) => (
							<div key={option.value} className="flex items-center space-x-2">
								<RadioGroupItem value={option.value} id={`frustracion-${option.value}`} />
								<Label htmlFor={`frustracion-${option.value}`} className="font-normal cursor-pointer">
									{option.label}
								</Label>
							</div>
						))}
					</div>
				</RadioGroup>
				{errors.frustracion_nivel && (
					<p className="text-sm text-destructive">{errors.frustracion_nivel.message}</p>
				)}
			</div>

			{/* Pregunta 7: WhatsApp */}
			<div className="space-y-4">
				<Label className="text-base font-semibold">
					7. ¿Usas WhatsApp para tu negocio? <span className="text-destructive">*</span>
				</Label>
				<div className="flex items-center space-x-2">
					<Checkbox
						id="usa_whatsapp"
						checked={watch('usa_whatsapp')}
						onCheckedChange={(checked) => setValue('usa_whatsapp', checked as boolean)}
					/>
					<Label htmlFor="usa_whatsapp" className="font-normal cursor-pointer">
						Sí, quiero unirme al grupo de primeros usuarios en WhatsApp
					</Label>
				</div>
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
