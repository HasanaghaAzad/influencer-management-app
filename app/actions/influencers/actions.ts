"use server";

import { influencerCreateVelidationSchema } from "@/app/validation/influencers";
import { CreationResponse } from "@/app/types/influencers";
import {
  changeManager,
  createInfluencer,
} from "@/app/services/backend/influencers";

export async function create(
  prevState: CreationResponse,
  formData: FormData
): Promise<CreationResponse> {
  const validatedFields = influencerCreateVelidationSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    managerId: formData.get("managerId"),
    instagram: formData.get("instagram"),
    tiktok: formData.get("tiktok"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      values: {
        firstName: (formData.get("firstName") || "")?.toString(),
        lastName: (formData.get("lastName") || "")?.toString(),
        managerId: (formData.get("managerId") || "")?.toString(),
        instagram: (formData.get("instagram") || "")?.toString(),
        tiktok: (formData.get("tiktok") || "")?.toString(),
      },
    };
  }
  return await createInfluencer(validatedFields.data);
}

export const setManager = async (
  influencerId: string | number,
  newManagerId: string | number
): Promise<{ success: boolean }> => {
  return await changeManager({ influencerId, newManagerId });
};
