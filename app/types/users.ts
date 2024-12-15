export type AllUsersList = {
  id: number;
  first_name: string;
  last_name: string;
}[];

export interface GetCurrentUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}