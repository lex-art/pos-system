'use client'

import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

declare global {
	interface Window {
		fbq: (
			action: string,
			eventName: string,
			params?: Record<string, unknown>
		) => void
		_fbq: unknown
	}
}

function MetaPixelScript() {
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID

	useEffect(() => {
		// Si no hay Pixel ID configurado, salir
		if (!pixelId) {
			return
		}

		// Initialize Meta Pixel
		import('react-facebook-pixel')
			.then((module) => module.default)
			.then((ReactPixel) => {
				ReactPixel.init(pixelId)
				ReactPixel.pageView()
			})
			.catch(() => {
				// Silently fail if pixel fails to load
				console.warn('Meta Pixel failed to load')
			})
	}, [pixelId])

	useEffect(() => {
		// Si no hay Pixel ID o fbq no está disponible, salir
		if (!pixelId || typeof window === 'undefined' || !window.fbq) {
			return
		}

		// Track route changes
		window.fbq('track', 'PageView')
	}, [pathname, searchParams, pixelId])

	// Si no hay Pixel ID configurado, no renderizar el script
	if (!pixelId) {
		return null
	}

	return (
		<script
			id="meta-pixel"
			dangerouslySetInnerHTML={{
				__html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${pixelId}');
          fbq('track', 'PageView');
        `
			}}
		/>
	)
}

export function MetaPixel() {
	return (
		<Suspense fallback={null}>
			<MetaPixelScript />
		</Suspense>
	)
}
