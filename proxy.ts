import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getSession } from "@/lib/supabase/server"

const publicRoutes = ["/", "/login", "/signup", "/browse"]
const authRoutes = ["/login", "/signup"]
const protectedRoutes = ["/dashboard", "/watch", "/account", "/subscribe"]

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const session = await getSession()

  const isPublicRoute = publicRoutes.some((route) => pathname === route || pathname.startsWith(route))
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  if (isProtectedRoute && !session) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
}
