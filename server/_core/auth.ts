import { randomBytes, randomUUID, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { SignJWT, jwtVerify } from "jose";
import type { User } from "../../drizzle/schema";
import { requireJwtSecret } from "./env";

const scrypt = promisify(scryptCallback);
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24;
export type SafeUser = Omit<User, "passwordHash">;

export function toSafeUser(user: User): SafeUser {
  const { passwordHash: _passwordHash, ...safeUser } = user;
  return safeUser;
}

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const derived = (await scrypt(password, salt, 64)) as Buffer;
  return `${salt}:${derived.toString("hex")}`;
}

export async function verifyPassword(password: string, encoded: string | null) {
  if (!encoded) return false;
  const [salt, expectedHex] = encoded.split(":");
  if (!salt || !expectedHex) return false;
  const derived = (await scrypt(password, salt, 64)) as Buffer;
  const expected = Buffer.from(expectedHex, "hex");
  return expected.length === derived.length && timingSafeEqual(expected, derived);
}

export function newLocalSubject() { return `local:${randomUUID()}`; }

export async function createSessionToken(user: User) {
  return new SignJWT({ role: user.role }).setProtectedHeader({ alg: "HS256" }).setSubject(user.openId).setIssuedAt().setExpirationTime(`${SESSION_MAX_AGE_SECONDS}s`).sign(new TextEncoder().encode(requireJwtSecret()));
}

export async function verifySessionToken(token: string) {
  const { payload } = await jwtVerify(token, new TextEncoder().encode(requireJwtSecret()));
  return typeof payload.sub === "string" ? payload.sub : null;
}

export const sessionMaxAgeMs = SESSION_MAX_AGE_SECONDS * 1000;
