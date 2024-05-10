import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";

const { NEXT_PUBLIC_API_URL } = process.env;

export async function DELETE() {
  const currentAccessToken = cookies().get("access_token_oauth0");

  await axios({
    url: `${NEXT_PUBLIC_API_URL}/logout`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${currentAccessToken?.value}`,
    },
  }).then((res) => {
    if (res.status === 200) {
      cookies().delete("name");
      cookies().delete("role");
      cookies().delete("access_token_oauth0");
      cookies().delete("access_token_oauth0_expired");
    } else {
      return NextResponse.json({ messege: "Logout Failed" }, { status: 401 });
    }
  });

  return NextResponse.json({ messege: "seccess" }, { status: 200 });
}
