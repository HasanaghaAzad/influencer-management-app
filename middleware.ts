import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkSession } from "./app/lib/session";
import { JWTPayload } from "jose";
import { errorMessages } from "./app/lib/messages/errorMessages";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isApiRequest = pathname.startsWith("/api");
  const isAuthenticated = await checkSession();

  return isApiRequest
    ? await handleApiRequest(req, isAuthenticated)
    : await handlePageRequest(req, isAuthenticated);
}

export async function handlePageRequest(
  req: NextRequest,
  isAuthenticated: JWTPayload | null
) {
  const goingToLoginPage = req.nextUrl.pathname === "/login";

  if (isAuthenticated && goingToLoginPage)
    return NextResponse.redirect(new URL("/", req.url));

  if (!isAuthenticated && !goingToLoginPage)
    return NextResponse.redirect(new URL("/login", req.url));

  return NextResponse.next();
}

export async function handleApiRequest(
  req: NextRequest,
  isAuthenticated: JWTPayload | null
) {
  const isAuthenticatingNow =
    req.nextUrl.pathname === "/api/login" && req.method === "POST";
  if (!isAuthenticated && !isAuthenticatingNow) {
    return NextResponse.json(
      {
        error: "Unauthorized",
        message: errorMessages["authentication_required"],
      },
      { status: 401 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * middleware() will work on all requests except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
