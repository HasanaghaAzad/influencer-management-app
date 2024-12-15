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

export interface GetInfluencersQueryResultRow {
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

export interface GetInfluencersRouteResponse {
  success?: boolean;
  error?: boolean;
  data: GetInfluencersQueryResultRow[];
}

export interface GetInfluencersFilters {
  influencerName?: string;
  managerName?: string;
};

export type InfluencerData = {
  id: number;
  firstName: string;
  lastName: string;
  instagramAccounts: string[];
  tiktokAccounts: string[];
  manager: {
    id: number;
    name: string;
  };
};
export type InfluencersTableColumns = {
  firstName: { title: string };
  lastName: { title: string };
  instagramAccounts: { title: string };
  tiktokAccounts: { title: string };
  manager: { title: string };
};
