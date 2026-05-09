import { describe, expect, it } from "vitest";
import { fallbackGuest } from "../content/guests";
import { getSlugFromLocation, normalizeSlug, resolveGuest } from "./guest";

describe("guest routing", () => {
  it("normalizes valid slugs", () => {
    expect(normalizeSlug(" Ivanovy-A8F3 ")).toBe("ivanovy-a8f3");
  });

  it("rejects invalid slugs", () => {
    expect(normalizeSlug("../secret")).toBeNull();
  });

  it("reads slug from query string first", () => {
    const slug = getSlugFromLocation({
      pathname: "/i/maria-k2d9",
      search: "?g=ivanovy-a8f3",
    } as Location);

    expect(slug).toBe("ivanovy-a8f3");
  });

  it("reads slug from invite path", () => {
    const slug = getSlugFromLocation({
      pathname: "/i/maria-k2d9",
      search: "",
    } as Location);

    expect(slug).toBe("maria-k2d9");
  });
});

describe("guest fallback", () => {
  it("resolves known guests", () => {
    const resolvedGuest = resolveGuest("ivanovy-a8f3");

    expect(resolvedGuest.isFallback).toBe(false);
    expect(resolvedGuest.guest.displayName).toBe("семья Ивановых");
    expect(resolvedGuest.guest.guestId).toBe("guest-ivanovy");
  });

  it("uses generic guest for unknown slugs", () => {
    const resolvedGuest = resolveGuest("unknown-a1b2");

    expect(resolvedGuest.isFallback).toBe(true);
    expect(resolvedGuest.guest).toEqual(fallbackGuest);
  });
});
