import { HeroSection } from '@/components/landing/hero-section'
import { FeaturesSection } from '@/components/landing/features-section'
import { BenefitsSection } from '@/components/landing/benefits-section'
import { CTASection } from '@/components/landing/cta-section'
import { Footer } from '@/components/landing/footer'
import { siteConfig } from '@/config/site'
import { copy } from '@/config/copy'

export const dynamic = 'force-dynamic' //Next.js está intentando generar tu página / de forma estática (SSG), pero estás usando cookies() que es una función dinámica del servidor, lo que hace imposible la generación estática.

export default function Home() {
	const videoStructuredData = {
		'@context': 'https://schema.org',
		'@type': 'VideoObject',
		name: copy.hero.headline,
		description: copy.hero.subheadline,
		thumbnailUrl: `${siteConfig.url}${siteConfig.ogImage}`,
		uploadDate: '2025-11-10T00:00:00Z',
		contentUrl: `${siteConfig.url}/media/POS-en-accion.mp4`,
		embedUrl: `${siteConfig.url}/media/POS-en-accion.mp4`,
		duration: 'PT1M30S', // Ajusta la duración real del video (ejemplo: 1 min 30 seg)
		publisher: {
			'@type': 'Organization',
			name: siteConfig.name,
			logo: {
				'@type': 'ImageObject',
				url: `${siteConfig.url}${siteConfig.ogImage}`
			}
		}
	}

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(videoStructuredData) }}
			/>
			<main className="min-h-screen">
				<HeroSection />
				<FeaturesSection />
				<BenefitsSection />
				<CTASection />
				<Footer />
			</main>
		</>
	)
}
