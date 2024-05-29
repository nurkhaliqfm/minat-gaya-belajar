"use server";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const { NEXT_PUBLIC_API_URL } = process.env;

export async function GET(request: Request) {
  const currentAccessToken = cookies().get("access_token_oauth0");

  const response = await axios({
    method: "GET",
    url: NEXT_PUBLIC_API_URL + "/refresh/token",
    headers: {
      Authorization: `Bearer ${currentAccessToken?.value}`,
    },
  });

  console.log("this is The Response", response);

  if (response.status === 200) {
    cookies().set("access_token_oauth0", response.data.access_token);
    cookies().set("access_token_oauth0_expired", response.data.expires_in);
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.json({ messege: "unauthorized" }, { status: 401 });
}
