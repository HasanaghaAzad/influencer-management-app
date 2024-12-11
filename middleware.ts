import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";
import {checkSession} from "./app/lib/session";

export async function middleware(req: NextRequest) {
  const {pathname} = req.nextUrl;
  const authStatus = await checkSession();

  if (authStatus) {
    if (pathname === "/login") return NextResponse.redirect(new URL("/", req.url));
  } else {
    if (pathname !== "/login") return NextResponse.redirect(new URL("/login", req.url));
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
