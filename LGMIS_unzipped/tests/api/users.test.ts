/**
 * Note: Next.js route handlers are best tested with integration/e2e frameworks.
 * This example illustrates a minimal smoke test on the handler's shape.
 */
import { GET } from "@/app/api/users/route";

describe("Users API", () => {
  it("GET is defined", () => {
    expect(GET).toBeDefined();
  });
});
