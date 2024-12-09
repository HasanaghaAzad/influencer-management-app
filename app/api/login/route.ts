import {NextResponse} from "next/server";
import {authenticateUser} from "../../../lib/auth";
import {errorMessages} from "@/lib/messages/errorMessages";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {email, password} = body;

    const token = await authenticateUser(email, password);

    if (!token) {
      return NextResponse.json({error: errorMessages["invalid_email_or_password"]}, {status: 401});
    }

    // Respond with token
    return NextResponse.json({token});
  } catch (error) {
    // Pass through the original error message from authenticateUser
    return NextResponse.json({error: (error as Error).message}, {status: 500});
  }
}
