const storagePrefix = "wedding-rsvp-submitted:";

export type StoredSubmission = {
  submittedAt: string;
  answerOptionId: string;
};

export function getSubmissionStorageKey(slug: string | null): string {
  return `${storagePrefix}${slug ?? "general"}`;
}

export function readStoredSubmission(slug: string | null): StoredSubmission | null {
  try {
    const storedValue = window.localStorage.getItem(getSubmissionStorageKey(slug));

    if (!storedValue) {
      return null;
    }

    const parsed = JSON.parse(storedValue) as Partial<StoredSubmission>;

    if (typeof parsed.submittedAt !== "string" || typeof parsed.answerOptionId !== "string") {
      return null;
    }

    return {
      submittedAt: parsed.submittedAt,
      answerOptionId: parsed.answerOptionId,
    };
  } catch {
    return null;
  }
}

export function storeSubmission(slug: string | null, submission: StoredSubmission): void {
  try {
    window.localStorage.setItem(getSubmissionStorageKey(slug), JSON.stringify(submission));
  } catch {
    // RSVP success must not fail because local storage is unavailable.
  }
}
