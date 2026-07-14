import { describe, expect, it } from "vitest";
import { fallbackGuest } from "../content/guests";
import { getGuestBySlug, getSlugFromUrl, isFallbackGuest, normalizeSlug } from "./guest";

describe("guest routing", () => {
  it("normalizes valid slugs", () => {
    expect(normalizeSlug(" Ivanovy-A8F3 ")).toBe("ivanovy-a8f3");
  });

  it("rejects invalid slugs", () => {
    expect(normalizeSlug("../secret")).toBeNull();
  });

  it("reads slug from query string first", () => {
    const slug = getSlugFromUrl({
      pathname: "/i/maria-k2d9",
      search: "?g=ivanovy-a8f3",
    } as Location);

    expect(slug).toBe("ivanovy-a8f3");
  });

  it("reads slug from invite path", () => {
    const slug = getSlugFromUrl({
      pathname: "/i/maria-k2d9",
      search: "",
    } as Location);

    expect(slug).toBe("maria-k2d9");
  });
});

describe("guest fallback", () => {
  it("resolves known guests", () => {
    const guest = getGuestBySlug("ivanovy-a8f3");

    expect(isFallbackGuest(guest)).toBe(false);
    expect(guest.displayName).toBe("семья Ивановых");
    expect(guest.guestId).toBe("guest-ivanovy");
  });

  it("resolves the 'sister' slug to Maria and Maxim", () => {
    const guest = getGuestBySlug("sister");

    expect(isFallbackGuest(guest)).toBe(false);
    expect(guest.displayName).toBe("Мария и Максим");
    expect(guest.guestId).toBe("guest-sister");
    expect(guest.inviteType).toBe("couple");
  });

  it("resolves the 'bud_kak_doma_putnik' slug to Konstantin", () => {
    const guest = getGuestBySlug("bud_kak_doma_putnik");

    expect(isFallbackGuest(guest)).toBe(false);
    expect(guest.displayName).toBe("Константин");
    expect(guest.guestId).toBe("guest-konstantin");
    expect(guest.inviteType).toBe("single");
  });

  it("resolves the 'MishanyaAlinochka' slug to Alina and Mikhail (with case normalization)", () => {
    const guest = getGuestBySlug("MishanyaAlinochka");

    expect(isFallbackGuest(guest)).toBe(false);
    expect(guest.displayName).toBe("Алина и Михаил");
    expect(guest.guestId).toBe("guest-mishanya-alinochka");
    expect(guest.inviteType).toBe("couple");
  });

  it("resolves the 'Aleksandra' slug to Aleksandra and Dmitry (with case normalization)", () => {
    const guest = getGuestBySlug("Aleksandra");

    expect(isFallbackGuest(guest)).toBe(false);
    expect(guest.displayName).toBe("Александра и Дмитрий");
    expect(guest.guestId).toBe("guest-aleksandra-dmitry");
    expect(guest.inviteType).toBe("couple");
  });

  it("resolves the 'Foma' slug to Alexander (with case normalization)", () => {
    const guest = getGuestBySlug("Foma");

    expect(isFallbackGuest(guest)).toBe(false);
    expect(guest.displayName).toBe("Александр");
    expect(guest.guestId).toBe("guest-alexander-foma");
    expect(guest.inviteType).toBe("single");
  });

  it("resolves the 'Switer' slug to Sergey (with case normalization)", () => {
    const guest = getGuestBySlug("Switer");

    expect(isFallbackGuest(guest)).toBe(false);
    expect(guest.displayName).toBe("Сергей");
    expect(guest.guestId).toBe("guest-sergey-switer");
    expect(guest.inviteType).toBe("single");
  });

  it("resolves the 'iluha' slug to Ilya (with case normalization)", () => {
    const guest = getGuestBySlug("Iluha");

    expect(isFallbackGuest(guest)).toBe(false);
    expect(guest.displayName).toBe("Илья");
    expect(guest.guestId).toBe("guest-ilya");
    expect(guest.inviteType).toBe("single");
  });

  it("uses generic guest for unknown slugs", () => {
    const guest = getGuestBySlug("unknown-a1b2");

    expect(isFallbackGuest(guest)).toBe(true);
    expect(guest).toEqual(fallbackGuest);
  });
});
