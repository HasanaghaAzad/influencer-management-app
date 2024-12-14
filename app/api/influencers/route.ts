import { NextRequest, NextResponse } from "next/server";
import { GetInfluencersQueryResultRow } from "@/app/types/influencers";
import { getInfluencers } from "@/app/services/backend/influencers";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const filters = {
      influencerName: url.searchParams.get("influencerName") || undefined,
      managerName: url.searchParams.get("managerName") || undefined,
    };

    const influencers: GetInfluencersQueryResultRow[] = await getInfluencers({
      filters,
    });

    return NextResponse.json({ success: true, data: influencers });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
