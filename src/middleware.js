import { NextResponse } from "next/server";

export async function middleware(request) {
  const { pathname, origin } = request.nextUrl;
  const sessionCookie = request.cookies.get("session")?.value;

  // modify depending on routes that require authentication
  const protectedRoutes = [
    "/dashboard",
    "dashboard/create-post",
    "dashboard/edit-post",
    "/api/protected",
  ];

  const isProtectedRoute = protectedRoutes.some((path) =>
    pathname.startsWith(path)
  );

  // redirects authenticated users trying to access /login
  if (sessionCookie && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // grants access to unprotected routes
  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // if no cookie detected to protected route -> back to /login
  if (!sessionCookie) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect_to", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // verify cookie for protected routes
  try {
    const response = await fetch(`${origin}/api/verify-session`, {
      headers: {
        Cookie: `session=${sessionCookie}`,
      },
    });

    if (response.ok) {
      return NextResponse.next();
    }

    throw new Error("Session verification failed");
  } catch (e) {
    console.error("Middleware session verification error:", e.message);
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect_to", pathname);
    // clear invalid cookie
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete("session");
    return response;
  }
}

export const config = {
  // middleware will only run for these paths
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
