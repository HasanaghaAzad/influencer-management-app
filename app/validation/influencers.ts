import { z } from "zod";

const findDuplicates = (value: string) => {
  const accounts = value
    .split("\n")
    .map((account) => account.trim())
    .filter(Boolean);
  const duplicates = accounts.filter(
    (item, index) => accounts.indexOf(item) !== index
  );
  return duplicates;
};

const validateUniqueAccounts = (fieldName: string) =>
  z
    .string()
    .min(1, `${fieldName} accounts are required`)
    .superRefine((value, ctx) => {
      const duplicates = findDuplicates(value);
      if (duplicates.length > 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Duplicate accounts found in ${fieldName}: ${duplicates.join(
            ", "
          )}`,
        });
      }
    });

export const influencerCreateVelidationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  managerId: z.string().refine((value) => !isNaN(Number(value)), {
    message: "Manager ID must be a valid number in string type",
  }),
  instagram: validateUniqueAccounts("Instagram"),
  tiktok: validateUniqueAccounts("TikTok"),
});
