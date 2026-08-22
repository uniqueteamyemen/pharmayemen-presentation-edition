import type { Express } from "express";
import express from "express";
import fs from "node:fs";
import path from "node:path";
import type { Server } from "node:http";
import { createServer as createViteServer } from "vite";

// The compiled server lives in dist/, while source lives in server/_core.
// Using the process working directory keeps both development and production portable.
const root = process.cwd();

export async function setupVite(app: Express, httpServer: Server) {
  const vite = await createViteServer({ configFile: path.join(root, "vite.config.ts"), server: { middlewareMode: true, hmr: { server: httpServer } }, appType: "spa" });
  app.use(vite.middlewares);
}

export function serveStatic(app: Express) {
  const distPath = path.join(root, "dist/public");
  if (!fs.existsSync(distPath)) throw new Error("Client build not found. Run pnpm build before pnpm start.");
  app.use(express.static(distPath));
  app.get("*", (_req, res) => res.sendFile(path.join(distPath, "index.html")));
}
