'use client'

import { useEffect, useRef, useState } from 'react'

interface AnimatedNumberProps {
	value: number
	duration?: number
	className?: string
}

export function AnimatedNumber({
	value,
	duration = 2000,
	className
}: AnimatedNumberProps) {
	const [count, setCount] = useState(0)
	const [isVisible, setIsVisible] = useState(false)
	const ref = useRef<HTMLSpanElement>(null)

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && !isVisible) {
					setIsVisible(true)
					observer.disconnect()
				}
			},
			{ threshold: 0.1 }
		)

		if (ref.current) {
			observer.observe(ref.current)
		}

		return () => observer.disconnect()
	}, [isVisible])

	useEffect(() => {
		if (!isVisible) return

		let startTime: number
		let animationFrame: number

		const animate = (currentTime: number) => {
			if (!startTime) startTime = currentTime
			const progress = Math.min((currentTime - startTime) / duration, 1)

			setCount(Math.floor(progress * value))

			if (progress < 1) {
				animationFrame = requestAnimationFrame(animate)
			}
		}

		animationFrame = requestAnimationFrame(animate)

		return () => cancelAnimationFrame(animationFrame)
	}, [isVisible, value, duration])

	return (
		<span ref={ref} className={className}>
			{count}
		</span>
	)
}
