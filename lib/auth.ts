import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import knex from "./db";
import {cookies} from "next/headers";
import { errorMessages } from "./messages/errorMessages";

const JWT_SECRET = process.env.JWT_SECRET || "";
const JWT_EXPIRES = process.env.JWT_TOKEN_EXPIRES;

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

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES,
    }
  );
  return token;
};

export const isAuthenticated = async (req: Request): Promise<{id: number} | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY!) as {id: number};
    return decoded;
  } catch (error) {
    return null;
  }
};
