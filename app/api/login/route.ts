import {NextResponse} from "next/server";
import {errorMessages} from "@/app/lib/messages/errorMessages";
import {authenticateUser} from "@/app/actions/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {email, password} = body;

    const token = await authenticateUser(email, password);

    if (!token) {
      return NextResponse.json({error: errorMessages["invalid_email_or_password"]}, {status: 401});
    }

    const response = NextResponse.json({token});
    response.cookies.set("authToken", token, {httpOnly: true});
    return response;
  } catch (error) {
    return NextResponse.json({error: (error as Error).message}, {status: 401});
  }
}
