import { cloneElement, useMemo, useState } from "react";
import type { FormEvent, InputHTMLAttributes, ReactElement, TextareaHTMLAttributes } from "react";
import { weddingContent } from "../content/content";
import { submitRsvp } from "../lib/rsvp";
import { readStoredSubmission, storeSubmission } from "../lib/submissionStorage";
import { findAnswerOption, hasValidationErrors, validateRsvpForm } from "../lib/validation";
import type { GuestConfig, RsvpFormState, RsvpPayload, ValidationErrors } from "../types";
import { AnimatedSection } from "./AnimatedSection";
import { EditorialDivider } from "./EditorialDivider";
import { SectionHeading } from "./SectionHeading";

type RsvpSectionProps = {
  guest: GuestConfig;
  slug: string | null;
};

type SubmissionStatus = "idle" | "loading" | "success" | "error" | "already-submitted";

const initialFormState: RsvpFormState = {
  answerOptionId: "",
  email: "",
  plusOneName: "",
  guestCount: "",
  message: "",
};

export function RsvpSection({ guest, slug }: RsvpSectionProps) {
  const { rsvp } = weddingContent;
  const storedSubmission = useMemo(() => readStoredSubmission(slug), [slug]);
  const [formState, setFormState] = useState<RsvpFormState>(() => ({
    ...initialFormState,
    answerOptionId: storedSubmission?.answerOptionId ?? "",
  }));
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [status, setStatus] = useState<SubmissionStatus>(
    storedSubmission ? "already-submitted" : "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  const selectedOption = useMemo(
    () => findAnswerOption(guest, formState.answerOptionId),
    [guest, formState.answerOptionId],
  );

  function updateField<K extends keyof RsvpFormState>(field: K, value: RsvpFormState[K]) {
    setFormState((currentState) => ({ ...currentState, [field]: value }));
    setErrors((currentErrors) => ({ ...currentErrors, [field]: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (status === "loading" || status === "success" || status === "already-submitted") {
      return;
    }

    const nextErrors = validateRsvpForm(guest, formState);
    setErrors(nextErrors);

    if (hasValidationErrors(nextErrors)) {
      return;
    }

    const option = findAnswerOption(guest, formState.answerOptionId);

    if (!option) {
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    const payload: RsvpPayload = {
      guestId: guest.guestId,
      slug: slug ?? guest.slug,
      displayName: guest.displayName,
      inviteType: guest.inviteType,
      answerId: option.id,
      answerLabel: option.label,
      sourceUrl: window.location.href,
      userAgent: window.navigator.userAgent,
      source: "wedding-invitation",
      ...(option.requiresEmail ? { email: formState.email.trim() } : {}),
      ...(option.requiresPlusOneName ? { plusOneName: formState.plusOneName.trim() } : {}),
      ...(option.requiresGuestCount ? { guestCount: Number(formState.guestCount) } : {}),
      ...(formState.message.trim() ? { comment: formState.message.trim() } : {}),
    };

    try {
      await submitRsvp(payload);
      storeSubmission(slug, {
        submittedAt: new Date().toISOString(),
        answerOptionId: option.id,
      });
      setStatus("success");
    } catch (error) {
      const isEndpointMissing =
        error instanceof Error && error.message === "RSVP endpoint is not configured.";
      setErrorMessage(isEndpointMissing ? rsvp.endpointMissing : rsvp.genericError);
      setStatus("error");
    }
  }

  const isSubmitted = status === "success" || status === "already-submitted";
  const isLoading = status === "loading";

  return (
    <AnimatedSection id="rsvp" className="relative bg-soft-rose/16 px-5 py-8 sm:pt-12 sm:pb-16">
      <div className="absolute left-0 top-0 hidden h-full w-px bg-warm-sand/55 sm:block" aria-hidden="true" />
      <div className="absolute right-0 top-0 hidden h-full w-px bg-warm-sand/55 sm:block" aria-hidden="true" />
      <div className="mx-auto max-w-3xl">
        <SectionHeading title={rsvp.title} />
        <p className="mt-4 text-center font-serif text-2xl leading-relaxed text-black">{rsvp.deadline}</p>

        <div className="relative mt-8 border border-warm-sand/70 bg-ivory/85 p-4 shadow-[0_20px_70px_rgba(61,51,42,0.12)] backdrop-blur sm:p-6">
          <div className="absolute -left-3 -top-3 h-14 w-14 border-l border-t border-soft-rose" aria-hidden="true" />
          <div className="absolute -bottom-3 -right-3 h-14 w-14 border-b border-r border-soft-rose" aria-hidden="true" />
          {isSubmitted ? (
            <div className="text-center" role="status" aria-live="polite">
              <p className="font-serif text-4xl text-black">{rsvp.successTitle}</p>
              <p className="mt-4 font-serif text-2xl leading-relaxed text-black/75">
                {status === "already-submitted" ? rsvp.alreadySubmitted : rsvp.successBody}
              </p>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
              <fieldset>
                <legend className="sr-only">{rsvp.title}</legend>
                <div className="space-y-2">
                  {guest.answerOptions.map((option) => (
                      <label
                        key={option.id}
                        className="flex cursor-pointer items-center gap-4 border border-warm-sand/80 bg-white/55 p-3 transition hover:-translate-y-0.5 hover:border-olive-gray hover:shadow-[0_12px_25px_rgba(61,51,42,0.08)]"
                      >
                        <input
                          type="radio"
                          name="answerOption"
                          value={option.id}
                          checked={formState.answerOptionId === option.id}
                          className="h-5 w-5 accent-olive-gray"
                          onChange={(event) => updateField("answerOptionId", event.target.value)}
                        />
                        <span>
                          <span className="block font-serif text-2xl leading-relaxed text-black">{option.label}</span>
                        </span>
                      </label>
                  ))}
                </div>
                {errors.answerOptionId ? (
                  <p className="mt-2 text-sm text-red-700" role="alert">
                    {errors.answerOptionId}
                  </p>
                ) : null}
              </fieldset>

              {selectedOption?.requiresEmail ? (
                <Field
                  id="rsvp-email"
                  label={rsvp.emailLabel}
                  error={errors.email}
                  input={
                    <input
                      id="rsvp-email"
                      type="email"
                      value={formState.email}
                      placeholder={rsvp.emailPlaceholder}
                      autoComplete="email"
                      onChange={(event) => updateField("email", event.target.value)}
                    />
                  }
                />
              ) : null}

              {selectedOption?.requiresPlusOneName ? (
                <Field
                  id="rsvp-plus-one"
                  label={rsvp.plusOneLabel}
                  error={errors.plusOneName}
                  input={
                    <input
                      id="rsvp-plus-one"
                      type="text"
                      value={formState.plusOneName}
                      placeholder={rsvp.plusOnePlaceholder}
                      autoComplete="name"
                      onChange={(event) => updateField("plusOneName", event.target.value)}
                    />
                  }
                />
              ) : null}

              {selectedOption?.requiresGuestCount ? (
                <Field
                  id="rsvp-guest-count"
                  label={rsvp.guestCountLabel}
                  error={errors.guestCount}
                  input={
                    <input
                      id="rsvp-guest-count"
                      type="number"
                      min="1"
                      max="12"
                      inputMode="numeric"
                      value={formState.guestCount}
                      onChange={(event) => updateField("guestCount", event.target.value)}
                    />
                  }
                />
              ) : null}

              <Field
                id="rsvp-message"
                label={rsvp.messageLabel}
                input={
                  <textarea
                    id="rsvp-message"
                    value={formState.message}
                    placeholder={rsvp.messagePlaceholder}
                    rows={2}
                    onChange={(event) => updateField("message", event.target.value)}
                  />
                }
              />

              {status === "error" ? (
                <p className="border border-red-200 bg-red-50 p-3 text-sm text-red-800" role="alert">
                  {errorMessage}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-deep-brown px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-ivory transition hover:bg-olive-gray focus:outline-none focus-visible:ring-2 focus-visible:ring-deep-brown focus-visible:ring-offset-4 focus-visible:ring-offset-ivory disabled:cursor-not-allowed disabled:opacity-60 touch-manipulation"
              >
                {isLoading ? rsvp.submitting : rsvp.submit}
              </button>
            </form>
          )}
        </div>
      </div>
      <div className="mt-12">
        <EditorialDivider />
      </div>
    </AnimatedSection>
  );
}

type FieldProps = {
  id: string;
  label: string;
  input: ReactElement<InputHTMLAttributes<HTMLInputElement> | TextareaHTMLAttributes<HTMLTextAreaElement>>;
  error?: string;
};

function Field({ id, label, input, error }: FieldProps) {
  const errorId = `${id}-error`;
  const className =
    "mt-2 w-full border border-warm-sand bg-white/75 px-4 py-3 text-base text-black outline-none transition placeholder:text-black/35 focus:border-olive-gray focus:ring-2 focus:ring-olive-gray/25";

  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-black">
        {label}
      </label>
      {cloneElement(input, {
        className,
        "aria-invalid": Boolean(error),
        "aria-describedby": error ? errorId : undefined,
      })}
      {error ? (
        <p id={errorId} className="mt-2 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
