import { NextRequestWithAuth } from "next-auth/middleware";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export default async function middleware(req: NextRequestWithAuth) {
  const currentAccessToken = cookies().get("access_token_oauth0_expired");
  const currentAccessTokenExpiresTime = cookies().get(
    "access_token_oauth0_expired"
  );

  const currentTimes = Date.now();
  let isAuthenticatedExpired = false;

  if (currentAccessToken && currentAccessTokenExpiresTime) {
    isAuthenticatedExpired =
      currentTimes > parseInt(currentAccessToken?.value) ? true : false;

    if (req.nextUrl.pathname.endsWith("signin")) {
      if (!isAuthenticatedExpired) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    } else if (isAuthenticatedExpired) {
      return NextResponse.redirect(new URL("/api/refresh-token", req.url));
    }
  } else {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }
}

export const config = {
  matcher: ["/"],
};
