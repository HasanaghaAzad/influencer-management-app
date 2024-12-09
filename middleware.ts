import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";
import {isAuthenticated} from "./lib/auth";

export function middleware(req: NextRequest) {
  const authStatus = isAuthenticated(req);
  if (!authStatus) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
