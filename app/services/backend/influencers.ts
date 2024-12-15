import knex from "@/app/lib/db";
import { errorMessages } from "@/app/lib/messages/errorMessages";
import { lines2arr } from "@/app/lib/utils";
import {
  ChangeManagerFormData,
  GetInfluencersFilters,
  InfluencerFormData,
  SocialPage,
} from "@/app/types/influencers";

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

    const socialPages: SocialPage[] = [...instagramAccounts, ...tiktokAccounts];

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

export const changeManager = async ({
  influencerId,
  newManagerId,
}: ChangeManagerFormData) => {
  try {
    await knex("influencers")
      .where({ id: influencerId })
      .update({ manager_id: Number(newManagerId) || null });

    return { success: true };
  } catch (error) {
    console.error(
      errorMessages["error_changing_manager"] + ": " + influencerId,
      error
    );
    return { success: false };
  }
};

export const getInfluencers = async ({
  filters,
}: {
  filters: GetInfluencersFilters;
}) => {
  return await knex("influencers")
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
};
