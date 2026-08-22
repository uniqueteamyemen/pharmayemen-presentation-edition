const value = (key: string, fallback = "") => process.env[key] ?? fallback;

/** Standard runtime configuration for the portable edition. */
export const ENV = {
  nodeEnv: value("NODE_ENV", "development"),
  appUrl: value("APP_URL", "http://localhost:3000"),
  jwtSecret: value("JWT_SECRET"),
  bootstrapAdminEmail: value("BOOTSTRAP_ADMIN_EMAIL").trim().toLowerCase(),
  mailTo: value("MAIL_TO", "baker@deterministicsolutionsdesign.com"),
} as const;

export function requireJwtSecret() {
  if (!ENV.jwtSecret || ENV.jwtSecret.length < 32) {
    throw new Error("JWT_SECRET must be set to at least 32 characters before starting the application.");
  }
  return ENV.jwtSecret;
}
