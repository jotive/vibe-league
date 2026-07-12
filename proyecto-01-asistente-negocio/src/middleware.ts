import { NextRequest, NextResponse } from "next/server";

import { HTTP_STATUS } from "@/constants/http-status";
import { lang } from "@/lang";

export const config = {
  matcher: ["/admin/:path*"],
};

function unauthorized(): NextResponse {
  return new NextResponse(lang.admin.authRequired, {
    status: HTTP_STATUS.UNAUTHORIZED,
    headers: {
      "WWW-Authenticate": 'Basic realm="Panel del negocio", charset="UTF-8"',
    },
  });
}

function isAuthorized(request: NextRequest): boolean {
  const expectedUser = process.env.ADMIN_USER;
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (!expectedUser || !expectedPassword) {
    return false;
  }

  const header = request.headers.get("authorization");

  if (!header?.startsWith("Basic ")) {
    return false;
  }

  const decoded = atob(header.slice("Basic ".length));
  const separator = decoded.indexOf(":");

  if (separator < 0) {
    return false;
  }

  const user = decoded.slice(0, separator);
  const password = decoded.slice(separator + 1);

  return user === expectedUser && password === expectedPassword;
}

export function middleware(request: NextRequest) {
  if (!isAuthorized(request)) {
    return unauthorized();
  }

  return NextResponse.next();
}
