import { createClient } from './server'

export async function getTotalLeadsCount(): Promise<number> {
	try {
		const supabase = await createClient()

		const { count, error } = await supabase
			.from('waitlist_leads')
			.select('*', { count: 'exact', head: true })

		if (error) {
			console.error('Error fetching leads count:', error)
			return 0
		}

		return count || 0
	} catch (error) {
		console.error('Error in getTotalLeadsCount:', error)
		return 0
	}
}

// Dashboard Metrics
export async function getDashboardMetrics() {
	try {
		const supabase = await createClient()

		// Total leads
		const { count: totalLeads } = await supabase
			.from('waitlist_leads')
			.select('*', { count: 'exact', head: true })

		// Encuestas simples completadas
		const { count: simpleSurveys } = await supabase
			.from('encuesta_simple_responses')
			.select('*', { count: 'exact', head: true })

		// Encuestas completas completadas
		const { count: fullSurveys } = await supabase
			.from('encuesta_responses')
			.select('*', { count: 'exact', head: true })

		// Tasa de conversión
		const conversionRate = totalLeads ? (simpleSurveys || 0) / totalLeads : 0

		return {
			totalLeads: totalLeads || 0,
			simpleSurveys: simpleSurveys || 0,
			fullSurveys: fullSurveys || 0,
			conversionRate: Math.round(conversionRate * 100),
		}
	} catch (error) {
		console.error('Error fetching dashboard metrics:', error)
		return {
			totalLeads: 0,
			simpleSurveys: 0,
			fullSurveys: 0,
			conversionRate: 0,
		}
	}
}

export async function getLeadsByDay(days = 7) {
	try {
		const supabase = await createClient()

		const { data, error } = await supabase
			.from('waitlist_leads')
			.select('created_at')
			.gte(
				'created_at',
				new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString(),
			)
			.order('created_at', { ascending: true })

		if (error) throw error

		// Group by day
		const grouped = (data || []).reduce(
			(acc, lead) => {
				const date = new Date(lead.created_at).toLocaleDateString('es-GT')
				acc[date] = (acc[date] || 0) + 1
				return acc
			},
			{} as Record<string, number>,
		)

		return Object.entries(grouped).map(([date, count]) => ({
			date,
			count,
		}))
	} catch (error) {
		console.error('Error fetching leads by day:', error)
		return []
	}
}

export async function getBusinessTypeDistribution() {
	try {
		const supabase = await createClient()

		const { data, error } = await supabase
			.from('encuesta_simple_responses')
			.select('tipo_negocio')

		if (error) throw error

		// Group by business type
		const grouped = (data || []).reduce(
			(acc, response) => {
				const type = response.tipo_negocio || 'Sin especificar'
				acc[type] = (acc[type] || 0) + 1
				return acc
			},
			{} as Record<string, number>,
		)

		return Object.entries(grouped)
			.map(([type, count]) => ({
				type,
				count,
			}))
			.sort((a, b) => b.count - a.count)
	} catch (error) {
		console.error('Error fetching business type distribution:', error)
		return []
	}
}

export async function getPricingDistribution() {
	try {
		const supabase = await createClient()

		const { data, error } = await supabase
			.from('encuesta_simple_responses')
			.select('precio_mensual')

		if (error) throw error

		// Group by price range
		const grouped = (data || []).reduce(
			(acc, response) => {
				const price = response.precio_mensual || 'Sin especificar'
				acc[price] = (acc[price] || 0) + 1
				return acc
			},
			{} as Record<string, number>,
		)

		return Object.entries(grouped)
			.map(([range, count]) => ({
				range,
				count,
			}))
			.sort((a, b) => b.count - a.count)
	} catch (error) {
		console.error('Error fetching pricing distribution:', error)
		return []
	}
}

export async function getRecentLeads(limit = 10) {
	try {
		const supabase = await createClient()

		const { data, error } = await supabase
			.from('waitlist_leads')
			.select('id, name, email, created_at, encuesta_completed')
			.order('created_at', { ascending: false })
			.limit(limit)

		if (error) throw error

		return data || []
	} catch (error) {
		console.error('Error fetching recent leads:', error)
		return []
	}
}

// Get all survey responses with lead information
export async function getSurveyResponses(limit = 50) {
	try {
		const supabase = await createClient()

		const { data, error } = await supabase
			.from('encuesta_simple_responses')
			.select(
				`
				*,
				waitlist_leads (
					name,
					email
				)
			`,
			)
			.order('created_at', { ascending: false })
			.limit(limit)

		if (error) throw error

		return data || []
	} catch (error) {
		console.error('Error fetching survey responses:', error)
		return []
	}
}

// Get feature requests analysis
export async function getFeatureRequests() {
	try {
		const supabase = await createClient()

		const { data, error } = await supabase
			.from('encuesta_simple_responses')
			.select('feature_deseado')
			.not('feature_deseado', 'is', null)

		if (error) throw error

		// Simple word frequency analysis
		const words: Record<string, number> = {}
		;(data || []).forEach((response) => {
			if (response.feature_deseado) {
				const text = response.feature_deseado.toLowerCase()
				// Extract meaningful words (more than 3 characters)
				const extractedWords = text.match(/\b\w{4,}\b/g) || []
				extractedWords.forEach((word: string) => {
					words[word] = (words[word] || 0) + 1
				})
			}
		})

		// Convert to array and sort
		return Object.entries(words)
			.map(([feature, count]) => ({
				feature,
				count,
			}))
			.sort((a, b) => b.count - a.count)
			.slice(0, 15) // Top 15 most mentioned words
	} catch (error) {
		console.error('Error fetching feature requests:', error)
		return []
	}
}

// Get inventory management distribution
export async function getInventoryDistribution() {
	try {
		const supabase = await createClient()

		const { data, error } = await supabase
			.from('encuesta_simple_responses')
			.select('maneja_inventario')

		if (error) throw error

		const distribution = (data || []).reduce(
			(acc, response) => {
				const manages = response.maneja_inventario
				acc[manages] = (acc[manages] || 0) + 1
				return acc
			},
			{} as Record<string, number>,
		)

		return Object.entries(distribution).map(([manages, count]) => ({
			manages,
			count,
		}))
	} catch (error) {
		console.error('Error fetching inventory distribution:', error)
		return []
	}
}

// Get billing needs distribution
export async function getBillingDistribution() {
	try {
		const supabase = await createClient()

		const { data, error } = await supabase
			.from('encuesta_simple_responses')
			.select('necesita_facturacion')

		if (error) throw error

		const grouped = (data || []).reduce(
			(acc, response) => {
				const need = response.necesita_facturacion || 'Sin especificar'
				acc[need] = (acc[need] || 0) + 1
				return acc
			},
			{} as Record<string, number>,
		)

		return Object.entries(grouped)
			.map(([need, count]) => ({
				need,
				count,
			}))
			.sort((a, b) => b.count - a.count)
	} catch (error) {
		console.error('Error fetching billing distribution:', error)
		return []
	}
}

// Get common problems summary
export async function getProblemSummary() {
	try {
		const supabase = await createClient()

		const { data, error } = await supabase
			.from('encuesta_simple_responses')
			.select('problema_principal')

		if (error) throw error

		// Extract keywords from problems
		const keywords: Record<string, number> = {}
		;(data || []).forEach((response) => {
			if (response.problema_principal) {
				const text = response.problema_principal.toLowerCase()
				const words = text.match(/\b\w{5,}\b/g) || []
				words.forEach((word: string) => {
					keywords[word] = (keywords[word] || 0) + 1
				})
			}
		})

		return Object.entries(keywords)
			.map(([keyword, count]) => ({
				keyword,
				count,
			}))
			.sort((a, b) => b.count - a.count)
			.slice(0, 10)
	} catch (error) {
		console.error('Error fetching problem summary:', error)
		return []
	}
}
