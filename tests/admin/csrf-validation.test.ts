import { describe, it, expect } from "vitest";
import { generateCsrfToken } from "@/lib/security/csrf";

describe("CSRF Protection", () => {
  it("should generate valid CSRF tokens", () => {
    const token1 = generateCsrfToken();
    const token2 = generateCsrfToken();

    expect(token1).toBeTruthy();
    expect(token2).toBeTruthy();
    expect(token1).not.toBe(token2); // Each token should be unique
    
    // Token should have proper format (random.signature)
    expect(token1.split(".").length).toBe(2);
    expect(token2.split(".").length).toBe(2);
  });

  it("should generate tokens with sufficient entropy", () => {
    const tokens = new Set();
    for (let i = 0; i < 100; i++) {
      tokens.add(generateCsrfToken());
    }
    
    // All 100 tokens should be unique
    expect(tokens.size).toBe(100);
  });
});
