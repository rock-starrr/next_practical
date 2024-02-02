import { NextResponse } from 'next/server'

export const middleware = (request) => {
    const path = request.nextUrl.pathname
    // console.log("routes coming in middleware", path);
    const isPublicPath = path === '/login' || path === '/register'
    const isUserPath = path === '/contact' || path === '/about' || path === '/services'
    const isAdminPath = path.startsWith('/users')

    const token = request.cookies.get('token')?.value || ''
    const decodedRole = request.cookies.get('role')?.value || ''
    const role = atob(decodedRole)

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }
    if (isUserPath && role === 'admin') {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }
    if (isAdminPath) {
        if (role === '') {
            return NextResponse.redirect(new URL('/login', request.nextUrl))
        } else if (role !== 'admin') {
            return NextResponse.redirect(new URL('/', request.nextUrl))
        }
    }
    if (path === '/profile' && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }

}