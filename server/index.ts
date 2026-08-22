import "dotenv/config";
import express from "express";
import { createServer } from "node:http";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./routers";
import { createContext } from "./_core/context";
import { ENV } from "./_core/env";
import { serveStatic, setupVite } from "./_core/vite";

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  app.disable("x-powered-by");
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));
  app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
  app.use("/api/trpc", createExpressMiddleware({ router: appRouter, createContext }));
  if (ENV.nodeEnv === "development") await setupVite(app, httpServer); else serveStatic(app);
  const port = Number(process.env.PORT ?? 3000);
  httpServer.listen(port, "0.0.0.0", () => console.log(`PharmaYemen portable edition listening on http://0.0.0.0:${port}`));
}

startServer().catch(error => { console.error("Unable to start PharmaYemen portable edition", error); process.exit(1); });
