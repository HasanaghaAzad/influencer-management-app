import { InfluencerData } from "@/components/pages/influencers/influencersList";
import { InfluencersQueryRow } from "../api/influencers/route";

interface getAllInfluencersRouteResponse {
  success?: boolean;
  error?: boolean;
  data: InfluencersQueryRow[];
}

type Filters = {
  influencerName: string;
  managerName: string;
};

export const getAllInfluencers = async (filters?:Filters) => {
  try {
    const queryParams = new URLSearchParams({
      ...(filters?.influencerName && { influencerName: filters.influencerName }),
      ...(filters?.managerName && { managerName: filters.managerName }),
    });
    const response = await fetch(`/api/influencers/?${queryParams.toString()}`);
    if (!response.ok) {
      throw new Error("Failed to fetch influencers data");
    }
    const data: getAllInfluencersRouteResponse = await response.json();
    console.log(data.data);
    const influencersData: InfluencerData[] = data.data.map((influencer) => ({
      firstName: influencer.first_name,
      lastName: influencer.last_name,

      manager: {
        id: influencer.manager_id,
        name:
          influencer.manager_first_name + " " + influencer.manager_last_name,
      },
      instagramAccounts: influencer.social_pages
        .filter((social_page) => social_page.platform === "instagram")
        .map((page) => page.username),
      tiktokAccounts: influencer.social_pages
        .filter((social_page) => social_page.platform === "tiktok")
        .map((page) => page.username),
    }));
    console.log(influencersData);
    return {
      success: true,
      data: influencersData,
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message,
    };
  }
};
