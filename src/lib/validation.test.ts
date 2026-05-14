import { describe, expect, it } from "vitest";
import { guests } from "../content/guests";
import type { GuestConfig, RsvpFormState } from "../types";
import { hasValidationErrors, validateRsvpForm } from "./validation";

const familyGuest = guests.find((guest) => guest.slug === "ivanovy-a8f3") as GuestConfig;
const singleGuest = guests.find((guest) => guest.slug === "thecrew") as GuestConfig;
const plusOneGuest: GuestConfig = {
  ...singleGuest,
  answerOptions: [
    { id: "plus-one-yes-plus", label: "Да, и возьму с собой +1.", requiresEmail: true, requiresPlusOneName: true }
  ]
};

const baseFormState: RsvpFormState = {
  answerOptionId: "",
  email: "",
  plusOneName: "",
  guestCount: "",
  message: "",
};

describe("validateRsvpForm", () => {
  it("requires an answer option", () => {
    const errors = validateRsvpForm(singleGuest, baseFormState);

    expect(errors.answerOptionId).toBe("Выберите один из вариантов ответа.");
    expect(hasValidationErrors(errors)).toBe(true);
  });

  it("validates email when selected option requires it", () => {
    const errors = validateRsvpForm(singleGuest, {
      ...baseFormState,
      answerOptionId: "single-yes",
      email: "not-an-email",
    });

    expect(errors.email).toBe("Проверьте формат email.");
  });

  it("validates plus-one name when required", () => {
    const errors = validateRsvpForm(plusOneGuest, {
      ...baseFormState,
      answerOptionId: "plus-one-yes-plus",
      email: "guest@example.com",
    });

    expect(errors.plusOneName).toBe("Укажите имя гостя +1.");
  });

  it("validates guest count when required", () => {
    const errors = validateRsvpForm(familyGuest, {
      ...baseFormState,
      answerOptionId: "family-partial",
      email: "family@example.com",
      guestCount: "13",
    });

    expect(errors.guestCount).toBe("Укажите целое число от 1 до 12.");
  });

  it("accepts a valid RSVP state", () => {
    const errors = validateRsvpForm(familyGuest, {
      ...baseFormState,
      answerOptionId: "family-partial",
      email: "family@example.com",
      guestCount: "4",
    });

    expect(hasValidationErrors(errors)).toBe(false);
  });
});
