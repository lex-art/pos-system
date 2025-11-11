'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface HoverScaleProps {
	children: ReactNode
	className?: string
	scale?: number
}

export function HoverScale({ children, className, scale = 1.02 }: HoverScaleProps) {
	return (
		<motion.div
			whileHover={{ scale, y: -5 }}
			whileTap={{ scale: 0.98 }}
			transition={{
				type: 'spring',
				stiffness: 300,
				damping: 20
			}}
			className={className}
		>
			{children}
		</motion.div>
	)
}
