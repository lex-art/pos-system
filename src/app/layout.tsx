import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import { AnimatedBackground } from '@/components/shared/animated-background'
import { MetaPixel } from '@/lib/tracking/meta-pixel'
import { siteConfig } from '@/config/site'
import './globals.css'

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s | ${siteConfig.name}`
	},
	metadataBase: new URL(siteConfig.url),
	description: siteConfig.description,
	keywords: [
		'POS System',
		'sistema de ventas',
		'inventario',
		'caja registradora',
		'punto de venta',
		'pos en la nube',
		'software para negocios',
		'control de inventario',
		'sistema pos',
		'ventas guatemala'
	],
	authors: [
		{
			name: 'POS System',
			url: siteConfig.url
		}
	],
	creator: 'POS System',
	openGraph: {
		type: 'website',
		locale: 'es_GT',
		url: siteConfig.url,
		title: siteConfig.name,
		description: siteConfig.description,
		siteName: siteConfig.name,
		images: [
			{
				url: siteConfig.ogImage,
				width: 1200,
				height: 630,
				alt: siteConfig.name
			}
		],
		videos: [
			{
				url: `${siteConfig.url}/media/POS-en-accion.mp4`,
				width: 1920,
				height: 1080,
				type: 'video/mp4'
			}
		]
	},
	twitter: {
		card: 'player',
		title: siteConfig.name,
		description: siteConfig.description,
		images: [siteConfig.ogImage],
		creator: '@posguatemala',
		players: {
			playerUrl: `${siteConfig.url}/media/POS-en-accion.mp4`,
			streamUrl: `${siteConfig.url}/media/POS-en-accion.mp4`,
			width: 1920,
			height: 1080
		}
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1
		}
	},
	other: {
		'og:video': `${siteConfig.url}/media/POS-en-accion.mp4`,
		'og:video:secure_url': `${siteConfig.url}/media/POS-en-accion.mp4`,
		'og:video:type': 'video/mp4',
		'og:video:width': '1920',
		'og:video:height': '1080'
	}
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="es" suppressHydrationWarning>
			<head>
				<MetaPixel />
				{/* Meta tags adicionales para compartir en redes sociales */}
				<meta property="og:image:width" content="1200" />
				<meta property="og:image:height" content="630" />
				<meta property="og:image:type" content="image/png" />
				{/* WhatsApp usa Open Graph */}
				<meta property="og:site_name" content={siteConfig.name} />
				<meta property="og:locale" content="es_GT" />
				<meta property="og:locale:alternate" content="es_ES" />
			</head>
			<body className="antialiased" suppressHydrationWarning>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<AnimatedBackground />
					{children}
				</ThemeProvider>
			</body>
		</html>
	)
}
