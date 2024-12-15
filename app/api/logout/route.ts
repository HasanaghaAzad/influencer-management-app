import {logout} from "@/app/actions/auth";
import {NextResponse} from "next/server";

export async function GET() {
  await logout();
  return NextResponse.json(
    {},
    {
      headers: {
        "Set-Cookie": "authToken=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict",
      },
      status: 200,
    }
  );
}
