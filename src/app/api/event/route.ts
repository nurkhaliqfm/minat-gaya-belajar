"use server";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const { NEXT_PUBLIC_API_URL } = process.env;

export async function GET(request: Request) {
  const currentAccessToken = cookies().get("access_token_oauth0");
  const response = await axios({
    method: "GET",
    url: NEXT_PUBLIC_API_URL + "/events",
    headers: {
      Authorization: `Bearer ${currentAccessToken?.value}`,
    },
  });

  let responseData = response.data;

  if (response.status === 204) {
    responseData = [];
  } else if (response.status === 400) {
    console.log("Response Error");
    // NOTE: Make Error View
  }

  return NextResponse.json(
    { messege: "seccess", data: responseData.data },
    { status: 200 }
  );
}
