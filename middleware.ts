import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";

// Define arrays of protected and restricted routes
const protectedRoutes = ["/account"];
const restrictedWhenAuthenticated = ["/login"];

export default async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  // Check if the current route is protected (requires authentication)
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Check if the current route should be restricted when authenticated
  const isRestricted = restrictedWhenAuthenticated.some((route) =>
    pathname.startsWith(route)
  );

  // Redirect to login if the route is protected and the user is not authenticated
  if (!session && isProtected) {
    const loginUrl = new URL("/login", request.nextUrl.origin);
    return NextResponse.redirect(loginUrl.toString());
  }

  // Redirect to home or another page if the user is authenticated and tries to access restricted routes
  if (session && isRestricted) {
    const homeUrl = new URL("/", request.nextUrl.origin);
    return NextResponse.redirect(homeUrl.toString());
  }

  // If authentication passes or no restrictions apply, continue to the next middleware
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
