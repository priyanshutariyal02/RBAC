import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath =
    path === "/" || path === "/login" || path === "/register";
  const token = request.cookies.get("token")?.value || "";

  // Check if the user has a token
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // If the path is not public and the user is not authenticated, redirect to "/"
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

// Match the specified routes
export const config = {
  matcher: ["/", "/login", "/register", "/home"],
};
