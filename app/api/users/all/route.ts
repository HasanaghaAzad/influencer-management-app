import knex from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await knex("users").select("id", "first_name", "last_name");

    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
