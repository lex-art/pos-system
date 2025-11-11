'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface SlideInProps {
	children: ReactNode
	direction?: 'left' | 'right' | 'up' | 'down'
	delay?: number
	className?: string
}

export function SlideIn({ children, direction = 'up', delay = 0, className }: SlideInProps) {
	const directions = {
		left: { x: -50, y: 0 },
		right: { x: 50, y: 0 },
		up: { x: 0, y: 50 },
		down: { x: 0, y: -50 }
	}

	const initial = directions[direction]

	return (
		<motion.div
			initial={{ ...initial, opacity: 0 }}
			whileInView={{ x: 0, y: 0, opacity: 1 }}
			viewport={{ once: true, margin: '-100px' }}
			transition={{
				duration: 0.6,
				delay: delay / 1000,
				ease: [0.25, 0.4, 0.25, 1]
			}}
			className={className}
		>
			{children}
		</motion.div>
	)
}
