export interface GetCurrentUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

export const getCurrentUser = async (): Promise<GetCurrentUser> => {
  try {
    const response = await fetch("/api/users/current-user");
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    const data = await response.json();
    return data.currentUser;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const getAllUsers = async () => {
  try {
    const response = await fetch("/api/users/all");
    if (!response.ok) {
      throw new Error("Failed to fetch users data");
    }
    const data = await response.json();
    return data.users;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
