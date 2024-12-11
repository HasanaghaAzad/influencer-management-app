import bcrypt from "bcryptjs";
import knex from "@/app/lib/db";

import {errorMessages} from "@/app/lib/messages/errorMessages";
import {createSession, deleteSession} from "../lib/session";

interface User {
  id: number;
  email: string;
  password: string;
}
type Token = string;

export const authenticateUser = async (email: string, password: string): Promise<Token | null> => {
  const user = await knex<User>("users").select("id", "password").where({email}).first();

  if (!user) throw new Error(errorMessages["invalid_email_or_password"]);

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error(errorMessages["invalid_email_or_password"]);

  return createSession(user.id);
};

export async function logout() {
  deleteSession();
}
