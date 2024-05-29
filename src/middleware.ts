import { NextRequestWithAuth } from "next-auth/middleware";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const protectedRoutes: any = {
  Admin: ["admin"],
  User: ["peminatan", "hasil-peminatan", "gaya-belajar", "hasil-gaya-belajar"],
};

export default async function middleware(req: NextRequestWithAuth) {
  const currentAccessToken = cookies().get("access_token_oauth0_expired");
  const currentAccessTokenExpiresTime = cookies().get(
    "access_token_oauth0_expired"
  );
  const currentUserRole = cookies().get("role");
  const { pathname } = req.nextUrl;

  const currentTimes = Date.now();
  let isAuthenticatedExpired = false;

  if (currentAccessToken && currentAccessTokenExpiresTime) {
    isAuthenticatedExpired =
      currentTimes > parseInt(currentAccessToken?.value) ? true : false;

    if (pathname.endsWith("signin")) {
      if (!isAuthenticatedExpired) {
        if (currentUserRole?.value && currentUserRole.value !== "User") {
          return NextResponse.redirect(
            new URL(protectedRoutes[currentUserRole.value][0], req.url)
          );
        }

        return NextResponse.redirect(new URL("/", req.url));
      }
    } else if (isAuthenticatedExpired) {
      return NextResponse.redirect(new URL("/api/refresh-token", req.url));
    } else if (pathname === "/") {
      if (currentUserRole?.value && currentUserRole.value !== "User") {
        return NextResponse.redirect(
          new URL(protectedRoutes[currentUserRole.value][0], req.url)
        );
      }
    } else if (
      currentUserRole?.value &&
      !protectedRoutes[currentUserRole.value].includes(pathname.split("/")[1])
    ) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  } else {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }
}

export const config = {
  matcher: [
    "/",
    "/admin",
    "/peminatan/:path*",
    "/hasil-peminatan/:path*",
    "/gaya-belajar/:path*",
    "/hasil-gaya-belajar/:path*",
  ],
};
