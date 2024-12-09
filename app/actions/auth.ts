import bcrypt from "bcryptjs";
import {knexClient as knex} from "@/app/lib/db";

import {errorMessages} from "@/app/lib/messages/errorMessages";
import { createSession } from "../lib/session";

interface User {
  id: number;
  email: string;
  password: string;
}

export const authenticateUser = async (email: string, password: string): Promise<string | null> => {
  const user = await knex<User>("users").where({email}).first();

  if (!user) throw new Error(errorMessages["invalid_email_or_password"]);

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error(errorMessages["invalid_email_or_password"]);

  return createSession(user);
};
