import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'POS Guatemala - Sistema de Punto de Venta en la Nube'
export const size = {
	width: 1200,
	height: 630
}
export const contentType = 'image/png'

export default async function Image() {
	return new ImageResponse(
		(
			<div
				style={{
					background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					padding: '80px',
					fontFamily: 'system-ui, sans-serif'
				}}
			>
				{/* Badge Top */}
				<div
					style={{
						background: 'rgba(255,255,255,0.2)',
						borderRadius: '50px',
						padding: '16px 40px',
						marginBottom: '40px',
						display: 'flex',
						alignItems: 'center',
						backdropFilter: 'blur(10px)'
					}}
				>
					<span style={{ fontSize: '28px', color: 'white', fontWeight: '700' }}>
						POS GUATEMALA
					</span>
				</div>

				{/* Main Content */}
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						textAlign: 'center',
						gap: '32px',
						maxWidth: '900px'
					}}
				>
					{/* Main Title */}
					<h1
						style={{
							fontSize: '68px',
							fontWeight: 'bold',
							color: 'white',
							margin: 0,
							lineHeight: 1.2,
							textShadow: '0 4px 12px rgba(0,0,0,0.2)'
						}}
					>
						El POS Más Fácil
						<br />
						para Tu Negocio
					</h1>

					{/* Subtitle */}
					<p
						style={{
							fontSize: '32px',
							color: 'rgba(255,255,255,0.95)',
							margin: 0,
							fontWeight: '500',
							lineHeight: 1.4
						}}
					>
						Controla ventas, inventario y reportes
						<br />
						desde cualquier dispositivo
					</p>

					{/* Features */}
					<div
						style={{
							display: 'flex',
							gap: '32px',
							marginTop: '20px'
						}}
					>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: '12px'
							}}
						>
							<span style={{ fontSize: '28px' }}>✓</span>
							<span style={{ fontSize: '24px', color: 'white', fontWeight: '500' }}>
								Sin Instalación
							</span>
						</div>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: '12px'
							}}
						>
							<span style={{ fontSize: '28px' }}>✓</span>
							<span style={{ fontSize: '24px', color: 'white', fontWeight: '500' }}>
								Soporte
							</span>
						</div>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: '12px'
							}}
						>
							<span style={{ fontSize: '28px' }}>✓</span>
							<span style={{ fontSize: '24px', color: 'white', fontWeight: '500' }}>
								Plan Gratuito
							</span>
						</div>
					</div>
				</div>

				{/* CTA Badge */}
				<div
					style={{
						position: 'absolute',
						bottom: '40px',
						background: 'linear-gradient(135deg, #f97316 0%, #ef4444 100%)',
						borderRadius: '50px',
						padding: '20px 50px',
						boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
					}}
				>
					<span style={{ fontSize: '28px', color: 'white', fontWeight: '700' }}>
						🔥 Primeros 20 usuarios: 3 meses GRATIS
					</span>
				</div>
			</div>
		),
		{
			...size
		}
	)
}
