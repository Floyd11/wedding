import { fallbackGuest, guests } from "../content/guests";
import type { GuestConfig } from "../types";

const INVITE_PATH_PREFIX = "/i/";

export function normalizeSlug(slug: string | null): string | null {
  if (!slug) {
    return null;
  }

  const normalized = decodeURIComponent(slug).trim().toLowerCase();
  return /^[a-z0-9-_.&+]+$/.test(normalized) ? normalized : null;
}

export function getSlugFromUrl(location: Pick<Location, "pathname" | "search">): string | null {
  const querySlug = new URLSearchParams(location.search).get("g");

  if (querySlug) {
    return normalizeSlug(querySlug);
  }

  if (location.pathname.startsWith(INVITE_PATH_PREFIX)) {
    const pathSlug = location.pathname.slice(INVITE_PATH_PREFIX.length).split("/")[0] ?? null;
    return normalizeSlug(pathSlug);
  }

  return null;
}

export function getGuestBySlug(slug: string | null): GuestConfig {
  const normalizedSlug = normalizeSlug(slug);
  const guest = guests.find((guestConfig) => guestConfig.slug === normalizedSlug);

  return guest ?? fallbackGuest;
}

export function isFallbackGuest(guest: GuestConfig): boolean {
  return guest.guestId === "fallback";
}
