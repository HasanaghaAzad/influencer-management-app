import knex from "@/app/lib/db";
import { errorMessages } from "@/app/lib/messages/errorMessages";
import { lines2arr } from "@/app/lib/utils";
import { ChangeManagerFormData, InfluencerFormData, SocialPages } from "@/app/types/influencers";

export const createInfluencer = async (
  influencerFormdata: InfluencerFormData
) => {
  const { firstName, lastName, managerId, instagram, tiktok } =
    influencerFormdata;

  try {
    const [{ id: influencerId }] = await knex("influencers")
      .insert({
        first_name: firstName,
        last_name: lastName,
        manager_id: Number(managerId) || null,
      })
      .returning("id");

    const instagramAccounts = buildAccountObjects(
      influencerId,
      instagram,
      "instagram"
    );

    const tiktokAccounts = buildAccountObjects(influencerId, tiktok, "tiktok");

    const socialPages: SocialPages = [...instagramAccounts, ...tiktokAccounts];

    if (socialPages.length > 0) {
      await knex("social_pages").insert(socialPages);
    }
    return { success: true };
  } catch (error) {
    console.error(errorMessages["error_creating_influencer"], error);
    return { error: errorMessages["error_creating_influencer"] };
  }
};

const buildAccountObjects = (
  influencerId: number,
  accountLinksLines: string,
  platform: "instagram" | "tiktok"
) => {
  return lines2arr(accountLinksLines).map((username) => ({
    influencer_id: influencerId,
    platform,
    username: username.trim(),
  }));
};

export const changeManager = async ({ influencerId, newManagerId }:ChangeManagerFormData) => {
  try {
    // Update the influencer's manager_id in the database
    await knex("influencers")
      .where({ id: influencerId })
      .update({ manager_id:  Number(newManagerId) || null });

    return { success: true };
  } catch (error) {
    console.error(
      `Failed to change manager for influencer ${influencerId}:`,
      error
    );
    throw new Error(`Unable to change manager: ${(error as Error).message}`);
  }
};
