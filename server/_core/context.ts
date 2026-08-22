import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { parse as parseCookie } from "cookie";
import type { User } from "../../drizzle/schema";
import { COOKIE_NAME } from "../../shared/const";
import * as db from "../db";
import { verifySessionToken } from "./auth";

export type TrpcContext = { req: CreateExpressContextOptions["req"]; res: CreateExpressContextOptions["res"]; user: User | null };

export async function createContext(opts: CreateExpressContextOptions): Promise<TrpcContext> {
  const token = parseCookie(opts.req.headers.cookie ?? "")[COOKIE_NAME];
  let user: User | null = null;
  if (token) {
    try {
      const subject = await verifySessionToken(token);
      user = subject ? (await db.getUserByOpenId(subject)) ?? null : null;
    } catch { user = null; }
  }
  return { req: opts.req, res: opts.res, user };
}
