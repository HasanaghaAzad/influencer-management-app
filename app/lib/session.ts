import {cookies} from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "";
const JWT_EXPIRES = process.env.JWT_TOKEN_EXPIRES;

export const checkSession = async (req: Request): Promise<{id: number} | null> => {
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

export const createSession = (user: {id: number; email: string}) => {
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
