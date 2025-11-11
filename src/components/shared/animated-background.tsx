'use client'

import { motion } from 'framer-motion'

export function AnimatedBackground() {
	return (
		<div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
			{/* Gradient Background */}
			<div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />

			{/* Animated Grid Pattern */}
			<motion.div
				className="absolute inset-0"
				style={{
					backgroundImage: `radial-gradient(circle, hsl(var(--primary) / 0.12) 1px, transparent 1px)`,
					backgroundSize: '50px 50px'
				}}
				animate={{
					backgroundPosition: ['0px 0px', '50px 50px'],
					opacity: [0.4, 0.6, 0.4]
				}}
				transition={{
					duration: 20,
					repeat: Infinity,
					ease: 'linear'
				}}
			/>

			{/* Floating Orbs - Más visibles y con mejor animación */}
			<motion.div
				className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/20 blur-3xl"
				animate={{
					x: [0, 150, -50, 0],
					y: [0, -80, 50, 0],
					scale: [1, 1.3, 1.1, 1],
					opacity: [0.4, 0.6, 0.5, 0.4]
				}}
				transition={{
					duration: 20,
					repeat: Infinity,
					ease: 'easeInOut'
				}}
			/>

			<motion.div
				className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-primary/15 blur-3xl"
				animate={{
					x: [0, -120, 80, 0],
					y: [0, 120, -60, 0],
					scale: [1, 1.4, 1.2, 1],
					opacity: [0.3, 0.5, 0.4, 0.3]
				}}
				transition={{
					duration: 22,
					repeat: Infinity,
					ease: 'easeInOut',
					delay: 3
				}}
			/>

			<motion.div
				className="absolute top-1/2 right-1/3 w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl"
				animate={{
					x: [0, 100, -80, 0],
					y: [0, -100, 80, 0],
					scale: [1, 1.25, 1.15, 1],
					opacity: [0.25, 0.45, 0.35, 0.25]
				}}
				transition={{
					duration: 25,
					repeat: Infinity,
					ease: 'easeInOut',
					delay: 5
				}}
			/>
		</div>
	)
}
