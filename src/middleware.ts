import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
	// Protect dev-dashboard route
	if (request.nextUrl.pathname.startsWith('/dev-dashboard')) {
		// Only allow access in development
		if (process.env.NODE_ENV !== 'development') {
			return NextResponse.redirect(new URL('/', request.url))
		}
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/dev-dashboard/:path*'],
}
