export type InviteType = "single" | "couple" | "family" | "group";

export type AnswerOption = {
  id: string;
  label: string;
  requiresEmail: boolean;
  requiresPlusOneName?: boolean;
  requiresGuestCount?: boolean;
};

export type ExtraSection = {
  id: string;
  title: string;
  body: string;
};

export type GuestConfig = {
  slug: string;
  guestId: string;
  displayName: string;
  greeting: string;
  inviteType: InviteType;
  answerOptions: AnswerOption[];
  extraSections?: ExtraSection[];
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
  inviteType: InviteType;
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
