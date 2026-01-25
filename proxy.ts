import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define protected routes for each role
const roleRoutes = {
  student: ['/student'],
  college: ['/college'],
  recruiter: ['/recruiter']
}

const publicRoutes = ['/', '/login', '/signup', '/api', '/test-auth', '/logout', '/signup-demo', '/status']

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  console.log('Proxy middleware checking:', pathname)
  
  // Allow static assets first
  if (pathname.startsWith('/_next') || 
      pathname.startsWith('/favicon') ||
      pathname.startsWith('/icon') ||
      pathname.includes('.')) {
    console.log('Static asset, allowing')
    return NextResponse.next()
  }
  
  // Allow public routes (exact matches or specific prefixes)
  const isPublicRoute = publicRoutes.some(route => {
    if (route === '/') {
      return pathname === '/' // Exact match for root
    }
    return pathname.startsWith(route)
  })
  
  if (isPublicRoute) {
    console.log('Public route, allowing')
    return NextResponse.next()
  }

  // Get session token from cookies
  const sessionToken = request.cookies.get('session_token')?.value
  console.log('Session token:', sessionToken ? 'exists' : 'missing')

  // If no session token, redirect to login
  if (!sessionToken) {
    console.log('No session token, redirecting to login')
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // For authenticated requests, we could add role-based routing here
  // For now, just allow all authenticated requests
  console.log('Session token exists, allowing request')
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public|icon).*)',
  ],
}