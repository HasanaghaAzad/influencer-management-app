import knex from "@/app/lib/db";
import { checkSession } from "@/app/lib/session";
import { NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: Request) {
  try {
    const jwtPayload = await checkSession();
    if (!jwtPayload?.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!jwtPayload?.userId) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const currentUser = await knex("users")
      .select("id", "first_name", "last_name")
      .where({ id: jwtPayload?.userId })
      .first();

    return NextResponse.json({ currentUser });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
