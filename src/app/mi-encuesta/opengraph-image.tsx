import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = '3 Meses Gratis - Completa Tu Encuesta - POS Guatemala'
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
					background: 'linear-gradient(135deg, #f97316 0%, #ef4444 100%)',
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
						padding: '12px 32px',
						marginBottom: '32px',
						display: 'flex',
						alignItems: 'center',
						backdropFilter: 'blur(10px)'
					}}
				>
					<span style={{ fontSize: '24px', color: 'white', fontWeight: '600' }}>
						POS Guatemala
					</span>
				</div>

				{/* Main Content */}
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						textAlign: 'center',
						gap: '24px'
					}}
				>
					{/* Fire Emoji + Main Title */}
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							gap: '16px'
						}}
					>
						<span style={{ fontSize: '120px' }}>🔥</span>
						<h1
							style={{
								fontSize: '72px',
								fontWeight: 'bold',
								color: 'white',
								margin: 0,
								lineHeight: 1.1,
								textShadow: '0 4px 12px rgba(0,0,0,0.2)'
							}}
						>
							3 Meses GRATIS
						</h1>
					</div>

					{/* Subtitle */}
					<p
						style={{
							fontSize: '36px',
							color: 'rgba(255,255,255,0.95)',
							margin: 0,
							fontWeight: '500'
						}}
					>
						Solo primeros 20 usuarios
					</p>

					{/* Divider */}
					<div
						style={{
							width: '120px',
							height: '4px',
							background: 'white',
							borderRadius: '2px',
							margin: '16px 0'
						}}
					/>

					{/* Call to Action */}
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							gap: '12px'
						}}
					>
						<p
							style={{
								fontSize: '32px',
								color: 'white',
								margin: 0,
								fontWeight: '600'
							}}
						>
							Completa tu encuesta ahora
						</p>
						<p
							style={{
								fontSize: '24px',
								color: 'rgba(255,255,255,0.9)',
								margin: 0
							}}
						>
							6 preguntas • Menos de 3 minutos ⚡
						</p>
					</div>
				</div>

				{/* Footer Badge */}
				<div
					style={{
						position: 'absolute',
						bottom: '40px',
						background: 'rgba(255,255,255,0.15)',
						borderRadius: '50px',
						padding: '16px 40px',
						backdropFilter: 'blur(10px)'
					}}
				>
					<span style={{ fontSize: '20px', color: 'white', fontWeight: '500' }}>
						✓ Acceso Anticipado  •  ✓ Soporte VIP  •  ✓ Sin compromiso
					</span>
				</div>
			</div>
		),
		{
			...size
		}
	)
}
