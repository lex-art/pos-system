import Link from 'next/link'
import { copy } from '@/config/copy'
import { ThemeToggle } from '@/components/theme-toggle'

export function Footer() {
	return (
		<footer className="border-t bg-muted/30">
			<div className="container mx-auto px-4 py-12">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					{/* Brand */}
					<div className="space-y-4">
						<h3 className="font-bold text-lg">POS System</h3>
						<p className="text-sm text-muted-foreground">{copy.footer.tagline}</p>
						<div className="flex items-center gap-2">
							<ThemeToggle />
						</div>
					</div>

					{/* Product */}
					<div>
						<h4 className="font-semibold mb-4">Producto</h4>
						<ul className="space-y-2">
							{copy.footer.links.product.map((link, index) => (
								<li key={index}>
									<Link
										href={link.href}
										className="text-sm text-muted-foreground hover:text-foreground transition-colors"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Company */}
					<div>
						<h4 className="font-semibold mb-4">Compañía</h4>
						<ul className="space-y-2">
							{copy.footer.links.company.map((link, index) => (
								<li key={index}>
									<Link
										href={link.href}
										className="text-sm text-muted-foreground hover:text-foreground transition-colors"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Legal */}
					<div>
						<h4 className="font-semibold mb-4">Legal</h4>
						<ul className="space-y-2">
							{copy.footer.links.legal.map((link, index) => (
								<li key={index}>
									<Link
										href={link.href}
										className="text-sm text-muted-foreground hover:text-foreground transition-colors"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
					<p>{copy.footer.copyright}</p>
				</div>
			</div>
		</footer>
	)
}
