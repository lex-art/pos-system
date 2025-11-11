export const siteConfig = {
	name: 'POS Guatemala',
	description:
		'🔥 El POS más fácil para tu negocio. Sin instalación • Soporte local • Plan gratuito. ¡Únete a la lista de espera y obtén 3 meses GRATIS!',
	url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001',
	ogImage: '/opengraph-image',
	links: {
		facebook: '#',
		instagram: '#',
		whatsapp: '#'
	}
}

export type SiteConfig = typeof siteConfig
