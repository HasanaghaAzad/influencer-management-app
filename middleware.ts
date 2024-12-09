import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";
import { checkSession } from "./app/lib/session";


export async function middleware(req: NextRequest) {
  const authStatus = await checkSession(req);
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
    "/((?!api|login|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
