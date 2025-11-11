import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	reactStrictMode: true,
	output: 'standalone',
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**'
			}
		]
	},
	experimental: {
		serverActions: {
			bodySizeLimit: '2mb'
		}
	}
}

export default nextConfig
