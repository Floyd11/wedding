import type { RsvpPayload, RsvpSubmissionResult } from "../types";

const requestTimeoutMs = 12_000;

export class RsvpSubmissionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RsvpSubmissionError";
  }
}

export async function submitRsvp(
  payload: RsvpPayload,
  endpoint = import.meta.env.VITE_RSVP_ENDPOINT,
): Promise<RsvpSubmissionResult> {
  if (!endpoint) {
    throw new RsvpSubmissionError("RSVP endpoint is not configured.");
  }

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), requestTimeoutMs);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new RsvpSubmissionError("RSVP endpoint returned an error.");
    }

    const responseText = await response.text();
    const parsed = parseSubmissionResponse(responseText);

    return {
      ok: true,
      receivedAt: parsed.receivedAt,
    };
  } catch (error) {
    if (error instanceof RsvpSubmissionError) {
      throw error;
    }

    if (error instanceof DOMException && error.name === "AbortError") {
      throw new RsvpSubmissionError("RSVP request timed out.");
    }

    throw new RsvpSubmissionError("RSVP request failed.");
  } finally {
    window.clearTimeout(timeoutId);
  }
}

function parseSubmissionResponse(responseText: string): { receivedAt?: string } {
  if (!responseText.trim()) {
    return {};
  }

  try {
    const parsed = JSON.parse(responseText) as { receivedAt?: unknown };
    return typeof parsed.receivedAt === "string" ? { receivedAt: parsed.receivedAt } : {};
  } catch {
    return {};
  }
}
