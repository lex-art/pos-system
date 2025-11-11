'use client'

import { useCallback } from 'react'

// Custom event types for tracking
export type TrackingEvent =
	| 'FormStarted'
	| 'Lead'
	| 'SurveyStarted'
	| 'SurveyCompleted'
	| 'FormError'
	| 'ButtonClick'

interface TrackingParams {
	event: TrackingEvent
	data?: Record<string, unknown>
}

/**
 * Hook para tracking de eventos con Meta Pixel
 * Degrada elegantemente si el pixel no está configurado
 */
export function useTracking() {
	const trackEvent = useCallback(({ event, data = {} }: TrackingParams) => {
		// Si no hay Pixel ID configurado, salir silenciosamente
		if (!process.env.NEXT_PUBLIC_META_PIXEL_ID) {
			return
		}

		// Si fbq no está disponible, salir silenciosamente
		if (typeof window === 'undefined' || !window.fbq) {
			return
		}

		try {
			// Track custom event
			window.fbq('track', event, data)
		} catch (error) {
			// Fail silently - no romper la app si el tracking falla
			console.warn('Tracking error:', error)
		}
	}, [])

	return { trackEvent }
}
