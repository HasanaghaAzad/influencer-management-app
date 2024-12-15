"use server";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { errorMessages } from "./messages/errorMessages";

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

  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log(errorMessages["JWT_token_verify_fail"], error);
    return null;
  }
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("authToken");
  cookieStore.delete("session");
}
