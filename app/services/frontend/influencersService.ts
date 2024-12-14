import { InfluencerData } from "@/components/pages/influencers/influencersList";
import { GetAllInfluencersFilters, GetAllInfluencersRouteResponse } from "@/app/types/influencers";



export const getAllInfluencers = async (filters?: GetAllInfluencersFilters) => {
  try {
    const queryParams = new URLSearchParams({
      ...(filters?.influencerName && {
        influencerName: filters.influencerName,
      }),
      ...(filters?.managerName && { managerName: filters.managerName }),
    });
    const response = await fetch(`/api/influencers?${queryParams.toString()}`);
    if (!response.ok) {
      throw new Error("Failed to fetch influencers data");
    }
    const getAllInfluencers: GetAllInfluencersRouteResponse = await response.json();
    const influencersData: InfluencerData[] = getAllInfluencers.data.map((influencer) => ({
      id: influencer.id,
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
