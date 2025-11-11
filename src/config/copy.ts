// Todos los textos del landing page basados en docs/VALIDACION-POS-SAAS.md

export const copy = {
	hero: {
		badge: '🔥 Primeros 20 usuarios: 3 meses gratis',
		headline: 'Controla tu negocio de forma simple y haz crecer tus ventas',
		subheadline:
			'El sistema POS diseñado para negocios guatemaltecos. Ventas, inventario y caja registradora en una sola plataforma.',
		cta: 'Únete a la Lista de Espera',
		formTitle: 'Acceso Anticipado',
		formDescription:
			'Registra tu email y sé de los primeros en probar el POS más completo para Guatemala.',
		// Configuración del video de la sección hero
		// Usa uno de los dos métodos: youtubeId o videoUrl (mp4/webm)
		video: {
			// Ejemplo YouTube: coloca solo el ID (lo que va después de v=)
			youtubeId: '',
			// Alternativa archivo directo (mp4/webm) alojado en CDN o public/
			videoUrl: '/media/POS-en-accion.mp4'
		}
	},

	problem: {
		title: '¿Te suena familiar?',
		subtitle:
			'Miles de negocios en Guatemala pierden tiempo y dinero por no tener un sistema de control adecuado',
		items: [
			{
				icon: '❌',
				title: '¿Pierdes dinero por errores en el control de inventario?',
				description:
					'Faltantes, sobrecostos y productos vencidos te están costando miles de quetzales al mes.'
			},
			{
				icon: '❌',
				title: '¿No sabes cuánto vendes realmente cada día?',
				description:
					'Sin reportes claros, tomas decisiones a ciegas y pierdes oportunidades de crecimiento.'
			},
			{
				icon: '❌',
				title: '¿Tienes varias sucursales y no puedes controlarlas todas?',
				description:
					'El descontrol en múltiples ubicaciones hace que pierdas visibilidad del negocio.'
			},
			{
				icon: '❌',
				title: '¿Tu método actual (Excel/papel) te quita demasiado tiempo?',
				description:
					'Horas perdidas en tareas manuales que podrías usar para hacer crecer tu negocio.'
			}
		]
	},

	solution: {
		title: 'La solución que tu negocio necesita',
		description:
			'Nuestro POS automatiza todo el proceso: desde la venta hasta el reporte final. Ahorra tiempo, reduce errores y toma decisiones basadas en datos reales.',
		badge: 'Diseñado para Guatemala'
	},

	features: {
		title: 'Todo lo que necesitas en un solo lugar',
		subtitle: 'Funcionalidades diseñadas específicamente para negocios guatemaltecos',
		items: [
			{
				icon: '🛒',
				title: 'Sistema de Ventas Completo',
				description:
					'Punto de venta rápido con múltiples métodos de pago (efectivo, tarjeta, transferencia). Gestión de caja registradora con apertura/cierre automático.',
				features: [
					'Interfaz intuitiva para ventas rápidas',
					'Múltiples métodos de pago',
					'Ventas con o sin cliente',
					'Control de caja automático'
				]
			},
			{
				icon: '📦',
				title: 'Control de Inventario Inteligente',
				description:
					'Actualización en tiempo real con cada venta. Stock independiente por sucursal con alertas automáticas.',
				features: [
					'Inventario en tiempo real',
					'Alertas de stock mínimo',
					'Movimientos de entrada/salida',
					'Categorías y proveedores'
				]
			},
			{
				icon: '🏪',
				title: 'Gestión Multi-Sucursal',
				description:
					'Administra todas tus ubicaciones desde un solo lugar. Stock y reportes independientes por sucursal.',
				features: [
					'Sucursales ilimitadas',
					'Stock independiente',
					'Transferencias entre sucursales',
					'Reportes consolidados'
				]
			},
			{
				icon: '📊',
				title: 'Reportes y Analytics',
				description:
					'Dashboard en tiempo real con todas las métricas de tu negocio. Reportes automáticos y exportables.',
				features: [
					'Dashboard en tiempo real',
					'Reportes de ventas detallados',
					'Productos más vendidos',
					'Comprobantes PDF'
				]
			},
			{
				icon: '👥',
				title: 'Gestión de Clientes',
				description:
					'Base de datos completa con historial de compras. Búsqueda rápida y fácil.',
				features: [
					'Registro de clientes',
					'Historial de compras',
					'Búsqueda rápida',
					'Segmentación'
				]
			},
			{
				icon: '⚙️',
				title: 'Administración Completa',
				description:
					'Multi-empresa, usuarios con permisos, suscripciones flexibles y máxima seguridad.',
				features: [
					'Multi-empresa',
					'Usuarios y permisos (Admin, Vendedor, Cajero)',
					'Sistema de suscripciones',
					'Autenticación segura'
				]
			},
			{
				icon: '☁️',
				title: '100% en la Nube',
				description:
					'Accede desde cualquier dispositivo con interfaz moderna y soporte multi-idioma.',
				features: [
					'Acceso desde cualquier lugar',
					'Interfaz moderna e intuitiva',
					'Soporte Español/Inglés',
					'Notificaciones por email'
				]
			}
		]
	},

	benefits: {
		title: '¿Por qué elegirnos?',
		subtitle:
			'A diferencia de otras opciones en el mercado, estamos diseñados 100% para Guatemala',
		items: [
			{
				icon: '🇬🇹',
				title: 'Diseñado para Guatemala',
				description:
					'En quetzales, idioma español, soporte. Todo pensado para negocios guatemaltecos.'
			},
			{
				icon: '🚀',
				title: 'Sin instalaciones complicadas',
				description:
					'100% en la nube. Solo necesitas internet y un navegador. Listo en minutos.'
			},
			{
				icon: '🤝',
				title: 'Soporte en español',
				description:
					'Equipo en Guatemala que habla tu idioma y entiende tu negocio.'
			},
			{
				icon: '💰',
				title: 'Plan gratuito real',
				description:
					'No es solo una "prueba". Tenemos un plan gratuito funcional para siempre.'
			},
			{
				icon: '💳',
				title: 'Sin tarjeta para comenzar',
				description: 'Prueba todas las funcionalidades sin dar datos de pago.'
			},
			{
				icon: '📈',
				title: 'Crece a tu ritmo',
				description:
					'Planes flexibles que se adaptan al tamaño de tu negocio. Sin sorpresas.'
			}
		]
	},

	cta: {
		title: '¿Listo para transformar tu negocio?',
		subtitle:
			'Únete a cientos de negocios guatemaltecos que ya están en la lista de espera',
		badge: 'Quedan unos pocos lugares para acceso anticipado',
		ctaButton: 'Reserva tu lugar ahora',
		guarantee: '✓ Sin tarjeta de crédito  ✓ Acceso gratuito  ✓ Cancela cuando quieras'
	},

	footer: {
		tagline: 'El POS diseñado para Guatemala',
		copyright: '© 2025 POS System. Todos los derechos reservados.',
		links: {
			product: [
				{ label: 'Características', href: '#features' },
				{ label: 'Precios', href: '#pricing' },
				{ label: 'FAQ', href: '#faq' }
			],
			company: [
				{ label: 'Sobre nosotros', href: '#about' },
				{ label: 'Contacto', href: '#contact' },
				{ label: 'Blog', href: '#blog' }
			],
			legal: [
				{ label: 'Privacidad', href: '/privacy' },
				{ label: 'Términos', href: '/terms' }
			]
		}
	}
} as const
