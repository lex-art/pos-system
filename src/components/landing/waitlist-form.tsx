'use client'

import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { waitlistSchema, type WaitlistInput } from '@/schemas/waitlist.schema'
import { useTracking } from '@/lib/tracking/use-tracking'
import { Loader2 } from 'lucide-react'

export function WaitlistForm() {
	const router = useRouter()
	const { trackEvent } = useTracking()
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const hasTrackedStart = useRef(false)

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<WaitlistInput>({
		resolver: zodResolver(waitlistSchema)
	})

	const handleFormStart = () => {
		if (!hasTrackedStart.current) {
			trackEvent({ event: 'FormStarted', data: { form: 'waitlist' } })
			hasTrackedStart.current = true
		}
	}

	const onSubmit = async (data: WaitlistInput) => {
		try {
			setIsLoading(true)
			setError(null)

			const response = await fetch('/api/waitlist', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data)
			})

			const result = await response.json()

			if (!response.ok) {
				throw new Error(result.error || 'Error al registrarse')
			}

			// Track successful lead registration
			trackEvent({
				event: 'Lead',
				data: {
					content_name: 'Waitlist Registration',
					content_category: 'lead_generation'
				}
			})

			// Redirect a página de gracias
			router.push('/gracias')
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Error al registrarse'
			setError(errorMessage)

			// Track form error
			trackEvent({
				event: 'FormError',
				data: {
					form: 'waitlist',
					error: errorMessage
				}
			})
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			<div className="space-y-2">
				<Label htmlFor="name">Nombre completo</Label>
				<Input
					id="name"
					placeholder="Nombre completo"
					{...register('name')}
					disabled={isLoading}
					onFocus={handleFormStart}
				/>
				{errors.name && (
					<p className="text-sm text-destructive">{errors.name.message}</p>
				)}
			</div>

			<div className="space-y-2">
				<Label htmlFor="email">Correo electrónico</Label>
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

			{error && (
				<div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
					{error}
				</div>
			)}

			<Button type="submit" className="w-full cursor-pointer" size="lg" disabled={isLoading}>
				{isLoading ? (
					<>
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						Registrando...
					</>
				) : (
					'Únete a la Lista de Espera'
				)}
			</Button>
		</form>
	)
}
