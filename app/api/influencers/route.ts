import { NextRequest, NextResponse } from "next/server";
import knex from "@/app/lib/db";

export interface InfluencersQueryRow {
  id: number;
  first_name: string;
  last_name: string;
  manager_id: number;
  manager_first_name: string;
  manager_last_name: string;
  social_pages: {
    id: number;
    username: string;
    platform: string;
  }[];
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const filters = {
      influencerName: url.searchParams.get("influencerName"),
      managerName: url.searchParams.get("managerName"),
    };

    const influencers: InfluencersQueryRow[] = await knex("influencers")
      .select(
        "influencers.id",
        "influencers.first_name",
        "influencers.last_name",
        "influencers.manager_id",
        "users.first_name as manager_first_name",
        "users.last_name as manager_last_name",
        knex.raw(
          `json_agg(
        json_build_object(
          'id', social_pages.id,
          'username', social_pages.username,
          'platform', social_pages.platform
        )
      ) AS social_pages`
        )
      )
      .leftJoin("social_pages", "influencers.id", "social_pages.influencer_id")
      .leftJoin("users", "influencers.manager_id", "users.id")
      .modify((query) => {
        if (filters.influencerName) {
          query.where(function () {
            this.where(
              "influencers.first_name",
              "ilike",
              `%${filters.influencerName}%`
            ).orWhere(
              "influencers.last_name",
              "ilike",
              `%${filters.influencerName}%`
            );
          });
        }
        if (filters.managerName) {
          query.where(function () {
            this.where(
              "users.first_name",
              "ilike",
              `%${filters.managerName}%`
            ).orWhere("users.last_name", "ilike", `%${filters.managerName}%`);
          });
        }
      })
      .groupBy("influencers.id", "users.first_name", "users.last_name")
      .orderBy("influencers.id", "desc");

    return NextResponse.json({ success: true, data: influencers });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
