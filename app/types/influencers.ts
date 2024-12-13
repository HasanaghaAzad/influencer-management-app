export interface CreationResponse {
  errors?: {
    firstName?: string[];
    lastName?: string[];
    managerId?: string[];
    instagram?: string[];
    tiktok?: string[];
  };
  success?: boolean;
  error?: string;
  values?: InfluencerFormData;
}

export interface SocialPage {
  username: string;
  influencer_id: number;
  platform: "tiktok" | "instagram";
}
export interface SocialPages extends Array<SocialPage> {}

export interface InfluencerFormData {
  firstName: string;
  lastName: string;
  managerId: string;
  instagram: string;
  tiktok: string;
}

export interface ChangeManagerFormData {
  influencerId: number | string;
  newManagerId: number | string;
}
