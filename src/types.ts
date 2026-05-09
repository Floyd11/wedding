export type AnswerOption = {
  id: string;
  label: string;
  description?: string;
  requiresEmail?: boolean;
  requiresPlusOneName?: boolean;
  requiresGuestCount?: boolean;
};

export type AdditionalSection = {
  title: string;
  body: string;
};

export type GuestConfig = {
  guestId: string;
  slug: string;
  greeting: string;
  displayName: string;
  answerOptions: AnswerOption[];
  additionalSections?: AdditionalSection[];
};

export type ResolvedGuest = {
  guest: GuestConfig;
  isFallback: boolean;
  slug: string | null;
};

export type RsvpFormState = {
  answerOptionId: string;
  email: string;
  plusOneName: string;
  guestCount: string;
  message: string;
};

export type RsvpPayload = {
  guestId: string;
  slug: string;
  displayName: string;
  answerId: string;
  answerLabel: string;
  email?: string;
  plusOneName?: string;
  guestCount?: number;
  comment?: string;
  sourceUrl: string;
  userAgent: string;
  source: "wedding-invitation";
};

export type ValidationErrors = Partial<Record<keyof RsvpFormState, string>>;

export type RsvpSubmissionResult = {
  ok: true;
  receivedAt?: string;
};
