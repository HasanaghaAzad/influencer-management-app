"use server";

import { z } from "zod";
import knex from "@/app/lib/db";

export type CreationResponse = {
  errors?: {
    firstName?: string[] | undefined;
    lastName?: string[] | undefined;
    managerId?: string[] | undefined;
    instagram?: string[] | undefined;
    tiktok?: string[] | undefined;
  };
  success?: boolean;
  error?: string;
};

type SocialPages = {
  username: string;
  influencer_id: number;
  platform: "tiktok" | "instagram";
}[];

const influencerCreateSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  managerId: z.string().refine(
    (value) => {
      return !isNaN(Number(value));
    },
    {
      message: "Manager ID must be a valid number in string form",
    }
  ),
  instagram: z.string().min(1, "Instagram accounts are required"),
  tiktok: z.string().min(1, "Tiktok accounts are required"),
});

export async function create(
  prevState: CreationResponse,
  formData: FormData
): Promise<CreationResponse> {
  const validatedFields = influencerCreateSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    managerId: formData.get("managerId"),
    instagram: formData.get("instagram"),
    tiktok: formData.get("tiktok"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { firstName, lastName, managerId, instagram, tiktok } =
    validatedFields.data;

  try {
    const [{ id: influencerId }] = await knex("influencers")
      .insert({
        first_name: firstName,
        last_name: lastName,
        manager_id: managerId,
      })
      .returning("id");

    // Prepare data for the `social_pages` table
    const socialPages: SocialPages = [];

    if (instagram) {
      instagram
        .split("\n") // Split by new lines
        .filter((username) => username.trim()) // Remove empty lines
        .forEach((username) => {
          socialPages.push({
            influencer_id: influencerId,
            platform: "instagram",
            username: username.trim(),
          });
        });
    }

    if (tiktok) {
      tiktok
        .split("\n") // Split by new lines
        .filter((username) => username.trim()) // Remove empty lines
        .forEach((username) => {
          socialPages.push({
            influencer_id: influencerId,
            platform: "tiktok",
            username: username.trim(),
          });
        });
    }

    if (socialPages.length > 0) {
      await knex("social_pages").insert(socialPages);
    }

    return { success: true };
  } catch (error) {
    console.error("Error creating influencer:", error);
    return { error: "Failed to create influencer." };
  }
}
