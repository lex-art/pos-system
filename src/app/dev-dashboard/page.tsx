import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
	getDashboardMetrics,
	getBusinessTypeDistribution,
	getPricingDistribution,
	getRecentLeads,
	getLeadsByDay,
	getSurveyResponses,
	getFeatureRequests,
	getInventoryDistribution,
	getBillingDistribution,
	getProblemSummary,
} from '@/lib/supabase/queries'
import { BarChart, Users, FileText, TrendingUp, Lightbulb, Package, Receipt } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function DevDashboardPage() {
	const [
		metrics,
		businessTypes,
		pricing,
		recentLeads,
		leadsByDay,
		surveyResponses,
		featureRequests,
		inventoryDistribution,
		billingDistribution,
		problemSummary,
	] = await Promise.all([
		getDashboardMetrics(),
		getBusinessTypeDistribution(),
		getPricingDistribution(),
		getRecentLeads(10),
		getLeadsByDay(7),
		getSurveyResponses(50),
		getFeatureRequests(),
		getInventoryDistribution(),
		getBillingDistribution(),
		getProblemSummary(),
	])

	return (
		<div className="min-h-screen bg-background p-8">
			<div className="mx-auto max-w-7xl space-y-8">
				{/* Header */}
				<div className="space-y-2">
					<h1 className="text-3xl font-bold tracking-tight">
						Dashboard de Métricas
					</h1>
					<p className="text-muted-foreground">
						Vista general de leads y encuestas (Solo disponible en desarrollo)
					</p>
				</div>

				{/* Metrics Cards */}
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Total Leads</CardTitle>
							<Users className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{metrics.totalLeads}</div>
							<p className="text-xs text-muted-foreground">
								Registrados en waitlist
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Encuestas Simples
							</CardTitle>
							<FileText className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{metrics.simpleSurveys}</div>
							<p className="text-xs text-muted-foreground">
								Encuestas de 7 preguntas
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Encuestas Completas
							</CardTitle>
							<BarChart className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{metrics.fullSurveys}</div>
							<p className="text-xs text-muted-foreground">
								Encuestas de validación
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Conversión</CardTitle>
							<TrendingUp className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{metrics.conversionRate}%
							</div>
							<p className="text-xs text-muted-foreground">
								Lead → Encuesta simple
							</p>
						</CardContent>
					</Card>
				</div>

				{/* Charts Section */}
				<div className="grid gap-4 md:grid-cols-2">
					{/* Business Type Distribution */}
					<Card>
						<CardHeader>
							<CardTitle>Tipo de Negocio</CardTitle>
						</CardHeader>
						<CardContent>
							{businessTypes.length > 0 ? (
								<div className="space-y-3">
									{businessTypes.map((item) => (
										<div
											key={item.type}
											className="flex items-center justify-between"
										>
											<span className="text-sm capitalize">{item.type}</span>
											<div className="flex items-center gap-2">
												<div className="h-2 w-32 overflow-hidden rounded-full bg-secondary">
													<div
														className="h-full bg-primary"
														style={{
															width: `${(item.count / businessTypes[0].count) * 100}%`,
														}}
													/>
												</div>
												<span className="text-sm font-medium">{item.count}</span>
											</div>
										</div>
									))}
								</div>
							) : (
								<p className="text-sm text-muted-foreground">
									No hay datos disponibles
								</p>
							)}
						</CardContent>
					</Card>

					{/* Pricing Distribution */}
					<Card>
						<CardHeader>
							<CardTitle>Disposición a Pagar</CardTitle>
						</CardHeader>
						<CardContent>
							{pricing.length > 0 ? (
								<div className="space-y-3">
									{pricing.map((item) => (
										<div
											key={item.range}
											className="flex items-center justify-between"
										>
											<span className="text-sm">{item.range}</span>
											<div className="flex items-center gap-2">
												<div className="h-2 w-32 overflow-hidden rounded-full bg-secondary">
													<div
														className="h-full bg-primary"
														style={{
															width: `${(item.count / pricing[0].count) * 100}%`,
														}}
													/>
												</div>
												<span className="text-sm font-medium">{item.count}</span>
											</div>
										</div>
									))}
								</div>
							) : (
								<p className="text-sm text-muted-foreground">
									No hay datos disponibles
								</p>
							)}
						</CardContent>
					</Card>
				</div>

				{/* Leads by Day */}
				<Card>
					<CardHeader>
						<CardTitle>Leads por Día (Últimos 7 días)</CardTitle>
					</CardHeader>
					<CardContent>
						{leadsByDay.length > 0 ? (
							<div className="space-y-2">
								{leadsByDay.map((item) => (
									<div
										key={item.date}
										className="flex items-center justify-between"
									>
										<span className="text-sm">{item.date}</span>
										<div className="flex items-center gap-2">
											<div className="h-2 w-48 overflow-hidden rounded-full bg-secondary">
												<div
													className="h-full bg-primary"
													style={{
														width: `${(item.count / Math.max(...leadsByDay.map((l) => l.count))) * 100}%`,
													}}
												/>
											</div>
											<span className="text-sm font-medium">{item.count}</span>
										</div>
									</div>
								))}
							</div>
						) : (
							<p className="text-sm text-muted-foreground">
								No hay datos de los últimos 7 días
							</p>
						)}
					</CardContent>
				</Card>

				{/* New Analysis Sections */}
				<div className="grid gap-4 md:grid-cols-3">
					{/* Feature Requests */}
					<Card>
						<CardHeader className="flex flex-row items-center justify-between">
							<CardTitle className="text-base">Features Más Solicitados</CardTitle>
							<Lightbulb className="h-5 w-5 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							{featureRequests.length > 0 ? (
								<div className="space-y-2">
									{featureRequests.slice(0, 8).map((item) => (
										<div
											key={item.feature}
											className="flex items-center justify-between text-sm"
										>
											<span className="capitalize">{item.feature}</span>
											<Badge variant="secondary">{item.count}</Badge>
										</div>
									))}
								</div>
							) : (
								<p className="text-sm text-muted-foreground">
									No hay features solicitados aún
								</p>
							)}
						</CardContent>
					</Card>

					{/* Inventory Distribution */}
					<Card>
						<CardHeader className="flex flex-row items-center justify-between">
							<CardTitle className="text-base">Manejo de Inventario</CardTitle>
							<Package className="h-5 w-5 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							{inventoryDistribution.length > 0 ? (
								<div className="space-y-3">
									{inventoryDistribution.map((item) => (
										<div key={item.manages} className="space-y-1">
											<div className="flex items-center justify-between text-sm">
												<span className="capitalize">
													{item.manages === 'si' ? 'Sí maneja' : 'No maneja'}
												</span>
												<span className="font-medium">{item.count}</span>
											</div>
											<div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
												<div
													className="h-full bg-primary"
													style={{
														width: `${(item.count / inventoryDistribution.reduce((sum, i) => sum + i.count, 0)) * 100}%`,
													}}
												/>
											</div>
										</div>
									))}
								</div>
							) : (
								<p className="text-sm text-muted-foreground">
									No hay datos disponibles
								</p>
							)}
						</CardContent>
					</Card>

					{/* Billing Distribution */}
					<Card>
						<CardHeader className="flex flex-row items-center justify-between">
							<CardTitle className="text-base">Necesidad de Facturación</CardTitle>
							<Receipt className="h-5 w-5 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							{billingDistribution.length > 0 ? (
								<div className="space-y-2">
									{billingDistribution.map((item) => (
										<div
											key={item.need}
											className="flex items-center justify-between text-xs"
										>
											<span className="flex-1">
												{item.need === 'si_obligatorio'
													? 'Obligatorio'
													: item.need === 'si_importante'
														? 'Importante'
														: item.need === 'no_importante'
															? 'No importante'
															: 'No necesita'}
											</span>
											<Badge variant="secondary" className="ml-2">
												{item.count}
											</Badge>
										</div>
									))}
								</div>
							) : (
								<p className="text-sm text-muted-foreground">
									No hay datos disponibles
								</p>
							)}
						</CardContent>
					</Card>
				</div>

				{/* Problem Keywords */}
				<Card>
					<CardHeader>
						<CardTitle>Problemas Principales (Palabras Clave)</CardTitle>
					</CardHeader>
					<CardContent>
						{problemSummary.length > 0 ? (
							<div className="flex flex-wrap gap-2">
								{problemSummary.map((item) => (
									<Badge key={item.keyword} variant="outline" className="text-sm">
										{item.keyword} ({item.count})
									</Badge>
								))}
							</div>
						) : (
							<p className="text-sm text-muted-foreground">
								No hay datos de problemas aún
							</p>
						)}
					</CardContent>
				</Card>

				{/* Survey Responses Table */}
				<Card>
					<CardHeader>
						<CardTitle>Respuestas de Encuesta</CardTitle>
					</CardHeader>
					<CardContent>
						{surveyResponses.length > 0 ? (
							<div className="overflow-x-auto">
								<table className="w-full text-sm">
									<thead>
										<tr className="border-b">
											<th className="pb-2 text-left font-medium">Fecha</th>
											<th className="pb-2 text-left font-medium">Lead</th>
											<th className="pb-2 text-left font-medium">Tipo Negocio</th>
											<th className="pb-2 text-left font-medium">Ventas/Día</th>
											<th className="pb-2 text-left font-medium">Inventario</th>
											<th className="pb-2 text-left font-medium">Precio</th>
											<th className="pb-2 text-left font-medium">Facturación</th>
											<th className="pb-2 text-left font-medium">Feature Deseado</th>
										</tr>
									</thead>
									<tbody>
										{surveyResponses.map((response: any) => (
											<tr key={response.id} className="border-b">
												<td className="py-2">
													{new Date(response.created_at).toLocaleDateString('es-GT')}
												</td>
												<td className="py-2">
													{response.waitlist_leads?.name || 'N/A'}
												</td>
												<td className="py-2 capitalize">
													{response.tipo_negocio === 'otros'
														? response.tipo_negocio_otro || 'Otro'
														: response.tipo_negocio.replace(/_/g, ' ')}
												</td>
												<td className="py-2">{response.ventas_diarias}</td>
												<td className="py-2">
													<Badge variant={response.maneja_inventario === 'si' ? 'default' : 'secondary'}>
														{response.maneja_inventario === 'si' ? 'Sí' : 'No'}
													</Badge>
												</td>
												<td className="py-2">{response.precio_mensual}</td>
												<td className="py-2 text-xs">
													{response.necesita_facturacion === 'si_obligatorio'
														? 'Obligatorio'
														: response.necesita_facturacion === 'si_importante'
															? 'Importante'
															: 'No necesita'}
												</td>
												<td className="py-2 max-w-xs truncate">
													{response.feature_deseado || '-'}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						) : (
							<p className="text-sm text-muted-foreground">
								No hay respuestas de encuesta aún
							</p>
						)}
					</CardContent>
				</Card>

				{/* Recent Leads Table */}
				<Card>
					<CardHeader>
						<CardTitle>Leads Recientes</CardTitle>
					</CardHeader>
					<CardContent>
						{recentLeads.length > 0 ? (
							<div className="overflow-x-auto">
								<table className="w-full text-sm">
									<thead>
										<tr className="border-b">
											<th className="pb-2 text-left font-medium">Nombre</th>
											<th className="pb-2 text-left font-medium">Email</th>
											<th className="pb-2 text-left font-medium">Fecha</th>
											<th className="pb-2 text-left font-medium">Encuesta</th>
										</tr>
									</thead>
									<tbody>
										{recentLeads.map((lead) => (
											<tr key={lead.id} className="border-b">
												<td className="py-2">{lead.name}</td>
												<td className="py-2">{lead.email}</td>
												<td className="py-2">
													{new Date(lead.created_at).toLocaleDateString('es-GT')}
												</td>
												<td className="py-2">
													{lead.encuesta_completed ? (
														<Badge variant="default">Completada</Badge>
													) : (
														<Badge variant="secondary">Pendiente</Badge>
													)}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						) : (
							<p className="text-sm text-muted-foreground">
								No hay leads registrados aún
							</p>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
