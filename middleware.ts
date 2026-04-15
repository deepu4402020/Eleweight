import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Define public paths that don't require authentication
  const isPublicPath = 
    pathname === '/login' || 
    pathname === '/register' || 
    pathname.startsWith('/api/auth');

  // If there's no token and the path is not public, redirect to login
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If there's a token and user tries to access login/register, redirect to home
  if (token && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/login',
    '/register',
    '/exercises/:path*',
    '/diet-plans/:path*',
    '/find-gyms/:path*',
    '/pricing/:path*',
    '/form-validation/:path*',
  ],
};
