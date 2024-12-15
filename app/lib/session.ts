"use server";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.JWT_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);
const JWT_EXPIRES = process.env.JWT_TOKEN_EXPIRES || "1d";

type UserId = number;

export async function createSession(userId: UserId) {
  const token = new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRES)
    .sign(encodedKey);
  return token;
}

export async function checkSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;
  if (!token) return null;

  const { payload } = await jwtVerify(token, encodedKey, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("authToken");
  cookieStore.delete("session");
}
