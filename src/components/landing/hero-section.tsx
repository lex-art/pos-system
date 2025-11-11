'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FadeIn } from '@/components/shared/fade-in'
import { motion } from 'framer-motion'
import { copy } from '@/config/copy'

export function HeroSection() {
	const scrollToForm = () => {
		const formElement = document.getElementById('waitlist-form')
		if (formElement) {
			formElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
		}
	}

	return (
		<section className="relative py-20 md:py-32 overflow-hidden min-h-screen flex items-center justify-center">
			{/* Background gradient */}
			{/* <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background -z-10" /> */}
			<div className="absolute inset-0" />
			<div className="container mx-auto px-4 max-w-11/12">
				<div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
					{/* Left side - Content */}
					<div className="space-y-8">
						<FadeIn delay={0}>
							<Badge variant="secondary" className="text-sm font-medium">
								{copy.hero.badge}
							</Badge>
						</FadeIn>

						<FadeIn delay={100}>
							<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
								{copy.hero.headline}
							</h1>
						</FadeIn>

						<FadeIn delay={200}>
							<p className="text-xl text-muted-foreground max-w-2xl">
								{copy.hero.subheadline}
							</p>
						</FadeIn>

						<FadeIn delay={300}>
							<div className="flex flex-wrap gap-4 text-base md:text-sm text-muted-foreground">
								<div className="flex items-center gap-2">
									<span className="text-primary">✓</span>
									<span>Sin instalación</span>
								</div>
								<div className="flex items-center gap-2">
									<span className="text-primary">✓</span>
									<span>Soporte</span>
								</div>
								<div className="flex items-center gap-2">
									<span className="text-primary">✓</span>
									<span>Plan gratuito</span>
								</div>
								<div className="flex items-center gap-2">
									<span className="text-primary">✓</span>
									<span>Simple de usar</span>
								</div>
							</div>
						</FadeIn>

						<FadeIn delay={400}>
							<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
								<Button size="lg" onClick={scrollToForm} className="text-lg px-8 cursor-pointer">
									{copy.hero.cta}
								</Button>
							</motion.div>
						</FadeIn>
					</div>

				{/* Right side - Video Demo Placeholder */}
				<FadeIn delay={400} className="lg:ml-auto">
				<motion.div
					className="w-full  aspect-video bg-muted rounded-lg shadow-2xl border border-border overflow-hidden"
					whileHover={{ scale: 1.02 }}
					transition={{ type: 'spring', stiffness: 300 }}
				>
						{/* Video Embed (YouTube o archivo mp4) */}
						{copy.hero.video?.youtubeId ? (
							<div className="relative w-full h-full">
								<iframe
									className="absolute inset-0 w-full h-full"
									src={`https://www.youtube.com/embed/${copy.hero.video.youtubeId}?rel=0&modestbranding=1`}
									title="POS Demo Video"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
									allowFullScreen
								/>
							</div>
						) : copy.hero.video?.videoUrl ? (
							<video
								className="w-full h-full object-contain"
								autoPlay
								muted
								loop
								playsInline
								preload="metadata"
								src={copy.hero.video.videoUrl}
							>
								Your browser does not support the video tag.
							</video>
						) : (
							<div className="h-full w-full flex items-center justify-center text-center p-8 space-y-4">
								<div className="w-full">
									<motion.div
										className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center"
										animate={{ scale: [1, 1.1, 1] }}
										transition={{ duration: 2, repeat: Infinity }}
									>
										<svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
											<path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
										</svg>
									</motion.div>
									<p className="text-sm text-muted-foreground font-medium">Video Demo del Sistema</p>
									<p className="text-xs text-muted-foreground">Configura copy.hero.video.youtubeId o videoUrl</p>
								</div>
							</div>
						)}
					</motion.div>
				</FadeIn>
				</div>
			</div>
		</section>
	)
}
