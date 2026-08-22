import { describe, expect, it } from "vitest";
import { hashPassword, verifyPassword } from "./auth";

describe("portable local authentication", () => {
  it("verifies the original password and rejects a different password", async () => {
    const encoded = await hashPassword("PortablePass-2026");
    expect(encoded).not.toContain("PortablePass-2026");
    await expect(verifyPassword("PortablePass-2026", encoded)).resolves.toBe(true);
    await expect(verifyPassword("DifferentPass-2026", encoded)).resolves.toBe(false);
  });
});
