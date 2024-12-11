import type { NextApiRequest, NextApiResponse } from "next";
import knex from "@/app/lib/db";
import { checkSession } from "@/app/lib/session";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const jwtPayload = await checkSession();
    if (!jwtPayload?.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!jwtPayload?.userId) {
      return res.status(404).json({ error: "User not found" });
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
